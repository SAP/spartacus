/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { register } from '../../../helpers/auth-forms';
import { clickHamburger } from '../../../helpers/navigation';
import * as registerHelpers from '../../../helpers/register';
import { viewportContext } from '../../../helpers/viewport-context';
import { user } from '../../../sample-data/checkout-flow';

describe('Register', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    it('should register and redirect to login page', () => {
      cy.whenJDK17(() => {
        clickHamburger();
        cy.getLoginRegisterLink().click();
        cy.get('cx-login-register').findByText('Register').click();
      });
      cy.whenJDK21(() => {
        cy.visit('/login/register');
      });
      register(user);
      registerHelpers.verifyGlobalMessageAfterRegistration();
      const termsLink = `/${Cypress.env(
        'BASE_SITE'
      )}/en/USD/terms-and-conditions`;
      cy.visit('/login/register');
      cy.findByText('Terms & Conditions')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'href', termsLink);
      // We use visit here, as the blank would open it in new tab
      cy.visit(termsLink);
      cy.get('.title_holder h2').should('contain', 'Terms and Conditions');
    });
  });
});
