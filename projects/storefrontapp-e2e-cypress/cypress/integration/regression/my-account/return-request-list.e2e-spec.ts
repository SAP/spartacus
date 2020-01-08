import * as orderHistory from '../../../helpers/cancellations-returns';
import * as checkout from '../../../helpers/checkout-flow';

describe('Return Request List for Cancellations and Returns', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    checkout.visitHomePage();
  });

  it('should register successfully', () => {
    checkout.registerUser();
  });

  it('should go to product page from category page', () => {
    checkout.goToCheapProductDetailsPage();
  });

  it('should add product to cart and go to checkout', () => {
    checkout.addCheapProductToCartAndLogin();
  });

  it('should fill in address form', () => {
    checkout.fillAddressFormWithCheapProduct();
  });

  it('should choose delivery', () => {
    checkout.verifyDeliveryMethod();
  });

  it('should fill in payment form', () => {
    checkout.fillPaymentFormWithCheapProduct();
  });

  it('should review and place order', () => {
    checkout.placeOrderWithCheapProduct();
  });

  it('should display summary page', () => {
    checkout.verifyOrderConfirmationPageWithCheapProduct();
  });

  it('should be able to check order in order history', () => {
    checkout.viewOrderHistoryWithCheapProduct();
  });

  it('should have two tabs: 1 order tab and 1 return tab', () => {
    orderHistory.checkTabs();
  });

  it('should fully cancel order', () => {
    orderHistory.cancelOrder();
  });
});
