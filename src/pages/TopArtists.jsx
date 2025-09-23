import { useOutletContext } from "react-router"
import Artist from "../components/Artist"

function TopArtists(){
    const {userArtists} = useOutletContext()
   
    return(
        <div>
            <h1>My Top Artists</h1>
            <div id="top-artists">
                <ol>
                {userArtists.items ? (
                    userArtists.items.map((artist) => (
                    <li key={artist.id}><Artist  artist={artist} /></li>
                    ))
                ) : (
                    <p>Loading artists...</p>
                )}
                </ol>
            </div>
        </div>
    )
}

export default TopArtists