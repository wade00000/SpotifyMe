import { useOutletContext } from "react-router"
import Artist from "../components/Artist"

function TopArtists(){
    const {userArtists} = useOutletContext()
   
    return(
        <div>
            
            
            <div id="top-artists">
                <ol>
                {userArtists.items ? (
                    userArtists.items.map((artist) => (
                    <li key={artist.id}><Artist  artist={artist} /></li>
                    ))
                ) : (
                    <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your artists...</p>
                    </div>
                )}
                </ol>
            </div>
        </div>
    )
}

export default TopArtists