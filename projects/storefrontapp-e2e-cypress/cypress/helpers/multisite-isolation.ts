/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { user } from '../sample-data/checkout-flow';
import { register } from './auth-forms';
import { ELECTRONICS_CURRENCY } from './checkout-flow';
import * as login from './login';

/**
 * Set specific baseSite configuration for test scenario.
 *
 * @param baseSite
 * @param currency
 */
export function setBaseSiteConfig(
  baseSite: string,
  currency: string = ELECTRONICS_CURRENCY
) {
  Cypress.env('BASE_SITE', baseSite);

  cy.cxConfig({
    context: {
      baseSite: [baseSite],
      currency: [currency],
    },
  });
}

export function verifyUserSession() {
  cy.visit('/login/register');

  register(user);

  login.listenForTokenAuthenticationRequest();
  login.loginUser();

  cy.wait('@tokenAuthentication').its('response.statusCode').should('eq', 200);

  cy.get(login.userGreetSelector).should('exist');
}
