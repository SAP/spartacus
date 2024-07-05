/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/b2b/b2b-quote';
import * as cart from '../../../../helpers/cart';
import * as common from '../../../../helpers/common';

const TEST_PRODUCT_HAMMER_DRILLING_ID = '3887130';
const TEST_PRODUCT_HAMMER_DRILLING_NAME = 'DH40MR';
const BUYER_EMAIL = 'gi.sun@pronto-hw.com';
const BUYER_PASSWORD = '12341234';
const BUYER_USER = 'Gi Sun';
const SALESREP_EMAIL = 'darrin.hesser@acme.com';
const SALESREP_PASSWORD = '12341234';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';
const PRODUCT_AMOUNT_30: number = 30;

context('Quote', () => {
  // before all tests - ensure that cart is empty
  before(() => {
    // add a product - so that it is guaranteed that clear cart link is available
    cy.visit('/');
    quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    quote.addProductToCart(TEST_PRODUCT_HAMMER_DRILLING_ID, '1');
    cart.clearActiveCart();
    cart.validateEmptyCart();
    quote.logout();
  });

  let globalMessageSettings: any;
  beforeEach(() => {
    globalMessageSettings = {
      globalMessages: {
        [MSG_TYPE_WARNING]: {
          timeout: 10000,
        },
      },
    };
    cy.cxConfig(globalMessageSettings);
    cy.visit('/');
    quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    quote.registerReadQuoteRoute();
    quote.registerPerformQuoteActionRoute();
  });

  describe('Quote cart support (CXSPA-4036)', () => {
    beforeEach(() => {
      quote.prepareQuote(
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
    });

    it('should request a quote and add several items to the same quote', () => {
      quote.checkItemQuantity(1, '30');
      common.goToPDPage(
        Cypress.env('BASE_SITE'),
        TEST_PRODUCT_HAMMER_DRILLING_ID
      );
      quote.setAddToCartQuantity(PRODUCT_AMOUNT_30.toString());
      common.clickOnAddToCartBtnOnPD();
      quote.clickOnViewCartBtnOnPD();
      quote.checkItemQuantity(1, '60');
    });

    it('should submit a quote and not be able to add any further items to the quote in checkout', () => {
      quote.prepareQuoteForCheckout(
        BUYER_EMAIL,
        BUYER_PASSWORD,
        BUYER_USER,
        SALESREP_EMAIL,
        SALESREP_PASSWORD
      );
      quote.submitQuote(quote.STATUS_BUYER_CHECKOUT);
      quote.addProductAndCheckForGlobalMessage(
        TEST_PRODUCT_HAMMER_DRILLING_NAME,
        'Not possible to do changes to cart entries. Proceed to checkout'
      );
    });
  });
});
