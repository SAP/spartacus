/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isMobile } from '../helpers/viewport-context';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Selects the Login/Register link.
       * This command is viewport-aware (desktop and mobile).
       *
       * @param click - If true, clicks the link and waits for the login page request to complete.
       *
       * @example
       * cy.loginRegisterLinkSelect(true);
       */
      loginRegisterLinkSelect: (
        click?: boolean
      ) => Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('loginRegisterLinkSelect', (click = false) => {
  const selector = isMobile()
    ? '.navigation .SiteLogin cx-login a'
    : '.header .SiteLogin cx-login a';
  const link = cy.get(selector);

  if (click) {
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
  }

  return link;
});
