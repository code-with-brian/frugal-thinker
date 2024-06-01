import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_C-F7cyNv.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://frugalthinker.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/brian/code/frugal-thinker/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/brian/code/frugal-thinker/src/components/home/cards/Welcome.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/brian/code/frugal-thinker/src/components/home/Bento.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/index.astro":"chunks/prerender_CbmnoLXO.mjs","\u0000@astrojs-manifest":"manifest_yyWUgnfw.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DHNDrwzn.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_CBPDxcjc.mjs","C:/Users/brian/code/frugal-thinker/src/content/goals/2024-04-02-pay-off-master-card.md":"chunks/2024-04-02-pay-off-master-card_BTLpjhoP.mjs","C:/Users/brian/code/frugal-thinker/src/content/goals/2024-04-02-pay-off-visa-1.md":"chunks/2024-04-02-pay-off-visa-1_BrMr018Z.mjs","C:/Users/brian/code/frugal-thinker/src/content/goals/2024-04-02-stop-drinking-acohal.md":"chunks/2024-04-02-stop-drinking-acohal_DdhWmMBn.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-1.md?astroContentCollectionEntry=true":"chunks/post-1_alAe8iBr.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-2.md?astroContentCollectionEntry=true":"chunks/post-2_mwcILie1.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-3.md?astroContentCollectionEntry=true":"chunks/post-3_BrW2OGCb.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-4.md?astroContentCollectionEntry=true":"chunks/post-4_hBP3n8qw.mjs","C:/Users/brian/code/frugal-thinker/src/content/goals/2024-04-02-pay-off-master-card.md?astroContentCollectionEntry=true":"chunks/2024-04-02-pay-off-master-card_CduxqalM.mjs","C:/Users/brian/code/frugal-thinker/src/content/goals/2024-04-02-pay-off-visa-1.md?astroContentCollectionEntry=true":"chunks/2024-04-02-pay-off-visa-1_CGlharts.mjs","C:/Users/brian/code/frugal-thinker/src/content/goals/2024-04-02-stop-drinking-acohal.md?astroContentCollectionEntry=true":"chunks/2024-04-02-stop-drinking-acohal_DedxuPKz.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-1.md?astroPropagatedAssets":"chunks/post-1_Dw0ece2Q.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-2.md?astroPropagatedAssets":"chunks/post-2_DMo-W2P4.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-3.md?astroPropagatedAssets":"chunks/post-3_DbALYwQU.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-4.md?astroPropagatedAssets":"chunks/post-4_B8qQtlx_.mjs","C:/Users/brian/code/frugal-thinker/src/content/goals/2024-04-02-pay-off-master-card.md?astroPropagatedAssets":"chunks/2024-04-02-pay-off-master-card_U9VTncMZ.mjs","C:/Users/brian/code/frugal-thinker/src/content/goals/2024-04-02-pay-off-visa-1.md?astroPropagatedAssets":"chunks/2024-04-02-pay-off-visa-1_BXNqi2LU.mjs","C:/Users/brian/code/frugal-thinker/src/content/goals/2024-04-02-stop-drinking-acohal.md?astroPropagatedAssets":"chunks/2024-04-02-stop-drinking-acohal_8_YpASgA.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-1.md":"chunks/post-1_DtRJyqu5.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-2.md":"chunks/post-2_WGJg_PoV.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-3.md":"chunks/post-3_sjAR8X-w.mjs","C:/Users/brian/code/frugal-thinker/src/content/blog/post-4.md":"chunks/post-4_BsrMvmx-.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.C3x6h_b0.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/logo.B0qokxBt.png","/_astro/index.D_QyVw1E.css","/favicons/android-chrome-192x192.png","/favicons/android-chrome-384x384.png","/favicons/apple-touch-icon.png","/favicons/browserconfig.xml","/favicons/favicon-16x16.png","/favicons/favicon-32x32.png","/favicons/favicon.ico","/favicons/mstile-150x150.png","/favicons/safari-pinned-tab.svg","/favicons/site.webmanifest","/images/avatar.jpg","/images/budget.jpg","/images/logo.png","/images/me_green_hat.jpg","/images/the-frugal-thinker-book.png","/videos/sample.mp4","/_astro/hoisted.C3x6h_b0.js","/index.html"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
