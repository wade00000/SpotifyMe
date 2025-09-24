import { useOutletContext } from "react-router"
import Chart from 'chart.js/auto'
import { useEffect, useRef } from 'react';

function TopGenres() {
    const { userArtists } = useOutletContext()
    
    // ✅ ALL HOOKS MUST BE AT THE TOP!
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    // Calculate data (but handle empty state safely)
    const genreCounts = {}
    if (userArtists?.items) {
        userArtists.items.forEach(artist => {
            artist.genres.forEach(genre => {
                if (genreCounts[genre]) {
                    genreCounts[genre]++
                } else {
                    genreCounts[genre] = 1
                }
            })
        })
    }

    const sortedGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    
    const allGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])

    // ✅ useEffect MUST also be at the top level!
    useEffect(() => {
        if (!canvasRef.current || sortedGenres.length === 0 || !userArtists?.items) return;

        // Destroy existing chart
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create gradient
        const ctx = canvasRef.current.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(30, 215, 96, 0.8)');
        gradient.addColorStop(0.5, 'rgba(29, 185, 84, 0.6)');
        gradient.addColorStop(1, 'rgba(29, 185, 84, 0.2)');

        const borderGradient = ctx.createLinearGradient(0, 0, 0, 400);
        borderGradient.addColorStop(0, '#1ed760');
        borderGradient.addColorStop(1, '#1db954');

        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: {
                labels: sortedGenres.map(entry => entry[0]),
                datasets: [{
                    label: 'Number of Artists',
                    data: sortedGenres.map(entry => entry[1]),
                    backgroundColor: gradient,
                    borderColor: borderGradient,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    hoverBackgroundColor: 'rgba(30, 215, 96, 0.9)',
                    hoverBorderColor: '#1ed760',
                    hoverBorderWidth: 3,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: { 
                        display: false 
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: '#1ed760',
                        bodyColor: '#ffffff',
                        borderColor: '#1ed760',
                        borderWidth: 1,
                        cornerRadius: 10,
                        displayColors: false,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 12
                        },
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                const count = context.raw;
                                const percentage = ((count / userArtists.items.length) * 100).toFixed(1);
                                return `${count} artists (${percentage}%)`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            maxRotation: 45,
                            minRotation: 0,
                            callback: function(value, index) {
                                const label = this.getLabelForValue(value);
                                return label.length > 15 ? label.substring(0, 15) + '...' : label;
                            }
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            stepSize: 1
                        },
                        border: {
                            display: false
                        }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [sortedGenres, userArtists]);

    
    if (!userArtists?.items) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your genre preferences...</p>
            </div>
        )
    }

    return (
        <div className="genres-container">
            <div className="page-header">
                <h1>Your Top Genres</h1>
                <p>Discover the musical styles that define your taste</p>
            </div>

            {/* Stats Cards */}
            <div className="genre-stats">
                <div className="stat-card">
                    <div className="stat-number">{Object.keys(genreCounts).length}</div>
                    <div className="stat-label">Total Genres</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{sortedGenres[0]?.[0] || 'N/A'}</div>
                    <div className="stat-label">Top Genre</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{sortedGenres[0]?.[1] || 0}</div>
                    <div className="stat-label">Artists in Top Genre</div>
                </div>
            </div>

            {/* Chart Container */}
            <div className="chart-container">
                <div className="chart-header">
                    <h3>Top 10 Genres by Artist Count</h3>
                    <p>Based on your top {userArtists.items.length} artists</p>
                </div>
                <div className="chart-wrapper">
                    <canvas ref={canvasRef}></canvas>
                </div>
            </div>

            {/* Genre List */}
            <div className="genre-list-container">
                <h3>Complete Genre Breakdown</h3>
                <div className="genre-grid">
                    {allGenres.map((genre, index) => (
                        <div key={genre[0]} className="genre-item">
                            <div className="genre-rank">#{index + 1}</div>
                            <div className="genre-info">
                                <div className="genre-name">{genre[0]}</div>
                                <div className="genre-count">{genre[1]} artists</div>
                            </div>
                            <div className="genre-bar">
                                <div 
                                    className="genre-bar-fill"
                                    style={{ 
                                        width: `${(genre[1] / sortedGenres[0][1]) * 100}%`,
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopGenres;