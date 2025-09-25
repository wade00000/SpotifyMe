import Track from "../components/Track"
import { useOutletContext } from "react-router"

function TopTracks(){
    const {userTracks} = useOutletContext()
    
 return(
    <div>
        <div className="page-header">
                <h1>Your Top Tracks</h1>
            </div>
        <div id="top-tracks">
            <ol>
                {userTracks.items ? (
                    userTracks.items.map((track) => (
                    <li key={track.id}><Track track={track} /></li>
                    ))
                ) : (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading your tracks...</p>
                    </div>
                )}
            </ol>
        </div>
    </div>
 )
}

export default TopTracks