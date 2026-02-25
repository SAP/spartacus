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
  cy.intercept('GET', config.csrfUrl, (req) => {
    const log = Cypress.log({
      message: 'Found CSRF request',
      name: 'CSRF global interceptor',
      displayName: 'CSRF global interceptor',
      autoEnd: false,
    });
    if (!req.headers['Origin']) {
      log.set({
        message: `Applying Origin: ${config.customLoginOrigin}`,
      });
      req.headers['Origin'] = config.customLoginOrigin;
    } else {
      log.set({
        message: `Using existing Origin: ${req.headers['Origin']}`,
      });
    }
    log.end();
    req.continue();
  });
});
