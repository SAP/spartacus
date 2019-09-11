import * as checkout from '../../helpers/checkout-flow';

context('Express checkout', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.cxConfig({ checkout: { express: true } });
    cy.visit('/');
  });

  it('should go to checkout', () => {
    checkout.registerUser();
    checkout.goToCheapProductDetailsPage();
    checkout.addCheapProductToCartAndLogin();
  });

  it('should fill address form', () => {
    checkout.fillAddressFormWithCheapProduct();
  });

  it('should choose delivery', () => {
    checkout.chooseDeliveryMethod();
  });

  it('should fill in payment form with billing address same as shipping address', () => {
    checkout.fillPaymentFormWithCheapProduct();
  });

  it('should redirect to review order page', () => {
    checkout.verifyReviewOrderPage();
  });

  it('should open cart', () => {
    cy.get('cx-mini-cart').click();
  });

  it('should click proceed to checkout', () => {
    cy.getByText(/proceed to checkout/i).click();
  });

  it('should redirect to review order page', () => {
    checkout.verifyReviewOrderPage();
  });

  it('should delete payment', () => {
    cy.selectUserMenuOption({
      option: 'Payment Details',
    });
    cy.getAllByText('Delete')
      .first()
      .click({ force: true });
    cy.get('.btn-primary').click({ force: true });
  });

  it('should open cart', () => {
    cy.get('cx-mini-cart').click();
  });

  it('should click proceed to checkout', () => {
    cy.getByText(/proceed to checkout/i).click();
  });

  it('should verify Shipping Address', () => {
    cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  });
});
