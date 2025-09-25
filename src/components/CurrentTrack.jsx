import { useOutletContext } from "react-router";
import { useState, useEffect, useRef } from "react";

function CurrentTrack() {
    const { currPlaying } = useOutletContext()
    const [currentProgress, setCurrentProgress] = useState(0);
    const previousTrackId = useRef(null);
    
    // Detect track changes and reset progress
    useEffect(() => {
        const currentTrackId = currPlaying?.item?.id;
        
        if (currentTrackId && currentTrackId !== previousTrackId.current) {
            // Track changed! Reset progress
            console.log('🎵 Track changed!');
            setCurrentProgress(currPlaying?.progress_ms || 0);
            previousTrackId.current = currentTrackId;
        } else if (currPlaying?.progress_ms !== undefined) {
            // Same track, just update progress
            setCurrentProgress(currPlaying.progress_ms);
        }
    }, [currPlaying?.item?.id, currPlaying?.progress_ms]);
    
    // Update progress every second when playing
    useEffect(() => {
        if (!currPlaying?.item || !currPlaying.is_playing) {
            return;
        }

        // Update progress every second
        const interval = setInterval(() => {
            setCurrentProgress(prev => {
                const newProgress = prev + 1000; // Add 1 second
                
                // If we've reached the end, the track probably switched
                if (newProgress >= currPlaying.item.duration_ms) {
                    console.log('🎵 Track probably ended, waiting for new data...');
                    return currPlaying.item.duration_ms; // Cap at 100%
                }
                
                return newProgress;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currPlaying?.item?.id, currPlaying?.is_playing]);
    
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

    // Calculate progress percentage using live progress
    const progressPercent = Math.min((currentProgress / currPlaying.item.duration_ms) * 100, 100);
    
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
                    <span>{formatTime(currentProgress)}</span>
                    <span>{formatTime(currPlaying.item.duration_ms)}</span>
                </div>
            </div>
        </div>
    );
}

export default CurrentTrack;