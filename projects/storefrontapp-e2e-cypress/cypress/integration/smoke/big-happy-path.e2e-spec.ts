import * as bigHappyPath from '../../helpers/big-happy-path';

context('Big happy path', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register successfully', () => {
    bigHappyPath.registerUser();
    bigHappyPath.signOutUser();
  });

  it('should go to product page from category page', () => {
    bigHappyPath.goToProductDetailsPage();
  });

  it('should add product to cart and go to checkout', () => {
    bigHappyPath.addProductToCart();
  });

  it('should fill in address form', () => {
    bigHappyPath.fillAddressForm();
  });

  it('should choose delivery', () => {
    bigHappyPath.chooseDeliveryMethod();
  });

  it('should fill in payment form', () => {
    bigHappyPath.fillPaymentForm();
  });

  it('should review and place order', () => {
    bigHappyPath.placeOrder();
  });

  it('should display summary page', () => {
    bigHappyPath.verifyOrderConfirmationPage();
  });

  it('should be able to check order in order history', () => {
    bigHappyPath.viewOrderHistory();
    bigHappyPath.signOut();
  });
});
