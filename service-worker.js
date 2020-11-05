const CACHE_NAME = 'knitting-time-1';
let urlsToCache = [
    '/',
    '/icon.png',
    '/maskable_icon.png',
    '/nav.html',
    '/index.html',
    '/pages/home.html',
    '/pages/benang.html',
    '/pages/jarum.html',
    '/pages/teknik.html',
    '/pages/pola.html',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    '/js/materialize.js',
    '/js/nav.js',
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/Acrylic.jpg',
    '/images/American Moss Stitch.jpeg',
    '/images/Athena.jpg',
    '/images/Bamboo Stitch.jpg',
    '/images/Basketweave Stitch.jpg',
    '/images/Big Mabel.jpg',
    '/images/Big Ply.jpg',
    '/images/Bulky.jpg',
    '/images/Checkerboard stitch.jpg',
    '/images/Chinese Wave Stitch.jpg',
    '/images/Corduroy.jpg',
    '/images/Crochet Hook.jpg',
    '/images/Curly.jpg',
    '/images/Diagonal Basketweave Stitch.jpg',
    '/images/Garter Stitch.jpg',
    '/images/Herringbone Lace Rib Stitch.jpg',
    '/images/Herringbone Stitch.jpg',
    '/images/Honeycomb Stitch.jpg',
    '/images/Jala.jpg',
    '/images/Katun.jpg',
    '/images/Kinlon.jpg',
    '/images/Knitting Needle.jpg',
    '/images/Mabel.jpg',
    '/images/Marvelous.jpg',
    '/images/Minlon.jpg',
    '/images/Nylon.jpg',
    '/images/Orchid.jpg',
    '/images/Panda.jpg',
    '/images/Polyester.jpg',
    '/images/Rasberry Stitch.jpg',
    '/images/Rayon.jpg',
    '/images/Seed Stitch.jpg',
    '/images/Single Rib Knit.jpg',
    '/images/Soft.jpg',
    '/images/Stockinette stitch.jpg',
    '/images/The Cartridge Belt Rib Stitch.jpg',
    '/images/The Linen Stitch.jpg',
    '/images/The Netted Stitch.jpg',
    '/images/The Purl Ridge Stitch.jpg',
    '/images/Tiles Stitch.jpg',
    '/images/knitting.jpg',
    '/images/benang.png',
    '/images/gunting.png',
    '/images/hakpen.png',
    '/images/meteran.png',
    '/images/jarum.png',
    '/images/lem.png',
    './manifest.json',
    'https://unpkg.com/aos@next/dist/aos.css',
    'https://unpkg.com/aos@next/dist/aos.js',
];

// Using assets from browser cache 
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
})

self.addEventListener("fetch", event => {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(response => {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

// Delete Old Cache in case of updating the web layout or content
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});