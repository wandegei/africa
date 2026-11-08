import { nodeAdapter } from "./crossws3.mjs";
import { defaultResolve } from "./crossws6.mjs";
import { NodeRequest } from "./srvx.mjs";
// node_modules/crossws/dist/server/node.mjs
function plugin(wsOpts) {
	return (server) => {
		const ws = nodeAdapter({
			hooks: wsOpts,
			resolve: defaultResolve(server, wsOpts),
			...wsOpts.options?.node
		});
		const originalServe = server.serve;
		server.serve = () => {
			server.node?.server.on("upgrade", (req, socket, head) => {
				ws.handleUpgrade(req, socket, head, new NodeRequest({
					req,
					upgrade: {
						socket,
						head
					}
				}));
			});
			return originalServe.call(server);
		};
	};
}
export { plugin };
