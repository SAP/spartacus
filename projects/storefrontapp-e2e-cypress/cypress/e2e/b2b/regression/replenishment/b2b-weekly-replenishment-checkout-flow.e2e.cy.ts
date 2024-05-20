/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as b2bCheckout from '../../../../helpers/b2b/b2b-checkout';
import {
  b2bAccountShipToUser,
  b2bProduct,
  cartWithB2bProductAndPremiumShipping,
  order_type,
  POWERTOOLS_BASESITE,
  recurrencePeriod,
} from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { isolateTests } from '../../../../support/utils/test-isolation';

context(
  `B2B - ${recurrencePeriod.WEEKLY} Replenishment Checkout flow`,
  { testIsolation: false },
  () => {
    isolateTests();
    before(() => {
      clearAllStorage();
      Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should login to b2b user', () => {
      b2bCheckout.loginB2bUser();
    });

    it('should add a product to cart', () => {
      b2bCheckout.addB2bProductToCartAndCheckout();
    });

    it('should select Account payment type', () => {
      b2bCheckout.enterPONumber();
      b2bCheckout.selectAccountPayment();
    });

    it('should enter shipping address', () => {
      b2bCheckout.selectAccountShippingAddress();
    });

    it('should select delivery mode', () => {
      b2bCheckout.selectAccountDeliveryMode();
    });

    it('should review and place order', () => {
      b2bCheckout.reviewB2bReviewOrderPage(
        b2bAccountShipToUser,
        cartWithB2bProductAndPremiumShipping,
        true,
        order_type.SCHEDULE_REPLENISHMENT
      );

      b2bCheckout.completeReplenishmentForm(recurrencePeriod.WEEKLY);

      b2bCheckout.placeOrder('/replenishment/confirmation');
    });

    it('should display summary page', () => {
      b2bCheckout.reviewB2bOrderConfirmation(
        b2bAccountShipToUser,
        b2bProduct,
        cartWithB2bProductAndPremiumShipping,
        true,
        recurrencePeriod.WEEKLY
      );
    });
  }
);
