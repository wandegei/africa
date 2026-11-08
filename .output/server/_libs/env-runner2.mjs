// node_modules/env-runner/dist/_chunks/common-errors.mjs
function e(e, t) {
	if (!t) return Error(e);
	let r = n(t);
	return Error(r ? `${e}: ${r}` : e, { cause: t });
}
function t(t) {
	return e(`Runner closed before becoming ready`, t);
}
function n(e) {
	if (typeof e == `string`) return e;
	let t = e.message;
	return typeof t == `string` ? t : ``;
}
export { e, t };
