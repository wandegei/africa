import { networkInterfaces } from "node:os";
import { createServer } from "node:net";
// node_modules/nitro/dist/_libs/get-port-please.mjs
var n = /* @__PURE__ */ new Set([
	1,
	7,
	9,
	11,
	13,
	15,
	17,
	19,
	20,
	21,
	22,
	23,
	25,
	37,
	42,
	43,
	53,
	69,
	77,
	79,
	87,
	95,
	101,
	102,
	103,
	104,
	109,
	110,
	111,
	113,
	115,
	117,
	119,
	123,
	135,
	137,
	139,
	143,
	161,
	179,
	389,
	427,
	465,
	512,
	513,
	514,
	515,
	526,
	530,
	531,
	532,
	540,
	548,
	554,
	556,
	563,
	587,
	601,
	636,
	989,
	990,
	993,
	995,
	1719,
	1720,
	1723,
	2049,
	3659,
	4045,
	5060,
	5061,
	6e3,
	6566,
	6665,
	6666,
	6667,
	6668,
	6669,
	6697,
	10080
]);
function r(e) {
	return n.has(e);
}
function i(e) {
	return !r(e);
}
var a = class extends Error {
	constructor(e, t) {
		super(e, t), this.message = e;
	}
	name = `GetPortError`;
};
function o(e, t) {
	e && console.log(`[get-port] ${t}`);
}
function s(e, n) {
	return new Promise((r) => {
		let a = createServer();
		a.unref(), a.on(`error`, () => {
			r(!1);
		}), a.listen({
			port: e,
			host: n
		}, () => {
			let { port: e } = a.address();
			a.close(() => {
				r(i(e) && e);
			});
		});
	});
}
function c(t) {
	let n = new Set(t);
	for (let t of Object.values(networkInterfaces())) for (let e of t || []) e.address && !e.internal && !e.address.startsWith(`fe80::`) && !e.address.startsWith(`169.254`) && n.add(e.address);
	return [...n];
}
function l(e) {
	return e ? `on host ${JSON.stringify(e)}` : `on any host`;
}
async function u(e) {
	let t = await f(0, e);
	if (t === !1) throw new a(`Unable to find a random port ${l(e)}`);
	return t;
}
async function d(e, t = {}) {
	let n = t.delay || 500, r = t.retries || 4;
	for (let i = r; i > 0; i--) {
		if (await s(e, t.host) === !1) return;
		await new Promise((e) => setTimeout(e, n));
	}
	throw new a(`Timeout waiting for port ${e} after ${r} retries with ${n}ms interval.`);
}
async function f(e, t = process.env.HOST, n) {
	if (t ||= c([void 0, `0.0.0.0`]), !Array.isArray(t)) return s(e, t);
	for (let r of t) {
		let t = await s(e, r);
		if (t === !1) return e < 1024 && n && o(n, `Unable to listen to the privileged port ${e} ${l(r)}`), !1;
		e === 0 && t !== 0 && (e = t);
	}
	return e;
}
export { u as getRandomPort, d as waitForPort };
