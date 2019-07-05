import * as checkout from '../../helpers/checkout-flow';

context('Checkout flow', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register successfully', () => {
    checkout.registerUser();
    checkout.signOutUser();
  });

  it('should go to product page from category page', () => {
    checkout.goToProductDetailsPage();
  });

  it('should add product to cart and go to checkout', () => {
    checkout.addProductToCart();
    checkout.loginUser();
  });

  it('should fill in address form', () => {
    checkout.fillAddressForm();
  });

  it('should choose delivery', () => {
    checkout.chooseDeliveryMethod();
  });

  it('should fill in payment form', () => {
    checkout.fillPaymentForm();
  });

  it('should review and place order', () => {
    checkout.placeOrder();
  });

  it('should display summary page', () => {
    checkout.verifyOrderConfirmationPage();
  });

  it('should be able to check order in order history', () => {
    checkout.viewOrderHistory();
    checkout.signOut();
  });
});
