/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import * as checkout from '../../../../helpers/checkout-flow';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { ELECTRONICS_BASESITE } from '../../../../helpers/checkout-flow';
import * as asm from '../../../../helpers/asm';

context('Assisted Service Module', () => {
  const customer = {
    fullName: 'William Hunter',
    email: 'william.hunter@pronto-hw.com',
  };
  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });
  after(() => {
    Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
  });

  describe('B2B Asm Customer360 Promotion', () => {
    beforeEach(() => {
      checkout.visitHomePage('asm=true');
      asm.agentLogin('brandon.leclair@acme.com', 'pw4all');
      asm.startCustomerEmulation(customer, true);
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Promotion').click();
    });

    it('should contain coupon list (CXSPA-3906)', () => {
      cy.get('cx-asm-customer-coupon').contains('Coupons').should('be.visible');
    });
    it('should be able to apply coupon to cart (CXSPA-3906)', () => {
      cy.get('.cx-asm-customer-promotion-listing-row')
        .first()
        .within(() => {
          cy.intercept('POST', /\.*\/vouchers\?voucherId=.*/).as('applyCoupon');
          cy.get('button').contains('Apply to Cart').click();
          cy.wait('@applyCoupon').its('response.statusCode').should('eq', 200);
          cy.get('button').should('not.contain', 'Apply to Cart');
          cy.get('button').contains('Remove').should('be.visible');
        });
    });
    it('should be able to remove coupon from cart (CXSPA-3906)', () => {
      cy.get('.cx-asm-customer-promotion-listing-row')
        .first()
        .within(() => {
          cy.intercept('DELETE', /\.*\/vouchers\.*/).as('removeCoupon');
          cy.get('button').contains('Remove').click();
          cy.wait('@removeCoupon').its('response.statusCode').should('eq', 204);
          cy.get('button').should('not.contain', 'Remove');
          cy.get('button').contains('Apply to Cart').should('be.visible');
        });
    });
  });
});
