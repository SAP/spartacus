/*
 * Bundle Mock Server
 *
 * Intercepts cart API calls and injects bundle (entryGroups) data.
 * All other requests are proxied to the real backend.
 *
 * Usage:
 *   node mock-bundle-server.js
 *
 * Then start the frontend with:
 *   SPA_ENV=local-mock npm start
 */

const express = require('express');
const httpProxy = require('http-proxy');

const REAL_BACKEND = 'https://40.76.109.9:9002';
const MOCK_PORT = 9090;
const MOCK_CART_ID = 'mock-cart-001';

const app = express();
const proxy = httpProxy.createProxyServer({
  target: REAL_BACKEND,
  changeOrigin: true,
  secure: false,
});

proxy.on('error', (err, req, res) => {
  console.error('[proxy error]', err.message);
  res.writeHead(502, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'proxy error', message: err.message }));
});

// Inject CORS headers into every proxied response
proxy.on('proxyRes', (proxyRes) => {
  proxyRes.headers['access-control-allow-origin'] = '*';
  proxyRes.headers['access-control-allow-methods'] = 'GET,POST,PUT,DELETE,OPTIONS,PATCH';
  proxyRes.headers['access-control-allow-headers'] = 'Content-Type,Authorization,x-anonymous-consents,x-profile-tag-debug,x-consent-reference';
  proxyRes.headers['access-control-expose-headers'] = '*';
});

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_PRODUCTS = {
  'DSCN2102112': {
    code: 'DSCN2102112',
    name: 'Cyber-shot W55',
    price: { value: 199.0, formattedValue: '$199.00', currencyIso: 'USD' },
    images: [
      { imageType: 'PRIMARY', format: 'cartIcon', url: '/medias/sys_master/images/DSCN2102112.jpg' },
    ],
    stock: { stockLevel: 10, stockLevelStatus: 'inStock' },
  },
  '1934793': {
    code: '1934793',
    name: 'Wide Zoom Lens 18-200mm',
    price: { value: 299.0, formattedValue: '$299.00', currencyIso: 'USD' },
    images: [
      { imageType: 'PRIMARY', format: 'cartIcon', url: '/medias/sys_master/images/1934793.jpg' },
    ],
    stock: { stockLevel: 5, stockLevelStatus: 'inStock' },
  },
  '137220': {
    code: '137220',
    name: '16 GB Ultra SDHC I Memory Card',
    price: { value: 29.0, formattedValue: '$29.00', currencyIso: 'USD' },
    images: [
      { imageType: 'PRIMARY', format: 'cartIcon', url: '/medias/sys_master/images/137220.jpg' },
    ],
    stock: { stockLevel: 50, stockLevelStatus: 'inStock' },
  },
};

function buildMockCart(cartId) {
  const entries = [
    {
      entryNumber: 0,
      quantity: 1,
      product: MOCK_PRODUCTS['DSCN2102112'],
      basePrice: { value: 199.0, formattedValue: '$199.00' },
      totalPrice: { value: 199.0, formattedValue: '$199.00' },
      updateable: true,
    },
    {
      entryNumber: 1,
      quantity: 1,
      product: MOCK_PRODUCTS['1934793'],
      basePrice: { value: 299.0, formattedValue: '$299.00' },
      totalPrice: { value: 299.0, formattedValue: '$299.00' },
      updateable: true,
    },
    {
      entryNumber: 2,
      quantity: 2,
      product: MOCK_PRODUCTS['137220'],
      basePrice: { value: 29.0, formattedValue: '$29.00' },
      totalPrice: { value: 58.0, formattedValue: '$58.00' },
      updateable: true,
    },
  ];

  return {
    code: cartId,
    guid: cartId,
    name: 'My Bundle Cart',
    totalItems: 3,
    totalUnitCount: 4,
    subTotal: { value: 556.0, formattedValue: '$556.00' },
    totalPrice: { value: 556.0, formattedValue: '$556.00' },
    totalPriceWithTax: { value: 556.0, formattedValue: '$556.00' },
    totalDiscounts: { value: 0, formattedValue: '$0.00' },
    deliveryCost: { value: 0, formattedValue: '$0.00' },
    totalTax: { value: 0, formattedValue: '$0.00' },
    deliveryItemsQuantity: 4,
    pickupItemsQuantity: 0,
    net: true,
    appliedVouchers: [],
    appliedOrderPromotions: [],
    appliedProductPromotions: [],
    potentialOrderPromotions: [],
    potentialProductPromotions: [],
    entries,
    // entryGroups: two standalone entries + one CONFIGURABLEBUNDLE with nested child bundle
    entryGroups: [
      {
        entryGroupNumber: 1,
        label: 'Photography Starter Bundle',
        type: 'CONFIGURABLEBUNDLE',
        erroneous: false,
        entries: [
          { entryNumber: 0 },
        ],
        entryGroups: [
          {
            entryGroupNumber: 2,
            label: 'Lens & Storage',
            type: 'CONFIGURABLEBUNDLE',
            erroneous: false,
            entries: [
              { entryNumber: 1 },
              { entryNumber: 2 },
            ],
            entryGroups: [],
          },
        ],
      },
    ],
    user: { uid: 'current', name: 'Mock User' },
    saveTime: null,
    description: null,
  };
}

// ---------------------------------------------------------------------------
// Intercept: POST create cart — return mock cart so Spartacus uses our guid
// /occ/v2/{baseSite}/users/{userId}/carts
// ---------------------------------------------------------------------------
app.post('/occ/v2/:baseSite/users/:userId/carts', (req, res) => {
  console.log(`[mock] intercepted create cart: ${req.url}`);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(buildMockCart(MOCK_CART_ID));
});

// ---------------------------------------------------------------------------
// Intercept: GET single cart  (supports both anonymous guid and user cartId)
// /occ/v2/{baseSite}/users/{userId}/carts/{cartId}
// ---------------------------------------------------------------------------
app.get('/occ/v2/:baseSite/users/:userId/carts/:cartId', (req, res) => {
  const { cartId } = req.params;
  console.log(`[mock] intercepted cart request: ${req.url}`);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(buildMockCart(cartId));
});

// ---------------------------------------------------------------------------
// Intercept: GET carts list — return one mock cart so the app loads it
// /occ/v2/{baseSite}/users/{userId}/carts
// ---------------------------------------------------------------------------
app.get('/occ/v2/:baseSite/users/:userId/carts', (req, res) => {
  console.log(`[mock] intercepted carts list: ${req.url}`);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ carts: [buildMockCart(MOCK_CART_ID)] });
});

// ---------------------------------------------------------------------------
// Handle CORS preflight
// ---------------------------------------------------------------------------
app.options('/{*path}', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,x-anonymous-consents,x-profile-tag-debug,x-consent-reference');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.sendStatus(204);
});

// ---------------------------------------------------------------------------
// All other requests: proxy to real backend
// ---------------------------------------------------------------------------
app.use((req, res) => {
  console.log(`[proxy] ${req.method} ${req.url}`);
  proxy.web(req, res);
});

app.listen(MOCK_PORT, () => {
  console.log(`\n✓ Bundle mock server running at http://localhost:${MOCK_PORT}`);
  console.log(`  Proxying non-intercepted requests to: ${REAL_BACKEND}`);
  console.log(`\n  Intercepted routes:`);
  console.log(`    GET /occ/v2/:baseSite/users/:userId/carts`);
  console.log(`    GET /occ/v2/:baseSite/users/:userId/carts/:cartId`);
  console.log(`\n  To start the frontend:`);
  console.log(`    SPA_ENV=local-mock npm start\n`);
});
