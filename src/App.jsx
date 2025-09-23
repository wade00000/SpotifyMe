import { useEffect, useState, useRef } from "react";
import {
    redirectToAuthCodeFlow,
    fetchProfile,
    fetchTopTracks,
    fetchUserPlaylist,
    getAccessToken,
    fetchTopArtists,
    fetchCurrentlyPlaying
} from "./spotifyApi";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
    const [userProfile, setUserProfile] = useState([])
    const [userTracks, setUserTracks] = useState([])
    const [userPlaylists, setUserPlaylists] = useState([])
    const [userArtists, setUserArtists] = useState([])
    const [currPlaying,setCurrPlaying] = useState([])

    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"))

    const hasInitialized = useRef(false);

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    useEffect(() => {
        // Prevent double execution
        if (hasInitialized.current) {
            return;
        }
        hasInitialized.current = true;

        async function init() {
            if (accessToken) {
                await loadUserData(accessToken);
            } else {
                // Otherwise, check if Spotify gave us a code
                const params = new URLSearchParams(window.location.search);
                const code = params.get("code");

                if (!code) {
                    redirectToAuthCodeFlow(clientId);
                } else {
                    const newToken = await getAccessToken(clientId, code);
                    setAccessToken(newToken)
                    localStorage.setItem("access_token", newToken);

                    // Clear URL params (so refresh doesn't retry the code)
                    window.history.replaceState({}, document.title, "/");

                    await loadUserData(newToken);
                }
            }
        }
        init()
    }, [])

    function handleLogout() {
        localStorage.removeItem("access_token")
        setAccessToken("")
        setUserPlaylists([])
        setUserProfile([])
        setUserTracks([])
        redirectToAuthCodeFlow(clientId)
    }

    async function loadUserData(token) {
        const profile = await fetchProfile(token);

        if (profile.error) {
            console.error("Access token invalid/expired, redirecting to login...");
            localStorage.removeItem("access_token");
            redirectToAuthCodeFlow(clientId);
            return;
        }

        setUserProfile(profile);

        const topTracks = await fetchTopTracks(token);

        if (topTracks.error) {
            console.error("Error fetching top tracks:", topTracks.error);
            return;
        }

        setUserTracks(topTracks);

        const playlists = await fetchUserPlaylist(token)

        if (playlists.error) {
            console.error("Error fetching playlists:", playlists.error);
            return;
        }

        setUserPlaylists(playlists)

        const topArtists = await fetchTopArtists(token)

        if (topArtists.error) {
            console.error("Error fetching playlists:", topArtists.error);
            return;
        }

        setUserArtists(topArtists)


        const currTrack = await fetchCurrentlyPlaying(token)

        if (currTrack.error) {
            console.error("Error fetching current track:", currTrack.error);
            return;
        }


        setCurrPlaying(currTrack)

    }
     console.log(currPlaying)
    return (
        <div className="app-container">
            {/* Floating background elements */}
            <div className="floating-elements">
                <div className="floating-circle"></div>
                <div className="floating-circle"></div>
                <div className="floating-circle"></div>
            </div>
            
            <Navbar handleClick={handleLogout} />
            <div className="main-content">
                <Outlet context={{ userProfile, userTracks, userPlaylists, userArtists,currPlaying }} />
            </div>
        </div>
    )
}

export default App