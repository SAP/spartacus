/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import { addB2bProductToCartAndCheckout } from '../../../../helpers/b2b/b2b-checkout';
import * as checkout from '../../../../helpers/checkout-flow';
import { ELECTRONICS_BASESITE } from '../../../../helpers/checkout-flow';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { interceptGet } from '../../../../support/utils/intercept';

context('B2B - Assisted Service Module', () => {
  const customer = {
    fullName: 'William Hunter',
    email: 'william.hunter@pronto-hw.com',
  };

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

    it("should fetch cost centers based on the emulated user's role", () => {
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
      asm.agentLogin('brandon.leclair@acme.com', 'pw4all');
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
