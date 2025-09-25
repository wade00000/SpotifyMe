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
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router";
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [userProfile, setUserProfile] = useState([]);
  const [userTracks, setUserTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userArtists, setUserArtists] = useState([]);
  const [currPlaying, setCurrPlaying] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"))

  const hasInitialized = useRef(false);
  const location = useLocation();
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  

  useEffect(() => {
    // Prevent double execution
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    async function init() {
      //  Don’t auto-login if we’re on landing page ("/")
      if (location.pathname === "/") {
        return;
      }

      if (accessToken) {
        await loadUserData(accessToken);
      } else {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          redirectToAuthCodeFlow(clientId);
        } else {
          const newToken = await getAccessToken(clientId, code);
          setAccessToken(newToken);
          localStorage.setItem("access_token", newToken);

          // Clear URL params (so refresh doesn't retry the code)
          window.history.replaceState({}, document.title, location.pathname);

          await loadUserData(newToken);
        }
      }
    }

    init();
  }, [location.pathname]);

  function handleLogout() {
    localStorage.removeItem("access_token");
    setAccessToken("");
    setUserPlaylists([]);
    setUserProfile([]);
    setUserTracks([]);
    setUserArtists([]);
    setCurrPlaying([]);
    redirectToAuthCodeFlow(clientId);
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
    if (!topTracks.error) setUserTracks(topTracks);

    const playlists = await fetchUserPlaylist(token);
    if (!playlists.error) setUserPlaylists(playlists);

    const topArtists = await fetchTopArtists(token);
    if (!topArtists.error) setUserArtists(topArtists);

    const currTrack = await fetchCurrentlyPlaying(token);
    if (!currTrack.error) setCurrPlaying(currTrack);
  }

  return (
    <div className="app-container">
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      {/* Navbar only shows when NOT on landing page */}
      {location.pathname !== "/" && <Navbar handleClick={handleLogout} />}

      <div className="main-content">
        <Outlet
          context={{
            userProfile,
            userTracks,
            userPlaylists,
            userArtists,
            currPlaying
          }}
        />
        <Analytics />
      </div>
    </div>
  );
}

export default App;
