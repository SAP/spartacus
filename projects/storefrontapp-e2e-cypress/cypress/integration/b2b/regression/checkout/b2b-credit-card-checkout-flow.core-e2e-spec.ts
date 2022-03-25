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

  it('should login to b2b user', () => {
    b2bCheckout.loginB2bUser();
  });

  it('should add a product to cart', () => {
    b2bCheckout.addB2bProductToCartAndCheckout();
  });

  it('should select Credit Card payment type', () => {
    b2bCheckout.enterPONumber();
    b2bCheckout.selectCreditCardPayment();
  });

  it('should check total in order summary', () => {
    checkout.checkSummaryAmount(cartWithB2bProduct);
  });

  it('should prevent navigation to payment method if shipping address form is empty', () => {
    checkout.proceedWithEmptyShippingAdressForm();
  });

  it('should prevent navigation to payment method if shipping address for has errors', () => {
    checkout.proceedWithIncorrectShippingAddressForm({
      ...user,
      firstName: '',
    });
  });

  it('should enter shipping address', () => {
    checkout.fillAddressFormWithCheapProduct({ firstName: user.firstName });
  });

  it('should select delivery mode', () => {
    checkout.verifyDeliveryMethod();
  });

  it('should prevent navigation to review order if payment form is empty', () => {
    checkout.proceedWithEmptyPaymentForm();
  });

  it('should prevent navigation to review order if payment form has errors', () => {
    checkout.proceedWithIncorrectPaymentForm({
      ...user,
      payment: { ...user.payment, number: '' },
    });
  });

  it('should enter payment method', () => {
    checkout.fillPaymentFormWithCheapProduct(
      { payment: { number: user.payment.number } },
      undefined
    );
  });

  it('should review and place order', () => {
    b2bCheckout.reviewB2bReviewOrderPage(
      user,
      cartWithB2bProduct,
      false,
      order_type.PLACE_ORDER
    );

    b2bCheckout.placeOrder('/order-confirmation');
  });

  it('should display summary page', () => {
    b2bCheckout.reviewB2bOrderConfirmation(
      user,
      products[0],
      cartWithB2bProduct,
      false
    );
  });
});
