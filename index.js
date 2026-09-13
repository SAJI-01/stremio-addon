const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const express = require('express');
const cors = require('cors');

// Addon manifest
const manifest = {
    id: 'community.multistream',
    version: '1.0.0',
    name: 'MultiStream',
    description: 'Stream from multiple servers: VidSrc, 2Embed, Vidlink, MoviesAPI, and more!',
    logo: 'https://i.imgur.com/9fTqMRk.png',
    background: 'https://i.imgur.com/WmnlsX3.jpeg',
    types: ['movie', 'series'],
    catalogs: [],
    resources: ['stream'],
    idPrefixes: ['tt'],
    behaviorHints: {
        configurable: false,
        adult: false,
    }
};

const builder = new addonBuilder(manifest);

// ─── Streaming server definitions ───────────────────────────────────────────
function getStreams(type, imdbId, season, episode) {
    const isMovie = type === 'movie';
    const streams = [];

    // Helper to build embed URLs
    const movieUrl = (base) => `${base}${imdbId}`;
    const seriesUrl = (base, sep1 = '&season=', sep2 = '&episode=') =>
        `${base}${imdbId}${sep1}${season}${sep2}${episode}`;

    // ── VidSrc.to ──────────────────────────────────────────────────────────
    streams.push({
        name: '🟢 VidSrc',
        title: 'VidSrc · HD',
        externalUrl: isMovie
            ? `https://vidsrc.to/embed/movie/${imdbId}`
            : `https://vidsrc.to/embed/tv/${imdbId}/${season}/${episode}`,
    });

    // ── VidSrc.me ──────────────────────────────────────────────────────────
    streams.push({
        name: '🟢 VidSrc.me',
        title: 'VidSrc.me · HD',
        externalUrl: isMovie
            ? `https://vidsrc.me/embed/movie?imdb=${imdbId}`
            : `https://vidsrc.me/embed/tv?imdb=${imdbId}&season=${season}&episode=${episode}`,
    });

    // ── 2Embed ─────────────────────────────────────────────────────────────
    streams.push({
        name: '🟡 2Embed',
        title: '2Embed · HD',
        externalUrl: isMovie
            ? `https://www.2embed.cc/embed/${imdbId}`
            : `https://www.2embed.cc/embedtv/${imdbId}&s=${season}&e=${episode}`,
    });

    // ── MoviesAPI ──────────────────────────────────────────────────────────
    streams.push({
        name: '🟠 MoviesAPI',
        title: 'MoviesAPI · HD',
        externalUrl: isMovie
            ? `https://moviesapi.club/movie/${imdbId}`
            : `https://moviesapi.club/tv/${imdbId}-${season}-${episode}`,
    });

    // ── Vidlink ────────────────────────────────────────────────────────────
    streams.push({
        name: '🔵 Vidlink',
        title: 'Vidlink · HD',
        externalUrl: isMovie
            ? `https://vidlink.pro/movie/${imdbId}`
            : `https://vidlink.pro/tv/${imdbId}/${season}/${episode}`,
    });

    // ── VidSrc embed (alternate) ───────────────────────────────────────────
    streams.push({
        name: '🟣 VidSrc Embed',
        title: 'VidSrc Embed · HD',
        externalUrl: isMovie
            ? `https://vidsrc.xyz/embed/movie?imdb=${imdbId}`
            : `https://vidsrc.xyz/embed/tv?imdb=${imdbId}&season=${season}&episode=${episode}`,
    });

    // ── FlaxMovies ─────────────────────────────────────────────────────────
    streams.push({
        name: '🟤 FlaxMovies',
        title: 'FlaxMovies · HD',
        externalUrl: isMovie
            ? `https://embed.smashystream.com/playere.php?imdb=${imdbId}`
            : `https://embed.smashystream.com/playere.php?imdb=${imdbId}&season=${season}&episode=${episode}`,
    });

    // ── Videasy ────────────────────────────────────────────────────────────
    streams.push({
        name: '⚪ Videasy',
        title: 'Videasy · HD',
        externalUrl: isMovie
            ? `https://player.videasy.net/movie/${imdbId}`
            : `https://player.videasy.net/tv/${imdbId}/${season}/${episode}`,
    });

    // ── 111Movies ──────────────────────────────────────────────────────────
    streams.push({
        name: '🔴 111Movies',
        title: '111Movies · HD',
        externalUrl: isMovie
            ? `https://111movies.com/movie/${imdbId}`
            : `https://111movies.com/tv/${imdbId}/${season}/${episode}`,
    });

    // ── NontonGo / SuperEmbed ──────────────────────────────────────────────
    streams.push({
        name: '🟢 SuperEmbed',
        title: 'SuperEmbed · HD',
        externalUrl: isMovie
            ? `https://multiembed.mov/?video_id=${imdbId}&tmdb=1`
            : `https://multiembed.mov/?video_id=${imdbId}&tmdb=1&s=${season}&e=${episode}`,
    });

    return streams;
}

// ─── Stream handler ──────────────────────────────────────────────────────────
builder.defineStreamHandler(({ type, id }) => {
    try {
        const parts = id.split(':');
        const imdbId = parts[0];
        const season = parts[1] || null;
        const episode = parts[2] || null;

        const streams = getStreams(type, imdbId, season, episode);
        return Promise.resolve({ streams });
    } catch (e) {
        console.error('Stream handler error:', e);
        return Promise.resolve({ streams: [] });
    }
});

// ─── Start server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 7000;

serveHTTP(builder.getInterface(), { port: PORT });

console.log(`
╔══════════════════════════════════════════════╗
║        🎬  MultiStream Addon Running         ║
╠══════════════════════════════════════════════╣
║  Local:   http://localhost:${PORT}/manifest.json  ║
║                                              ║
║  Servers: VidSrc, VidSrc.me, 2Embed,        ║
║           MoviesAPI, Vidlink, FlaxMovies,    ║
║           Videasy, 111Movies, SuperEmbed     ║
╚══════════════════════════════════════════════╝

To install in Stremio:
  stremio://localhost:${PORT}/manifest.json
`);
