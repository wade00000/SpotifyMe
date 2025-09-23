
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

let accessToken = localStorage.getItem("access_token");

// if (accessToken) {
//     await loadUserData(accessToken);
// } else {
//     // 2. Otherwise, check if Spotify gave us a codeIllegal redirect_uri
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");

//     if (!code) {
//         redirectToAuthCodeFlow(clientId);
//     } else {
//         accessToken = await getAccessToken(clientId, code);
//         localStorage.setItem("access_token", accessToken);

//         // Clear URL params (so refresh doesn’t retry the code)
//         window.history.replaceState({}, document.title, "/");

//         await loadUserData(accessToken);
//     }
// }

async function loadUserData(token) {
    const profile = await fetchProfile(token);

    if (profile.error) {
        console.error("Access token invalid/expired, redirecting to login...");
        localStorage.removeItem("access_token");
        redirectToAuthCodeFlow(clientId);
        return;
    }

    populateUI(profile);


    const topTracks = await fetchTopTracks(token);

    if (topTracks.error) {
        console.error("Error fetching top tracks:", topTracks.error);
        return;
    }

    displayTopTracks(topTracks);


    const playlists = await fetchUserPlaylist(token)

    if (playlists.error) {
        console.error("Error fetching playlists:", playlists.error);
        return;
    }

    
    displayPlaylists(playlists)
}


export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", "user-read-private user-read-email user-top-read user-read-currently-playing");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const data = await result.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    return data.access_token;
}

export async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });


    return await result.json();
}

export async function fetchTopTracks(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term", {
        headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();

}


export async function fetchUserPlaylist(token){
    const result = await fetch("https://api.spotify.com/v1/me/playlists",{
        headers: {Authorization: `Bearer ${token}`}
    })

    
    return await result.json();
}


export async function fetchTopArtists(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term", {
        headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();

}

export async function fetchCurrentlyPlaying(token) {
    const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();

}



function populateUI(profile) {
    // document.getElementById("displayName").innerText = profile.display_name;
    // if (profile.images[0]) {
    //     const profileImage = new Image(200, 200);
    //     profileImage.src = profile.images[0].url;
    //     document.getElementById("avatar").appendChild(profileImage);
    //     document.getElementById("imgUrl").innerText = profile.images[0].url;
    // }
    // document.getElementById("id").innerText = profile.id;
    // document.getElementById("email").innerText = profile.email;
    // document.getElementById("uri").innerText = profile.uri;
    // document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    // document.getElementById("url").innerText = profile.href;
    // document.getElementById("url").setAttribute("href", profile.href);
}

// GET https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10




function displayTopTracks(data) {
    const container = document.getElementById("top-tracks");
    data.items.forEach(track => {
        const trackElement = document.createElement("div");
        trackElement.innerHTML = `
            <img src="${track.album.images[0].url}" width="50" />
            <strong>${track.name}</strong> by ${track.artists.map(a => a.name).join(", ")}
        `;
        container.appendChild(trackElement);
    });
}





function displayPlaylists(data){
    const container = document.getElementById("playlists")
    data.items.forEach(playlist =>{
        const playlistElement = document.createElement("div")
        playlistElement.innerHTML = `
            <img src="${playlist.images[0].url}" width="50"/>
            <strong>${playlist.name}</strong>  ${playlist.tracks.total} songs
        `
        container.append(playlistElement)
    })

}

    

