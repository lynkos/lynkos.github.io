"use strict";// ─── Types ────────────────────────────────────────────────────────────────────
// ─── Star Generation ──────────────────────────────────────────────────────────
/**
 * Builds the 10 FontAwesome star icons for a given skill value.
 *
 * The logic breaks the float into three regions:
 *   - whole part  → filled stars  (fas fa-star)
 *   - 0.5 remainder → one half star (fas fa-star-half-stroke)
 *   - remainder   → empty stars  (far fa-star)
 *
 * Example: value = 3.5  → ★★★⯨☆☆☆☆☆☆
 *          value = 9.5  → ★★★★★★★★★⯨
 *          value = 10.0 → ★★★★★★★★★★
 */function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(b,c){if(b){if("string"==typeof b)return _arrayLikeToArray(b,c);var a={}.toString.call(b).slice(8,-1);return"Object"===a&&b.constructor&&(a=b.constructor.name),"Map"===a||"Set"===a?Array.from(b):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(b,c):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(b,c){(null==c||c>b.length)&&(c=b.length);for(var d=0,f=Array(c);d<c;d++)f[d]=b[d];return f}function generateStars(a){var b=Math.floor(a),c=.5==a%1,d=10-b-(c?1:0),e=Array(b).fill("<i aria-hidden=\"true\" alt=\"Filled star icon\" class=\"fas fa-star\"></i>"),f=c?["<i aria-hidden=\"true\" alt=\"Half-filled star icon\" class=\"fas fa-star-half-stroke\"></i>"]:[],g=Array(d).fill("<i aria-hidden=\"true\" alt=\"Empty star icon\" class=\"far fa-star\"></i>");// whole stars
// fractional half?
// Join with newline + indentation to match original formatting
return[].concat(_toConsumableArray(e),f,_toConsumableArray(g)).join("\n      ")}// ─── ID Derivation ────────────────────────────────────────────────────────────
/**
 * Converts a skill name to a safe HTML id:
 *   "OpenSSL"   → "openssl"
 *   "Node.js"   → "node-js"
 *   "Vue 3"     → "vue-3"
 */function toId(a){return a.toLowerCase().replace(/[^a-z0-9]+/g,"-")// non-alphanumeric runs → hyphen
.replace(/^-|-$/g,"");// trim leading/trailing hyphens
}// ─── Main Function ────────────────────────────────────────────────────────────
/**
 * Generates a skill entry HTML block and its paired CSS color rule.
 *
 * @param name        Display name of the skill (e.g. "Confluence")
 * @param value       Proficiency from 0 to 10 in 0.5 increments
 * @param icon        HTML string for the icon (FontAwesome, SVG, or <img>)
 * @param color       CSS color string applied to the row (e.g. "#721412")
 * @param description HTML string shown in the expandable content panel
 *
 * @example
 * const { html, css } = Skill(
 *   "OpenSSL",
 *   3.5,
 *   '<img aria-hidden="true" loading="lazy" fetchpriority="low" alt="OpenSSL logo" src="https://cdn.simpleicons.org/openssl">',
 *   "#721412",
 *   "Used for some of my <em>personal projects</em>."
 * );
 */export function Skill(a,b,c,d,e){// Validate value range and increment
if(0>b||10<b||0!=2*b%1)throw new RangeError("Skill value must be between 0 and 10 in 0.5 increments; got ".concat(b));var f=toId(a),g=generateStars(b),h="<div class=\"skill-entry\">\n  <div role=\"button\" aria-pressed=\"false\" tabindex=\"0\" aria-expanded=\"false\" id=\"".concat(f,"\" class=\"row\" onclick=\"toggleContent('#").concat(f,"')\">\n    <div class=\"beginning\">\n      ").concat(c,"\n      <h3 class=\"heading\">").concat(a,"</h3>\n    </div>\n    <div class=\"stars\">\n      ").concat(g,"\n    </div>\n    <div id=\"").concat(f,"-trigger\" class=\"arrow\">\n      <i aria-hidden=\"true\" alt=\"Arrow icon\" class=\"fas fa-chevron-right rotate0\"></i>\n    </div>\n  </div>\n  <div id=\"").concat(f,"-content\" class=\"hidden-content item-content\">\n    <p>").concat(e,"</p>\n  </div>\n</div>"),i="#".concat(f," {\n  color: ").concat(d,";\n}");// Scoped CSS rule for the skill's brand color
return{html:h,css:i}}// ─── Example Usage ────────────────────────────────────────────────────────────
var _Skill=Skill("Confluence",9.5,"<i aria-hidden=\"true\" alt=\"Confluence logo\" class=\"fab fa-confluence\"></i>","#1868DB","Used during my internships at Oracle (OCI)."),html=_Skill.html,css=_Skill.css;console.log(html),console.log("\n/* CSS */"),console.log(css);