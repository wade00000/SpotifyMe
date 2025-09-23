function Artist({ artist }) {
    return (
        <div className="artist-card">
            <div className="artist-content">
                <img 
                    src={artist.images[0]?.url} 
                    alt={artist.name} 
                    width={80} 
                    height={80}
                    className="artist-image"
                />
                <div className="artist-info">
                    <div className="artist-name">{artist.name}</div>
                    <div className="artist-followers">
                        {artist.followers?.total?.toLocaleString() || 0} followers
                    </div>
                    <div className="artist-genres">
                        {artist.genres?.slice(0, 3).join(", ") || "Various genres"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Artist;