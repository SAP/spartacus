/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { config } from './utils/login';

/*
 * Set up global interceptor to modify CSRF requests to the authorization server.
 *
 * The authorization server validates the request Origin to ensure it matches an
 * allowed host name.  An effect of the cypress setting `chromeWebSecurity: false`
 * causes the Origin to excluded on cross-origin requests to avoid CORS issues,
 * however this will cause the CSRF request to fail because of the empty Origin.
 *
 * This interceptor will add the origin for CSRF requests to mimic the original
 * secure browser behavior.
 */
beforeEach(() => {
  // Match on the request path with a RegExp rather than the full URL string
  // built from `Cypress.env('API_URL')`. A full-URL string match is brittle:
  // any difference between the configured `API_URL` and the host the app
  // actually calls (e.g. `api2` vs `api`, a trailing slash) silently fails to
  // match, the handler never runs, and the CSRF request goes out with its
  // Origin stripped by `chromeWebSecurity: false` — which the authorization
  // server rejects with 400. The path is stable across environments.
  cy.intercept(
    { method: 'GET', url: /\/authorizationserver\/csrf(?:\?|$)/ },
    (req) => {
      const log = Cypress.log({
        message: 'Found CSRF request',
        name: 'CSRF global interceptor',
        displayName: 'CSRF global interceptor',
        autoEnd: false,
      });
      // Cypress normalizes request header names to lowercase, so a capitalized
      // `Origin` key never matches what is actually on the request. Setting a
      // capitalized key while a lowercase `origin` is already present leaves TWO
      // Origin headers on the wire, which the authorization server also rejects.
      // Drop any existing value and set a single, canonical lowercase `origin`
      // so validation always sees the storefront origin.
      //
      // Normalize to a bare `scheme://host[:port]`: an `Origin` header must not
      // carry a path or trailing slash, but `baseUrl` may (e.g. when it is
      // configured with a context path). `URL.origin` strips any path; fall
      // back to the raw value if it is not parseable.
      let origin = config.customLoginOrigin as string;
      try {
        origin = new URL(origin).origin;
      } catch {
        // keep the raw value
      }
      log.set({
        message: `Applying Origin: ${origin}`,
      });
      delete req.headers['origin'];
      req.headers['origin'] = origin;
      log.end();
      req.continue();
    }
  );
});
