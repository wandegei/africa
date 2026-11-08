import { getRequestIP } from "./_libs/h3.mjs";
// node_modules/nitro/dist/_request.mjs
function isLocalDevRequest(event) {
	const { socket } = event.runtime?.node?.req || {};
	const isUnixSocket = !socket?.remoteAddress && !socket?.localAddress && Object.keys(socket?.address?.() || {}).length === 0 && socket?.readable && socket?.writable && !socket?.remotePort;
	const ip = getRequestIP(event, { xForwardedFor: isUnixSocket });
	const v4 = ip?.toLowerCase().startsWith("::ffff:") ? ip.slice(7) : ip;
	return Boolean(v4 && /^(?:::1|127\.\d+\.\d+\.\d+)$/.test(v4));
}
export { isLocalDevRequest };
