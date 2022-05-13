import * as b2bCheckout from '../../../../helpers/b2b/b2b-checkout';
import {
  b2bAccountShipToUser,
  b2bProduct,
  cartWithB2bProduct,
  order_type,
  POWERTOOLS_BASESITE,
} from '../../../../sample-data/b2b-checkout';

context('B2B - Account Checkout flow', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should login to b2b user', () => {
    b2bCheckout.loginB2bUser();
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should add a product to cart', () => {
    b2bCheckout.addB2bProductToCartAndCheckout();
  });

  it(
    ['smoke_b2b', 'checkout_b2b'],
    'should select Account payment type',
    () => {
      b2bCheckout.enterPONumber();
      b2bCheckout.selectAccountPayment();
    }
  );

  it(['smoke_b2b', 'checkout_b2b'], 'should enter shipping address', () => {
    b2bCheckout.selectAccountShippingAddress();
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should select delivery mode', () => {
    b2bCheckout.selectAccountDeliveryMode();
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should review and place order', () => {
    b2bCheckout.reviewB2bReviewOrderPage(
      b2bAccountShipToUser,
      cartWithB2bProduct,
      true,
      order_type.PLACE_ORDER
    );

    b2bCheckout.placeOrder('/order-confirmation');
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should display summary page', () => {
    b2bCheckout.reviewB2bOrderConfirmation(
      b2bAccountShipToUser,
      b2bProduct,
      cartWithB2bProduct
    );
  });
});
