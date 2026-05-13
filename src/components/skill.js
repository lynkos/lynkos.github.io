/**
 * Creates and injects a skill entry into the skills container.
 *
 * @param {string} name        - Display name (also used to derive the element ID)
 * @param {number} value       - Proficiency from 0–10 in 0.5 increments
 * @param {string} icon        - Raw HTML string: inline SVG, <img>, or <i> (FontAwesome/SimpleIcons)
 * @param {string} color       - CSS color string applied to the entry's ID selector
 * @param {string} description - Inner HTML for the description paragraph
 */
export function Skill(name, value, icon, color, description) {

  // --- Derive a safe, lowercase ID from the name ---
  // e.g. "OpenSSL" → "openssl", "Node.js" → "nodejs"
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "");


  // --- Build the 10-star row ---
  // Stars are filled (fas fa-star), half (fas fa-star-half-stroke),
  // or empty (far fa-star) based on the numeric value.
  const fullCount  = Math.floor(value);
  const hasHalf    = (value % 1) === 0.5;
  const emptyCount = 10 - fullCount - (hasHalf ? 1 : 0);

  const filled = `<i aria-hidden="true" alt="Filled star icon"     class="fas fa-star"></i>`;
  const half   = `<i aria-hidden="true" alt="Half-filled star icon" class="fas fa-star-half-stroke"></i>`;
  const empty  = `<i aria-hidden="true" alt="Empty star icon"       class="far fa-star"></i>`;

  const starsHTML = [
    ...Array(fullCount).fill(filled),
    ...(hasHalf ? [half] : []),
    ...Array(emptyCount).fill(empty),
  ].join("\n      "); // indented to match surrounding markup


  // --- Assemble the full HTML block ---
  const html = `
<div class="skill-entry">
  <div role="button" aria-pressed="false" tabindex="0" aria-expanded="false"
       id="${id}" class="row" onclick="toggleContent('#${id}')">
    <div class="beginning">
      ${icon}
      <h3 class="heading">${name}</h3>
    </div>
    <div class="stars">
      ${starsHTML}
    </div>
    <div id="${id}-trigger" class="arrow">
      <i aria-hidden="true" alt="Arrow icon" class="fas fa-chevron-right rotate0"></i>
    </div>
  </div>
  <div id="${id}-content" class="hidden-content item-content">
    <p>${description}</p>
  </div>
</div>`.trim();


  // --- Inject the color rule into a shared <style> block ---
  // We reuse one <style id="skill-colors"> element so we don't
  // litter the <head> with a new tag on every call.
  let styleEl = document.getElementById("skill-colors");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "skill-colors";
    document.head.appendChild(styleEl);
  }
  styleEl.textContent += `\n#${id} { color: ${color}; }`;


  // --- Mount the HTML into the page ---
  // Targets a container with id="skills-list"; adjust the selector as needed.
  const container = document.getElementById("skills-container");
  if (!container) {
    console.warn(`Skill("${name}"): no #skills-container container found in the DOM.`);
    return;
  }
  container.insertAdjacentHTML("beforeend", html);
}