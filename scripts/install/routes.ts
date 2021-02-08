// This file was automatically added by xdn deploy.
// You should commit this file to source control.

import { Router } from '@xdn/core/router'
import { angularRoutes } from '@xdn/angular'

const PAGE_TTL = 60 * 60 * 24
const FAR_FUTURE_TTL = 60 * 60 * 24 * 365 * 10

const CACHE_API = {
  browser: {
    maxAgeSeconds: PAGE_TTL,
    serviceWorkerSeconds: PAGE_TTL,
  },
  edge: {
    maxAgeSeconds: PAGE_TTL,
    staleWhileRevalidateSeconds: PAGE_TTL,
    forcePrivateCaching: true,
  },
}

const CACHE_ASSETS = {
  browser: {
    maxAgeSeconds: PAGE_TTL,
  },
  edge: {
    maxAgeSeconds: FAR_FUTURE_TTL,
    staleWhileRevalidateSeconds: PAGE_TTL,
    forcePrivateCaching: true,
  },
}

const CACHE_SSR_PAGE = {
  prefetchUpstreamRequests: true,
  edge: {
    maxAgeSeconds: PAGE_TTL * 365,
    staleWhileRevalidateSeconds: PAGE_TTL * 365,
    forcePrivateCaching: true,
  },
}

export default new Router()
  .match('/occ/v2/:path*', ({ cache, proxy }) => {
    proxy('commerce')
  })
  .match('/medias/:path*', ({ cache, proxy }) => {
    cache(CACHE_ASSETS)
    proxy('commerce')
  })
  .post('/authorizationserver/oauth/:path*', ({ proxy }) => {
    proxy('commerce')
  })
  .post('/acceleratorservices/sop-mock/process', ({ proxy }) => {
    proxy('commerce')
  })
  // Example route that forces prefetching of requests listed in an x-xdn-upstream-requests header
  .get('/products/:path*', ({ cache }) => {
    cache(CACHE_SSR_PAGE)
  })
  .use(angularRoutes)
