/**
 * menu.js
 *
 * Factory helpers and renderer for macOS-style menu bar menus.
 * Each Menu() call appends a button + dropdown pair to <body>.
 *
 * Data constructors
 * -----------------
 *   Divider()                          → sentinel object for <div class="divider">
 *   SearchBar()                        → sentinel object for <input class="searchbar">
 *   MenuItem(label, symbol?, disabled?) → menu item descriptor
 *   Menu(label, items)                 → renders immediately on call
 *
 * Symbol rendering rules
 * ----------------------
 *   - If symbol is a string starting with "<i" it is treated as raw HTML
 *     and inserted directly (no wrapper div).
 *   - Otherwise the symbol text is wrapped in <div class="mini-icon">.
 *   - If symbol is absent/null/undefined the item uses the simple
 *     single-div layout instead of position-title.
 */

// ─── Sentinel tags used to distinguish from MenuItems ───────────────
const DIVIDER_TAG = Symbol("Divider");
const SEARCHBAR_TAG = Symbol("SearchBar");

/**
 * Returns a Divider descriptor.
 * Renders as <div class="divider"></div>.
 */
function Divider() {
  return { _tag: DIVIDER_TAG };
}

/**
 * Returns a SearchBar descriptor.
 * Renders as <input class="searchbar" type="text" placeholder="Search" alt="Search bar">.
 */
function SearchBar() {
  return { _tag: SEARCHBAR_TAG };
}

/**
 * Returns a MenuItem descriptor.
 *
 * @param {string}  label    - Visible text for the item.
 * @param {string}  [symbol] - Optional keyboard shortcut text or raw FA icon HTML.
 * @param {boolean} [disabled=false] - When true, adds .disabled class.
 */
function MenuItem(label, symbol, disabled = false) {
  return { label, symbol: symbol ?? null, disabled };
}

// ─── ID utilities ────────────────────────────────────────────────────────────

/**
 * Derives a stable, lowercase, hyphenated id from a menu label.
 * SVG labels fall back to a positional index.
 *
 * @param {string|SVGElement} label
 * @param {number}            index - Fallback index for non-string labels.
 */
function labelToId(label, index) {
  if (typeof label === "string") {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // collapse non-alphanumeric runs to hyphens
      .replace(/^-|-$/g, "");       // trim leading/trailing hyphens
  }
  return `menu-${index}`;
}

// ─── HTML builders ───────────────────────────────────────────────────────────

/**
 * Builds the <span> button that sits in the menu bar.
 *
 * @param {string} id          - e.g. "finder"
 * @param {string|SVGElement} label
 */
function buildButton(id, label) {
  const btn = document.createElement("span");
  btn.setAttribute("role", "button");
  btn.setAttribute("aria-pressed", "false");
  btn.setAttribute("tabindex", "0");
  btn.setAttribute("aria-haspopup", "true");
  btn.setAttribute("aria-expanded", "false");
  btn.id = id;
  btn.className = (id === "finder") ? "menus active" : "menus";

  if (typeof label === "string") {
    btn.textContent = label;
  } else {
    // SVG or other node passed directly
    btn.appendChild(label);
  }

  return btn;
}

/**
 * Builds a single <div class="…"> element for a MenuItem.
 *
 * Layout variants:
 *   No symbol  → <div class="[disabled]">Label</div>
 *   Text sym.  → <div class="position-title [disabled]">
 *                  <div>Label</div><div class="mini-icon">sym</div>
 *                </div>
 *   FA sym.    → <div class="position-title [disabled]">
 *                  <div>Label</div><i …></i>
 *                </div>
 *   FA sym WITH text.    → <div class="position-title [disabled]">
 *                  <div>Label</div>
 *                  <div class="mini-icon"><i …></i> Text here</div>
 *                </div>
 */
