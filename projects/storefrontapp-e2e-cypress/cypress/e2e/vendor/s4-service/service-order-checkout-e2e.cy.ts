import { placeOrder } from '../../../helpers/b2b/b2b-checkout';
import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import {
  checkoutForServiceOrder,
  nonServiceProduct,
  selectAccountDeliveryModeForServiceOrder,
  selectAccountPaymentForServiceOrder,
  selectAccountShippingAddressForServiceOrder,
  selectServiceDetailsForServiceOrder,
  serviceProduct,
  serviceUser,
  verifyServiceOrderConfirmationPage,
  verifyServiceOrderReviewOrderPage,
} from '../../../helpers/vendor/s4-service/s4-service';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

describe('Service Order Checkout Flow ', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(serviceUser);
    cy.get('button').contains('Allow All').click();
  });
  it('with service products in cart', () => {
    checkoutForServiceOrder(serviceProduct);
    selectAccountPaymentForServiceOrder();
    selectAccountShippingAddressForServiceOrder();
    selectAccountDeliveryModeForServiceOrder();
    selectServiceDetailsForServiceOrder(true);
    verifyServiceOrderReviewOrderPage(true);
    placeOrder('/order-confirmation');
    verifyServiceOrderConfirmationPage(true);
  });
  it('without any service products in cart', () => {
    checkoutForServiceOrder(nonServiceProduct);
    selectAccountPaymentForServiceOrder();
    selectAccountShippingAddressForServiceOrder();
    selectAccountDeliveryModeForServiceOrder();
    selectServiceDetailsForServiceOrder(false);
    verifyServiceOrderReviewOrderPage(false);
    placeOrder('/order-confirmation');
    verifyServiceOrderConfirmationPage(false);
  });
  afterEach(() => {
    signOutUser();
  });
});
