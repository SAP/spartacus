/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/b2b/b2b-quote';
import * as common from '../../../../helpers/common';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';

const TEST_PRODUCT_HAMMER_DRILLING_NAME = 'DH40MR';
const BUYER_EMAIL = 'james.weber@harvestlive.inc';
const BUYER_PASSWORD = 'welcome';
const BUYER_USER = 'James Weber';
const SALESREP_EMAIL = 'darrin.hesser@acme.com';
const SALESREP_PASSWORD = '12341234';

export const quote_product = {
  code: 'Mobile_2020_Plan_cpq',
  name: 'Mobile 2020 Plan',
};

context('Quote', () => {
  describe('Quote cart support', () => {
    it('should request a quote and add several items to the same quote', () => {
      cy.restoreLocalStorage();
      cy.visit('/login');
      quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
      cy.wait(5000);
      Cypress.env('BASE_SITE', '');
      // quote.prepareQuote(
      //     TEST_PRODUCT_HAMMER_DRILLING_NAME,
      //     PRODUCT_AMOUNT_30,
      //     true
      // );
      cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${quote_product.code}`);
      cy.get('cx-product-intro').within(() => {
        cy.get('.code').should('contain', quote_product.code);
      });
      quote.setAddToCartQuantity('1');
      cy.wait(3000);
      common.clickOnAddToCartBtnOnPD();
      cy.wait(2000);
      common.clickOnViewCartBtnOnPD();
      cy.wait(2000);
      quote.checkItemQuantity(1, '1');
      quote.clickOnRequestQuote();
      quote.checkQuoteInDraftState(true, quote_product.code);
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