function buildOptionEl(item) {
  const el = document.createElement("div");
  const classes = [];
  if (item.disabled) classes.push("disabled");
  else classes.push("option");

  const isFaIcon = typeof item.symbol === "string" &&
                        item.symbol.trimStart().startsWith("<i") &&
                        item.symbol.trimEnd().endsWith("</i>");

  const faHasText =
    typeof item.symbol === "string" &&
    item.symbol.includes("<i") &&
    item.symbol.includes("</i>"); // icon + text

  const labelIsFaHtml =
    typeof item.label === "string" &&
    item.label.includes("<i") &&
    item.label.includes("</i>");

  if (item.symbol) {
    // Two-column layout
    classes.unshift("position-title");
    el.className = classes.join(" ");
    el.setAttribute("role", "menuitem");

    const labelDiv = document.createElement("div");
    if (labelIsFaHtml) labelDiv.innerHTML = item.label;
    else labelDiv.textContent = item.label;
    el.appendChild(labelDiv);

    if (isFaIcon) {
        // Insert raw FA icon HTML directly — no wrapping div
        el.insertAdjacentHTML("beforeend", item.symbol);
    }
    
    else {
      const symDiv = document.createElement("div");
      symDiv.className = "mini-icon";

      if (faHasText) symDiv.innerHTML = item.symbol;
      else symDiv.textContent = item.symbol;
      
      el.appendChild(symDiv);
    }
  } else {
    // Simple single-column layout
    el.className = classes.join(" ");
    el.setAttribute("role", "menuitem");

    if (labelIsFaHtml) el.innerHTML = item.label;
    else el.textContent = item.label;
  }

  return el;
}

/**
 * Builds the dropdown <div id="{id}-menu" class="menu-dropdown"> element.
 *
 * @param {string}                      id    - e.g. "finder"
 * @param {Array<MenuItem|Divider>}     items
 */
function buildDropdown(id, items) {
  const dropdown = document.createElement("div");
  dropdown.id = `${id}-menu`;
  dropdown.className = "menu-dropdown";

  for (const item of items) {
    if (item._tag === DIVIDER_TAG) {
      const divEl = document.createElement("div");
      divEl.className = "divider";
      dropdown.appendChild(divEl);
    } else if (item._tag === SEARCHBAR_TAG) {
      const inputEl = document.createElement("input");
      inputEl.className = "searchbar";
      inputEl.type = "text";
      inputEl.placeholder = "Search";
      inputEl.alt = "Search bar";
      dropdown.appendChild(inputEl);
    } else {
      dropdown.appendChild(buildOptionEl(item));
    }
  }

  return dropdown;
}

// ─── Registry & render ───────────────────────────────────────────────────────

/** Tracks how many menus have been created (used for SVG label fallback IDs). */
let _menuCount = 0;

/**
 * Creates a menu button + dropdown and injects them into the DOM.
 *
 * @param {string|SVGElement}         label - Menu bar label or SVG node.
 * @param {Array<MenuItem|Divider>}   items - Menu contents.
 */
function Menu(label, items) {
  const index = _menuCount++;
  const id = labelToId(label, index);

  const btn      = buildButton(id, label);
  const dropdown = buildDropdown(id, items);

  const titleContainer = document.querySelector("#menu-bar .left");
  const menuContentContainer = document.querySelector("#main-content main");

  titleContainer.appendChild(btn);
  menuContentContainer.appendChild(dropdown);
}

