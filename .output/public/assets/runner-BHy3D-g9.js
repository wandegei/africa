const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/__vite-browser-external-ChFrIcvn.js","assets/__vite-browser-external-BwpP9LFt.js","assets/rolldown-runtime-BCiCTKAo.js"])))=>i.map(i=>d[i]);
import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import{A as t,C as n,D as r,E as i,O as a,S as o,b as s,h as c,i as l,k as u,n as d,p as f,r as p,s as m,u as h,v as g,w as _,y as v}from"./common-base-runner-8wN8TQrh.js";import{t as y}from"./common-runtime-deps-izl5KANQ.js";import{r as b,t as x}from"./cjs-module-lexer-CpEAc3HJ.js";import{t as S}from"./__vite-browser-external-BwpP9LFt.js";import{t as C}from"./preload-helper-7y9sWmk5.js";var w=e(S(),1);function T(e,t){let n={};for(let[r,i]of Object.entries(e))n[r]=t[r]=(t[r]&&t[r]!==i?t[r]:E(i,t,n)).replace(/\\\$/g,`$`);return t}function E(e,t,n){let r={...n,...t},i=/(?<!\\)\$\{([^{}]+)\}|(?<!\\)\$([A-Za-z_][A-Za-z0-9_]*)/g,a=new Set,o=e,s;for(;(s=i.exec(o))!==null;){a.add(o);let[e,t,c]=s,l=t||c,u=l.match(/(:\+|\+|:-|-)/)?.[0],d=u?l.split(u):[l],f=d.shift(),p;if(u===`:+`||u===`+`)p=r[f]?d.join(u):``;else{let e=r[f];p=e&&!a.has(e)?e:d.join(u??``)}if(o=o.replace(e,p),o===n[f])break;i.lastIndex=0}return o}function D(e){return(0,w.existsSync)(e)?(0,w.parseEnv)((0,w.readFileSync)(e,`utf8`)):void 0}function O(e,t){let n={}[e]?.toLowerCase();return n===`true`||n!==`false`&&t}function k(e){let{configDir:t,env:n,envFiles:r}=e;if(!r?.length){let e=(0,w.resolve)(t,`.dev.vars`),r=n!==void 0&&D(`${e}.${n}`)||D(e);if(r)return r}if(!O(`CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV`,!0))return;let i=r??[`.env`,`.env.local`,...n?[`.env.${n}`,`.env.${n}.local`]:[]],a={};for(let e of i)Object.assign(a,D((0,w.resolve)(t,e)));let o={};if(e.hasSecrets||O(`CLOUDFLARE_INCLUDE_PROCESS_ENV`,!1))for(let[e,t]of Object.entries({}))typeof t==`string`&&(o[e]=t);return T(a,o)}var A=[`wrangler.json`,`wrangler.jsonc`,`wrangler.toml`],j=new Set([`name`,`script`,`scriptPath`,`modules`,`modulesRoot`,`modulesRules`,`unsafeDirectSockets`,`unsafeEvalBinding`,`unsafeModuleFallbackService`,`unsafeUseModuleFallbackService`]),M=new Set([`assets`,`serviceBindings`,`queueConsumers`,`tails`,`streamingTails`]),N={assets:`assets`,serviceBindings:`services`,workflows:`workflows`,queueConsumers:`queues.consumers`,tails:`tail_consumers`,streamingTails:`streaming_tail_consumers`,durableObjects:`durable_objects`};function P(e,t,n){let r=e.get(t);r||(r=new Set,e.set(t,r));for(let e of n)r.add(e)}function F(e){if(e.size===0)return;let t=[...e].map(([e,t])=>t.size>0?`${e} (${[...t].join(`, `)})`:e).join(`, `);console.warn(`[env-runner] wrangler config options not supported by the miniflare dev runner were ignored: ${t}; pass them via miniflareOptions to opt in.`)}function I(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function L(e){return I(e)}async function ee(e){let{wrangler:t,env:n,entryPath:r,wranglerModule:i,envFiles:a}=e;if(!t)return{};let o=L(t)?t:void 0,s,c=typeof t==`string`?t:e.configPath;if(c){if(s=(0,w.resolve)(c),!(0,w.existsSync)(s)){if(console.warn(`[env-runner] wrangler config requested but not found at "${s}"`),!o)return{};s=void 0}}else if(s=G(r),!s&&!o)return console.warn(`[env-runner] wrangler config requested but none found (searched the entry's directory, then from the cwd up to the filesystem root)`),{};let l=await y({name:`wrangler`,option:`wranglerModule`,value:i}),u=new Map;if(!l?.unstable_readConfig||!l.unstable_getMiniflareWorkerOptions){let e=new Map,t=s?oe(s,n):void 0,r=o?se(o,n):void 0,i=V(t&&(le(t.config,u,e)??{}),r&&le(r,u,e));return(t||r)&&(i=fe(i,[t?.config,r],{configDir:s?(0,w.dirname)(s):process.cwd(),env:n,envFiles:a})),Y(i,u,(o&&ce(o,n))??t?.workerName),F(u),ae(e),{options:i,configFile:t?s:void 0,exports:X(t?.config.exports,r?.exports)}}let d=!1,f,p,m,h;if(s)try{let e=l.unstable_readConfig({config:s,env:n},{hideWarnings:!z(s,n)});f=q(l.unstable_getMiniflareWorkerOptions(e,n,{envFiles:a}).workerOptions,u),m=e?.name,p=e?.secrets,h=e?.exports,d=!0}catch(e){B(`"${s}"`,e)}let g,_;if(o)try{let e=n&&I(o.env)&&o.env[n]?n:void 0,{env:t,...r}=o,i=U(l,e?o:r,e);i.userConfigPath=s,_=i.exports,d&&i.secrets===void 0&&(i.secrets=p),g=q(l.unstable_getMiniflareWorkerOptions(i,n,{envFiles:a}).workerOptions,u),g&&(delete g.rootPath,d&&H(g,f,i))}catch(e){B(`(inline)`,e)}let v=V(f,g);return Y(v,u,(o&&ce(o,n))??m),F(u),{options:v,configFile:d?s:void 0,exports:X(h,_)}}var R=new Set;function z(e,t){let n=``;try{let t=(0,w.statSync)(e);n=`${t.mtimeMs}:${t.size}`}catch{}let r=JSON.stringify([(0,w.resolve)(e),t??null,n]);return!R.has(r)&&(R.add(r),!0)}function B(e,t){console.warn(`[env-runner] failed to load wrangler config ${e}: ${t.message}`)}function V(e,t){if(!e)return t;if(!t)return e;let n={...e};for(let[e,r]of Object.entries(t)){let t=n[e];n[e]=Array.isArray(r)&&Array.isArray(t)?[...new Set([...t,...r])]:I(r)&&I(t)?{...t,...r}:r}return n}function H(e,t,n){if(!I(e.bindings))return;let r=I(t?.bindings)?t.bindings:{},i=new Set([...Object.keys(n.vars??{}),...n.secrets?.required??[]]);e.bindings=Object.fromEntries(Object.entries(e.bindings).filter(([e])=>i.has(e)||Object.hasOwn(r,e)))}function U(e,t,n){let r=(0,w.mkdtempSync)((0,w.join)((0,w.tmpdir)(),`env-runner-wrangler-`)),i=(0,w.join)(r,`wrangler.json`);try{return(0,w.writeFileSync)(i,JSON.stringify(t)),e.unstable_readConfig({config:i,env:n},{hideWarnings:!0})}finally{(0,w.rmSync)(r,{recursive:!0,force:!0})}}var W=new Set;function G(e){let t=process.cwd(),n=t;if(e){let r=(0,w.dirname)((0,w.resolve)(e)),i=(0,w.relative)(t,r);if(i===``||i!==`..`&&!i.startsWith(`..${w.sep}`)&&!(0,w.isAbsolute)(i))n=r;else{let e=K(r);if(e)return e}}for(let e=n;;e=(0,w.dirname)(e)){let r=K(e);if(r)return e!==t&&e!==n&&!W.has(r)&&(W.add(r),console.info(`[env-runner] using wrangler config from a parent directory: ${r}`)),r;if((0,w.dirname)(e)===e)return}}function K(e){for(let t of A){let n=(0,w.join)(e,t);if((0,w.existsSync)(n))return n}}function q(e,t){let n={};for(let[r,i]of Object.entries(e))i===void 0||j.has(r)||(M.has(r)?J(i)||P(t,N[r],ne(i)):te(r,i)||(n[r]=i));return Object.keys(n).length>0?n:void 0}function te(e,t){let n=e=>Array.isArray(e)&&e.length===0;return n(t)||I(t)&&Object.keys(t).length===0?!0:e!==`bindings`&&I(t)&&Object.values(t).every(n)}function J(e){return!e||Array.isArray(e)&&e.length===0||I(e)&&Object.keys(e).length===0}function ne(e){return Array.isArray(e)?e.map(e=>e?.name).filter(e=>typeof e==`string`):I(e)?`directory`in e?typeof e.binding==`string`?[e.binding]:[]:Object.keys(e):[]}function Y(e,t,n){for(let[r,i]of[[`durableObjects`,`durable_objects`],[`workflows`,`workflows`]]){let a=e?.[r];if(!e||!I(a))continue;let o={};for(let[e,r]of Object.entries(a))if(typeof r==`string`||I(r)&&!r.scriptName)o[e]=r;else if(I(r)&&n&&r.scriptName===n){let{scriptName:t,...n}=r;o[e]=n}else{let n=I(r)?r.scriptName:void 0;P(t,i,[`${e} → script "${String(n)}"`])}Object.keys(o).length>0?e[r]=o:delete e[r]}}function X(e,t){if(I(e)||I(t))return{...I(e)?e:void 0,...I(t)?t:void 0}}var Z=new Set(`vars.secrets.define.durable_objects.workflows.kv_namespaces.cloudchamber.containers.send_email.queues.connect.r2_buckets.d1_databases.vectorize.ai_search_namespaces.ai_search.websearch.agent_memory.hyperdrive.services.analytics_engine_datasets.dispatch_namespaces.mtls_certificates.tail_consumers.streaming_tail_consumers.unsafe.browser.ai.images.stream.media.pipelines.secrets_store_secrets.artifacts.unsafe_hello_world.flagship.worker_loaders.ratelimits.vpc_services.vpc_networks.version_metadata`.split(`.`)),re=`hyperdrive.analytics_engine_datasets.ai.ai_search_namespaces.ai_search.websearch.agent_memory.version_metadata.ratelimits.send_email.secrets_store_secrets.vectorize.browser.images.stream.media.pipelines.dispatch_namespaces.mtls_certificates.worker_loaders.vpc_services.vpc_networks.artifacts.flagship.containers.unsafe.unsafe_hello_world.logfwdr.wasm_modules.text_blobs.data_blobs`.split(`.`),ie=[`kvNamespaces`,`r2Buckets`,`d1Databases`,`queueProducers`,`durableObjects`];function ae(e){if(e.size===0)return;let t=[...e].map(([e,t])=>t.size>0?`${e} (${[...t].join(`, `)})`:e).join(`, `);console.warn(`[env-runner] wrangler config bindings not supported by the built-in minimal wrangler config reader were ignored: ${t}; install 'wrangler' (or pass it as \`wranglerModule\`) to use them.`)}function oe(e,t){let n=(0,w.extname)(e).toLowerCase();if(n!==`.json`&&n!==`.jsonc`){console.warn(`[env-runner] reading "${(0,w.basename)(e)}" requires the 'wrangler' package; the built-in reader supports JSON/JSONC only (install 'wrangler' for TOML).`);return}let r;try{r=(0,w.readFileSync)(e,`utf8`)}catch{return}let i;try{i=me(r)}catch(t){console.warn(`[env-runner] failed to parse wrangler config "${e}": ${t.message}`);return}if(!I(i)){B(`"${e}"`,Error(`config must be an object`));return}let a;try{a=se(i,t,e)}catch(t){B(`"${e}"`,t);return}return{config:a,workerName:ce(i,t)}}function se(e,t,n){let{env:r,...i}=e;if(!t)return i;let a=I(r)?r[t]:void 0,o=[],s;if(I(a)){s={};for(let[e,n]of Object.entries(i))Z.has(e)?a[e]===void 0&&o.push(`"${e}" exists at the top level, but is not inherited by "env.${t}"`):s[e]=n;Object.assign(s,a)}else{if(n&&I(r))throw Error(`No environment found in configuration with name "${t}". The available configured environment names are: ${JSON.stringify(Object.keys(r))}`);o.push(`No environment found in configuration with name "${t}"`),s=i}return n&&o.length>0&&z(n,t)&&console.warn(`[env-runner] wrangler config "${n}": ${o.join(`; `)}.`),s}function ce(e,t){let n=t?e.env?.[t]?.name:void 0;if(typeof n==`string`)return n;if(typeof e.name==`string`&&e.name)return t?`${e.name}-${t}`:e.name}function le(e,t,n){let r={};for(let[n,r,i]of[[`services`,e.services,`binding`],[`assets`,e.assets,`binding`],[`queues.consumers`,e.queues?.consumers,`queue`],[`tail_consumers`,e.tail_consumers,`service`],[`streaming_tail_consumers`,e.streaming_tail_consumers,`service`]])J(r)||P(t,n,(Array.isArray(r)?r:[r]).map(e=>e?.[i]).filter(e=>typeof e==`string`));for(let t of re){let r=e[t],i=I(r)&&Array.isArray(r.bindings)?r.bindings:r;J(i)||P(n,t,de(i))}typeof e.compatibility_date==`string`&&(r.compatibilityDate=e.compatibility_date),Array.isArray(e.compatibility_flags)&&(r.compatibilityFlags=e.compatibility_flags),e.vars&&typeof e.vars==`object`&&(r.bindings={...e.vars});let i=he(e.kv_namespaces,`binding`,e=>pe(e.preview_id,e.id,e.binding));i&&(r.kvNamespaces=i);let a=he(e.r2_buckets,`binding`,e=>pe(e.preview_bucket_name,e.bucket_name,e.binding));a&&(r.r2Buckets=a);let o=he(e.d1_databases,`binding`,e=>pe(e.preview_database_id,e.database_id,e.binding));o&&(r.d1Databases=o);let s=he(e.queues?.producers,`binding`,e=>e.queue);s&&(r.queueProducers=s);let c=ue(e),l=Array.isArray(e.durable_objects?.bindings)?e.durable_objects.bindings:[],u={};for(let e of l)e?.name&&e?.class_name&&(u[e.name]={className:e.class_name,...e.script_name?{scriptName:e.script_name}:{},...c.has(e.class_name)?{useSQLite:c.get(e.class_name)}:{}});Object.keys(u).length>0&&(r.durableObjects=u);let d=[...c].filter(([e])=>!l.some(t=>t?.class_name===e)).map(([e,t])=>({className:e,useSQLite:t}));d.length>0&&(r.additionalUnboundDurableObjects=d);let f={};for(let t of Array.isArray(e.workflows)?e.workflows:[])t?.binding&&t?.name&&t?.class_name&&(f[t.binding]={name:t.name,className:t.class_name,...t.script_name?{scriptName:t.script_name}:{},...t.limits?.steps===void 0?{}:{stepLimit:t.limits.steps}});Object.keys(f).length>0&&(r.workflows=f);let p={};for(let[t,n]of I(e.exports)?Object.entries(e.exports):[])n?.type===`workflow`&&typeof n.name==`string`&&(p[t]={name:n.name,...n.limits?.steps===void 0?{}:{stepLimit:n.limits.steps}});return Object.keys(p).length>0&&(r.workflowExports=p),Object.keys(r).length>0?r:void 0}function ue(e){let t=new Map;for(let n of Array.isArray(e.migrations)?e.migrations:[]){for(let e of n?.deleted_classes??[])t.delete(e);for(let{from:e,to:r}of n?.renamed_classes??[]){let n=t.get(e);n!==void 0&&(t.delete(e),t.set(r,n))}for(let e of n?.new_classes??[])t.set(e,!1);for(let e of n?.new_sqlite_classes??[])t.set(e,!0)}if(I(e.exports))for(let[n,r]of Object.entries(e.exports)){let e=r?.state;r?.type===`durable-object`&&(e===void 0||e===`created`||e===`expecting-transfer`)&&t.set(n,r.storage===`sqlite`)}return t}function de(e){return I(e)&&typeof e.binding!=`string`?Object.keys(e):(Array.isArray(e)?e:[e]).map(e=>e?.binding??e?.name??e?.class_name).filter(e=>typeof e==`string`)}function fe(e,t,n){let r=t.map(e=>e?.secrets).filter(I),i=k({...n,hasSecrets:r.length>0});if(!i)return e;let a={...e},o=I(a.bindings)?{...a.bindings}:{},s=new Set(ie.flatMap(e=>I(a[e])?Object.keys(a[e]):[])),c=new Set(r.flatMap(e=>Array.isArray(e.required)?e.required:[])),l=!1;for(let[e,t]of Object.entries(i))s.has(e)||r.length>0&&!Object.hasOwn(o,e)&&!c.has(e)||(o[e]=t,l=!0);let u=[...c].filter(e=>!Object.hasOwn(i,e));return u.length>0&&console.warn(`[env-runner] missing required wrangler secrets: ${u.join(`, `)}. Add them to .dev.vars, .env, or set as environment variables.`),l?(a.bindings=o,a):e}function pe(...e){return e.find(e=>typeof e==`string`)}function me(e){let t=``,n=-1,r=e.charCodeAt(0)===65279?e.slice(1):e;for(let e=0;e<r.length;e++){let i=r[e];if(i===`/`&&(r[e+1]===`/`||r[e+1]===`*`)){let n=r[e+1]===`/`,i=n?r.indexOf(`
`,e):r.indexOf(`*/`,e+2);i=i===-1?r.length:n?i:i+2,t+=r.slice(e,i).replace(/[^\n]/g,` `),e=i-1}else if(/\s/.test(i))t+=i;else if((i===`}`||i===`]`)&&n!==-1&&(t=`${t.slice(0,n)} ${t.slice(n+1)}`),n=-1,i===`"`){let n=e+1;for(;n<r.length&&r[n]!==`"`;)n+=r[n]===`\\`?2:1;t+=r.slice(e,n+1),e=n}else i===`,`&&(n=t.length),t+=i}return JSON.parse(t)}function he(e,t,n){if(!Array.isArray(e))return;let r={};for(let i of e){let e=i?.[t];typeof e==`string`&&(r[e]=n(i))}return Object.keys(r).length>0?r:void 0}function ge(e,t,n,r){let i=[`alarm`,`connect`,`fetch`,`webSocketClose`,`webSocketError`,`webSocketMessage`],a=[`connect`,`email`,`fetch`,`queue`,`tail`,`tailStream`,`test`,`trace`,`scheduled`],o=[`self`],s=Symbol(`instance`),c=Symbol(`ensureInstance`),l={DurableObject:e=>`add a "durable_objects" binding for it, or "exports": { "${e}": { "type": "durable-object" } }`,WorkerEntrypoint:e=>`add "exports": { "${e}": { "type": "worker" } }`,WorkflowEntrypoint:e=>`add a "workflows" entry with "class_name": "${e}"`};function u(e,t){return`Expected "${e}" export of the entry to ${t}`}function d(t,n){return typeof t==`function`&&t.prototype instanceof e[n]}function f(e,t){return t===`DurableObject`?typeof e==`function`:t===`WorkerEntrypoint`&&typeof e==`object`&&e?!0:d(e,t)}async function p(e,r){await n.ensureEntry(e);let i=(await n.entryExports())?.[r];if(i===void 0)throw TypeError(`"${r}" is declared as a ${t[r]} but the entry does not export it.`);return i}function m(t,r,i,a,o=``){let s=typeof r==`function`?new r(t.ctx,n.userEnv(t.env)):void 0;if(!(s instanceof e[a]))throw TypeError(u(i,`be a subclass of \`${a}\`${o}.`));return s}function h(e,t,n){if(typeof e[n]!=`function`)throw TypeError(u(t,`define a \`${n}()\` method.`));return e[n].bind(e)}function g(e,t){let n=async(...n)=>{let r=await t;if(typeof r!=`function`)throw TypeError(`"${e}" is not a function.`);return r(...n)};return n.then=(e,n)=>t.then(e,n),n.catch=e=>t.catch(e),n.finally=e=>t.finally(e),n}function _(e,t,n){if(!Reflect.has(e.prototype,n))throw Reflect.has(t,n)?TypeError(`The RPC receiver's prototype does not implement "${n}", but the receiver instance does.\nOnly properties and methods defined on the prototype can be accessed over RPC.
Ensure properties are declared as \`get ${n}() { ... }\` instead of \`${n} = ...\`,\nand methods are declared as \`${n}() { ... }\` instead of \`${n} = () => { ... }\`.`):TypeError(`The RPC receiver does not implement "${n}".`);let r=Reflect.get(e.prototype,n,t);return typeof r==`function`?r.bind(t):r}function v(e,t,n){return new Proxy(e,{get(e,r,i){let a=Reflect.get(e,r,i);if(a!==void 0)return a;if(!(typeof r==`symbol`||o.includes(r)||t.includes(r)))return g(r,n(i,r))}})}function y(t){class r extends e.DurableObject{constructor(n,r){return super(n,r),v(this,a,async(n,r)=>{let{ctor:i,instance:a}=await n[c]();if(!(a instanceof e.DurableObject))throw TypeError(u(t,"be a subclass of `DurableObject` for RPC."));return _(i,a,r)})}async[c](){let e=await p(this.env,t);if(typeof e!=`function`)throw TypeError(u(t,`be a Durable Object class.`));let r=this;return r[s]&&r[s].ctor===e||(r[s]={ctor:e,instance:new e(this.ctx,n.userEnv(this.env))},await this.ctx.blockConcurrencyWhile(async()=>{})),r[s]}}for(let e of i)r.prototype[e]=async function(...n){let{instance:r}=await this[c]();return h(r,t,e)(...n)};return r}function b(t){class r extends e.WorkerEntrypoint{constructor(e,n){return super(e,n),v(this,i,async(e,n)=>{let r=await p(e.env,t);return _(r,m(e,r,t,`WorkerEntrypoint`,` for RPC`),n)})}}for(let e of a)r.prototype[e]=async function(r){let i=await p(this.env,t);if(typeof i==`function`)return h(m(this,i,t,`WorkerEntrypoint`),t,e)(r);if(typeof i?.[e]!=`function`)throw TypeError(u(t,`define a \`${e}()\` handler.`));return i[e](r,n.userEnv(this.env),this.ctx)};return r}function x(t){class n extends e.WorkflowEntrypoint{async run(...e){let n=await p(this.env,t);return h(m(this,n,t,`WorkflowEntrypoint`),t,`run`)(...e)}}return n}let S={DurableObject:y,WorkerEntrypoint:b,WorkflowEntrypoint:x},C={};for(let[e,n]of Object.entries(t))C[e]=S[n](e);async function w(){let i;try{i=await n.entryExports()}catch{return}if(!i||typeof i!=`object`)return;let a=[];for(let[e,n]of Object.entries(t)){let t=i[e];t===void 0?a.push(`"${e}" is declared as a ${n} but not exported by the entry.`):f(t,n)||a.push(`"${e}" is declared as a ${n} but its export is not a ${n}.`)}for(let t of Object.keys(i)){if(t==="default"||r.includes(t))continue;let n=Object.keys(e).find(e=>d(i[t],e));n&&a.push(`"${t}" extends ${n} but the wrangler config doesn't declare it: ${l[n](t)} to deploy it.`)}return a}function T(e){for(let t=Object.getPrototypeOf(e);t&&t!==Function.prototype;t=Object.getPrototypeOf(t))if(Function.prototype.toString.call(t).includes(`[native code]`))return!0;return!1}async function E(){let t;try{t=await n.entryExports()}catch{return}if(!t||typeof t!=`object`)return;let r={};for(let[n,i]of Object.entries(t)){if(n==="default"||typeof i!=`function`)continue;let t=Object.keys(e).find(e=>d(i,e));t?r[n]=t:/^class\b/.test(Function.prototype.toString.call(i))&&!T(i)&&(r[n]=`DurableObject`)}return r}return{stubs:C,checkExports:w,exportTypes:E}}var _e={"durable-object":`DurableObject`,worker:`WorkerEntrypoint`,workflow:`WorkflowEntrypoint`},ve=new Set(Object.values(_e));function ye(e){return typeof e==`string`&&ve.has(e)}function be(e){let{options:t}=e,n={},r=[...I(t.durableObjects)?Object.values(t.durableObjects):[],...Array.isArray(t.additionalUnboundDurableObjects)?t.additionalUnboundDurableObjects:[]];for(let e of r){let t=xe(e);t&&(n[t]=`DurableObject`)}for(let e of I(t.workflows)?Object.values(t.workflows):[]){let t=typeof e==`string`?void 0:xe(e);t&&(n[t]=`WorkflowEntrypoint`)}for(let e of I(t.workflowExports)?Object.keys(t.workflowExports):[])n[e]=`WorkflowEntrypoint`;for(let[t,r]of Object.entries(e.wranglerExports||{})){let e=r?.type&&_e[r.type];e&&(e!==`DurableObject`||Ce(r))&&(n[t]=e)}for(let[t,r]of Object.entries(e.explicit||{}))n[t]=ye(r?.type)?r.type:`DurableObject`;return n}function xe(e){return typeof e==`string`?e:I(e)&&!e.scriptName&&typeof e.className==`string`?e.className:void 0}function Se(e,t=Object.keys(e)){let n=Object.keys(e).map((e,t)=>`const __stub${t} = __workerExports.stubs[${JSON.stringify(e)}];\nexport { __stub${t} as ${JSON.stringify(e)} };`).join(`
`);return`import {
  DurableObject as __DurableObject,
  WorkerEntrypoint as __WorkerEntrypoint,
  WorkflowEntrypoint as __WorkflowEntrypoint,
} from "cloudflare:workers";

const __workerExports = (${ge.toString()})(
  {
    DurableObject: __DurableObject,
    WorkerEntrypoint: __WorkerEntrypoint,
    WorkflowEntrypoint: __WorkflowEntrypoint,
  },
  ${JSON.stringify(e)},
  { ensureEntry: __ensureEntry, entryExports: __entryExports, userEnv: __userEnv },
  ${JSON.stringify(t)},
);
const __checkExports = __workerExports.checkExports;
const __exportTypes = __workerExports.exportTypes;
${n}
`}function Ce(e){return e.state===void 0||e.state===`created`||e.state===`expecting-transfer`}var we=`__ENV_RUNNER_IPC`,Te=`__ENV_RUNNER_UNSAFE_EVAL__`;function Ee(e,t){let n=t?.nodeCompat===!1?``:`import __process from "node:process";
if (!globalThis.process) { globalThis.process = __process; }`,r=t?.dynamicOnly?``:`export * from ${JSON.stringify(e)};`,i=typeof t?.exports==`string`?`export * from ${JSON.stringify(t.exports)};\nconst __checkExports = async () => undefined;\nconst __exportTypes = async () => undefined;`:Se(t?.exports||{},t?.configuredExports),a=t?.captureErrors??!0,o=Object.entries(t?.crossws||{}).filter(([,e])=>e!==void 0),s=o.length>0?Object.fromEntries(o):null,c=a?`try {
      return await __server.fetch(request, env, ctx);
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      const body = JSON.stringify({
        error: error.message,
        stack: error.stack,
        name: error.constructor?.name || "Error",
      });
      return new Response(body, {
        status: 500,
        headers: { "Content-Type": "application/json", "X-Env-Runner-Error": "1" },
      });
    }`:`return __server.fetch(request, env, ctx);`;return`${n}
${r}
${i}

const __IPC_PATH = "/__env_runner_ipc";
const __IPC_BINDING = "${we}";
const __UNSAFE_EVAL_BINDING = "${Te}";
const __entryPath = ${JSON.stringify(e)};
const __crosswsServerPath = ${JSON.stringify(t?.crosswsServer||`crossws/server`)};
const __crosswsCloudflare = ${JSON.stringify(s)};
let __entryModule;
let __userEntry;
let __entryLoading;
let __server;
let __ipcInitialized = false;
let __serverWs;
// Raw env of the latest user request. Kept after the request ends: requests
// overlap and streamed bodies outlive fetch(), and unlike \`__serverWs\` the
// IPC binding works from any request context.
let __ipcEnv;
// \`crossws/server\`'s plugin, loaded with the first entry that has \`websocket\`.
let __crosswsPlugin;

const __userEnvs = new WeakMap();

// \`env\` without env-runner's internal bindings (cached per env object).
function __userEnv(env) {
  let userEnv = __userEnvs.get(env);
  if (!userEnv) {
    userEnv = { ...env };
    delete userEnv[__IPC_BINDING];
    delete userEnv[__UNSAFE_EVAL_BINDING];
    __userEnvs.set(env, userEnv);
  }
  return userEnv;
}

// The entry's \`websocket\` with the runner's \`crossws\` option under its own
// \`options.cloudflare\` (its defined values win). Only \`options\` is shadowed,
// so hooks on a prototype (or getters) stay visible to crossws.
function __websocketOptions(websocket) {
  if (!__crosswsCloudflare) return websocket;
  const cloudflare = { ...__crosswsCloudflare };
  for (const [key, value] of Object.entries(websocket.options?.cloudflare || {})) {
    if (value !== undefined) cloudflare[key] = value;
  }
  return Object.create(websocket, {
    options: { value: { ...websocket.options, cloudflare }, enumerable: true },
  });
}

// Mirrors srvx's CloudflareServer (srvx/cloudflare): plugins, then the
// \`error\` handler as the outermost middleware, then the middleware chain.
function __createServer(entry) {
  const server = {
    runtime: "cloudflare",
    options: {
      ...entry,
      middleware: [...(entry.middleware || [])],
      fetch: entry.fetch
        ? (request) =>
            entry.fetch(request, request.runtime?.cloudflare?.env, request.runtime?.cloudflare?.context)
        : () => new Response("No fetch handler exported", { status: 500 }),
    },
    serve() {},
    ready: () => Promise.resolve(server),
    close: () => Promise.resolve(),
  };
  // \`websocket\` as in the other runners: crossws's plugin, with the entry's
  // \`websocket\` as its options (hooks, or \`resolve\`).
  const plugins = [
    ...(entry.plugins || []),
    ...(entry.websocket ? [__crosswsPlugin(__websocketOptions(entry.websocket))] : []),
  ];
  for (const plugin of plugins) {
    plugin(server);
  }
  const errorHandler = server.options.error;
  if (errorHandler) {
    server.options.middleware.unshift((_request, next) => {
      try {
        const res = next();
        return typeof res?.then === "function" ? res.then(undefined, (error) => errorHandler(error)) : res;
      } catch (error) {
        return errorHandler(error);
      }
    });
  }
  let handler = server.options.fetch;
  const middleware = server.options.middleware;
  for (let i = middleware.length - 1; i >= 0; i--) {
    const mw = middleware[i];
    const next = handler;
    handler = (request) => mw(request, () => next(request));
  }
  server.fetch = (request, env, context) => {
    const userEnv = __userEnv(env);
    Object.defineProperties(request, {
      waitUntil: { value: context.waitUntil.bind(context) },
      runtime: {
        enumerable: true,
        value: { name: "cloudflare", cloudflare: { env: userEnv, context } },
      },
      ip: {
        enumerable: true,
        configurable: true,
        get() {
          return request.headers.get("cf-connecting-ip");
        },
      },
    });
    return handler(request);
  };
  return server;
}

async function __loadEntry(env, path) {
  globalThis.__ENV_RUNNER_UNSAFE_EVAL__ = env.__ENV_RUNNER_UNSAFE_EVAL__;
  const importFn = env.__ENV_RUNNER_UNSAFE_EVAL__.newAsyncFunction(
    "return await import(path)",
    "loadEntry",
    "path"
  );
  const mod = await importFn(path);
  if ((mod.default || mod).websocket && !__crosswsPlugin) {
    const crossws = await importFn(__crosswsServerPath);
    __crosswsPlugin = crossws.plugin;
  }
  return mod;
}

function __setEntry(mod) {
  const entry = mod.default || mod;
  __server = __createServer(entry);
  __entryModule = mod;
  __userEntry = entry;
}

// Loads the entry once, for the IPC init request or an export stub used first.
async function __ensureEntry(env) {
  if (__userEntry) return;
  __entryLoading ||= __loadEntry(env, __entryPath)
    .then(__setEntry)
    .finally(() => {
      __entryLoading = undefined;
    });
  await __entryLoading;
}

// Where the Worker's classes come from: the entry's \`resolveExports()\` hook, or its namespace.
async function __entryExports() {
  return __userEntry?.resolveExports ? await __userEntry.resolveExports() : __entryModule;
}

// Where an entry load error was thrown (first stack frame), so one thrown by a
// virtual module names its key (\`#config:2:7\`). workerd's messages don't.
function __errorLocation(e) {
  const location = /\\n\\s+at (?:async )?(?:.* \\()?([^\\n()]+:\\d+:\\d+)\\)?/.exec(String(e?.stack))?.[1];
  return location ? " (at " + location + ")" : "";
}

function __sendMessage(message) {
  const payload = JSON.stringify(message);
  const env = __ipcEnv;
  if (env && env[__IPC_BINDING]) {
    env[__IPC_BINDING].fetch("http://localhost/__ipc", {
      method: "POST",
      body: payload,
    }).catch(() => {});
    return;
  }
  if (__serverWs) {
    __serverWs.send(payload);
  }
}

async function __handleWsMessage(env, data) {
  let msg;
  try { msg = JSON.parse(data); } catch { return; }

  if (msg.type === "message") {
    if (__userEntry?.ipc?.onMessage) {
      __userEntry.ipc.onMessage(msg.data);
    }
    return;
  }

  if (msg.type === "reload" && env.__ENV_RUNNER_UNSAFE_EVAL__) {
    const version = msg.version || 0;
    try {
      const newModule = await __loadEntry(env, __entryPath + "?__envRunnerReload=" + version);
      const newEntry = newModule.default || newModule;
      const newServer = __createServer(newEntry);
      if (__userEntry?.ipc?.onClose) {
        await __userEntry.ipc.onClose();
      }
      __entryModule = newModule;
      __userEntry = newEntry;
      __server = newServer;
      __ipcInitialized = false;
      if (__userEntry.ipc?.onOpen) {
        __ipcInitialized = true;
        await __userEntry.ipc.onOpen({ sendMessage: __sendMessage });
      }
      // The host restarts with new stubs when these changed, else asks for the check.
      const exportTypes = await __exportTypes().catch(() => undefined);
      __sendMessage({ event: "module-reloaded", exportTypes });
    } catch (e) {
      __sendMessage({ event: "module-reloaded", error: String(e) });
    }
    return;
  }

  if (msg.type === "check-exports") {
    __runExportsCheck();
    return;
  }

  if (msg.type === "shutdown") {
    if (__userEntry?.ipc?.onClose) {
      await __userEntry.ipc.onClose();
    }
    return;
  }
}

// The host warns (deduped across restarts). \`withTypes\`: also report the
// entry's classes, which the host restarts for when they change the stubs.
function __runExportsCheck(withTypes) {
  Promise.all([__checkExports(), withTypes ? __exportTypes() : undefined]).then(
    ([warnings, exportTypes]) =>
      (warnings || exportTypes) && __sendMessage({ event: "worker-exports", warnings, exportTypes }),
    () => {},
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // IPC: a plain request loads the entry (its export types, or a 500 with the
    // error), then the WebSocket upgrade opens the channel.
    if (url.pathname === __IPC_PATH) {
      try {
        await __ensureEntry(env);
      } catch (e) {
        const message = "Failed to load entry: " + String(e) + __errorLocation(e);
        return new Response(message, { status: 500 });
      }
      // A \`resolveExports()\` hook may need the IPC channel (host data sent once
      // ready), so its classes are reported after the channel opens.
      if (request.headers.get("upgrade") !== "websocket") {
        const exportTypes = __userEntry.resolveExports
          ? undefined
          : await __exportTypes().catch(() => undefined);
        return Response.json({ exportTypes });
      }

      const pair = new WebSocketPair();
      const client = pair[0];
      const server = pair[1];
      server.accept();
      __serverWs = server;

      server.addEventListener("message", (event) => {
        __handleWsMessage(env, event.data);
      });

      // Initialize IPC hooks
      if (!__ipcInitialized && __userEntry.ipc) {
        __ipcInitialized = true;
        if (__userEntry.ipc.onOpen) {
          await __userEntry.ipc.onOpen({ sendMessage: __sendMessage });
        }
      }

      // In the socket's request context, which outlives the check.
      __runExportsCheck(Boolean(__userEntry.resolveExports));

      return new Response(null, { status: 101, webSocket: client });
    }

    if (!__userEntry) {
      return new Response("Worker not initialized", { status: 503 });
    }

    __ipcEnv = env;

    ${c}
  }
};
`}var De=`/__env_runner_ipc`,Q=new Map,Oe=class extends d{#e;#t;#n;#r=0;#i;#a;#o;#s;#c;#l;#u;#d;#f;#p;#m;#h;#g;#_;#v;#y;#b;#x;#S;constructor(e){super({...e,workerEntry:``}),this.#S=e.miniflare,this.#t=e.miniflareOptions||{},this.#n=e.transformRequest,this.#u=e.persistent??!1,this.#f=e.exports??{},this.#p=e.captureErrors??!0,this.#m=e.crossws,this.#h=e.exportConditions??[`workerd`,`worker`],this.#g=e.wrangler??!1,this.#_=e.wranglerEnv??{}.CLOUDFLARE_ENV,this.#x=e.wranglerModule,this.#v=e.wranglerConfigPath,this.#y=e.wranglerEnvFiles,this.#b=e.compatibilityDate,!this._rejectListen()&&this._initWithVirtualData(()=>this.#O())}async shutdown(){await this.close()}static async disposeAll(){let e=[...Q.values()];Q.clear();for(let t of e)await t.mf.dispose().catch(()=>{})}async dispose(){this.#e&&=(this.#l&&=(this.#l.send(JSON.stringify({type:`shutdown`})),this.#l.close(),void 0),this.#d&&Q.get(this.#d)?.mf===this.#e&&Q.delete(this.#d),await this.#e.dispose(),void 0),this.closed||await this.close()}async fetch(e,t){for(let e=0;e<5&&!this._address&&!this.closed;e++)await new Promise(t=>setTimeout(t,100*2**e));if(!this.#e||this.closed)return new Response(`miniflare env runner is unavailable`,{status:503});let n=this._resolveFetchInput(e),r=typeof n==`string`||n instanceof URL?new Request(n,{...t,redirect:`manual`}):new Request(new Request(n.url,n),{...t,redirect:`manual`,referrer:t?.referrer??n.referrer,referrerPolicy:t?.referrerPolicy??n.referrerPolicy}),i=await this.#e.dispatchFetch(r.url,r);return i instanceof Response?i:new Response(i.body,{status:i.status,statusText:i.statusText,headers:i.headers})}sendMessage(e){if(!this.#l&&this.#o)throw Error(`Miniflare env runner is disconnected after a failed restart; call reloadModule() to retry.`);if(!this.#l)throw Error(`Miniflare env runner should be initialized before sending messages.`);e?.type===`ping`?queueMicrotask(()=>this._handleMessage({type:`pong`,data:e.data})):this.#l.send(JSON.stringify({type:`message`,data:e}))}async reloadModule(e=5e3){if(await this._virtualUpdates,await this.#s,this.#o){await this.#N(this.#o);return}if(!this.#l)throw Error(`Miniflare env runner should be initialized before reloading.`);if(!this._data?.entry)return;this.#r++;let{exportTypes:t}=await this._request({type:`reload`,version:this.#r},{match:e=>e?.event===`module-reloaded`,timeout:e,timeoutError:`Module reload timed out`,send:e=>this.#l.send(JSON.stringify(e))}),n=this.#w(t);n?await this.#N(n):this.#l?.send(JSON.stringify({type:`check-exports`}))}async _applyVirtualUpdates(e){let t=this.#i;if(!t)throw Error(`Miniflare env runner should be initialized before updating modules.`);let n={};for(let[t,r]of Object.entries(e))r!==null&&(n[t]=await this.#A(t,r));await a;let r={...t.sources,...n},i=Xe(r,Ye(Object.keys(r))),o=_(r,Object.keys(e),i);for(let r of Object.keys(e))Object.hasOwn(n,r)?(t.sources[r]=n[r],t.removed.delete(r)):Object.hasOwn(t.sources,r)&&(delete t.sources[r],t.removed.add(r));for(let e of o)t.versions.set(e,++t.version);Je(t),this.#d&&Q.get(this.#d)===this.#c&&Q.delete(this.#d)}_handleMessage(e){e?.event===`worker-exports`?this.#T(e):super._handleMessage(e)}_hasRuntime(){return!!this.#e}_runtimeType(){return`miniflare`}_resolveConditions(){return this.#h}async _closeRuntime(){if(!this.#e)return;this.#l&&=(this.#l.send(JSON.stringify({type:`shutdown`})),this.#l.close(),void 0);let e=this.#c;e?(e.refCount--,e.refCount<=0&&(this.#d&&Q.get(this.#d)===e&&Q.delete(this.#d),await this.#e.dispose())):await this.#e.dispose(),this.#e=void 0}async#C(){let e=await this.#e.dispatchFetch(`http://localhost`+De),t=await e.text().catch(()=>``);if(!e.ok)throw Error(`Failed to establish WebSocket IPC channel (${e.status}: ${t})`);try{return JSON.parse(t).exportTypes}catch{return}}#w(e){if(this.#a&&I(e))return this.#a.update(Me(e))}#T(e){if(this.closed||this.#s||this.#o)return;let t=this.#w(e.exportTypes);t?this.#s=this.#N(t).catch(e=>{this.closed||console.error(`[env-runner]`,e)}).finally(()=>{this.#s=void 0}):this.#E(e.warnings)}#E(e){let t=this.#a;if(!t||!Array.isArray(e))return;let n=e.join(`
`);n&&n!==t.warnings&&console.warn(`[env-runner] Worker exports:
  - `+e.join(`
  - `)),t.warnings=n}async#D(){return this.#S=await y({name:`miniflare`,option:`miniflare`,value:this.#S,expect:`Miniflare`,required:!0,hint:'MiniflareEnvRunner cannot run without it (`import * as miniflare from "miniflare"`).'}),this.#S}#O(){this.#j().catch(e=>{console.error(`Miniflare runner init error:`,e),this.close(e)})}async upgrade(e){if(!this.#e||this.closed){e.node.socket.destroy();return}let n=await this.#e.unsafeGetDirectURL(),r=new URL(n);try{await t({host:r.hostname,port:Number(r.port)},e.node.req,e.node.socket,e.node.head)}catch{}}async#k(){let e=this._data?.virtual??{},t={};for(let[n,r]of Object.entries(e))t[n]=await this.#A(n,r);return t}async#A(e,t){let n=r(e,t),a=typeof t==`string`?t:t.source;switch(n){case`module-typescript`:case`commonjs-typescript`:return{source:v(e,a,await et(),{requirement:`on the host (workerd does not parse TypeScript)`,remedy:`upgrade Node.js`}),format:n===`module-typescript`?`module`:`commonjs`};case`jsx`:case`tsx`:throw i(e,n,`workerd`)}return{source:a,format:n}}async#j(){let e=await this.#D(),t=await Fe(e),r=this._data?.entry,i=await this.#k(),u=qe({...i});this.#i=u;let{options:d,configFile:_,exports:v}=await ee({wrangler:this.#g,env:this.#_,entryPath:r,configPath:this.#v,wranglerModule:this.#x,envFiles:this.#y}),y=this.#t.compatibilityFlags||[],b=d?.compatibilityFlags||[],x=this.#t.unsafeDirectSockets||[],S={modules:!0,...this.#g&&!ze(this.#t)?{defaultPersistRoot:Be(_,typeof this.#g==`string`?this.#g:this.#v)}:void 0,...d,...this.#t,compatibilityDate:Ie([this.#t.compatibilityDate,this.#b===`latest`?t:this.#b,d?.compatibilityDate],t),compatibilityFlags:Le(b,y),unsafeDirectSockets:[{host:`127.0.0.1`,port:0},...x]};if(d)for(let[e,t]of Object.entries(d)){let n=this.#t[e];I(t)&&I(n)&&(S[e]={...t,...n})}let C={runner:this};if(r&&!S.script&&!S.scriptPath){let t=u.keyOf(r)??u.keyOf((0,w.resolve)(r)),i=t!==void 0,d=i?$(t)??t:(0,w.resolve)(r),g=(0,w.isAbsolute)(d)?d:(0,w.resolve)(`__env_runner_virtual_entry__.mjs`),_=(0,w.dirname)(g),y=typeof this.#f==`object`?this.#f:{},b=typeof this.#f==`string`?{}:be({options:S,wranglerExports:v,explicit:y}),x=this.#f!==!1&&typeof this.#f!=`string`,T=x&&Object.keys(b).length===0;x&&await a;let E=x?ke(i?s(t,u.sources[t]):He(d)):{},D=S.durableObjects,O=S.additionalUnboundDurableObjects,k=I(D)?D:{},A=new Set(Object.values(k).map(xe)),j=_+`/__env_runner_wrapper.mjs`,M=typeof this.#f==`string`,N=e=>({...this.#f===!1?{}:e,...b}),P=e=>{let t=N(e),n={...k};for(let r of Object.keys({...y,...T&&e})){let e=Ue(r);t[r]===`DurableObject`&&!A.has(r)&&!n[e]&&(n[e]=r)}Object.keys(n).length>0?S.durableObjects=n:D===void 0&&delete S.durableObjects;let r=T?[]:Object.keys(t).filter(e=>!(e in b)&&t[e]===`DurableObject`).map(e=>({className:e}));r.length>0?S.additionalUnboundDurableObjects=[...Array.isArray(O)?O:[],...r]:O===void 0?delete S.additionalUnboundDurableObjects:S.additionalUnboundDurableObjects=O;let a=Ee(i?Ke(d):d,{dynamicOnly:!0,captureErrors:this.#p,exports:typeof this.#f==`string`?this.#f:t,configuredExports:Object.keys(T?t:b),nodeCompat:!S.compatibilityFlags.includes(`no_nodejs_compat`),crossws:this.#m,crosswsServer:nt||=p(`crossws/server`,{from:import.meta.url,conditions:[`workerd`,`import`],try:!0})});return M?S.modules=[{type:`ESModule`,path:j,contents:a}]:(S.script=a,S.scriptPath=j),t},F={stubs:P(E),update:t=>{if(!(M||Ne(N(t),F.stubs)))return F.stubs=P(t),Pe(e,S)},warnings:``};if(this.#a=F,S.modulesRoot||=`/`,S.unsafeEvalBinding=Te,S.serviceBindings={...S.serviceBindings||{},[we]:async e=>{try{let t=await e.json();C.runner._handleMessage(t)}catch{}return new Response(null,{status:204})}},(this.#n||this._plugins)&&!S.modulesRules&&!e.convertV4MiniflareOptions&&!M&&(S.modulesRules=[{type:`ESModule`,include:[`.ts`,`.tsx`,`.jsx`,`.mts`,...this._plugins?[`.cts`]:[]].map(e=>`**/*${e}`)}]),!S.unsafeModuleFallbackService){let e=(0,w.createRequire)(g),t=u,r=this.#n,i=()=>C.runner._plugins,s=this.#h,d=(e,n)=>Qe(e,t.versions,e=>t.versionedKeyOf(e,n)),_=(e,t)=>{let{source:n}=e;switch(e.format){case`module`:return{esModule:d(n,t)};case`commonjs`:return{commonJsModule:n,namedExports:it(n)};case`json`:return{json:n};case`text`:return{text:n};case`bytes`:return{esModule:o(`bytes`,n)};case`wasm`:return{wasm:Array.from(n)}}},v=async(e,t)=>{if(t.moduleType!==`ts`)return t.code;let n=await et();if(typeof n!=`function`)throw TypeError(`[env-runner] "${e}" is still TypeScript after its plugins, which needs \`module.stripTypeScriptTypes\` on the host: upgrade Node.js or compile it in a plugin.`);return n(t.code)},y=async(e,t)=>{if(t.moduleType===`json`)return{esModule:n(e,t.code)};let r=await v(e,t);return h(e,r)===`module`?{esModule:d(r,void 0)}:{commonJsModule:r,namedExports:it(r)}},b=new Map,x=(e,t)=>{let n=t?.message||String(t);return console.error(n),Response.json({name:e,esModule:`throw new Error(${JSON.stringify(n)});`})};S.unsafeUseModuleFallbackService=!0;let T=new Map,E=new Map,D=new Map,O=Promise.all([rt(),a]);S.unsafeModuleFallbackService=async a=>{await O;let o=new URL(a.url),u=o.searchParams.get(`specifier`),S=o.searchParams.get(`rawSpecifier`),C=o.searchParams.get(`referrer`)||``;if(!u)return new Response(null,{status:404});let k=u.split(`?`)[0]||u,A=S?.split(`?`)[0],j=a.headers.get(`x-resolve-method`)===`require`?`require`:`import`,M=k.startsWith(`/`)?k.slice(1):k,N=C.startsWith(`/`)?C.slice(1):C,P=T.get(N),F=[A,k,M].find(e=>e!==void 0&&Object.hasOwn(t.sources,e))??(A?t.keyOf(A,P):void 0)??t.keyOf(k);if(F!==void 0){let e=u.includes(`?`)?u.slice(u.indexOf(`?`)):``,n=$(F);if(n&&A?.startsWith(`file:`)&&k!==n&&k.includes(`file:`)){let t=Buffer.from(Ke(n)+e,`utf8`).toString(`latin1`);return new Response(null,{status:301,headers:{location:t}})}let r=M+e;return n&&T.set(r,n),Response.json({name:r,..._(t.sources[F],n)})}let I=u.includes(`?`)?u.slice(u.indexOf(`?`)):``,L=(k.startsWith(`/`)?k.slice(1):k)+I,ee=t.versionedKeyOf(A||k,P),R=ee===void 0?void 0:t.versions.get(ee),z=c(m(u,R)),B,V,H=!1,U=!1,W=i(),G=S?m(S,R):M+z,K=async e=>{if(W)try{let n=G.startsWith(`file:`)?(0,w.fileURLToPath)(l(G))+c(G):G;if(!W.resolveFilter(n,e))return;let r=await W.resolveId(n,b.get(N)??P,{fallback:e});if(!r||r.external)return;let i=r.id,a=l(i),o=(0,w.isAbsolute)(a)?t.keyOf(a):void 0,s=o===void 0?void 0:$(o);if(s){let e=f(Ke(s)+c(i),u);return new Response(null,{status:301,headers:{location:Buffer.from(e,`utf8`).toString(`latin1`)}})}if((0,w.isAbsolute)(a))return V=i,H=!0,a;let d=await W.load(i);return b.set(L,i),Response.json({name:L,...await y(i,d)})}catch(e){return x(L,e)}},q=E.get(u);if(q)E.delete(u),B=q.path,V=q.id,H=q.id!==void 0;else if(j===`require`&&A?.startsWith(`node:`)&&u===A+dt)return Response.json({name:u,esModule:ft(A)});else{let e=await K(!1);if(e instanceof Response)return e;B=e}let te=A||k;if(B===void 0){if(te.startsWith(`file://`))try{B=(0,w.fileURLToPath)(te)}catch{return new Response(null,{status:404})}else if(A&&!A.startsWith(`.`)&&!A.startsWith(`/`)&&!(0,w.isAbsolute)(A)){let t=P,n=t?(0,w.createRequire)(t):e;if(A.startsWith(`cloudflare:`))return new Response(null,{status:404});if(A.startsWith(`node:`)){if(j===`require`){let e=A+dt;return new Response(null,{status:301,headers:{location:e}})}return new Response(null,{status:404})}try{B=p(A,{from:t||g,conditions:[...s,j],try:!0})||n.resolve(A)}catch{let e=await K(!0);if(e instanceof Response)return e;if(e===void 0){let e=k.startsWith(`/`)?k.slice(1):k;return Response.json({name:e,esModule:`export default undefined;`})}B=e}U=!0}else{let t=P||(C.startsWith(`/`)?C:`/`+C),n=(0,w.dirname)(t),r=A||k;if(r.startsWith(`.`)){if(B=(0,w.resolve)(n,r),j===`require`&&!Ve(B))try{B=(0,w.createRequire)(t).resolve(r),U=!0}catch{}}else if(A&&(0,w.isAbsolute)(A)&&!A.startsWith(`/`))B=A;else if(k.startsWith(`/`))B=k;else try{B=e.resolve(r)}catch{let e=await K(!0);if(e===void 0)return new Response(null,{status:404});if(e instanceof Response)return e;B=e}}}if(!H&&W&&!(0,w.existsSync)(B)){let e=await K(!0);if(e instanceof Response)return e;B=e??B}if(U||H){let e=Ke(B);if(k!==e){let t=H?f(e+c(V),u):e+I;return E.set(t,{path:B,id:H?V:void 0}),new Response(null,{status:301,headers:{location:Buffer.from(t,`utf8`).toString(`latin1`)}})}}if(r)try{let e=await r(B);if(e?.code)return T.set(L,B),Response.json({name:L,esModule:d(e.code,B)})}catch{}let J;try{J=(0,w.readFileSync)(B,`utf8`)}catch{}let ne=i(),Y=V??B+z,X=ne?.filter(Y,void 0,H);if(J===void 0&&!X)return new Response(null,{status:404});T.set(L,B),Y!==B&&b.set(L,Y);let Z;if(X){try{let e=B,t=await ne.load(Y,()=>{if(J===void 0)throw Error(`Cannot find module "${e}"`);return J},{resolved:H});if(t?.moduleType===`json`)return Response.json({name:L,esModule:n(e,t.code)});Z=t&&await v(Y,t)}catch(e){return x(L,e)}if(Z===void 0&&J===void 0)return new Response(null,{status:404})}if(Z===void 0&&B.endsWith(`.wasm`))return Response.json({name:L,wasm:Array.from((0,w.readFileSync)(B))});let re;return Z===void 0?(J=J,re=B.endsWith(`.mjs`)||!B.endsWith(`.cjs`)&&ut(J)):(J=Z,re=h(B,J)===`module`),re?Response.json({name:L,esModule:d(J,B)}):Response.json({name:L,commonJsModule:J,namedExports:ot(B,J,[...s,`require`],D)})}}}if(this.#u&&r){this.#d=We(r,{...this.#t,_exportConditions:this.#h,_exports:this.#f,_crossws:this.#m,_plugins:!!this._plugins,_virtual:g(i)});let e=Q.get(this.#d);e&&(this.#e=e.mf,e.refCount++,this.#c=e,e.ipc.runner=this,this.#i=e.virtual,this.#a=e.workerExports)}this.#e||(this.#e=new e.Miniflare(Pe(e,S)),await this.#e.ready,this.#u&&this.#d&&(this.#c={mf:this.#e,refCount:1,virtual:u,ipc:C,workerExports:this.#a},Q.set(this.#d,this.#c))),await this.#P(),await this.#M()}async#M(){let e=await this.#e.unsafeGetDirectURL();this.closed||this._handleMessage({address:{host:e.hostname,port:Number(e.port)}})}async#N(e){this.#l&&=(this.#l.send(JSON.stringify({type:`shutdown`})),this.#l.close(),void 0),this.#o=e;try{await this.#e.setOptions(e),await this.#P()}catch(e){throw Error(`Failed to restart Miniflare for the changed Worker exports (reloadModule() retries).`,{cause:e})}this.#o=void 0,this.closed||await this.#M()}async#P(){let e=this.#w(await this.#C());e&&(await this.#e.setOptions(e),await this.#C());let t=await this.#e.dispatchFetch(`http://localhost`+De,{headers:{upgrade:`websocket`}}),n=t.webSocket;if(!n){let e=await t.text().catch(()=>``);throw Error(`Failed to establish WebSocket IPC channel (${t.status}: ${e})`)}n.accept(),this.#l=n,n.addEventListener(`message`,e=>{try{let t=JSON.parse(e.data);this._handleMessage(t)}catch{}})}};function ke(e){let t={};if(!e)return t;let n,r;try{[n,r]=u(e)}catch{return t}let i=new Map;for(let t of n)if(t.type===`static`&&t.specifier===`cloudflare:workers`){let n=e.slice(t.importStart,t.importEnd);for(let[,e,t]of n.matchAll(/\b(DurableObject|WorkerEntrypoint|WorkflowEntrypoint)(?:\s+as\s+([\w$]+))?/g))i.set(t??e,e)}for(let n of r){if(n.type!==`direct`||n.typeOnly||n.name==="default"||!n.localName)continue;let r=Ae(e,n.localName,i);r&&(t[n.name]=r)}return t}function Ae(e,t,n,r=new Set){let i=je(e,t);if(i===void 0)return;let a=/\bextends\s+(?:[\w$]+\.)*([\w$]+)/.exec(i)?.[1];if(!a)return`DurableObject`;let o=n.get(a)??a;if(ye(o))return o;r.add(t);let s=r.has(a)?void 0:Ae(e,a,n,r);return s===void 0?Object.hasOwn(globalThis,a)&&typeof globalThis[a]==`function`?null:`DurableObject`:s}function je(e,t){let n=t.replace(/[$()*+.?[\\\]^{|}]/g,`\\$&`);return RegExp(`(?:(?<![\\w$])class\\s+${n}|(?<![\\w$.])${n}\\s*=\\s*class(?:\\s+(?!extends\\b)[\\w$]+)?)(?![\\w$])([^{]*)\\{`).exec(e)?.[1]}function Me(e){let t={};for(let[n,r]of Object.entries(e))ye(r)&&(t[n]=r);return t}function Ne(e,t){let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>e[n]===t[n])}function Pe(e,t){if(!e.convertV4MiniflareOptions)return t;let{defaultPersistRoot:n,...r}=t;return e.convertV4MiniflareOptions({resourcePersistencePath:n,...r})}async function Fe(e){if(typeof e.supportedCompatibilityDate==`string`)return e.supportedCompatibilityDate;try{let e=[process.cwd()+`/`,import.meta.url],t=p(`miniflare`,{from:e,try:!0}),n=p(`workerd`,{from:t||e}),{compatibilityDate:r}=await import((0,w.pathToFileURL)(n).href);if(!Re(r))return;let i=new Date().toISOString().slice(0,10);return r>i?i:r}catch{return}}function Ie(e,t){let n=e.find(e=>typeof e==`string`&&e)??t;return n&&t&&Re(n)&&Re(t)&&n>t?(console.warn(`[env-runner] compatibility date "${n}" is newer than the installed workerd supports; falling back to "${t}".`),t):n}function Le(e,t){let n=e=>e===`nodejs_compat`?`no_nodejs_compat`:e===`no_nodejs_compat`?`nodejs_compat`:void 0,r=[...e.filter(e=>!t.includes(n(e))),...t],i=r.includes(`no_nodejs_compat`)?[]:[`nodejs_compat`];return[...new Set([...i,...r])]}function Re(e){return/^\d{4}-\d{2}-\d{2}$/.test(e)}function ze(e){return Object.keys(e).some(e=>e===`defaultPersistRoot`||e===`resourcePersistencePath`||e.endsWith(`Persist`))}function Be(e,t){let n=e??(t?(0,w.resolve)(t):void 0);return(0,w.join)(n?(0,w.dirname)(n):process.cwd(),`.wrangler/state/v3`)}function Ve(e){try{return(0,w.statSync)(e).isFile()}catch{return!1}}function He(e){try{return(0,w.readFileSync)(e,`utf8`)}catch{return}}function Ue(e){return e.replace(/([a-z0-9])([A-Z])/g,`$1_$2`).toUpperCase()}function We(e,t){let n={};for(let[e,r]of Object.entries(t))typeof r!=`function`&&(n[e]=r);return`${(0,w.resolve)(e)}::${JSON.stringify(n)}`}var Ge=process.platform===`win32`;function $(e){if(Ge&&/^\/[A-Za-z]:\//.test(e)&&(e=e.slice(1)),e.startsWith(`file:`))try{return(0,w.fileURLToPath)(e)}catch{return}return(0,w.isAbsolute)(e)?(0,w.resolve)(e):void 0}function Ke(e){return Ge&&/^[A-Za-z]:[\\/]/.test(e)?`/`+e.replaceAll(`\\`,`/`):e}function qe(e){return Je({sources:e,removed:new Set,versions:new Map,version:0})}function Je(e){let t=Object.keys(e.sources);return e.keyOf=Ye(t),e.versionedKeyOf=e.removed.size>0?Ye([...t,...e.removed]):e.keyOf,e}function Ye(e){let t=new Set(e),n=new Map;for(let e of t){let t=$(e);t!==void 0&&n.set(t,e)}return(e,r)=>{let i=e.split(`?`)[0];if(t.has(i))return i;if(n.size===0)return;let a=/^\.\.?\//.test(i)?r&&(0,w.resolve)((0,w.dirname)(r),i):$(i);return a?n.get(a):void 0}}function Xe(e,t){let n=new Map;for(let[r,{source:i,format:a}]of Object.entries(e)){if(a!==`module`)continue;let e=$(r);for(let{specifier:a}of Ze(i)??[]){let i=t(a,e);if(i!==void 0&&i!==r){let e=n.get(i);e||n.set(i,e=new Set),e.add(r)}}}return n}function Ze(e){let t;try{[t]=u(e)}catch{return}let n=[];for(let e of t)typeof e.specifier!=`string`||e.type===`dynamic`&&e.glob||n.push({specifier:e.specifier,end:e.type===`dynamic`?e.end-1:e.end});return n}function Qe(e,t,n){if(t.size===0)return e;let r=Ze(e);if(!r)return e;let i=``,a=0;for(let{specifier:o,end:s}of r){let r=n(o),c=r===void 0?void 0:t.get(r);c&&(i+=e.slice(a,s)+(o.includes(`?`)?`&`:`?`)+`v=${c}`,a=s)}return i+e.slice(a)}var $e;function et(){return $e??=C(()=>import(`./__vite-browser-external-ChFrIcvn.js`).then(t=>e(t.default,1)).then(e=>e.stripTypeScriptTypes),__vite__mapDeps([0,1,2])),$e}var tt,nt;function rt(){return tt||=x(),tt}function it(e){try{return at(b(e).exports)}catch{return[]}}function at(e){return[...e].filter(e=>e!=="default"&&e!=="__esModule")}function ot(e,t,n,r){let i=new Set,a=new Set,o=(e,t)=>{a.add(e);for(let e of t?.exports||[])i.add(e);for(let e of t?.reexports||[])a.has(e)||o(e,ct(e,n,r))};return o(e,st(e,t,n)),at(i)}function st(e,t,n){let r;try{r=b(t)}catch{return}let i=[];for(let t of r.reexports){let r=lt(t,e,n);r&&(0,w.isAbsolute)(r)&&/\.c?js$/.test(r)&&i.push(r)}return{exports:r.exports,reexports:i}}function ct(e,t,n){if(n.has(e))return n.get(e);let r;try{let n=(0,w.readFileSync)(e,`utf8`);(e.endsWith(`.cjs`)||!ut(n))&&(r=st(e,n,t))}catch{}return/[/\\]node_modules[/\\]/.test(e)&&n.set(e,r),r}function lt(e,t,n){try{if(!e.startsWith(`.`)&&!(0,w.isAbsolute)(e)){let r=p(e,{from:t,conditions:n,try:!0});if(r)return r}return(0,w.createRequire)(t).resolve(e)}catch{return}}function ut(e){try{return u(e)[3]}catch{return/\b(import\s|import\(|export\s|export\{|import\.meta\b)/.test(e)}}var dt=`?__require`;function ft(e){let t=JSON.stringify(e),n=JSON.stringify(`No such module ${t}.`);return[`import * as __mod__ from ${t};`,`export * from ${t};`,`let __default__;`,`try { __default__ = __mod__.default ?? __mod__; } catch { throw new Error(${n}); }`,`export default __default__;`,``].join(`
`)}export{Oe as MiniflareEnvRunner};