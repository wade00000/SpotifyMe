import { useState, useEffect } from 'react';

function HipsterIndex({ tracks, artists }) {
    const [animatedTrackScore, setAnimatedTrackScore] = useState(0);
    const [animatedArtistScore, setAnimatedArtistScore] = useState(0);

    const trackAvg = calcAvgPopularity(tracks);
    const artistAvg = calcAvgPopularity(artists);

    const trackHipsterScore = Math.round(100 - trackAvg);
    const artistHipsterScore = Math.round(100 - artistAvg);

    const trackCategory = getHipsterCategory(trackHipsterScore);
    const artistCategory = getHipsterCategory(artistHipsterScore);

    // Animate scores on component mount
    useEffect(() => {
        const animateScore = (targetScore, setScore) => {
            let currentScore = 0;
            const increment = targetScore / 50; // 50 steps for smooth animation
            const timer = setInterval(() => {
                currentScore += increment;
                if (currentScore >= targetScore) {
                    setScore(targetScore);
                    clearInterval(timer);
                } else {
                    setScore(Math.round(currentScore));
                }
            }, 30);
        };

        animateScore(trackHipsterScore, setAnimatedTrackScore);
        animateScore(artistHipsterScore, setAnimatedArtistScore);
    }, [trackHipsterScore, artistHipsterScore]);

    function getHipsterCategory(score) {
        if (score >= 90) return { name: "Ultra Hipster", emoji: "🦄", color: "#8b5cf6" };
        if (score >= 70) return { name: "Pretty Hipster", emoji: "🎭", color: "#06d6a0" };
        if (score >= 50) return { name: "Balanced Taste", emoji: "⚖️", color: "#ffd166" };
        if (score >= 30) return { name: "Mainstream-ish", emoji: "📻", color: "#f77f00" };
        return { name: "Full Mainstream", emoji: "🎤", color: "#d62d20" };
    }

    function calcAvgPopularity(collection) {
        if (!collection?.items?.length) return 0;
        const total = collection.items.reduce(
            (acc, item) => acc + item.popularity,
            0
        );
        return total / collection.items.length;
    }

    function getScoreDescription(score) {
        if (score >= 90) return "You're discovering music before it's cool! Your taste is incredibly unique.";
        if (score >= 70) return "You have great taste for lesser-known gems while enjoying some popular hits.";
        if (score >= 50) return "You enjoy a perfect mix of underground and mainstream music.";
        if (score >= 30) return "You lean towards popular music but still discover some hidden treasures.";
        return "You love the hits! Nothing wrong with enjoying what everyone else loves too.";
    }

    const overallScore = Math.round((trackHipsterScore + artistHipsterScore) / 2);
    const overallCategory = getHipsterCategory(overallScore);

    return (
        <div className="hipster-index-container">
            {/* Header */}
            <div className="hipster-header">
                <h1 className="hipster-title">Your Hipster Index</h1>
                <p className="hipster-subtitle">
                    How underground is your music taste? Lower popularity = Higher hipster score!
                </p>
            </div>

            {/* Overall Score */}
            <div className="overall-score-card">
                <div className="score-circle">
                    <div className="score-inner">
                        <div className="score-number">{overallScore}</div>
                        <div className="score-max">/100</div>
                    </div>
                    <svg className="score-ring" width="200" height="200">
                        <circle
                            cx="100"
                            cy="100"
                            r="85"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="12"
                            fill="none"
                        />
                        <circle
                            cx="100"
                            cy="100"
                            r="85"
                            stroke={overallCategory.color}
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${overallScore * 5.34} 534`}
                            transform="rotate(-90 100 100)"
                            style={{
                                filter: `drop-shadow(0 0 10px ${overallCategory.color}80)`,
                                transition: 'stroke-dasharray 2s ease-in-out'
                            }}
                        />
                    </svg>
                </div>
                <div className="overall-info">
                    <div className="category-badge" style={{ backgroundColor: overallCategory.color + '20', borderColor: overallCategory.color }}>
                        <span className="category-emoji">{overallCategory.emoji}</span>
                        <span className="category-name">{overallCategory.name}</span>
                    </div>
                    <p className="score-description">{getScoreDescription(overallScore)}</p>
                </div>
            </div>

            {/* Detailed Scores */}
            <div className="detailed-scores">
                {/* Track Score */}
                <div className="score-card">
                    <div className="card-header">
                        <h3>🎵 Track Hipster Score</h3>
                        <div className="score-badge">{animatedTrackScore}/100</div>
                    </div>
                    
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ 
                                    width: `${animatedTrackScore}%`,
                                    backgroundColor: trackCategory.color,
                                    boxShadow: `0 0 20px ${trackCategory.color}60`
                                }}
                            ></div>
                        </div>
                        <div className="progress-labels">
                            <span>Mainstream</span>
                            <span>Hipster</span>
                        </div>
                    </div>

                    <div className="category-info">
                        <span className="category-emoji">{trackCategory.emoji}</span>
                        <span className="category-text">{trackCategory.name}</span>
                    </div>
                    
                    <div className="stats">
                        <div className="stat">
                            <span className="stat-label">Average Popularity:</span>
                            <span className="stat-value">{Math.round(trackAvg)}/100</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Total Tracks:</span>
                            <span className="stat-value">{tracks?.items?.length || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Artist Score */}
                <div className="score-card">
                    <div className="card-header">
                        <h3>🎤 Artist Hipster Score</h3>
                        <div className="score-badge">{animatedArtistScore}/100</div>
                    </div>
                    
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ 
                                    width: `${animatedArtistScore}%`,
                                    backgroundColor: artistCategory.color,
                                    boxShadow: `0 0 20px ${artistCategory.color}60`
                                }}
                            ></div>
                        </div>
                        <div className="progress-labels">
                            <span>Mainstream</span>
                            <span>Hipster</span>
                        </div>
                    </div>

                    <div className="category-info">
                        <span className="category-emoji">{artistCategory.emoji}</span>
                        <span className="category-text">{artistCategory.name}</span>
                    </div>
                    
                    <div className="stats">
                        <div className="stat">
                            <span className="stat-label">Average Popularity:</span>
                            <span className="stat-value">{Math.round(artistAvg)}/100</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Total Artists:</span>
                            <span className="stat-value">{artists?.items?.length || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="hipster-legend">
                <h4>Hipster Categories</h4>
                <div className="legend-items">
                    <div className="legend-item">
                        <span className="legend-icon">🦄</span>
                        <span>Ultra Hipster (90-100)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-icon">🎭</span>
                        <span>Pretty Hipster (70-89)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-icon">⚖️</span>
                        <span>Balanced Taste (50-69)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-icon">📻</span>
                        <span>Mainstream-ish (30-49)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-icon">🎤</span>
                        <span>Full Mainstream (0-29)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HipsterIndex;