export function initMenus() {
    Menu(
        "Finder",
        [
            MenuItem("About Finder"),
            Divider(),
            MenuItem("Settings…", "⌘ ,"),
            Divider(),
            MenuItem("Empty Trash…", "⇧ ⌘ ⌫"),
            Divider(),
            MenuItem("Services", '<i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i>'),
            Divider(),
            MenuItem("Hide Finder", "⌘ H"),
            MenuItem("Hide Others", "⌥ ⌘ H"),
            MenuItem("Show All", null, true)
        ]
    );

    Menu(
        "File",
        [
            MenuItem("New Finder Window", "⌘ N"),
            MenuItem("New Folder", "⇧ ⌘ N"),
            MenuItem("New Folder with Selection", "⌃ ⌘ N", true),
            MenuItem("New Smart Folder"),
            MenuItem("New Tab", "⌘ T"),
            MenuItem("Open", "⌘ O", true),
            MenuItem("Open With", '<i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i>', true),
            MenuItem("Close Window", "⌘ W", true),
            Divider(),
            MenuItem("Get Info", "⌘ I"),
            MenuItem("Rename", null, true),
            MenuItem("Compress", null, true),
            MenuItem("Duplicate", "⌘ D", true),
            MenuItem("Make Alias", "⌃ ⌘ A", true),
            MenuItem("Quick Look", "⌘ Y", true),
            MenuItem("Print", "⌘ P", true),
            Divider(),
            MenuItem("Share…", null, true),
            Divider(),
            MenuItem("Show Original", "⌘ R", true),
            MenuItem("Add to Sidebar", "⌃ ⌘ T", true),
            Divider(),
            MenuItem("Move to Trash", "⌘ ⌫", true),
            MenuItem("Eject", "⌃ ⌘ E", true),
            Divider(),
            MenuItem("Tags…", null, true),
            Divider(),
            MenuItem("Find", "⌘ F")
        ]
    );

    Menu(
        "Edit",
        [
            MenuItem("Undo", "⌘ Z"),
            MenuItem("Redo", "⇧ ⌘ Z", true),
            Divider(),
            MenuItem("Cut", "⌘ X", true),
            MenuItem("Copy", "⌘ C", true),
            MenuItem("Paste", "⌘ V", true),
            MenuItem("Select All", "⌘ A", true),
            Divider(),
            MenuItem("Show Clipboard"),
            Divider(),
            MenuItem("Writing Tools", '<i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i>'),
            MenuItem("Autofill", '<i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i>'),
            MenuItem("Start Diction", '<i alt="Microphone icon" class="fas fa-microphone mini-icon" aria-hidden="true"></i>', true),
            MenuItem("Emoji & Symbols", '<i alt="Globe icon" class="fas fa-globe mini-icon" aria-hidden="true"></i>', true)
        ]
    );

    Menu(
        "View",
        [
            MenuItem("as Icons", "⌘ 1", true),
            MenuItem("as List", "⌘ 2", true),
            MenuItem("as Columns", "⌘ 3", true),
            MenuItem("as Gallery", "⌘ 4", true),
            Divider(),
            MenuItem("Use Stacks", "⌃ ⌘ O"),
            MenuItem("Sort By", '<i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i>'),
            MenuItem("Clean Up", null, true),
            MenuItem("Clean Up By", '<i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i>', true),
            Divider(),
            MenuItem("Hide Tab Bar", "⇧ ⌘ T", true),
            MenuItem("Show All Tabs", "⇧ ⌘ \\", true),
            Divider(),
            MenuItem("Hide Sidebar", "⇧ ⌘ S", true),
            MenuItem("Hide Preview", "⇧ ⌘ P", true),
            Divider(),
            MenuItem("Hide Toolbar", "⌥ ⌘ T", true),
            MenuItem("Hide Path Bar", "⌥ ⌘ P", true),
            MenuItem("Hide Status Bar", "⌘ /", true),
            Divider(),
            MenuItem("Customize Toolbar…", null, true),
            Divider(),
            MenuItem("Show View Options", "⌘ J"),
            MenuItem("Show Preview Options", null, true),
            Divider(),
            MenuItem("Enter Full Screen", '<i alt="Globe icon" class="fas fa-globe" aria-hidden="true"></i> F', true),
        ]
    );

    Menu(
        "Go",
        [
            MenuItem("Back", "⌘ [", true),
            MenuItem("Forward", "⌘ ]", true),
            MenuItem("Enclosing Folder", "⌘ ▲"),
            Divider(),
            MenuItem('<i alt="Clock icon" class="fas fa-clock" aria-hidden="true"></i> &nbsp; Recents', "⇧ ⌘ F"),
            MenuItem('<i alt="File icon" class="fas fa-file" aria-hidden="true"></i> &nbsp; Documents', "⇧ ⌘ O"),
            MenuItem('<i alt="Desktop icon" class="fas fa-desktop" aria-hidden="true"></i> &nbsp; Desktop', "⇧ ⌘ D"),
            MenuItem('<i alt="Downloads icon" class="fas fa-circle-down" aria-hidden="true"></i> &nbsp; Downloads', "⌥ ⌘ L"),
            MenuItem('<i alt="Home icon" class="fas fa-home" aria-hidden="true"></i> &nbsp; Home', "⇧ ⌘ H"),
            MenuItem('<i alt="Book icon" class="fas fa-book" aria-hidden="true"></i> &nbsp; Library', "⇧ ⌘ L"),
            MenuItem('<i alt="Laptop icon" class="fas fa-laptop" aria-hidden="true"></i> &nbsp; Computer', "⇧ ⌘ C"),
            MenuItem('<i alt="Bullseye icon" class="fas fa-bullseye" aria-hidden="true"></i> &nbsp; AirDrop', "⇧ ⌘ R"),
            MenuItem('<i alt="Globe icon" class="fas fa-globe" aria-hidden="true"></i> &nbsp; Network', "⇧ ⌘ K"),
            MenuItem('<i alt="Cloud icon" class="fas fa-cloud" aria-hidden="true"></i> &nbsp; iCloud Drive', "⇧ ⌘ I"),
            MenuItem('<i alt="Open folder icon" class="fas fa-folder-open" aria-hidden="true"></i> &nbsp; Shared', "⇧ ⌘ S"),
            MenuItem('<i alt="A letter icon" class="fas fa-a" aria-hidden="true"></i> &nbsp; Applications', "⇧ ⌘ A"),
            MenuItem('<i alt="Screwdriver wrench icon" class="fas fa-screwdriver-wrench" aria-hidden="true"></i> &nbsp; Utilities', "⇧ ⌘ U"),
            Divider(),
            MenuItem("Recent Folders", '<i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i>'),
            Divider(),
            MenuItem("Go to Folder…", "⇧ ⌘ G"),
            MenuItem("Connect to Server…", "⌘ K")
        ]
    );

    Menu(
        "Window",
        [
            MenuItem("Minimize", "⌘ M", true),
            MenuItem("Zoom", null, true),
            MenuItem("Fill", '⌃ <i alt="Globe icon" class="fas fa-globe" aria-hidden="true"></i> F', true),
            MenuItem("Center", '⌃ <i alt="Globe icon" class="fas fa-globe" aria-hidden="true"></i> C', true),
            Divider(),
            MenuItem("Move & Resize", '<i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i>'),
            MenuItem("Full Screen Tile", '<i alt="Right chevron icon" class="fas fa-chevron-right mini-icon" aria-hidden="true"></i>', true),
            Divider(),
            MenuItem("Remove Window from Set", null, true),
            MenuItem("Cycle Through Windows", "⌘ `", true),
            MenuItem("Show Progress Window", null, true),
            Divider(),
            MenuItem("Bring All to Front"),
            Divider(),
            MenuItem("Show Previous Tab", "⌃ ⇧ ⇥", true),
            MenuItem("Show Next Tab", "⌃ ⇥", true),
            MenuItem("Move Tab to New Window", null, true),
            MenuItem("Merge All Windows", null, true),
        ]
    );

    Menu(
        "Help",
        [
            SearchBar(),
            MenuItem("Mac User Guide"),
            MenuItem("Tips for Your Mac")
        ]
    );
}