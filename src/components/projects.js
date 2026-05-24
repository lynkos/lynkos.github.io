/**
 * @license MIT
 * Copyright © 2024 – 2026 Kiran Brahmatewari. All rights reserved.
 * 
 * This work is licensed under the terms of the MIT license.
 * Refer to https://opensource.org/licenses/MIT for a copy.
 */

const MONTHS = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

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
  const day     = d.getDate(); // 1, not 01
  const year    = d.getFullYear();
  const hours   = String(d.getHours()).padStart(2, '0');
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
  const month = d.getMonth() + 1; // 1, not 01
  const day   = d.getDate();
  const year  = String(d.getFullYear()).slice(-2); // "2024" → "24"
  return `${month}/${day}/${year}`;
}

/**
 * Get alt text from a FontAwesome class string
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
 * plain text, or fall back to the note name if description is absent.
 */
function getPreview(note) {
  if (note.description) {
    const text = stripHTML(note.description);

    if (text) {
      // Preview is first 50 chars
      return text.substring(0, 50);
    }
  }

  return "";
}

/**
 * Build the full <div class="project"> card that goes into #notes-container
 */
function generateProjectHTML(note) {
  const dateStr    = formatDateLong(note.date);

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
    `  <h1 class="project-title">${note.name}</h1>\n` +
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
 * Wrap a group of notes in a <ul class="child-nav">
 */
function generateNavList(notes) {
  const items = notes.map(generateNavItem).join('\n\n');
  return `<ul class="child-nav">\n${items}\n</ul>`;
}

/**
 * Takes an array of Note objects, assigns sequential IDs in input
 * order, then populates:
 *   • #notes-container — one .project card per note (input order)
 *   • #notes-content   — sidebar nav grouped by Pinned / Year (newest first)
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
  pinned.sort((a, b) => parseNoteDate(b.date) - parseNoteDate(a.date));

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

export function initProjects() {
    generateNotes([
        // PINNED PROJECTS
        Note(
            "How to Run Windows Games and Programs on Mac",
            "03/19/2025 20:59",
            [
                Link("Blog Post",     "https://blog.lynkos.dev/posts/play-windows-games",        "fas fa-link",   "Link to blog post"),
                Link("Source Code", "https://github.com/lynkos/configs/blob/main/Scripts/gaming_funcs.sh", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>Technical guide about running Windows programs + playing Windows games on macOS with Wine + Game Porting Toolkit (GPTk), DXMT, DXVK, MoltenVK, and more.</p><br>
                    <p>For example, the following screenshot shows Palworld, a Windows game, running on MacBook Pro M3 Max using these tools (namely Wine + DXMT).</p><br>
                    <img loading="lazy" fetchpriority="low" src="https://img-proxy.lynkos.dev/?url=https://pbs.twimg.com/media/GzXyRZjXUAAIE59.jpg?format=jpg&name=4096x4096" alt="Screenshot of Palworld running on Mac"><br>
                    <p>NOTE: This article/tutorial is still under construction (i.e. a rough draft). Feel free to bookmark this post to come back later, as there may be new information by then!</p>`,
            true
        ),

        Note(
            "Blog",
            "02/03/2025 00:13",
            [
                Link("Website",     "https://blog.lynkos.dev",        "fas fa-link",   "Link to my blog"),
                Link("Source Code", "https://github.com/lynkos/blog", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>My personal blog</p><br>
                    <p>This is a fork of <a href="https://github.com/cotes2020/jekyll-theme-chirpy" title="Link to jekyll-theme-chirpy GitHub repository"><code>jekyll-theme-chirpy</code></a> that has been <strong>heavily modified</strong> to include:</p>
                    <ul>
                      <li><a href="https://github.com/lynkos/blog/blob/main/_plugins/graph-generator.rb" target="_blank" title="Link to graph view plugin">Graph view plugin</a></li>
                      <li><a href="https://github.com/lynkos/blog/blob/main/_plugins/tabs.rb" target="_blank" title="Link to tabbed container plugin">Tabbed container plugin</a></li>
                      <li><a href="https://github.com/lynkos/blog/blob/main/_plugins/gallery.rb" target="_blank" title="Link to gallery slideshow plugin">Gallery slideshow plugin</a></li>
                      <li><a href="https://github.com/lynkos/blog/blob/main/_javascript/modules/components/link-preview.js" target="_blank" title="Link to link preview script">Link preview</a></li>
                      <li><a href="https://blog.lynkos.dev/posts/blogging-setup#setup-image-proxy" target="_blank" title="Link to custom image proxy instructions">Image proxy</a> (e.g. for Twitter/X links)</li>
                      <li><a href="https://github.com/lynkos/blog/blob/main/_plugins/fix-anchor-links.rb" target="_blank" title="Link to Jekyll plugin">Jekyll plugin to fix malformed Markdown links</a></li>
                      <li>Auto-generates <code>CNAME</code> and <code>.nojekyll</code> files during <a href="https://github.com/lynkos/blog/blob/main/.github/workflows/pages-deploy.yml" target="_blank" title="Link to deployment workflow">build and deployment</a></li>
                      <li>Custom "Important" prompt</li>
                      <li>Custom <code>details</code> styling</li>
                      <li>And more</li>
                    </ul>`,
            true
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
        ),

        Note(
            "Q-SECURE: Quantum-Secure Protocol",
            "11/03/2023 15:27",
            [
                Link("Source Code", "https://github.com/lericemautech/Q-SECURE", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>Implementation of multi-party computation (MPC), a quantum-resistant cryptographic algorithm, with custom client-server software to securely compute the product of <code>N</code> massive matrices</p><br>
                    <img loading="lazy" fetchpriority="low" src="/assets/img/misc/mpc.webp" alt="System design of MPC"><br>
                    <ol>
                      <li>Split each of <code>N</code> massive matrices into submatrices</li>
                      <li>Homomorphically encrypt the submatrices and disperse evenly among <code>M</code> Internet of Things (IoT) devices</li>
                      <li><code>M</code> IoT devices calculate the product of <code>N</code> homomorphically encrypted submatrices and send the result back upon completion</li>
                      <li>Received submatrices (i.e. results) are decrypted and concatenated into a single matrix, which is the final result</li>
                    </ol>`,
            true
        ),

        Note(
            "lynkos.github.io",
            "09/21/2022 16:46",
            [
                Link("Website",     "https://lynkos.dev",        "fas fa-link",   "Link to website"),
                Link("Source Code", "https://github.com/lynkos/lynkos.github.io", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>macOS Sequoia-inspired personal website</p><br>
                    <img loading="lazy" fetchpriority="low" src="/assets/img/misc/demo.webp" alt="Screenshot of home page"><br>
                    <img loading="lazy" fetchpriority="low" src="/assets/img/misc/404.webp" alt="Screenshot of 404 Page"><br>
                    <p>Includes (but not limited to) the following features:</p>
                    <ul>
                      <li>Mail</li>
                      <li>iTerm</li>
                      <li>Safari</li>
                      <li>Notes</li>
                      <li>TextEdit</li>
                      <li>Launchpad</li>
                      <li>Calculator</li>
                      <li>Menubar</li>
                      <li>Dock</li>
                      <li>Desktop</li>
                      <li>Music Player</li>
                      <li>Trash</li>
                    </ul>`,
            true
        ),

        // UNPINNED PROJECTS
        Note(
            "Web Scraper",
            "01/11/2024 19:11",
            [
                Link("Source Code", "https://github.com/lynkos/downloader", "fab fa-github", "Link to source code on GitHub")
            ],
            `<ul>
                      <li>Simple web scraper to download media from websites</li>
                      <li>Supports <code>.pdf</code> generation and vertical image stacking</li>
                      <li>Useful for downloading manga, comics, etc.</li>
                    </ul>`
        ),

        Note(
            "Slopify",
            "12/29/2024 17:27",
            [
                Link("Website",     "https://slopify.dev",        "fas fa-link",   "Link to website"),
                Link("Source Code", "https://github.com/DishpitDev/Slopify", "fab fa-github", "Link to source code on GitHub")
            ],
            `<ul>
                      <li>The ideomotor effect of software</li>
                      <li>Open-source software project</li>
                    </ul>`
        ),

        Note(
            "Intelligent Building Information Modeling (BIM) Virtual Assistant",
            "10/08/2020 15:26",
            [
                Link("Source Code", "https://github.com/hllywluis/bim-assistant", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>Developed front-end of web app for BIM models that allows users to:</p>
                    <ul>
                      <li>Search models for specific elements/properties</li>
                      <li>View and inspect models in 2D and 3D</li>
                      <li>Query models via virtual assistant (Siri or Alexa)</li>
                    </ul>`
        ),

        Note(
            "DNS Lookup",
            "07/02/2024 19:53",
            [
                Link("Source Code", "https://github.com/lynkos/dns-lookup", "fab fa-github", "Link to source code on GitHub")
            ],
            `<ul>
                      <li>The goal of this project is to practice UDP socket programing and understand binary packet structures by developing a simplified DNS lookup client</li>
                      <li>You must create your own socket</li>
                      <li>You cannot use any existing DNS library</li>
                    </ul>`
        ),

        Note(
            "Web Status Monitor",
            "06/03/2024 18:49",
            [
                Link("Source Code", "https://github.com/lynkos/web-status-monitor", "fab fa-github", "Link to source code on GitHub")
            ],
            `<ul>
                      <li>This project develops a web status monitor (simplified version of uptimerobot.com) to practice web programming and understand the web related protocols: HTTP and TLS/SSL</li>
                      <li>Implements HTTP client socket to interact with the web server</li>
                      <li>Doesn't use any existing HTTP client library</li>
                      <li>Uses an existing SSL library to help implement the HTTPS client (extra credit)</li>
                    </ul>`
        ),

        Note(
            "Simple MPI",
            "05/16/2022 18:53",
            [
                Link("Source Code", "https://github.com/lynkos/simple-mpi", "fab fa-github", "Link to source code on GitHub")
            ],
            `<ul>
                      <li>This program counts the number of prime numbers between 1 to <code>MAX_CONST</code> inclusive using MPI (parallel programming)</li>
                      <li>Each process tests its share of the cases and keeps a running total</li>
                      <li>Before it finishes, the process prints out its ID number and count of primes that it found</li>
                      <li>Master process ends after printing the total number of primes between 1 and <code>MAX_CONST</code> inclusive and the total amount of time taken to find all the primes</li>
                    </ul>`
        ),

        Note(
            "BST",
            "04/29/2022 11:32",
            [
                Link("Source Code", "https://github.com/lynkos/BST", "fab fa-github", "Link to source code on GitHub")
            ],
            `<ul>
                      <li>Sorts all words in an input file (or from standard input) and prints the sorted words to an output file (or standard output)</li>
                      <li>Command line arguments: <code>bstsort [-c] [-o output_file_name] [input_file_name]</code></li>
                      <li>If <code>-c</code> is present, the program needs to compare the strings in upper case; otherwise, the case stays as read in</li>
                      <li>If <code>output_file_name</code> is given with the <code>-o</code> option, the program will output the sorted words to the given output file; otherwise, the output shall be the standard output</li>
                      <li>Similarly, if the <code>input_file_name</code> is given, the program will read from the input file; otherwise, the input will be from the standard input</li>
                    </ul>`
        ),

        Note(
            "Simple Shell",
            "05/16/2022 18:41",
            [
                Link("Source Code", "https://github.com/lynkos/simple-shell", "fab fa-github", "Link to source code on GitHub")
            ],
            `<ul>
                      <li>This program is an extension of <code>myshell.c</code> with pipelines + I/O redirection functionality</li>
                      <li><code>&gt;</code> Redirect standard output from a command to a file; if the file already exists, it will be erased and overwritten without warning</li>
                      <li><code>&gt;&gt;</code> Append standard output from a command to a file if the file exists, else create a new one</li>
                      <li><code>&lt;</code> Redirect standard input from a file to a command</li>
                      <li><code>|</code> Pass the standard output of one command to another for further processing</li>
                    </ul>`
        ),

        Note(
            "Endians",
            "12/07/2014 23:02",
            [
                Link("Source Code", "https://github.com/lynkos/Endians", "fab fa-github", "Link to source code on GitHub")
            ],
            "<p>Program I wrote in high school that converts a given integer to little-endian and/or big-endian</p>"
        ),

        Note(
            "Capture the Flag",
            "11/09/2014 23:02",
            [
                Link("Website",     "https://lynkos420.blogspot.com",        "fas fa-link",   "Link to website"),
            ],
            "<p>Some of my solutions to certain CTF puzzles/problems</p>"
        ),

        Note(
            "Conda Shortcuts",
            "04/30/2024 23:35",
            [
                Link("Source Code", "https://gist.github.com/lynkos/7a4ce7f9e38bb56174360648461a3dc8", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>Shell script to automate the following:</p>
                    <ul>
                      <li>Create Conda environment(s)</li>
                      <li>Remove Conda environment(s)</li>
                      <li>Rename Conda environment</li>
                      <li>Copy Conda environment</li>
                      <li>Export Conda environment</li>
                      <li>List Conda environment</li>
                      <li>Activate Conda environment</li>
                      <li>Deactivate Conda environment</li>
                    </ul>`
        ),

        Note(
            "TranslateMe",
            "03/29/2025 21:24",
            [
                Link("Demo",     "https://www.loom.com/share/8201c699706640cdb368abc693a09d38",        "fas fa-video",   "Link to demo video"),
                Link("Source Code", "https://github.com/lynkos/translate-me", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>iOS app that translates between languages and allows users to store and delete their translations</p>
                    <br>
                    <a target="_blank" href="https://www.loom.com/share/8201c699706640cdb368abc693a09d38" title="Link to demo video">
                      <img fetchpriority="low" loading="lazy" src="https://cdn.loom.com/sessions/thumbnails/8201c699706640cdb368abc693a09d38-7c685253a31533a9-full-play.gif" alt="Demo video of TranslateMe app">
                    </a>
                    <br>
                    <ul>
                      <li>Users open the app to a TranslationMe home page with a place to enter a word, phrase or sentence, a button to translate, and another field that is initially empty</li>
                      <li>When users tap translate, the word written in the upper field translates in the lower field</li>
                      <li>Translation history is stored (in a scroll view in a new screen)</li>
                      <li>Translation history can be erased</li>
                      <li>Variety of choices for the languages</li>
                      <li>Button to conveniently swap languages</li>
                    </ul>`
        ),

        Note(
            "Trivia",
            "03/28/2025 13:39",
            [
                Link("Demo",     "https://www.loom.com/share/9189a8ffa13c4d1baafc378df6cd5487",        "fas fa-video",   "Link to demo video"),
                Link("Source Code", "https://github.com/lynkos/trivia", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>iOS app that challenges users with trivia questions spanning a variety of categories, formats, and difficulties</p>
                    <br>
                    <a target="_blank" href="https://www.loom.com/share/9189a8ffa13c4d1baafc378df6cd5487" title="Link to demo video">
                      <img fetchpriority="low" loading="lazy" src="https://cdn.loom.com/sessions/thumbnails/9189a8ffa13c4d1baafc378df6cd5487-98814ea9e86bba9f-full-play.gif" alt="Demo video of Trivia app">
                    </a>
                    <br>
                    <ul>
                      <li>App launches to an Options screen where user can modify the types of questions presented when the game starts. Users can choose:
                        <ul>
                          <li>Number of questions</li>
                          <li>Category of questions</li>
                          <li>Difficulty of questions</li>
                          <li>Type of questions (Multiple Choice or True/False)</li>
                        </ul>
                      </li>
                      <li>User can tap a button to start trivia game, which presents questions and answers in a Card view</li>
                      <li>Selected choices are marked as user taps their choice</li>
                      <li>User can submit choices and is presented with a score on trivia game</li>
                      <li>Timer that puts pressure on the user; choices are auto submitted after the timer expires</li>
                    </ul>`
        ),

        Note(
            "Flashcard",
            "03/26/2025 21:11",
            [
                Link("Demo",     "https://www.loom.com/share/bebc2939603e4229b1ad5699ac721580",        "fas fa-video",   "Link to demo video"),
                Link("Source Code", "https://github.com/lynkos/flashcard", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>iOS app that allows users to play a simple memory game</p>
                    <br>
                    <a target="_blank" href="https://www.loom.com/share/bebc2939603e4229b1ad5699ac721580" title="Link to demo video">
                      <img fetchpriority="low" loading="lazy" src="https://cdn.loom.com/sessions/thumbnails/bebc2939603e4229b1ad5699ac721580-f7b1ea5e9fe46315-full-play.gif" alt="Demo video of Flashcard app">
                    </a>
                    <br>
                    <ul>
                      <li>App loads to display a grid of cards initially placed face-down</li>
                      <li>Tap cards to toggle their display between the back and the face
                        <ul>
                          <li>Tapping a facedown card flips it to reveal the front</li>
                          <li>Tapping a second card that is not identical flips both back down</li>
                        </ul>
                      </li>
                      <li>When two matching cards are found, they both disappear from view</li>
                      <li>User can reset and start a new game</li>
                      <li>User can select number of pairs to play with</li>
                    </ul>`
        ),

        Note(
            "Xpense",
            "04/02/2025 21:36",
            [
                Link("Demo",     "https://www.loom.com/share/3a434ec256034ffda2e4d654b14f7f5f",        "fas fa-video",   "Link to demo video"),
                Link("Source Code", "https://github.com/i-miss-python/xpense", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>Simple iOS app that tracks expenses</p>
                    <br>
                    <a target="_blank" href="https://www.loom.com/share/3a434ec256034ffda2e4d654b14f7f5f" title="Link to demo video">
                      <img fetchpriority="low" loading="lazy" src="https://cdn.loom.com/sessions/thumbnails/3a434ec256034ffda2e4d654b14f7f5f-b4d89fd646d5055e-full-play.gif" alt="Demo video of Xpense app">
                    </a>
                    <br>
                    <ul>
                      <li>User can track their expenses</li>
                      <li>User can view home page (with home icon/button at the bottom)</li>
                      <li>User can add expenses/etc. by pressing the Plus (+) icon/button at bottom</li>
                      <li>User can sign up for an account</li>
                      <li>User can log into an account</li>
                      <li>User can choose between light and dark mode</li>
                      <li>User can view generated graphs based on their data</li>
                      <li>User can view and modify profile and/or settings page (also has icon/button at bottom)</li>
                      <li>User can separate expenses by category (e.g. food/drink, traveling, entertainment, bills/taxes, etc.)</li>
                      <li>User can view overview page with [circle] graphs displaying expenses (also has icon/button at bottom)</li>
                      <li>User can track and see how expenses differ from one week/month/etc. to another (e.g. mean expenses on food, gas, etc.)</li>
                    </ul>`
        ),

        Note(
            "High School Code",
            "09/21/2014 20:11",
            [
                Link("Source Code", "https://github.com/lynkos/high-school-code", "fab fa-github", "Link to source code on GitHub")
            ],
            "<p>Archive containing my code for competitive programming problems during high school</p>"
        ),

        Note(
            "Configs",
            "10/12/2024 23:36",
            [
                Link("Source Code", "https://github.com/lynkos/configs", "fab fa-github", "Link to source code on GitHub")
            ],
            "<p>Collection of my config files</p>"
        ),

        Note(
            "Teiko Exam",
            "02/13/2026 13:21",
            [
                Link("Interactive Dashboard",     "https://be97c6b7-cf30-4e8b-958d-837de4ee4a72.plotly.app",        "fas fa-chart-column",   "Link to interactive dashboard"),
                Link("Source Code", "https://github.com/lynkos/teiko-exam", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>My submission for Teiko's technical exam</p><br>
                    <blockquote>
                      <p>File <code>cell-count.csv</code> contains cell count information for various immune cell populations of each patient sample. There are five populations: <code>b_cell</code>, <code>cd8_t_cell</code>, <code>cd4_t_cell</code>, <code>nk_cell</code>, and <code>monocyte</code>.</p><br>
                      <p>Each row in the file corresponds to a biological sample. The file also includes sample metadata such as <code>sample_id</code>, <code>indication</code>, <code>treatment</code>, <code>time_from_treatment_start</code>, <code>response</code>, and <code>gender</code>.</p><br>
                      <p>Bob Loblaw, a drug developer at Loblaw Bio, is running a clinical trial and needs your help to understand how his drug candidate affects immune cell populations. Your job is to:</p>
                      <ul>
                        <li>Design a Python program that meets Bob's analytical needs, as outlined in Parts 1-4 below.</li>
                        <li>Build an interactive dashboard to display the results from Bob's analysis.</li>
                      </ul>
                    </blockquote><br>
                    <p>This is the database schema I used:</p><br>
                    <img loading="lazy" fetchpriority="low" src="https://raw.githubusercontent.com/lynkos/teiko-exam/a1577487fa2bc8780ff953897c6d7d898a5d2fd9/assets/db_schema.svg" alt="Screenshot of database schema">`
        ),

        Note(
            "Old Tumblr Themes",
            "01/26/2013 06:42",
            [
                Link("Source Code", "https://github.com/lynkos/old-tumblr-themes", "fab fa-github", "Link to source code on GitHub")
            ],
            "<p>Collection of all the Tumblr themes I developed while in middle and high school</p>"
        ),

        Note(
            "fix: sidebar email link #2642",
            "04/10/2026 01:26",
            [
                Link("Pull Request", "https://github.com/cotes2020/jekyll-theme-chirpy/pull/2642", "fas fa-code-pull-request", "Link to pull request on GitHub")
            ],
            `<p>Open source contribution to <a target="_blank" href="https://github.com/cotes2020/jekyll-theme-chirpy" title="Link to jekyll-theme-chirpy on GitHub"><code>jekyll-theme-chirpy</code></a>: Bug fix for the email link in the sidebar</p>`
        ),

        Note(
            "Warp Hiring Challenge",
            "04/30/2026 20:41",
            [
                Link("Source Code", "https://github.com/lynkos/warp-hiring-challenge", "fab fa-github", "Link to source code on GitHub")
            ],
            `<p>My code for <a target="_blank" href="https://github.com/warpdotdev/hiring-challenge/blob/main/mission_challenge.md" title="Link to Warp's hiring challenge">Warp's hiring challenge</a></p>`
        ),

        Note(
            "Resume",
            "05/05/2026 13:56",
            [
                Link("Source Code", "https://github.com/lynkos/resume", "fab fa-github", "Link to source code on GitHub")
            ],
            "<p>My resume in LaTeX</p>"
        ),

        Note(
            "ZenKitty",
            "10/17/2024 23:23",
            [
                Link("Website",     "https://lynkos.dev/zenkitty",        "fas fa-link",   "Link to website"),
                Link("Source Code", "https://github.com/lynkos/zenkitty", "fab fa-github", "Link to source code on GitHub")
            ],
            "<p>Human-Computer Interaction project</p>"
        )
    ]);
}