const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vite.dev-CXmE1WwX.js","assets/rolldown-runtime-BCiCTKAo.js","assets/common-CrXoaQRc.js","assets/_common-c48kocn1.js","assets/__vite-browser-external-BwpP9LFt.js","assets/service-worker-B3L-MCpX.js","assets/_plugins-DUKcMBV8.js","assets/preload-helper-7y9sWmk5.js","assets/perfect-debounce-UIxkeHDI.js","assets/node-C0eBNcus.js","assets/_url-CXLyvQw2.js","assets/body-limit-2KSRDLb8.js","assets/_trust-proxy-Bgdp2Uwv.js"])))=>i.map(i=>d[i]);
import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import{$t as t,F as n,Hn as r,Lt as i,P as a,Un as o,Wt as s,c,ct as l,gn as u,gt as d,in as f,kt as p,lt as m,rt as h,vt as g,y as _}from"./common-CrXoaQRc.js";import{n as v}from"./nitro2-jckFcnDk.js";import{n as y}from"./pkg-types-D_oXAJPQ.js";import{t as b}from"./__vite-browser-external-BwpP9LFt.js";import{r as x,t as S}from"./server-CzLYY4nw.js";import{t as C}from"./preload-helper-7y9sWmk5.js";var w=e(b(),1),T=`/_nitro/dev/reload`,E=25e3,D=class{id=Math.random().toString(36).slice(2);generation=0;closed=!1;#e=new Set;bump(){this.generation++,this.#n()}close(){this.closed=!0,this.#n()}async handle(e){let t=e.url.searchParams;return!this.closed&&t.get(`id`)===this.id&&t.get(`v`)===String(this.generation)&&await this.#t(e.req.signal),this.closed?new Response(null,{status:503,headers:{"cache-control":`no-store`}}):t.get(`id`)===this.id&&t.get(`v`)===String(this.generation)?new Response(null,{status:204,headers:{"cache-control":`no-store`}}):(e.res.headers.set(`cache-control`,`no-store`),{id:this.id,v:this.generation})}#t(e){return new Promise(t=>{let n=()=>{clearTimeout(r),e?.removeEventListener(`abort`,n),this.#e.delete(n),t()},r=setTimeout(n,E);r.unref?.(),e?.addEventListener(`abort`,n),this.#e.add(n)})}#n(){for(let e of[...this.#e])e()}},O=[0,250,1e3],k=2e3;function A(e,t,n){return!M(e.method,t)||!N(e.headers)?t:j(t,{url:m(n.base,T),id:n.signal.id,v:n.signal.generation,poll:n.poll})}function j(e,t){let n=new TextEncoder().encode(P(t)),r=new Headers(e.headers);r.delete(`content-length`);let i=(e.body||new Blob([]).stream()).pipeThrough(new TransformStream({flush(e){e.enqueue(n)}}));return new Response(i,{status:e.status,statusText:e.statusText,headers:r})}function M(e,t){if(e!==`GET`||t.status<500)return!1;let n=t.headers.get(`content-type`)||``;return!t.headers.has(`content-encoding`)&&/^text\/html\b/i.test(n)&&!/charset\s*=\s*"?utf-?(?:16|32)/i.test(n)}function N(e){let t=e.get(`sec-fetch-dest`);return t?/^(?:document|iframe|frame)$/.test(t):/\btext\/html\b/i.test(e.get(`accept`)||``)}function P(e){return`<script type="module">
// Pages that load client modules of their own (hydrated framework error pages) recover through them.
if (!document.querySelector("script[type=module][src]")) {
  const state = ${JSON.stringify({url:e.url,id:e.id,v:e.v}).replace(/[<\u007f-\uffff]/g,e=>`\\u${e.charCodeAt(0).toString(16).padStart(4,`0`)}`)};
  const page = location.href;
  let done = false;
  const stopped = () => done || location.href !== page;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function rendersAgain(next) {
    for (const delay of ${JSON.stringify(O)}) {
      // A newer server update starts the checks again
      await new Promise((r) => setTimeout((wake = r), delay));
      if (stopped() || latest !== next) return false;
      const res = await fetch(page, {
        cache: "no-store",
        headers: { accept: "text/html" },
        signal: AbortSignal.timeout?.(5000),
      }).catch(() => {});
      res?.body?.cancel().catch(() => {});
      if (res && res.status < 500) return true;
    }
    return false;
  }
  // A restarted dev server has a new id.
  const isNews = (next) => next.id !== state.id || next.v > state.v;
  let seen = state.v;
  let wake = () => {};
  let latest;
  let handling;
  let controller;
  function onAnswer(next) {
    if (typeof next?.id !== "string") return;
    if (next.id === state.id && next.v <= seen) return;
    if (next.id === state.id) seen = next.v;
    latest = next;
    wake();
    handling ||= (async () => {
      while (!stopped() && isNews(latest)) {
        const next = latest;
        // Reloads synchronously unless it checks the page, so the waiting tab stops right away
        if (next.id !== state.id || ${e.poll?`(await rendersAgain(next))`:`true`}) {
          if (!stopped()) location.reload();
          done = true;
          controller?.abort();
          return;
        }
        state.v = next.v;
      }
    })().finally(() => (handling = undefined));
  }
  // Scoped to the route, for apps served on one origin through a proxy
  const name = "nitro:dev-reload:" + state.url;
  const channel = typeof BroadcastChannel === "function" ? new BroadcastChannel(name) : undefined;
  channel?.addEventListener("message", (event) => onAnswer(event.data));
  // Asks for the server state, at once or (with \`v\`) once the server is past generation \`v\`.
  async function wait(v) {
    let failures = 0;
    while (!stopped()) {
      controller = new AbortController();
      const query = v === undefined ? "" : \`&v=\${v()}\`;
      const res = await fetch(\`\${state.url}?id=\${state.id}\${query}\`, {
        cache: "no-store",
        signal: controller.signal,
      }).catch(() => {});
      if (stopped()) return;
      // The dev server is down or closing: wait for it to answer again.
      if (!res || res.status >= 500) {
        await sleep(Math.min(250 * 2 ** failures++, 5000));
        continue;
      }
      failures = 0;
      if (res.status === 204) continue;
      if (res.status !== 200) return (done = true);
      const next = await res.json().catch(() => {});
      // Something else answers the route (e.g. a proxy fallback page)
      if (typeof next?.id !== "string") return (done = true);
      channel?.postMessage(next);
      onAnswer(next);
      if (!v) return;
    }
  }
  const locks = navigator.locks;
  if (locks) {
    // One tab per origin waits on the route and tells the others: browsers allow about 6
    // connections per origin over HTTP/1.1. Each tab checks once first, in case it missed an update.
    wait();
    await locks.request(name, () => wait(() => seen));
  } else {
    // Without Web Locks (insecure origins), visible tabs check at an interval instead.
    while (!stopped()) {
      if (!document.hidden) await wait();
      await sleep(${k});
    }
  }
}
<\/script>`}async function F(e,t){switch(t){case`miniflare`:return I(e);case`netlify`:return{netlifyRuntime:L(`@netlify/runtime`,e.options.rootDir)};default:return{}}}async function I(e){let{rootDir:t}=e.options,r=await n({id:`miniflare`,dir:t,deps:e.options.deps}),i=e.options.cloudflare?.wrangler,a=await y([`wrangler.json`,`wrangler.jsonc`,`wrangler.toml`],{startingFrom:t}).catch(()=>void 0);return{miniflare:r?(0,w.pathToFileURL)(r):void 0,wranglerModule:L(`wrangler`,t),wrangler:i&&Object.keys(i).length>0?i:!!a,wranglerConfigPath:a,wranglerEnv:e.options.cloudflare?.wranglerEnv,compatibilityDate:`latest`,miniflareOptions:{defaultPersistRoot:p(t,`.wrangler/state/v3`)},crossws:{bindingName:`$DurableObject`,instanceName:`server`}}}function L(e,t){let n=i(e,{from:[t,import.meta.url],try:!0});return n?(0,w.pathToFileURL)(n):void 0}var R=5e3;async function z(e,t={}){await new Promise(n=>{let r=()=>{clearTimeout(i),e.offMessage(a),n()},i=setTimeout(()=>{t.warn?.(`Dev worker did not shut down in time, force closing it...`),r()},R),a=e=>{e?.event===`exit`&&r()};e.onMessage(a);try{e.sendMessage({event:`shutdown`})}catch(e){t.warn?.(`Could not send shutdown message to the dev worker: ${e instanceof Error?e.message:String(e)}`),r()}})}async function B(e){let t=p(e.options.buildDir,`vite/dev-worker.mjs`),n=(0,w.pathToFileURL)(p(o,`internal/vite/dev-worker.mjs`)).href,r=(0,w.pathToFileURL)(await s(f(e))).href,a=e.options.features.websocket??e.options.experimental.websocket,c=V(e),l=e.options.tracingChannel?.srvx?(0,w.pathToFileURL)(i(`srvx/tracing`,{from:import.meta.url})).href:void 0,d=[`// Generated by Nitro`,`import * as moduleRunner from ${JSON.stringify(r)};`,`import { setModuleRunner, setReloadWaitTimeout } from ${JSON.stringify(n)};`,l&&`import { tracingPlugin as srvxTracing } from ${JSON.stringify(l)};`,`export * from ${JSON.stringify(n)};`,a&&`export { websocketOptions as websocket } from ${JSON.stringify(n)};`,l&&`export const plugins = [srvxTracing()];`,``,`setModuleRunner(moduleRunner);`,c&&`setReloadWaitTimeout(${c});`].filter(e=>typeof e==`string`).join(`
`)+`
`;return await(0,w.readFile)(t,`utf8`).catch(()=>void 0)!==d&&await u(t,d),t}var ee=2**31-1;function V(e){let t={}.NITRO_DEV_RELOAD_TIMEOUT;if(!t)return;let n=Math.round(Number(t));if(!Number.isFinite(n)||n<1)e.logger.warn(`Ignoring invalid \`NITRO_DEV_RELOAD_TIMEOUT\` value \`${t}\` (expected a positive number of milliseconds).`);else return Math.min(n,ee)}function H(e){let n=$(e);return{consumer:`server`,build:{rollupOptions:e.bundlerConfig.rollupConfig,rolldownOptions:e.bundlerConfig.rolldownConfig,minify:e.nitro.options.minify,emptyOutDir:!1,sourcemap:e.nitro.options.sourcemap,commonjsOptions:e.nitro.options.commonJS,copyPublicDir:!1,emitAssets:e.nitro.options.node},resolve:{noExternal:!e.nitro.options.dev||[/^nitro(\/|$)/,RegExp(`^(${r.join(`|`)})$`),c,...t(e.nitro),...e.bundlerConfig.base.noExternal],conditions:Y(e),externalConditions:X(e)},define:{"process.env.NODE_ENV":JSON.stringify(e.nitro.options.dev?`development`:`production`)},dev:e._isVitest?void 0:{createEnvironment:async(t,r)=>{let i=(0,w.resolve)(o,`internal/vite/dev-entry.mjs`),{createFetchableDevEnvironment:a}=await C(async()=>{let{createFetchableDevEnvironment:e}=await import(`./vite.dev-CXmE1WwX.js`);return{createFetchableDevEnvironment:e}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12])),s=await a(t,r,await G(e),i,{workerd:n,vite:f(e.nitro),onInit:()=>(e._viteEnvs??=new Map).set(t,i)});return e._transformRequest=e=>s.transformRequest(e),s}}}}function U(e,t,n){let r=e.nitro.options.dev,i=$(e);return{consumer:`server`,build:{rollupOptions:{input:{index:n.entry},...r?{}:{external:[/^nitro(\/|$)/]},output:{minifyInternalExports:!1}},minify:e.nitro.options.minify,sourcemap:e.nitro.options.sourcemap,outDir:(0,w.join)(e.nitro.options.buildDir,`vite/services`,t),emptyOutDir:!0,copyPublicDir:!1},resolve:{...r?{noExternal:[/^nitro(\/|$)/]}:{},conditions:Y(e),externalConditions:X(e)},dev:e._isVitest?void 0:{createEnvironment:async(t,r)=>{let a=te(n.entry),{createFetchableDevEnvironment:o}=await C(async()=>{let{createFetchableDevEnvironment:e}=await import(`./vite.dev-CXmE1WwX.js`);return{createFetchableDevEnvironment:e}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));return o(t,r,await G(e),a,{workerd:i,vite:f(e.nitro),onInit:()=>(e._viteEnvs??=new Map).set(t,a)})}}}}function W(e){return Object.fromEntries(Object.entries(e.services).map(([t,n])=>[t,U(e,t,n)]))}async function G(e){if(e._envRunner)return e._envRunner;if(e._closingEnvRunner)throw Error(`Nitro dev env runner is closed.`);return e._initPromise||=(async()=>{let t=new S,n=0;return t.onClose((r,i)=>{e._closingEnvRunner||(n++<3?(e.nitro.logger.info(`Restarting env runner...`,i?`Cause: ${i}`:``),q(e,t).catch(t=>e.nitro.logger.error(t))):e.nitro.logger.error(`Env runner failed after 3 retries.`,i?`Last cause: ${i}`:``))}),t.onReady(()=>{if(n=0,e._viteEnvs)for(let[n,r]of e._viteEnvs)t.sendMessage({type:`custom`,event:`nitro:vite-env`,data:{name:n,entry:r}})}),await q(e,t),e._envRunner=t,t})(),await e._initPromise}async function K(e){if(e._closingEnvRunner)return;e._closingEnvRunner=!0;let t=e._envRunner||await e._initPromise?.catch(()=>void 0);t&&(e.nitro.options.devServer.drain?await t.shutdown():(t.ready&&!$(e)&&await z(t,{warn:t=>e.nitro.logger.warn(t)}),await t.close()))}async function q(e,t){let n=Q(e),r=await B(e.nitro),i=await x(n,{...await F(e.nitro,n),name:`nitro-vite`,data:{entry:r}});await t.reload(i,{drain:e.nitro.options.devServer.drain})}function J(e){let t=e.nitro.options.exportConditions;if(!e.nitro.options.dev||Q(e)!==`node-worker`)return t;let n=globalThis.Bun===void 0?globalThis.Deno===void 0?void 0:`deno`:`bun`;return n&&!t.includes(n)?[n,...t]:t}function Y(e){return $(e)?Z(e):J(e)}function X(e){return Y(e).filter(e=>!/browser|wasm|module/.test(e)&&e!==`development`&&e!==`production`)}function Z(e){let t=e.nitro.options.exportConditions;return[...new Set([`workerd`,`worker`,...t.filter(e=>e!==`node`)])]}function Q(e){return e.nitro.options.devServer.runner||{}.NITRO_DEV_RUNNER||`node-worker`}function $(e){return Q(e)===`miniflare`}function te(e){return/^[~#/\0]/.test(e)||h(e)?e:i(e,{suffixes:[``,`/index`],extensions:[``,`.ts`,`.mjs`,`.cjs`,`.js`,`.mts`,`.cts`],try:!0})||e}var ne=/^server\.[mc]?[jt]sx?$/,re=new Set([`add`,`addDir`,`unlink`,`unlinkDir`]);function ie(e,t,n){let r=e.options.scanDirs.flatMap(t=>[l(t,e.options.apiDir||`api`),l(t,e.options.routesDir||`routes`),l(t,`middleware`),l(t,`plugins`),l(t,`modules`)]),i=t=>(t=d(t),r.some(e=>t===e||t.startsWith(e+`/`))||ne.test(_(t))&&a(t)+`/`===e.options.rootDir);t.watcher.on(`error`,t=>g(e,t)),t.watcher.add(r.filter(e=>!e.startsWith(t.config.root+`/`))),t.watcher.on(`all`,(e,t)=>{re.has(e)&&i(t)&&n()}),e.hooks.hook(`build:reload`,()=>n())}async function ae(e,t){await v(e),e.routing.sync(),t.moduleGraph.invalidateAll()}export{W as a,ie as c,A as d,U as i,T as l,K as n,G as o,H as r,ae as s,$ as t,D as u};