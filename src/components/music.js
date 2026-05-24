/**
 * @license MIT
 * Copyright © 2024 – 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

import { cursor, sortOpacity, sortSpeed } from "../common.js";

const _playlists = [];

/**
 * Registers a playlist entry. Call this for each playlist you want rendered.
 * @param {string} url   - Spotify playlist URL
 * @param {string} cover - Cover image URL
 * @param {string} name  - Display name (supports emoji)
 */
function Playlist(name, url, cover) {
    _playlists.push({ name, url, cover });
}

function renderPlaylists() {
    // Inject playlist grid into <section class="main-body">
    const section = document.querySelector("section.main-body");

    if (section) {
        for (let i = 0; i < _playlists.length; i += 4) {
            const row = document.createElement("div");
            row.className = "playlist-row";

            const chunk = _playlists.slice(i, i + 4);

            chunk.forEach(({ name, url, cover }) => {
                row.innerHTML += `
                <div class="playlist">
                    <a title="${name}" href="${url}" target="_blank">
                        <div style="--img: url(${cover});">
                            <div class="playlist-cover"><div class="playlist-cover-button"><i alt="Play button" class="fas fa-play" aria-hidden="true"></i></div></div>
                            <div class="playlist-details">${name}</div>
                        </div>
                    </a>
                </div>`;
            });

            // Pad the last row to always have exactly 4 children
            const remainder = 4 - chunk.length;
            for (let p = 0; p < remainder; p++) {
                row.innerHTML += `\n<div class="playlist" style="visibility:hidden"></div>`;
            }

            section.appendChild(row);
        }
    } else console.warn("renderPlaylists: <section class=\"main-body\"> not found in the DOM.");

    const sortable = document.getElementById("sortable-spotify-playlists");

    if (sortable) {
        // Create sidebar links for each playlist
        _playlists.forEach(({ url, name }) => {
            const div = document.createElement("div");
            div.className = "text";
            div.innerHTML = `
                <a class="custom-playlist" title="Listen to ${name}" href="${url}" target="_blank">
                    <img src="assets/img/icons/list-music.svg" loading="lazy" fetchpriority="low" draggable="false" aria-hidden="true" alt="Playlist icon">
                    <span class="playlist-label">&nbsp;&nbsp;${name}</span>
                </a>`;

            sortable.appendChild(div);
        });
    } else console.warn("renderPlaylists: #sortable-spotify-playlists not found in the DOM.");
}

export function initMusic() {
    Playlist(
        "🌸💖🎀💋🍬",
        "https://open.spotify.com/playlist/4Bplsz8ZjY2f9Bsr7N19GZ",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72ccb19624c681ee4f700002a3e",
    );

    Playlist(
        "#real",
        "https://open.spotify.com/playlist/2JqxsMQ4jLZOitGR73vkkX",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cd416c07abd8af8f4a9704aef"
    );

    Playlist(
        "drifting_thru_cyberspace",
        "https://open.spotify.com/playlist/7B72YSR80UW0OQpPNFdblx",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c8cf26dc1087b7b93bacddf93"
    );

    Playlist(
        "Goated Songs",
        "https://open.spotify.com/playlist/1Uv3dhx9Zsi5VsCmO5vMHC",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c486f365196ffe1e6bd31c3e2"
    );

    Playlist(
        "Paper Scissor",
        "https://open.spotify.com/playlist/4CgHVdKUlyET2ko2g2Iciq",
        "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000d72cf3f360a81a74eb162c355c08"
    );

    Playlist(
        "키란",
        "https://open.spotify.com/playlist/1jUfAepupNN6OpaP2sUY1x",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c2bcfcf86be85057f83010a77"
    );

    Playlist(
        "sleepless nights.",
        "https://open.spotify.com/playlist/1PzJuAygthYYXwp1UAXGBV",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cc4438163e299a9b0a8d037c7"
    );

    Playlist(
        "mëërschwëinën",
        "https://open.spotify.com/playlist/7lLxAuW3hliyWTIB7UGTUt",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c8f159e4423e44baeacb457b2"
    );

    Playlist(
        "&lt;playlist src=&quot;soundcloud&quot;/&gt;",
        "https://open.spotify.com/playlist/0M2KnXOtqVdm5UdvNsuPiP",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c64e916a317ba99503da74d02"
    );

    Playlist(
        "🌻",
        "https://open.spotify.com/playlist/1mO51tTtjQbR2Rhn2t2aaM",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cba28f47d1bf5769f9ae36c68"
    );
    
    Playlist(
        "3.5g",
        "https://open.spotify.com/playlist/3HLVn6NwmhS78KYsINYRfk",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cbdcfd219b651eace0b7fa7ee"
    );

    Playlist(
        "Pierrah + Kiran 🍒✨",
        "https://open.spotify.com/playlist/0XP5xDufBrxuWUdluBkAnc",
        "https://mosaic.scdn.co/300/ab67616d00001e0282a045169e877a9187e95086ab67616d00001e029f705d9deac7e2c901045804ab67616d00001e02b334a71bedd011f1da6fc799ab67616d00001e02ed3e641e274840b817860773"
    );

    Playlist(
        "bread‼️🍞🥖",
        "https://open.spotify.com/playlist/3sIFmpfBC7PnoF5Rfe154w",
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c9361af9c3a7c03449f48a720"
    );

    renderPlaylists();

    // Make playlists in music sidebar sortable
    $(".custom-playlists-sortable").sortable({
        axis: "y",
        containment: "parent",
        cursor: cursor,
        opacity: sortOpacity,
        scroll: true,
        scrollSpeed: sortSpeed
    });
}