// node_modules/env-runner/dist/vite.mjs
function e(e, t) {
	let n = /* @__PURE__ */ new WeakMap();
	return {
		send: (n) => e.sendMessage({
			...n,
			viteEnv: t
		}),
		on: (r, i) => {
			if (r === `connection`) return;
			let a = (n) => {
				n?.type === `custom` && n.event === r && n.viteEnv === t && i(n.data, { send: (n) => e.sendMessage({
					...n,
					viteEnv: t
				}) });
			};
			n.set(i, a), e.onMessage(a);
		},
		off: (t, r) => {
			if (t === `connection`) return;
			let i = n.get(r);
			i && (e.offMessage(i), n.delete(r));
		}
	};
}
export { e };
