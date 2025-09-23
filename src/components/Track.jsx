function Track({ track }) {
    return (
        <div className="track-card">
            <div className="track-content">
                <img 
                    src={track.album.images[0]?.url} 
                    alt={track.name} 
                    width={60} 
                    height={60}
                    className="track-image"
                />
                <div className="track-info">
                    <div className="track-name">{track.name}</div>
                    <div className="track-artists">
                        by {track.artists.map(artist => artist.name).join(", ")}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '5px' }}>
                        {track.album.name}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Track;