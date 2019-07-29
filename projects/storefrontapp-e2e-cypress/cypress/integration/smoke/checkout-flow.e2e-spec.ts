import * as checkout from '../../helpers/checkout-flow';

context('Checkout flow', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register successfully', () => {
    checkout.registerUser();
  });

  it('should go to product page from category page', () => {
    checkout.goToCheapProductDetailsPage();
  });

  it('should add product to cart and go to checkout', () => {
    checkout.addCheapProductToCart();
    checkout.loginUser();
  });

  it('should fill in address form', () => {
    checkout.fillAddressFormWithCheapProduct();
  });

  it('should choose delivery', () => {
    checkout.chooseDeliveryMethod();
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
    checkout.signOut();
  });
});
