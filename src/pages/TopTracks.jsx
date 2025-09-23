import Track from "../components/Track"
import { useOutletContext } from "react-router"

function TopTracks(){
    const {userTracks} = useOutletContext()
    
 return(
    <div>
        <h1>My Top Tracks</h1>
        <div id="top-tracks">
            <ol>
                {userTracks.items ? (
                    userTracks.items.map((track) => (
                    <li key={track.id}><Track track={track} /></li>
                    ))
                ) : (
                    <p>Loading tracks...</p>
                )}
            </ol>
        </div>
    </div>
 )
}

export default TopTracks