import { useEffect, useState } from "react";
import Track from "./Track";
import Playlist from "./Playlist";
import HipsterIndex from "./HipsterIndex";
import "../App.css"
import CurrentTrack from "./CurrentTrack";

function Profile({ profile, tracks, playlists }) {
    // Calculate stats for dashboard
    const totalPlaylists = playlists?.items?.length || 0;
     // Calculate total followers
    const followers = profile?.followers?.total || 0;


    // // Get unique artists from tracks
    // const uniqueArtists = tracks?.items ? 
    //     new Set(tracks.items.flatMap(track => track.artists.map(artist => artist.name))).size : 0;
    
   
    return (
        <>
            {/* Floating background elements */}
            <div className="floating-elements">
                <div className="floating-circle"></div>
                <div className="floating-circle"></div>
                <div className="floating-circle"></div>
            </div>

            <div className="home-container">
                <header className="page-header">
                    <h1>SpotifyMe</h1>
                    <h2>Your Spotify Analytics</h2>
                    <p>Discover your music story through data</p>
                </header>
                <CurrentTrack/>
                {/* Stats Overview */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-number">{totalPlaylists}</div>
                        <div className="stat-label">Playlists</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{followers.toLocaleString()}</div>
                        <div className="stat-label">Followers</div>
                    </div>
                </div>

                <section id="profile">
                    {/* Profile Header */}
                    <div className="profile-header">
                        {profile.images?.length > 0 && (
                            <img
                                src={profile.images[0].url}
                                alt="Profile avatar"
                                width={150}
                                height={150}
                                className="profile-avatar"
                            />
                        )}
                        <div className="profile-info">
                            <h2>Welcome back, <span id="displayName">{profile.display_name}</span></h2>
                            <p>Ready to explore your music journey?</p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <ul className="profile-details">
                        <li>User ID: <span id="id">{profile.id}</span></li>
                        <li>Email: <span id="email">{profile.email}</span></li>
                        <li>Country: <span>{profile.country}</span></li>
                        <li>Account Type:  <span>{profile.product
                                   ? profile.product.charAt(0).toUpperCase() + profile.product.slice(1)
                                   : "Unknown"}</span>
                        </li>
                        
                    </ul>

                

                    {/* Playlists Section */}
                    <h2 className="section-title">Your Playlists</h2>
                    <div id="playlists">
                        {playlists.items ? (
                            playlists.items.slice(0, 12).map((playlist) => (
                                <Playlist key={playlist.id} playlist={playlist} />
                            ))
                        ) : (
                            <div className="loading">Loading playlists...</div>
                        )}
                    </div>

                    {/* Recent Top Tracks Preview */}
                    {tracks?.items && (
                        <>
                            <h2 className="section-title">Your Recent Top Tracks</h2>
                            <div style={{ display: 'grid', gap: '15px' }}>
                                {tracks.items.slice(0, 6).map((track) => (
                                    <Track key={track.id} track={track} />
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </>
    );
}

export default Profile;