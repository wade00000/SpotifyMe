# SpotifyMe

A small project for exploring your Spotify listening data using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).
Think of it as your own DIY version of Spotify Wrapped — whenever you want it.

---

## Features

* Fetch your top tracks, artists, and genres
* Explore recently played songs
* Visualize listening habits over time
* Export data for your own analysis

---

## Getting Started

### Prerequisites

* A Spotify account
* [Spotify Developer App](https://developer.spotify.com/dashboard/applications) (to get a Client ID & Secret)
* Node.js (depending on your stack)

### Installation

```bash
git clone https://github.com/yourusername/spotifyme.git
cd spotifyme
# install dependencies (adjust for npm/pip/etc.)
```

### Environment Variables

Create a `.env` file with the following:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:8888/callback
```

---

## Usage

Run the project locally:

```bash
npm start
```

Then log in with your Spotify account to authorize access.
You’ll be able to start pulling your personal music data right away.

---

## License

MIT License — do whatever, just don’t sue me.

---

## Disclaimer

This project is not affiliated with Spotify. It’s just a fan-made tool using their public API.
# SpotifyMe
