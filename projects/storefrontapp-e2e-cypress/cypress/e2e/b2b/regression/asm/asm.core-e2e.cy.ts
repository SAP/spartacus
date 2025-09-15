/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import { agentLoginForJDK21 } from '../../../../helpers/auth-forms';
import { addB2bProductToCartAndCheckout } from '../../../../helpers/b2b/b2b-checkout';
import * as checkout from '../../../../helpers/checkout-flow';
import { ELECTRONICS_BASESITE } from '../../../../helpers/checkout-flow';

import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { interceptGet } from '../../../../support/utils/intercept';
import {
  getAgentB2BToken,
  getASMB2BCustomer,
} from '../../../../sample-data/asm-flow';

context('B2B - Assisted Service Module', () => {
  const customer = getASMB2BCustomer();
  const agentB2BToken = getAgentB2BToken();
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
        asm.agentLogin(agentB2BToken.userName, agentB2BToken.pwd);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(agentB2BToken.userName, agentB2BToken.pwd);
      });
      cy.log('--> Agent emulate customer');
      asm.startCustomerEmulation(customer, true);

      addB2bProductToCartAndCheckout();

      cy.get('input[type=radio]#paymentType-ACCOUNT').click();

      interceptGet('getCostCenters', '/costcenters*');

      cy.findByText(/Continue/i).click();

      cy.wait('@getCostCenters');
    });
  });
});
