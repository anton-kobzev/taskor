import * as AppInfo from "./utils/appInfo"

const CACHE_NAME = AppInfo.APP_NAME + AppInfo.APP_VERSION

const APP_SHELL_TO_CACHE = ["/", "js/bundle.js", "css/style.css"]

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL_TO_CACHE))
    )
})

self.addEventListener("activate", event => {
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames =>
                Promise.all(
                    cacheNames
                        .filter(
                            cacheName =>
                                cacheName.startsWith(AppInfo.APP_NAME) &&
                                cacheName != CACHE_NAME
                        )
                        .map(cacheName => caches.delete(cacheName))
                )
            )
    )
})

self.addEventListener("fetch", event => {
    if (event.request.url.indexOf("/api") != -1) {
        event.respondWith(fetch(event.request))
    } else {
        event.respondWith(
            caches
                .open(CACHE_NAME)
                .then(cache =>
                    cache
                        .match(event.request)
                        .then(response => response || fetch(event.request))
                )
        )
    }
})
