/**
 * @license MIT
 * Copyright © 2024 – 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

import { cursor } from "../common.js";

export function initMusic() {
    // Make playlists in music sidebar sortable
    $(".custom-playlists-sortable").sortable({
        axis: "y",
        containment: "parent",
        cursor: cursor,
        opacity: 0.5,
        scroll: true,
        scrollSpeed: 10
    });
}