/**
 * @license MIT
 * Copyright © 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
import { initBrowser } from "./components/browser.js";
import { initCalculator } from "./components/calculator.js";
import { initDesktop } from "./components/desktop.js";
import { initLaunchpad } from "./components/launchpad.js";
import { initMenubar } from "./components/menubar.js";
import { initMusic } from "./components/music.js";
import { initNotes } from "./components/notes.js";
import { initPreview } from "./components/preview.js";
import { initTextEdit } from "./components/text-edit.js";
import { initTimestamp } from "./utilities/timestamp.js";
import { initWindows } from "./components/windows.js";
import { initSkills } from "./components/skills.js";

document.addEventListener("DOMContentLoaded", function() {
    initCalculator();
    initDesktop();
    initLaunchpad();
    initMenubar();
    initMusic();
    initNotes();
    initPreview();
    initTextEdit();
    initTimestamp();
    initWindows();

    // Skills should be initialized before browser
    initSkills();
    initBrowser();
});