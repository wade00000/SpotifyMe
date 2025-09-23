import { useOutletContext } from "react-router"
import Profile from "../components/Profile"

function Home(){
    const [userProfile,userTracks,userPlaylists] = useOutletContext()
 return(
    <div>
        <h1>Home</h1>
         <Profile 
            profile={userProfile} 
            tracks={userTracks} 
            playlists={userPlaylists} 
        />
    </div>
 )
}

export default Home