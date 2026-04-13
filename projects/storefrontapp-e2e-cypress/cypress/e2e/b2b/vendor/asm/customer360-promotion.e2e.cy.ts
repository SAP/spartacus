/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import { agentLoginForJDK21 } from '../../../../helpers/auth-forms';
import {
  ELECTRONICS_BASESITE,
  signOutUser,
} from '../../../../helpers/checkout-flow';
import {
  getASMB2BCustomer,
  getB2BAgent,
} from '../../../../sample-data/asm-flow';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import {
  interceptDelete,
  interceptPost,
} from '../../../../support/utils/intercept';

context('Assisted Service Module', () => {
  const customer = getASMB2BCustomer();
  const customer_coupon = {
    code: 'dragonboat',
    name: 'Buy over $1000 get 20% off on cart',
  };
  const b2bAgent = getB2BAgent();

  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });
  after(() => {
    Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
  });

  describe('B2B Asm Customer360 Promotion', () => {
    beforeEach(() => {
      cy.visit('/?asm=true');
      cy.whenJDK17(() => {
        asm.agentLogin(b2bAgent.userName, b2bAgent.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2bAgent.userName, b2bAgent.password);
      });
      asm.startCustomerEmulation(customer, true);
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Promotion').click();
    });

    it('should contain coupon list (CXSPA-3906)', () => {
      cy.get('cx-asm-customer-360-coupon')
        .contains('Coupons')
        .should('be.visible');
    });
    it('should be able to apply & remove coupon to cart (CXSPA-3906)', () => {
      cy.get('.cx-asm-customer-360-promotion-listing-row')
        .first()
        .within(() => {
          // Check if the "Remove" button is visible
          cy.get('td').then(($body) => {
            if (
              $body.find('.cx-asm-customer-360-promotion-listing-remove-button')
                .length > 0
            ) {
              cy.intercept('POST', '**/removeVoucher').as('removeCoupon');
              cy.wrap($body).contains('Remove').click();
            } else {
              cy.log('Remove button is not visible');
            }
          });
          cy.intercept('POST', /\.*\/vouchers\?voucherId=.*/).as('applyCoupon');
          cy.get('button').contains('Apply to Cart').click();
          cy.whenJDK17(() => {
            cy.wait('@applyCoupon')
              .its('response.statusCode')
              .should('eq', 200);
          });
          cy.get('button').should('not.contain', 'Apply to Cart');
          cy.get('button').contains('Remove').should('be.visible');
          cy.intercept('POST', '**/removeVoucher').as('removeCoupon');
          cy.get('button').contains('Remove').click();
          cy.whenJDK17(() => {
            cy.wait('@removeCoupon')
              .its('response.statusCode')
              .should('eq', 204);
          });
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
      // remove the assigned dragonboat customer coupn and ensure that it is available
      cy.whenJDK17(() => {
        asm.removeCustomerCoupon(
          customer.email,
          customer.password,
          customer_coupon.code
        );
      });

      cy.whenJDK21(() => {
        asm.removeCustomerCouponFoJDK21(
          customer.email,
          customer.password,
          customer_coupon.code
        );
        signOutUser();
        cy.visit('/?asm=true');
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2bAgent.userName, b2bAgent.password);
        asm.startCustomerEmulation(customer, true);
        cy.get('button.cx-360-button').click();
        cy.get('button.cx-tab-header').contains('Promotion').click();
      });

      cy.intercept('POST', /\.*\/customer360\.*/).as('searchCustomerCoupon');
      cy.get('.cx-asm-customer-360-promotion-listing-search-input')
        .click()
        .type(customer_coupon.name);
      cy.get(
        '.cx-asm-customer-360-promotion-listing-search-icon-search'
      ).click();
      cy.wait('@searchCustomerCoupon')
        .its('response.statusCode')
        .should('eq', 200);
      cy.get('cx-asm-customer-360-customer-coupon').within(() => {
        cy.get('.cx-asm-customer-360-promotion-listing-row').contains(
          customer_coupon.name
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
        '/users/*/customercoupons/claim?*'
      );
      cy.get('.cx-asm-customer-360-promotion-listing-row')
        .contains(customer_coupon.name)
        .parent()
        .parent()
        .within(() => {
          cy.get('button').contains('Assign to Customer').click();
          cy.wait(`@claim_customer_coupon`);
        });
      cy.get('.cx-asm-customer-360-promotion-listing-row').should(
        'not.contain',
        customer_coupon.name
      );
    });
    it('should be able to remove customer coupon for customer coupon (CXSPA-3945)', () => {
      cy.get('.cx-tab-header').contains('Sent').click();
      interceptDelete(
        'disclaim_customer_coupon',
        '/users/*/customercoupons/*/claim?*'
      );
      cy.get('.cx-asm-customer-360-promotion-listing-row')
        .contains(customer_coupon.name)
        .parent()
        .parent()
        .within(() => {
          cy.get('button').contains('Remove').click();
          cy.wait(`@disclaim_customer_coupon`);
        });
      cy.get('.cx-asm-customer-360-promotion-listing-row').should(
        'not.contain',
        customer_coupon.name
      );
      cy.get('.cx-tab-header').contains('Available').click();
      cy.get('.cx-asm-customer-360-promotion-listing-row').contains(
        customer_coupon.name
      );
    });
  });
});
