import * as b2bCheckout from '../../../../helpers/b2b/b2b-checkout';
import * as checkout from '../../../../helpers/checkout-flow';
import {
  cartWithB2bProduct,
  order_type,
  POWERTOOLS_BASESITE,
  products,
} from '../../../../sample-data/b2b-checkout';
import { user } from '../../../../sample-data/checkout-flow';

context('B2B - Credit Card Checkout flow', () => {
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

  it(['smoke_b2b', 'checkout_b2b'],'should select Credit Card payment type', () => {
    b2bCheckout.enterPONumber();
    b2bCheckout.selectCreditCardPayment();
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should check total in order summary', () => {
    checkout.checkSummaryAmount(cartWithB2bProduct);
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should prevent navigation to payment method if shipping address form is empty', () => {
    checkout.proceedWithEmptyShippingAdressForm();
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should prevent navigation to payment method if shipping address for has errors', () => {
    checkout.proceedWithIncorrectShippingAddressForm({
      ...user,
      firstName: '',
    });
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should enter shipping address', () => {
    checkout.fillAddressFormWithCheapProduct({ firstName: user.firstName });
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should select delivery mode', () => {
    checkout.verifyDeliveryMethod();
  });

  it(['smoke_b2b', 'checkout_b2b'],'should prevent navigation to review order if payment form is empty', () => {
    checkout.proceedWithEmptyPaymentForm();
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should prevent navigation to review order if payment form has errors', () => {
    checkout.proceedWithIncorrectPaymentForm({
      ...user,
      payment: { ...user.payment, number: '' },
    });
  });

  it(['smoke_b2b', 'checkout_b2b'],'should enter payment method', () => {
    checkout.fillPaymentFormWithCheapProduct(
      { payment: { number: user.payment.number } },
      undefined
    );
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should review and place order', () => {
    b2bCheckout.reviewB2bReviewOrderPage(
      user,
      cartWithB2bProduct,
      false,
      order_type.PLACE_ORDER
    );

    b2bCheckout.placeOrder('/order-confirmation');
  });

  it(['smoke_b2b', 'checkout_b2b'], 'should display summary page', () => {
    b2bCheckout.reviewB2bOrderConfirmation(
      user,
      products[0],
      cartWithB2bProduct,
      false
    );
  });
});
