import { redirectToAuthCodeFlow } from '../spotifyApi';

function LandingPage() {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

    const handleLogin = () => {
        redirectToAuthCodeFlow(clientId);
    };

    return (
        <div className="landing-page">
            {/* Floating background elements */}
            <div className="floating-elements">
                <div className="floating-circle"></div>
                <div className="floating-circle"></div>
                <div className="floating-circle"></div>
            </div>

            <div className="landing-container">
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-content">
                        <div className="logo-section">
                            <div className="logo">
                                <span className="logo-text">SpotifyMe</span>
                                <div className="logo-subtitle">Analytics</div>
                            </div>
                        </div>

                        <h1 className="hero-title">
                            Discover Your <span className="highlight">Music Story</span>
                        </h1>
                        
                        <p className="hero-description">
                            Unlock deep insights into your Spotify listening habits. See your top tracks, 
                            artists, genres, and discover how hipster your music taste really is!
                        </p>

                        <button 
                            className="login-button"
                            onClick={handleLogin}
                        >
                            <div className="button-content">
                                <span className="spotify-icon">🎵</span>
                                <span>Connect with Spotify</span>
                                <div className="button-shine"></div>
                            </div>
                        </button>

                        <p className="privacy-note">
                            We only access your music data to show you analytics. 
                            No data is stored or shared.
                        </p>
                    </div>

                    <div className="hero-visual">
                        <div className="mock-dashboard">
                            <div className="mock-header">
                                <div className="mock-avatar"></div>
                                <div className="mock-stats">
                                    <div className="mock-stat">
                                        <div className="mock-number">1,247</div>
                                        <div className="mock-label">Tracks</div>
                                    </div>
                                    <div className="mock-stat">
                                        <div className="mock-number">89</div>
                                        <div className="mock-label">Artists</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mock-chart">
                                <div className="mock-bars">
                                    <div className="mock-bar" style={{height: '80%'}}></div>
                                    <div className="mock-bar" style={{height: '60%'}}></div>
                                    <div className="mock-bar" style={{height: '95%'}}></div>
                                    <div className="mock-bar" style={{height: '45%'}}></div>
                                    <div className="mock-bar" style={{height: '70%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="features-section">
                    <h2 className="features-title">What You'll Discover</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎵</div>
                            <h3>Top Tracks & Artists</h3>
                            <p>See your most played songs and favorite artists with beautiful visualizations</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Genre Analysis</h3>
                            <p>Discover your music taste across different genres with interactive charts</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🦄</div>
                            <h3>Hipster Score</h3>
                            <p>Find out how mainstream or underground your music taste really is</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🎧</div>
                            <h3>Now Playing</h3>
                            <p>See what's currently playing with a beautiful real-time interface</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="cta-section">
                    <div className="cta-content">
                        <h2>Ready to explore your musical journey?</h2>
                        <button 
                            className="cta-button"
                            onClick={handleLogin}
                        >
                            Get Started Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;