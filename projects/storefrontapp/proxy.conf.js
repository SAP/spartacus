/**
 * Angular dev-server proxy configuration.
 *
 * Forwards /bff/* to the BFF dev server. The target is read from the
 * CX_BFF_BASE_URL environment variable so developers can point at a remote
 * BFF or a non-default local port without changing this file.
 *
 * The origin is stripped to just the host — e.g.
 *   CX_BFF_BASE_URL=https://localhost:8482/bff/api  →  target: https://localhost:8482
 *   CX_BFF_BASE_URL=https://bff.staging.example.com/bff/api  →  target: https://bff.staging.example.com
 *
 * Falls back to https://localhost:8482 when CX_BFF_BASE_URL is not set.
 */

const bffBaseUrl = process.env['CX_BFF_BASE_URL'] || 'https://localhost:8482/bff/api';
const bffTarget = new URL(bffBaseUrl).origin;

module.exports = {
  '/bff': {
    target: bffTarget,
    secure: false,
    changeOrigin: true,
    logLevel: 'info',
  },
};
