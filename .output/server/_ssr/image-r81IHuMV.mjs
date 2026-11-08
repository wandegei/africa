import { __toESM } from "../_runtime.mjs";
import { cn } from "./router-BCwh7kn0.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
// node_modules/.nitro/vite/services/ssr/assets/image-r81IHuMV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WIX_MEDIA_HOSTS = { "static.wixstatic.com": "/media/" };
var IMAGE_LOAD_MODE = {
	OPTIMIZED: "optimized",
	ORIGINAL: "original",
	FALLBACK: "fallback"
};
var DEVICE_PIXEL_RATIOS = [
	1,
	2,
	3
];
var MAX_DIMENSION = 6e3;
function splitImageProps(props) {
	const wrapperProps = {};
	const imageProps = {};
	for (const [key, value] of Object.entries(props)) if (key.startsWith("data-")) wrapperProps[key] = value;
	else imageProps[key] = value;
	return {
		wrapperProps,
		imageProps
	};
}
/** Returns transform metadata only for canonical public Wix image URLs. */
function parseWixMediaUrl(src) {
	try {
		const url = new URL(src);
		if (url.protocol !== "https:" || url.username || url.password || url.port && url.port !== "443") return null;
		const pathPrefix = WIX_MEDIA_HOSTS[url.hostname];
		if (!pathPrefix) return null;
		const transformed = url.pathname.match(/^(.*)\/v1\/(?:fill|fit)\/[^/]+\/[^/]+$/i);
		const basePath = transformed ? transformed[1] : url.pathname;
		const filename = basePath.split("/").pop();
		if (!basePath.startsWith(pathPrefix) || !filename || !/\.[a-z0-9]+$/i.test(filename) || /\.svg$/i.test(filename)) return null;
		return {
			baseUrl: `${url.origin}${basePath}`,
			filename
		};
	} catch {
		return null;
	}
}
var clampDim = (n) => Math.min(Math.max(Math.round(n), 1), MAX_DIMENSION);
var clamp01 = (n) => Math.min(1, Math.max(0, n));
function buildTransformUrl({ baseUrl, filename }, { width, height, crop, focalPoint, quality }) {
	const params = [`w_${clampDim(width)}`, `h_${clampDim(height || width)}`];
	if (crop) params.push(focalPoint ? `fp_${clamp01(focalPoint.x).toFixed(2)}_${clamp01(focalPoint.y).toFixed(2)}` : "al_c");
	const encoding = /\.gif$/i.test(filename) ? "enc_webp" : "enc_auto";
	params.push(`q_${quality}`, "usm_0.66_1.00_0.01", encoding, "quality_auto");
	return `${baseUrl}/v1/${crop ? "fill" : "fit"}/${params.join(",")}/${filename}`;
}
function buildSrcSet(parsed, options) {
	return DEVICE_PIXEL_RATIOS.map((dpr) => `${buildTransformUrl(parsed, {
		...options,
		width: options.width * dpr,
		height: options.height ? options.height * dpr : void 0
	})} ${dpr}x`).join(", ");
}
function getOriginalImageUrl(src, parsed) {
	return parsed?.baseUrl || src;
}
function nextImageLoadMode(mode) {
	return mode === IMAGE_LOAD_MODE.OPTIMIZED ? IMAGE_LOAD_MODE.ORIGINAL : IMAGE_LOAD_MODE.FALLBACK;
}
function useSize(ref) {
	const [size, setSize] = import_react.useState(null);
	import_react.useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;
		const rect = element.getBoundingClientRect();
		setSize({
			width: rect.width,
			height: rect.height
		});
		const observer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			setSize({
				width,
				height
			});
		});
		observer.observe(element);
		return () => observer.disconnect();
	}, [ref]);
	return size;
}
function useResponsiveImage({ parsed, fittingType, focalPoint, quality, onLoad }, parentRef) {
	const wrapperRef = import_react.useRef(null);
	const imgRef = import_react.useRef(null);
	const size = useSize(wrapperRef);
	const [loaded, setLoaded] = import_react.useState(false);
	import_react.useImperativeHandle(parentRef, () => imgRef.current);
	import_react.useEffect(() => setLoaded(false), [parsed.baseUrl]);
	const crop = fittingType !== "fit";
	return {
		wrapperRef,
		imgRef,
		loaded,
		options: size && {
			width: size.width || 1024,
			height: size.height || void 0,
			crop,
			focalPoint: crop ? focalPoint : void 0,
			quality
		},
		handleLoad: (event) => {
			setLoaded(true);
			onLoad?.(event);
		}
	};
}
var ResponsiveImage = import_react.forwardRef(({ src, parsed, fittingType, focalPoint, quality, className, style, aspectRatio, onLoad, ...props }, ref) => {
	const { wrapperRef, imgRef, loaded, options, handleLoad } = useResponsiveImage({
		parsed,
		fittingType,
		focalPoint,
		quality,
		onLoad
	}, ref);
	const { wrapperProps, imageProps } = splitImageProps(props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: wrapperRef,
		className: cn("inline-block relative", className),
		style: {
			aspectRatio,
			...style
		},
		...wrapperProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "block relative w-full h-full overflow-hidden",
			children: [options && !loaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: buildTransformUrl(parsed, {
					...options,
					width: 20,
					height: options.height ? Math.max(1, Math.round(20 * options.height / options.width)) : void 0,
					quality: 20
				}),
				alt: "",
				"aria-hidden": "true",
				className: "w-full h-full inset-0 absolute",
				style: {
					objectFit: fittingType === "fit" ? "contain" : "cover",
					filter: "blur(10px)",
					transform: "scale(1.1)"
				}
			}), options && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				ref: imgRef,
				src: buildTransformUrl(parsed, options),
				srcSet: buildSrcSet(parsed, options),
				loading: "lazy",
				className: cn("w-full h-full inset-0 absolute", fittingType === "fit" ? "object-contain" : "object-cover"),
				onLoad: handleLoad,
				...imageProps
			})]
		})
	});
});
ResponsiveImage.displayName = "ResponsiveImage";
var FALLBACK_IMAGE_URL = "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";
/**
* Image with built-in Wix Media Platform support: canonical public images on
* static.wixstatic.com/media images are resized to the rendered container per
* device pixel ratio and served as AVIF/WebP when supported; `fittingType="fill"`
* crops server-side, optionally anchored at a focal point. Other URLs render
* as a plain <img>. Failed transforms retry the original URL; only a broken
* original swaps to the generic fallback image.
*/
var Image = import_react.forwardRef(({ src: source, fittingType = "fill", originWidth, originHeight, focalPointX, focalPointY, quality = 90, onError, ...props }, ref) => {
	const src = source;
	const parsedSource = src && src !== FALLBACK_IMAGE_URL ? parseWixMediaUrl(src) : null;
	const initialMode = parsedSource ? IMAGE_LOAD_MODE.OPTIMIZED : IMAGE_LOAD_MODE.ORIGINAL;
	const [loadState, setLoadState] = import_react.useState({
		src,
		mode: initialMode
	});
	const mode = loadState.src === src ? loadState.mode : initialMode;
	import_react.useEffect(() => {
		setLoadState({
			src,
			mode: initialMode
		});
	}, [src, initialMode]);
	const handleError = (event) => {
		if (mode === IMAGE_LOAD_MODE.FALLBACK) return;
		const nextMode = nextImageLoadMode(mode);
		setLoadState({
			src,
			mode: nextMode
		});
		if (nextMode === IMAGE_LOAD_MODE.FALLBACK) onError?.(event);
	};
	const imageProps = {
		...props,
		className: props.className,
		onError: handleError
	};
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		ref,
		src: FALLBACK_IMAGE_URL,
		...imageProps,
		"data-empty-image": true
	});
	const parsed = mode === IMAGE_LOAD_MODE.OPTIMIZED ? parsedSource : null;
	if (!parsed) {
		const isErrorMode = mode === IMAGE_LOAD_MODE.FALLBACK;
		const imageSrc = isErrorMode ? FALLBACK_IMAGE_URL : getOriginalImageUrl(src, parsedSource);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			ref,
			src: imageSrc,
			...imageProps,
			"data-error-image": isErrorMode || void 0
		});
	}
	const focalPoint = typeof focalPointX === "number" && typeof focalPointY === "number" ? {
		x: focalPointX,
		y: focalPointY
	} : void 0;
	const aspectRatio = originWidth && originHeight ? `${originWidth} / ${originHeight}` : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveImage, {
		ref,
		src,
		parsed,
		fittingType,
		focalPoint,
		quality,
		aspectRatio,
		...imageProps
	});
});
Image.displayName = "Image";
export { Image };
