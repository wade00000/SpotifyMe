function Track({track}){
    return(
        <div>
            <img src={track.album.images[0].url} alt={track.name} width={60} height={60}></img>
            <strong>{track.name}</strong> by {track.artists.map(artist => artist.name).join(",")}
        </div>
    )
}

export default Track