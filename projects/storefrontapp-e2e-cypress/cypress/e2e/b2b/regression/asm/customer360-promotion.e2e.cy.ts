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
import {
  interceptDelete,
  interceptPost,
} from '../../../../support/utils/intercept';

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
      cy.get('cx-asm-customer-360-coupon')
        .contains('Coupons')
        .should('be.visible');
    });
    it('should be able to apply coupon to cart (CXSPA-3906)', () => {
      cy.get('.cx-asm-customer-360-promotion-listing-row')
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
      cy.get('.cx-asm-customer-360-promotion-listing-row')
        .first()
        .within(() => {
          cy.intercept('DELETE', /\.*\/vouchers\.*/).as('removeCoupon');
          cy.get('button').contains('Remove').click();
          cy.wait('@removeCoupon').its('response.statusCode').should('eq', 204);
          cy.get('button').should('not.contain', 'Remove');
          cy.get('button').contains('Apply to Cart').should('be.visible');
        });
    });
    it('should contain customer coupons (CXSPA-3945)', () => {
      cy.get('cx-asm-customer-360-customer-coupon')
        .contains('Customer Coupons')
        .scrollIntoView()
        .should('be.visible');
    });
    it('should display available tab for customer coupon by default (CXSPA-3945)', () => {
      cy.get('.active').contains('Available');
    });
    it('should be able to change tab for customer coupon (CXSPA-3945)', () => {
      cy.get('.active').contains('Available');
      cy.get('.cx-tab-header').contains('Sent').click();
      cy.get('.active').contains('Sent');
      cy.get('.cx-tab-header').contains('Available').click();
      cy.get('.active').contains('Available');
    });
    it('should be able to search customer coupon (CXSPA-3945)', () => {
      cy.intercept('POST', /\.*\/customer360\.*/).as('searchCustomerCoupon');
      cy.get('.cx-asm-customer-360-promotion-listing-search-input')
        .click()
        .type('Buy over $1000 get 20% off on cart');
      cy.get(
        '.cx-asm-customer-360-promotion-listing-search-icon-search'
      ).click();
      cy.wait('@searchCustomerCoupon')
        .its('response.statusCode')
        .should('eq', 200);
      cy.get('cx-asm-customer-360-customer-coupon').within(() => {
        cy.get('.cx-asm-customer-360-promotion-listing-row').contains(
          'Buy over $1000 get 20% off on cart'
        );
        cy.get('.cx-asm-customer-360-promotion-listing-row').should(
          'have.length',
          1
        );
      });
    });
    it('should be able to sent customer coupon for customer coupon (CXSPA-3945)', () => {
      interceptPost(
        'claim_customer_coupon',
        '/users/*/customercoupons/*/claim?*'
      );
      cy.get('.cx-asm-customer-360-promotion-listing-row')
        .contains('Buy over $1000 get 20% off on cart')
        .parent()
        .parent()
        .within(() => {
          cy.get('button').contains('Assign to Customer').click();
          cy.wait(`@claim_customer_coupon`);
        });
      cy.get('.cx-asm-customer-360-promotion-listing-row').should(
        'not.contain',
        'Buy over $1000 get 20% off on cart'
      );
    });
    it('should be able to remove customer coupon for customer coupon (CXSPA-3945)', () => {
      cy.get('.cx-tab-header').contains('Sent').click();
      interceptDelete(
        'disclaim_customer_coupon',
        '/users/*/customercoupons/*/claim?*'
      );
      cy.get('.cx-asm-customer-360-promotion-listing-row')
        .contains('Buy over $1000 get 20% off on cart')
        .parent()
        .parent()
        .within(() => {
          cy.get('button').contains('Remove').click();
          cy.wait(`@disclaim_customer_coupon`);
        });
      cy.get('.cx-asm-customer-360-promotion-listing-row').should(
        'not.contain',
        'Buy over $1000 get 20% off on cart'
      );
      cy.get('.cx-tab-header').contains('Available').click();
      cy.get('.cx-asm-customer-360-promotion-listing-row').contains(
        'Buy over $1000 get 20% off on cart'
      );
    });
  });
});
