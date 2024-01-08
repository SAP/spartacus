/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { user } from '../../../sample-data/checkout-flow';
import { register } from '../../../helpers/auth-forms';
import * as login from '../../../helpers/login';
import * as alerts from '../../../helpers/global-message';

import {
  ELECTRONICS_BASESITE,
  ELECTRONICS_CURRENCY,
} from '../../../helpers/checkout-flow';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

export const ELECTRONICS_STANDALONE_BASESITE = 'electronics-standalone';
export const POWERTOOLS_STANDALONE_BASESITE = 'powertools-standalone';

describe('Multisite Isolation', () => {
  before(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  beforeEach(() => {
    clearAllStorage();
  });

  describe('Standalone authorization', () => {
    beforeEach(() => {
      Cypress.env('BASE_SITE', ELECTRONICS_STANDALONE_BASESITE);

      cy.cxConfig({
        context: {
          baseSite: [ELECTRONICS_STANDALONE_BASESITE],
          currency: [ELECTRONICS_CURRENCY],
        },
      });
    });

    it.skip('should register customer on standalone environment', () => {
      cy.visit('/login/register');
      register(user);
    });

    it.skip('should not authenticate already registered customer outside isolated baseSite', () => {
      Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);

      cy.cxConfig({
        context: {
          baseSite: [ELECTRONICS_BASESITE],
          currency: [ELECTRONICS_CURRENCY],
        },
      });

      cy.visit('/login');

      login.listenForTokenAuthenticationRequest();
      login.loginUser();

      cy.wait('@tokenAuthentication')
        .its('response.statusCode')
        .should('eq', 400);

      cy.get(login.userGreetSelector).should('not.exist');

      alerts
        .getErrorAlert()
        .should('contain', 'Bad credentials. Please login again');
    });

    it.skip('should not authenticate already registered customer outside isolated baseSite (B2B)', () => {
      Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);

      cy.cxConfig({
        context: {
          baseSite: [POWERTOOLS_BASESITE],
          currency: ['USD'],
        },
      });

      cy.visit('/login');

      login.listenForTokenAuthenticationRequest();
      login.loginUser();

      cy.wait('@tokenAuthentication')
        .its('response.statusCode')
        .should('eq', 400);

      cy.get(login.userGreetSelector).should('not.exist');

      alerts
        .getErrorAlert()
        .should('contain', 'Bad credentials. Please login again');
    });

    it.skip('should authenticate the customer on the isolated baseSite', () => {
      cy.visit('/login');

      login.listenForTokenAuthenticationRequest();
      login.loginUser();

      cy.wait('@tokenAuthentication')
        .its('response.statusCode')
        .should('eq', 200);

      cy.get(login.userGreetSelector).should('exist');
    });
  });
});
