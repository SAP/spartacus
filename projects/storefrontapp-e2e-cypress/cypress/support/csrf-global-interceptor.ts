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
  cy.intercept(
    // Regex instead of `${Cypress.env('API_URL')}/authorizationserver/csrf` because
    // the authorization server may be on a different domain than the API.
    { method: 'GET', url: /\/authorizationserver\/csrf(?:\?|$)/ },
    (req) => {
      const log = Cypress.log({
        message: 'Found CSRF request',
        name: 'CSRF global interceptor',
        displayName: 'CSRF global interceptor',
        autoEnd: false,
      });
      // Node.js normalizes incoming HTTP headers to lowercase, so 'origin' is used
      // instead of 'Origin' to reliably read and set the header in Cypress interceptors.
      if (!req.headers['origin']) {
        log.set({
          message: `Applying Origin: ${config.customLoginOrigin}`,
        });
        req.headers['origin'] = config.customLoginOrigin;
      } else {
        log.set({
          message: `Using existing Origin: ${req.headers['origin']}`,
        });
      }
      log.end();
      req.continue();
    }
  );
});
