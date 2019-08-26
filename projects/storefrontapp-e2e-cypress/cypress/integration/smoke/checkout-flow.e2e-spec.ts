import * as checkout from '../../helpers/checkout-flow';

context('Checkout flow', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    checkout.visitHomePage();
  });

  it('should register successfully', () => {
    checkout.registerUser();
    checkout.signOutUser();
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

  xit('should choose delivery', () => {
    checkout.chooseDeliveryMethod();
  });

  xit('should fill in payment form', () => {
    checkout.fillPaymentFormWithCheapProduct();
  });

  xit('should review and place order', () => {
    checkout.placeOrderWithCheapProduct();
  });

  xit('should display summary page', () => {
    checkout.verifyOrderConfirmationPageWithCheapProduct();
  });

  xit('should be able to check order in order history', () => {
    checkout.viewOrderHistoryWithCheapProduct();
    checkout.signOut();
  });
});
