export default function Playlist({ playlist }) {
    return (
        <div className="playlist-card">
            <div className="playlist-content">
                <img 
                    src={playlist.images[0]?.url} 
                    alt={playlist.name} 
                    width={80} 
                    height={80}
                    className="playlist-image"
                />
                <div className="playlist-info">
                    <div className="playlist-name">{playlist.name}</div>
                    <div className="playlist-tracks">
                        {playlist.tracks.total} songs
                    </div>
                    {playlist.description && (
                        <div style={{ 
                            fontSize: '0.8rem', 
                            opacity: 0.6, 
                            marginTop: '8px',
                            maxWidth: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {playlist.description}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}