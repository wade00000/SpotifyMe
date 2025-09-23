import { useOutletContext } from "react-router";

function CurrentTrack() {
    const { currPlaying } = useOutletContext()
    
    if (!currPlaying?.item) {
        return (
            <div className="now-playing-card">
                <div className="now-playing-header">
                    <h3 className="now-playing-title">🎵 Now Playing</h3>
                </div>
                <div className="no-track">
                    <div className="no-track-icon">⏹️</div>
                    <p>No track currently playing</p>
                    <small>Start playing music on Spotify to see it here!</small>
                </div>
            </div>
        )
    }

    // Calculate progress percentage
    const progressPercent = (currPlaying.progress_ms / currPlaying.item.duration_ms) * 100;
    
    // Format time in mm:ss
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="now-playing-card">
            <div className="now-playing-header">
                <h3 className="now-playing-title">
                    {currPlaying.is_playing ? "🎵 Now Playing" : "⏸️ Paused"}
                </h3>
                <div className="playing-status">
                    {currPlaying.is_playing ? (
                        <div className="pulse-indicator">
                            <span className="pulse-dot"></span>
                            <span>LIVE</span>
                        </div>
                    ) : (
                        <span className="paused-indicator">PAUSED</span>
                    )}
                </div>
            </div>

            <div className="track-display">
                <img 
                    src={currPlaying.item.album.images[0]?.url} 
                    alt={currPlaying.item.album.name}
                    className="album-art"
                />
                
                <div className="track-details">
                    <div className="track-name">{currPlaying.item.name}</div>
                    <div className="track-artist">
                        by {currPlaying.item.artists.map(artist => artist.name).join(", ")}
                    </div>
                    <div className="album-name">{currPlaying.item.album.name}</div>
                </div>
            </div>

            <div className="progress-section">
                <div className="progress-bar">
                    <div 
                        className="progress-fill"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                <div className="time-display">
                    <span>{formatTime(currPlaying.progress_ms)}</span>
                    <span>{formatTime(currPlaying.item.duration_ms)}</span>
                </div>
            </div>
        </div>
    );
}

export default CurrentTrack;