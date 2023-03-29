/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import * as asm from '../../../../helpers/asm';
import { ELECTRONICS_BASESITE } from '../../../../helpers/checkout-flow';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { user } from '../../../../sample-data/checkout-flow';
import { register } from '../../../../helpers/auth-forms';
import { addB2bProductToCartAndCheckout } from '../../../../helpers/b2b/b2b-checkout';
import { interceptGet } from '../../../../support/utils/intercept';

context('B2B - Assisted Service Module', () => {
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

    // This test only works if "sap-commerce-cloud-user-id" is added to the allowed headers of "corsfilter.commercewebservices.allowedHeaders" on the Commerce Cloud side (CXSPA-1355)
    it.skip("should fetch cost centers based on the emulated user's role", () => {
      cy.cxConfig({
        context: {
          baseSite: ['powertools-spa'],
          currency: ['USD'],
        },
      });

      cy.visit('/', { qs: { asm: true } });

      cy.visit('/login/register');

      register(user, true);

      asm.agentLogin('asagent', 'pw4all');

      asm.startCustomerEmulation(user, true);

      addB2bProductToCartAndCheckout();

      cy.get('input[type=radio]#paymentType-ACCOUNT').click();

      interceptGet('getCostCenters', '/costcenters*');

      cy.findByText(/Continue/i).click();

      cy.wait('@getCostCenters');
    });
  });
});
