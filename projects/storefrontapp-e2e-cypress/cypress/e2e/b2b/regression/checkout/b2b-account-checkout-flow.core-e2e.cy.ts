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
} from '../../../../sample-data/b2b-checkout';

context('B2B - Account Checkout flow', () => {
  before(() => {
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  it('Should checkout using an account payment type', () => {
    b2bCheckout.loginB2bUser();
    b2bCheckout.addB2bProductToCartAndCheckout();
    b2bCheckout.enterPONumber();
    b2bCheckout.selectAccountPayment();
    b2bCheckout.selectAccountShippingAddress();
    b2bCheckout.selectAccountDeliveryMode();
    b2bCheckout.reviewB2bReviewOrderPage(
      b2bAccountShipToUser,
      cartWithB2bProductAndPremiumShipping,
      true,
      order_type.PLACE_ORDER
    );

    b2bCheckout.placeOrder('/order-confirmation');
    b2bCheckout.reviewB2bOrderConfirmation(
      b2bAccountShipToUser,
      b2bProduct,
      cartWithB2bProductAndPremiumShipping
    );
  });
});
