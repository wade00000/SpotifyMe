import { useEffect,useState} from "react";
import Track from "./Track";
import Playlist from "./Playlist";
import HipsterIndex from "./HipsterIndex";

function Profile({profile,tracks,playlists}){
    

    return(
        <>
        <h1>Your Spotify Profile Data</h1>
        <section id="profile">
            <h2>Logged in as <span id="displayName">{profile.display_name}</span></h2>
            {profile.images?.length > 0 && (
                <img
                    src={profile.images[0].url}
                    alt="Profile avatar"
                    width={250}
                    height={300}
                />
            )}

            <ul>
                <li>User ID: <span id="id">{profile.id}</span></li>
                <li>Email: <span id="email">{profile.email}</span></li>
                <li>Spotify URI: <a id="uri" href={profile.uri}>{profile.uri}</a></li>
                <li>Link: <a id="url" href={profile.href}>{profile.href}</a></li>
            </ul>
            <br/>

            <div>
                <HipsterIndex  tracks={tracks}/>
            </div>

            <br/>
            <h2>My Top Tracks</h2>
            <div id="top-tracks">
              {tracks.items ? (
                    tracks.items.map((track) => (
                    <Track key={track.id} track={track} />
                    ))
                ) : (
                    <p>Loading tracks...</p>
               )}
            </div>

            <br/>
            <h2>My Playlists</h2>
            <div id="playlists">
                {playlists.items ? (
                    playlists.items.map((playlist) => (
                    <Playlist key={playlist.id} playlist={playlist} />
                    ))
                ) : (
                    <p>Loading playlists...</p>
               )}
            </div>
            
            </section>
        </>
    )
}

export default Profile