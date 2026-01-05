/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isMobile } from '../helpers/viewport-context';
import { whenJDK17, whenJDK21 } from './utils/jdk-versions';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Selects the Login/Register link.
       * This command is viewport-aware (desktop and mobile).
       *
       * @param options - Options object. If clickAndWait is true, clicks the link and waits for the login page request to complete.
       *
       * @example
       * // Just get the link element
       * cy.getLoginRegisterLink();
       *
       * @example
       * // Get the link and click it, waiting for the login page request
       * cy.getLoginRegisterLink({ clickAndWait: true });
       *
       * @example
       * // Get the link and click it without waiting
       * cy.getLoginRegisterLink().click();
       *
       */
      getLoginRegisterLink: (options?: {
        clickAndWait?: boolean;
      }) => Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add(
  'getLoginRegisterLink',
  (options?: { clickAndWait?: boolean }) => {
    const selector = isMobile()
      ? '.navigation .SiteLogin cx-login a'
      : '.header .SiteLogin cx-login a';
    const link = cy.get(selector);

    if (options?.clickAndWait) {
      whenJDK17(() => {
        cy.intercept({
          method: 'GET',
          pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/cms/pages`,
          query: {
            pageLabelOrId: '/login',
          },
        }).as('loginQuery');

        link.click({ force: true });
        cy.wait('@loginQuery').its('response.statusCode').should('eq', 200);
      });
      whenJDK21(() => {
        link.click({ force: true });
        cy.url().should('contain', '/login');
      });
    }

    return link;
  }
);
