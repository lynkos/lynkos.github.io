/**
 * @license MIT
 * Copyright © 2024 – 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

// ═══════════════════════════════════════════════════════════════════
//  DATA CONSTRUCTORS
// ═══════════════════════════════════════════════════════════════════

/**
 * @param {string} title      - Display label for the link button
 * @param {string} url        - Href target
 * @param {string} [icon]     - FontAwesome class string, e.g. "fas fa-link"
 * @param {string} [alt]      - Title/tooltip text for the anchor
 */
function Link(title, url, icon = null, alt = null) {
  return { title, url, icon, alt };
}

/**
 * @param {string}   name          - Note/project title
 * @param {string}   date          - "MM/DD/YYYY HH:MM"
 * @param {Link[]}   [links]       - Array of Link objects
 * @param {string}   [description] - Raw HTML string
 * @param {boolean}  [pin]         - Pinned to top section (default false)
 */
function Note(name, date, links = [], description = null, pin = false) {
  return { name, date, links, description, pin };
}


// ═══════════════════════════════════════════════════════════════════
//  DATE UTILITIES
// ═══════════════════════════════════════════════════════════════════

const MONTHS = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

/**
 * Parse "MM/DD/YYYY HH:MM" into a native Date for reliable comparison.
 */
function parseNoteDate(dateStr) {
  const [datePart, timePart] = dateStr.split(' ');
  const [month, day, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

/** Extract the 4-digit year string from a note date. */
function getYear(dateStr) {
  return dateStr.split(' ')[0].split('/')[2];
}

/**
 * Long format: "October 17, 2024 at 23:23"
 * - No leading zero on day or hour (matches example output)
 * - Minutes always 2 digits
 */
function formatDateLong(dateStr) {
  const d = parseNoteDate(dateStr);
  const month   = MONTHS[d.getMonth()];
  const day     = d.getDate();                           // 1, not 01
  const year    = d.getFullYear();
  const hours   = d.getHours();                          // 9, not 09
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${month} ${day}, ${year} at ${hours}:${minutes}`;
}

/**
 * Short format: "10/17/24"
 * - No leading zeros on month or day
 * - 2-digit year
 */
function formatDateShort(dateStr) {
  const d     = parseNoteDate(dateStr);
  const month = d.getMonth() + 1;                        // 1, not 01
  const day   = d.getDate();
  const year  = String(d.getFullYear()).slice(-2);        // "2024" → "24"
  return `${month}/${day}/${year}`;
}


// ═══════════════════════════════════════════════════════════════════
//  ICON & CONTENT HELPERS
// ═══════════════════════════════════════════════════════════════════

/**
 * Derive human-readable alt text from a FontAwesome class string.
 * "fas fa-github" → "Github icon"
 * "fas fa-link"   → "Link icon"
 */
function getIconAltText(iconClass) {
  if (!iconClass) return 'Icon';

  const match = iconClass.match(/fa-([a-z0-9-]+)/);
  if (!match) return 'Icon';

  // Capitalize first letter of each hyphenated word
  const name = match[1]
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  return `${name} icon`;
}

/**
 * Strip all HTML tags and collapse whitespace to get plain text.
 * Used to generate the nav preview snippet.
 */
function stripHTML(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Build the note-preview text: first sentence of the description's
 * plain text, or fall back to the note name if description is absent
 * or text-free (e.g. image-only).
 */
function getPreview(note) {
  if (note.description) {
    const text = stripHTML(note.description);

    if (text) {
      // Take everything up to the first sentence-ending punctuation
      const match = text.match(/^[^.!?]+[.!?]?/);

      return match ? match[0].trim() : text.substring(0, 120);
    }
  }

  return note.name;
}

/**
 * Determine which URL and title the project heading should link to.
 * Priority: GitHub link (fa-github) → first available link → no-op "#".
 */
function getTitleLink(note) {
  if (!note.links || note.links.length === 0) {
    return { href: '#', title: '' };
  }

  const github = note.links.find(l => l.icon && l.icon.includes('fa-github'));
  const target = github || note.links[0];

  return { href: target.url, title: target.alt || '' };
}


// ═══════════════════════════════════════════════════════════════════
//  HTML GENERATORS
// ═══════════════════════════════════════════════════════════════════

/**
 * Build the full <div class="project"> card that goes into .main-body.
 */
function generateProjectHTML(note) {
  const dateStr    = formatDateLong(note.date);
  const { href, title } = getTitleLink(note);

  // ── Links row ─────────────────────────────────────────────────
  let linksHTML = '';
  if (note.links && note.links.length > 0) {
    const buttons = note.links.map(link => {
      const iconAlt = getIconAltText(link.icon);
      // Icon element only when an icon class is provided
      const iconEl  = link.icon
        ? `<i alt="${iconAlt}" class="${link.icon}" aria-hidden="true"></i> `
        : '';
      return (
        `      <a role="button" aria-pressed="false" ` +
        `href="${link.url}" target="_blank" title="${link.alt || ''}" ` +
        `class="links-btn">${iconEl}${link.title}</a>`
      );
    }).join('\n');

    linksHTML = `\n    <div class="links">\n${buttons}\n    </div>`;
  }

  // ── Description (raw HTML, preserved as-is) ───────────────────
  const descHTML = note.description
    ? `\n    ${note.description.trim()}`
    : '';

  return (
    `\n<div id="${note.id}" class="project">\n` +
    `  <div class="date">${dateStr}</div>\n` +
    `  <h1 class="project-title">` +
      `<a target="_blank" href="${href}" title="${title}">${note.name}</a>` +
    `</h1>\n` +
    `  <div class="project-body">${linksHTML}${descHTML}\n  </div>\n` +
    `</div>`
  );
}

/**
 * Build a single <li> for the sidebar navigation.
 */
function generateNavItem(note) {
  const dateShort = formatDateShort(note.date);
  const preview   = getPreview(note);
  const id        = note.id;

  return (
    `  <li tabindex="0" class="project-name" data-id="${id}">\n` +
    `    <div class="text" data-id="${id}">\n` +
    `      <p class="name" data-id="${id}">${note.name}</p>\n` +
    `      <div class="bottom" data-id="${id}">\n` +
    `        <span class="day" data-id="${id}">${dateShort}</span>` +
    `&nbsp;&nbsp;` +
    `<span class="note-preview" data-id="${id}">${preview}</span>\n` +
    `      </div>\n` +
    `    </div>\n` +
    `  </li>`
  );
}

/**
 * Wrap a group of notes in a <ul class="child-nav">.
 */
function generateNavList(notes) {
  const items = notes.map(generateNavItem).join('\n\n');
  return `<ul class="child-nav">\n${items}\n</ul>`;
}


// ═══════════════════════════════════════════════════════════════════
//  MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════════════════

/**
 * Takes an array of Note objects, assigns sequential IDs in input
 * order, then populates:
 *   • .main-body  — one .project card per note (input order)
 *   • .content    — sidebar nav grouped by Pinned / Year (newest first)
 *
 * @param {ReturnType<typeof Note>[]} notes
 */
function generateNotes(notes) {
  // ── 1. Assign IDs in input order ──────────────────────────────
  //    IDs are stable and independent of display grouping/sorting.
  const indexed = notes.map((note, i) => ({
    ...note,
    id: `project-${i + 1}`
  }));

  // ── 2. Split pinned vs. non-pinned ────────────────────────────
  const pinned   = indexed.filter(n => n.pin);
  const unpinned = indexed.filter(n => !n.pin);

  // Pinned: sort newest → oldest regardless of year
  //pinned.sort((a, b) => parseNoteDate(b.date) - parseNoteDate(a.date));

  // ── 3. Group non-pinned by year, sort each group ──────────────
  const byYear = {};
  unpinned.forEach(note => {
    const year = getYear(note.date);
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(note);
  });

  // Sort each year bucket newest → oldest
  Object.values(byYear).forEach(group =>
    group.sort((a, b) => parseNoteDate(b.date) - parseNoteDate(a.date))
  );

  // Years themselves descending (2026, 2025, 2024 …)
  const sortedYears = Object.keys(byYear).sort((a, b) => b - a);

  // ── 4. Populate #notes-container (input order, no resorting) ────────
  const mainBody = document.getElementById('notes-container');
  indexed.forEach(note => {
    mainBody.insertAdjacentHTML('beforeend', generateProjectHTML(note));
  });

  // ── 5. Populate #notes-content sidebar ──────────────────────────────
  const content = document.getElementById('notes-content');
  let contentHTML = '';

  // Pinned section (only rendered if at least one note is pinned)
  if (pinned.length > 0) {
    contentHTML +=
      `<div class="year">` +
      `<i class="fas fa-thumbtack" alt="Thumbtack icon" aria-hidden="true"></i>` +
      `&nbsp;&nbsp;Pinned</div>\n\n` +
      generateNavList(pinned) + '\n\n';
  }

  // One section per year, newest year first
  sortedYears.forEach(year => {
    contentHTML +=
      `<div class="year">${year}</div>\n\n` +
      generateNavList(byYear[year]) + '\n\n';
  });

  content.insertAdjacentHTML('beforeend', contentHTML.trimEnd());
}


// ═══════════════════════════════════════════════════════════════════
//  USAGE — replace with your actual notes
// ═══════════════════════════════════════════════════════════════════

export function initProjects() {
    generateNotes([
    Note(
        "ZenKitty",
        "10/17/2024 23:23",
        [
        Link("Website",     "https://lynkos.dev/zenkitty",        "fas fa-link",   "Link to website"),
        Link("Source Code", "https://github.com/lynkos/zenkitty", "fab fa-github", "Link to source code on GitHub")
        ],
        "<p>Human-Computer Interaction project</p>"
    ),

    Note(
        "Using AI and a Low-Cost Camera to Detect Harmful Algae in Natural Water",
        "01/01/2024 09:00",
        [
        Link("Website",        "https://universe.roboflow.com/capstone2algae/algae-detection-1opyx",          "fas fa-link",   "Link to website"),
        Link("Colab Notebook", "https://colab.research.google.com/drive/19X4aGWTeXQbgEKVteR9qrgit67jNxkmJ", "fas fa-code",   "Link to Google Colab notebook"),
        Link("Source Code",    "https://github.com/lynkos/algae-detection",                                  "fab fa-github", "Link to source code on GitHub")
        ],
        `<p>Detect and identify different species of harmful algae within natural water in real-time with AI and a camera (i.e., ESP32-CAM, smartphone, or webcam).</p><br>
        <img loading="lazy" fetchpriority="low" src="https://raw.githubusercontent.com/lynkos/algae-detection/main/assets/misc/demo.gif" alt="Demo video"><br>
        <ul>
        <li>Designed and developed a system that uses custom AI (i.e. computer vision) and a camera to quickly detect and identify species of harmful algae in real-time (livestream/video); i.e. object detection using convolutional neural networks (CNNs)</li>
        <li>Integrated various fine-tuned algae detection models (i.e. custom AI) with (1) ESP32-CAM (low-cost development board with camera, WiFi, and Bluetooth modules) attached to a Nikon microscope's eyepiece via a 3D printed lens attachment, (2) iPhone, and (3) webcam as camera options</li>
        <li>Lead and managed team of 3 senior computer science undergrads</li>
        <li>Wrote in-depth, beginner-friendly Google Colab tutorial that details the entire process of training, validating, inferencing, exporting, and deploying the custom AI model; tutorial also goes over dataset annotation, preprocessing, and augmentation</li>
        </ul><br>
        <img loading="lazy" fetchpriority="low" src="https://raw.githubusercontent.com/lynkos/algae-detection/main/assets/misc/microscope.jpg" alt="Microscope">`,
        true
    ),

    Note(
        "Quantum Search Algorithm",
        "04/05/2023 19:44",
        [
        Link("Blog Post",   "https://blog.lynkos.dev/posts/grover-full",       "fas fa-link",   "Link to accompanying blog post"),
        Link("Source Code", "https://github.com/lynkos/grovers-algorithm",      "fab fa-github", "Link to source code on GitHub")
        ],
        `<img loading="lazy" fetchpriority="low" src="https://raw.githubusercontent.com/lynkos/grovers-algorithm/main/assets/circuits/grover.png" alt="Quantum circuit for Grover's Algorithm"><br>
        <ul>
        <li>Created <code>n</code>-qubit quantum program searching for <code>m</code> target(s) in an unsorted database</li>
        <li>Resulted in quadratic speedup over classical/naïve search algorithms</li>
        </ul>`,
        true
    )
    ]);
}