# Gramin Udyam

Mobile-friendly rural entrepreneurship demo.

## Run locally
Node.js 18+: run node server.js and open http://localhost:3000. No dependencies.

## Deploy
Upload this folder to Vercel. No build command; framework Other; output directory project root. The api folder supplies Node serverless endpoints.

## Data and privacy
Sample JSON database in data/db.json. GET /api/data serves sample directories and guides. POST /api/support validates a request and returns a demo reference; it does NOT persist requests server-side or contact anyone. Requests persist only in browser localStorage, can be exported and deleted. Not a production support service. No authentication or real marketplace transactions.

## Offline
After an initial successful visit the service worker caches the application and sample data. First-ever offline access cannot work. Cache depends on browser storage availability. Offline requests are saved locally and are never automatically sent. In Marathi mode, all UI text, learning guides, businesses, hubs, calculators, and status indicators are fully translated into Marathi.

## Production next steps
Use an authenticated database, consent/retention policy, request rate limits, delivery integration, verified hubs and live support channels before serving real users.


## Multipage update
Dedicated Learn, Businesses, Tools, Support and About pages. Homepage has 12 sections. IntersectionObserver provides one-time scroll reveals; reduced-motion preference disables animation. Service worker v2 caches all pages after first visit.
