function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(b,c){if(b){if("string"==typeof b)return _arrayLikeToArray(b,c);var a={}.toString.call(b).slice(8,-1);return"Object"===a&&b.constructor&&(a=b.constructor.name),"Map"===a||"Set"===a?Array.from(b):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(b,c):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(b,c){(null==c||c>b.length)&&(c=b.length);for(var d=0,f=Array(c);d<c;d++)f[d]=b[d];return f}/**
 * Creates and injects a skill entry into the skills container.
 *
 * @param {string} name        - Display name (also used to derive the element ID)
 * @param {number} value       - Proficiency from 0–10 in 0.5 increments
 * @param {string} icon        - Raw HTML string: inline SVG, <img>, or <i> (FontAwesome/SimpleIcons)
 * @param {string} color       - CSS color string applied to the entry's ID selector
 * @param {string} description - Inner HTML for the description paragraph
 * @param {string} containerId - ID of the container to append to
 */export function Skill(a,b,c,d,e,f){// --- Derive a safe, lowercase ID from the name ---
// e.g. "OpenSSL" → "openssl", "Node.js" → "nodejs"
var g=a.toLowerCase().replace(/[^a-z0-9]+/g,""),h=Math.floor(b),i=.5==b%1,j=10-h-(i?1:0),k=[].concat(_toConsumableArray(Array(h).fill("<i aria-hidden=\"true\" alt=\"Filled star icon\" class=\"fas fa-star\"></i>")),_toConsumableArray(i?["<i aria-hidden=\"true\" alt=\"Half-filled star icon\" class=\"fas fa-star-half-stroke\"></i>"]:[]),_toConsumableArray(Array(j).fill("<i aria-hidden=\"true\" alt=\"Empty star icon\" class=\"far fa-star\"></i>"))).join("\n      "),l="\n  <div class=\"skill-entry\">\n    <div role=\"button\" aria-pressed=\"false\" tabindex=\"0\" aria-expanded=\"false\"\n        id=\"".concat(g,"\" class=\"row\" onclick=\"toggleContent('#").concat(g,"')\">\n      <div class=\"beginning\">\n        ").concat(c,"\n        <h3 class=\"heading\">").concat(a,"</h3>\n      </div>\n      <div class=\"stars\">\n        ").concat(k,"\n      </div>\n      <div id=\"").concat(g,"-trigger\" class=\"arrow\">\n        <i aria-hidden=\"true\" alt=\"Arrow icon\" class=\"fas fa-chevron-right rotate0\"></i>\n      </div>\n    </div>\n    <div id=\"").concat(g,"-content\" class=\"hidden-content item-content\">\n      <p>").concat(e,"</p>\n    </div>\n  </div>").trim(),m=document.getElementById("skill-colors");// --- Build the 10-star row ---
// Stars are filled (fas fa-star), half (fas fa-star-half-stroke),
// or empty (far fa-star) based on the numeric value.
// indented to match surrounding markup
// --- Assemble the full HTML block ---
// --- Inject the color rule into a shared <style> block ---
// We reuse one <style id="skill-colors"> element so we don't
// litter the <head> with a new tag on every call.
m||(m=document.createElement("style"),m.id="skill-colors",document.head.appendChild(m)),m.textContent+="\n#".concat(g," { color: ").concat(d,"; }");// --- Mount the HTML into the page ---
var n=document.getElementById("skills-container-".concat(f));return n?void n.insertAdjacentHTML("beforeend",l):void console.warn("Skill(\"".concat(a,"\"): no skills-container-#").concat(f," container found in the DOM."))}