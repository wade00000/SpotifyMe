export default function Playlist({playlist}){
    return (
        <div>
        <img src={playlist.images[0].url} alt={playlist.name} width={60} height={60}/>
        <strong>{playlist.name}</strong>  {playlist.tracks.total} songs
        </div>
    )
}