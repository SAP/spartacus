/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asmCustomer360 from '../../../helpers/customer360';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import * as checkout from '../../../helpers/checkout-flow';
import { waitForPage } from '../../../helpers/navigation';
import { waitForProductPage } from '../../../helpers/checkout-flow';
import { addProductToCart } from '../../../helpers/checkout-flow';
import {
  interceptDelete,
  interceptPost,
} from '../../../support/utils/intercept';

context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();
    asmCustomer360.setup();
    cy.saveLocalStorage();
  });

  describe('Overview', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
      checkout.visitHomePage('asm=true');
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Overview').click();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should contain overview items (CXSPA-700)', () => {
      cy.get('.product-listing-header').contains('Active Cart');
      cy.get('.product-listing-header').contains('Last Saved Cart');
      cy.get('.product-listing-header').contains('Interests');
    });

    it('should redirect to the cart page (CXSPA-700)', () => {
      const cartPage = waitForPage('/cart', 'getCartPage');
      cy.contains('div.product-listing-header', 'Active Cart')
        .children()
        .eq(1)
        .click();
      cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);
    });

    it('should redirect to the saved cart page (CXSPA-700)', () => {
      const savedCartPage = waitForPage(
        '/my-account/saved-cart/*',
        'getSavedCartPage'
      );
      cy.contains('div.product-listing-header', 'Saved Cart')
        .children()
        .eq(1)
        .click();
      cy.wait(`@${savedCartPage}`).its('response.statusCode').should('eq', 200);
    });

    it('should redirect to the interests page (CXSPA-700)', () => {
      const interestsPage = waitForPage(
        '/my-account/my-interests',
        'getInterestsPage'
      );
      cy.contains('div.product-listing-header > button', 'Interests').click();
      cy.wait(`@${interestsPage}`).its('response.statusCode').should('eq', 200);
    });
  });

  describe('Activity List', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
      checkout.visitHomePage('asm=true');
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Activity').click();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should contain all activities (CXSPA-700)', () => {
      cy.get('.cx-asm-customer-360-table').contains('Cart');
      cy.get('.cx-asm-customer-360-table').contains('Order');
      cy.get('.cx-asm-customer-360-table').contains('Ticket');
      cy.get('.cx-asm-customer-360-table').contains('Saved Cart');
    });

    it('should redirect to the cart page (CXSPA-700)', () => {
      const cartPage = waitForPage('/cart', 'getCartPage');
      asmCustomer360.redirect('Cart');
      cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);
      cy.get('h1').contains('Your Shopping Cart');
    });

    it('should redirect to the order details page (CXSPA-700)', () => {
      const orderPage = waitForPage('/my-account/order/*', 'getOrderPage');
      asmCustomer360.redirect('Order');
      cy.wait(`@${orderPage}`).its('response.statusCode').should('eq', 200);
      cy.get('h1').contains('Order Details');
    });

    it('should redirect to the saved cart page (CXSPA-700)', () => {
      const savedCartPage = waitForPage(
        '/my-account/saved-cart/*',
        'getSavedCartPage'
      );
      asmCustomer360.redirect('Saved Cart');
      cy.wait(`@${savedCartPage}`).its('response.statusCode').should('eq', 200);
      cy.get('h1').contains('Saved Cart Details');
    });

    it('should redirect to the support tickets page (CXSPA-700)', () => {
      const supportTicketsPage = waitForPage(
        '/my-account/support-ticket/*',
        'getSupportTicketsPage'
      );
      asmCustomer360.redirect('Ticket');
      cy.wait(`@${supportTicketsPage}`)
        .its('response.statusCode')
        .should('eq', 200);
      cy.get('h1').contains('Entering a subject');
    });
  });

  describe('Profile', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
      checkout.visitHomePage('asm=true');
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Profile').click();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should contain all profile information  (CXSPA-700)', () => {
      const user = asmCustomer360.getUser();
      cy.get('.cx-asm-customer-360-profile').within(() => {
        cy.get('.address-line1').should('contain', user.address.line1);
        cy.get('.profile-phone1').should('contain', user.phone);
        cy.get('cx-card').should('contain', user.payment.expires.year);
      });
    });
  });

  describe('Feedback', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
      checkout.visitHomePage('asm=true');
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Feedback').click();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should contain all feedback information (CXSPA-700)', () => {
      cy.get('.cx-asm-customer-360-table').contains('Complaint');
      cy.get('.cx-asm-customer-360-table').contains('My review title');
    });

    it('should redirect to the support tickets page (CXSPA-700)', () => {
      const supportTicketsPage = waitForPage(
        '/my-account/support-ticket/*',
        'getSupportTicketsPage'
      );
      cy.get('cx-asm-customer-360-support-tickets').within(() => {
        cy.get('.cx-asm-customer-360-table-row > td > button').click();
      });
      cy.wait(`@${supportTicketsPage}`)
        .its('response.statusCode')
        .should('eq', 200);
      cy.get('h1').contains('Entering a subject');
    });

    it('should redirect to product page (CXSPA-700)', () => {
      const productPage = waitForProductPage('*', 'getProductPage');
      cy.get('cx-asm-customer-360-product-reviews').within(() => {
        cy.get('.cx-asm-customer-360-table-row > td > button').click();
      });
      cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
      cy.contains('Show reviews');
    });
  });

  describe('Promotion', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
      checkout.visitHomePage('asm=true');
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Promotion').click();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should contain coupon list (CXSPA-3906)', () => {
      cy.get('cx-asm-customer-360-coupon')
        .contains('Coupons')
        .should('be.visible');
    });
    it('should be able to apply coupon to cart (CXSPA-3906)', () => {
      cy.get('tr.cx-asm-customer-360-promotion-listing-row')
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
    it('should contain promotion list (CXSPA-3932)', () => {
      cy.get('cx-asm-customer-360-promotion')
        .scrollIntoView()
        .should('be.visible');
      cy.get('.cx-asm-customer-360-promotion-listing').should(
        'not.contain',
        'Promotion Applied'
      );
    });
    it('promotion rule should be auto applied when the total price of the cart reaches the promotion threshold(CXSPA-3932)', () => {
      checkout.goToProductDetailsPage();
      cy.get('input[type="number"]').clear().type('100');
      addProductToCart();
      checkout.visitHomePage('asm=true');
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Promotion').click();
      cy.get('.cx-asm-customer-360-promotion-listing-applied').contains(
        'Promotion Applied'
      );
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
        .type('Buy over $1000 get 20% off on cart{enter}');
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
      cy.get('.cx-asm-customer-360-promotion-listing-row').should('exist');
    });
  });
});
