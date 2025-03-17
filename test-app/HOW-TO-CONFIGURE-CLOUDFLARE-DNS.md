## How to configure Cloudflare DNS for CCV2 deployment

Supposing you already have your domain purchased and your Cloudflare free account, and domain's DNS controlled by Cloudflare account, you can configure the following optimizations:
1. add DNS for the storefront
2. add DNS for the backend API (OCC) and media
3. Optimize images (transform to WebP/AVIF on the fly and cache in CDN)

Steps:
1. add DNS for the storefront
- in Cloudflare portal go to DNS settings of your domain and add a `CNAME` record for the storefront subdomain (e.g. `sparta.my-domain.com` -> `spartacusstore.YOUR-CCV2-DEPLOYMENT.myhybris.cloud`; note: for exact CCV2 storefront URL check your CCV2 portal)
  - In Cloudflare portal press [Cmd+K] (search) and paste "DNS"
  - Note: while adding a DNS record in Cloudflare, leave `Proxied` (not `DNS only`). Thanks to this, Cloudflare will reverse-proxy and cache the storefront content
- in CCV2 portal add a new endpoint for the storefront with your new subdomain (e.g. `sparta.my-domain.com`). See https://sap-cx.slack.com/archives/CFS80JAQ2/p1740647982710979?thread_ts=1740586833.700749&cid=CFS80JAQ2 
- in Cloudflare portal, add a Page Rule to connect with the CCV2 deployment with SSL Full mode for the whole top domain with asterisk (e.g. `*.my-domain.com`)
  - In Cloudflare portal press [Cmd+K] (search) and paste "page rule"
- in Cloudflare portal add a Caching Rule for your domain to "Cache Everything". Otherwise only JS,CSS would be cached, but not HTML.
  - In Cloudflare portal press [Cmd+K] (search) and paste "cache rule"
  - Note: in the future, after deploying changes to the storefront website, you might need to click button "Purge Cache" in the Cloudflare portal in the caching configuration
- add your Cloudflare TLS certificate to the CCV2 portal (see https://www.youtube.com/watch?v=2HPe0yFKomQ)

2. add DNS for the backend API (OCC) and media
- in Cloudflare portal go to DNS settings of your domain and add a `CNAME` record for the backend API (OCC) subdomain (e.g. `sparta-api.my-domain.com` -> `api.YOUR-CCV2-DEPLOYMENT.myhybris.cloud`; note: for exact CCV2 backend API URL check your CCV2 portal)
  - In Cloudflare portal press [Cmd+K] (search) and paste "DNS"


3. In Cloudflare portal enable the Images Transformations
- in Cloudflare Images section enable image transformations for your domain
  - In Cloudflare portal press [Cmd+K] (search) and paste "Images"
- Configure transformations to be allowed only for your media domain (e.g. `sparta-api.my-domain.com`)
  - then in your storefront don't use image paths with original media url (e.g. `<img src="originalMediaUrl">`), but use the base URL of the Image Optimization Proxy (e.g. `https://sparta-api.my-domain.com/cdn-cgi/image/format=auto/` concatenated with `originalMediaUrl`) - which will return the optimized image in WebP/AVIF format.