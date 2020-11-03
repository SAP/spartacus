import * as checkout from '../../helpers/checkout-flow';

context('Checkout flow', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    checkout.visitHomePage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
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
    cy.waitForOrderToBePlacedRequest();
    checkout.viewOrderHistoryWithCheapProduct();
    checkout.signOut();
  });
});
