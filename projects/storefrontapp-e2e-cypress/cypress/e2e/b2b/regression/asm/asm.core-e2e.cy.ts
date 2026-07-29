/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import { agentLoginForJDK21 } from '../../../../helpers/auth-forms';
import { addB2bProductToCartAndCheckout } from '../../../../helpers/b2b/b2b-checkout';
import * as checkout from '../../../../helpers/checkout-flow';
import { ELECTRONICS_BASESITE } from '../../../../helpers/checkout-flow';

import {
  getASMB2BCustomer,
  getB2BAgent,
} from '../../../../sample-data/asm-flow';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { interceptGet } from '../../../../support/utils/intercept';
context('B2B - Assisted Service Module', () => {
  const customer = getASMB2BCustomer();
  const b2bAgent = getB2BAgent();
  before(() => {
    clearAllStorage();
  });

  describe('Powertools Site', () => {
    before(() => {
      Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    });

    after(() => {
      Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
    });

    it("should fetch cost centers based on the emulated user's specific role", () => {
      cy.cxConfig({
        context: {
          baseSite: ['powertools-spa'],
          currency: ['USD'],
        },
      });

      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      cy.whenJDK17(() => {
        asm.agentLogin(b2bAgent.userName, b2bAgent.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2bAgent.userName, b2bAgent.password);
      });
      cy.log('--> Agent emulate customer');
      asm.startCustomerEmulation(customer, true);

      addB2bProductToCartAndCheckout();

      cy.get('input[type=radio]#paymentType-ACCOUNT').click();

      interceptGet('getCostCenters', '/costcenters*');

      cy.findByText(/Continue/i).click();

      cy.wait('@getCostCenters').its('response.statusCode').should('eq', 200);
    });
  });
});
