import HipsterIndex from "../components/HipsterIndex"
import { useOutletContext } from "react-router"

function PopularityRankings() {
    const { userTracks, userArtists } = useOutletContext()

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Popularity Rankings</h1>
                <p>Discover how mainstream or hipster your music taste really is!</p>
            </div>
            
            <HipsterIndex
                tracks={userTracks}
                artists={userArtists}
            />
        </div>
    )
}

export default PopularityRankings