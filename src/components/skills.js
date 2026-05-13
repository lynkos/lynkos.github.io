/**
 * @license MIT
 * Copyright © 2024 – 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */
import { Skill } from "./skill.js";

export function initSkills() {
    // Dynamically insert skills into a container
    const skills = [
    {
        name: "OpenSSL",
        value: 3.5,
        icon: '<img aria-hidden="true" loading="lazy" fetchpriority="low" alt="OpenSSL logo" src="https://cdn.simpleicons.org/openssl">',
        color: "#721412",
        description: "Used for some of my <em>personal projects</em>."
    },
    // ...add more skills here
    ];

    const container = document.getElementById("skills-container");
    skills.forEach(skill => {
    const { html, css } = Skill(skill.name, skill.value, skill.icon, skill.color, skill.description);
    container.insertAdjacentHTML("beforeend", html);

    // Optionally, inject the CSS into a <style> tag
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    });
}