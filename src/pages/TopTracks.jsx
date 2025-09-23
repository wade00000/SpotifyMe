import Track from "../components/Track"
import { useOutletContext } from "react-router"

function TopTracks(){
    const {userTracks} = useOutletContext()
    
 return(
    <div>
        <h1>My Top Tracks</h1>
        <div id="top-tracks">
            {userTracks.items ? (
                userTracks.items.map((track) => (
                <Track key={track.id} track={track} />
                ))
            ) : (
                <p>Loading tracks...</p>
            )}
        </div>
    </div>
 )
}

export default TopTracks