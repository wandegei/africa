import { require_jsx_runtime } from "../_libs/react2.mjs";
import { Building2, CalendarCheck2, Compass } from "../_libs/lucide-react4.mjs";
import { Scale } from "../_libs/lucide-react11.mjs";
// node_modules/.nitro/vite/services/ssr/assets/ServiceGlyph-BzSvnQqk.js
var import_jsx_runtime = require_jsx_runtime();
var GLYPHS = {
	compass: Compass,
	building: Building2,
	scale: Scale,
	calendar: CalendarCheck2
};
function ServiceGlyph({ icon, className = "h-5 w-5" }) {
	const Glyph = GLYPHS[icon] ?? Compass;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glyph, {
		className,
		"aria-hidden": "true"
	});
}
export { ServiceGlyph };
