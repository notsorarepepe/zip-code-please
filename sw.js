"use strict";var precacheConfig=[["/zip-code-please/647bddc8ad4ae52ec41bc5c653314cc2.png","647bddc8ad4ae52ec41bc5c653314cc2"],["/zip-code-please/713808cfdaf0036ae21e332cdd7ffedd.png","713808cfdaf0036ae21e332cdd7ffedd"],["/zip-code-please/768c25b22b9cfe5e66ee930ccc48594e.png","768c25b22b9cfe5e66ee930ccc48594e"],["/zip-code-please/assets/favicon.ico","53ac170e970ad034a55ee15ce198708c"],["/zip-code-please/assets/icons/android-chrome-192x192.png","59e221032ab061cad83b6ce2bcddbde8"],["/zip-code-please/assets/icons/android-chrome-512x512.png","cf3fdf7af60a294d6d3f48cb7ad82488"],["/zip-code-please/assets/icons/apple-touch-icon.png","a0e46feb3cc577478b127936e739dd08"],["/zip-code-please/assets/icons/favicon-16x16.png","d712b605ed58419c7e6d4ab885d147b7"],["/zip-code-please/assets/icons/favicon-32x32.png","2f7ce797cf8f198dedb9a9f38b7ef13b"],["/zip-code-please/assets/icons/mstile-150x150.png","ba817517b2c4e1ba1ce802c4d4fafdb4"],["/zip-code-please/assets/images/approved-signal-128-pepe.png","647bddc8ad4ae52ec41bc5c653314cc2"],["/zip-code-please/assets/images/back-arrow.png","768c25b22b9cfe5e66ee930ccc48594e"],["/zip-code-please/assets/images/striped_bg.png","713808cfdaf0036ae21e332cdd7ffedd"],["/zip-code-please/bundle.b773f.js","b399861669ea76d6a55efaffd43bc746"],["/zip-code-please/favicon.ico","53ac170e970ad034a55ee15ce198708c"],["/zip-code-please/index.html","ebd8554d15de801a8a8b588fb5b3a098"],["/zip-code-please/manifest.json","e6d190c5e46d5ca2df882da708e3730a"],["/zip-code-please/route-demographics.chunk.68966.js","d5f5c248267e998f83db31a2cfffb5b3"],["/zip-code-please/route-home.chunk.0e3d7.js","590314264524fef5b1e940a113abf4e0"],["/zip-code-please/style.9e4f2.css","b4081fadf24336c90fd2ec76a1a9a27e"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=a),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,n,c){var t=new URL(e);return c&&t.pathname.match(c)||(t.search+=(t.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(n)),t.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var n=new URL(a).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,a){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],n=e[1],c=new URL(a,self.location),t=createCacheKey(c,hashParamName,n,!1);return[c.toString(),t]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!a.has(n)){var c=new Request(n,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+n+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(n,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!a.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),a=urlsToCacheKeys.has(n));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("index.html",self.location).toString(),a=urlsToCacheKeys.has(n)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});