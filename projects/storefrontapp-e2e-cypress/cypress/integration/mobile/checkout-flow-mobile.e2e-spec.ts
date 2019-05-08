import { formats } from '../../sample-data/viewports';
import * as bigHappyPath from '../../helpers/checkout-flow';

function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

function waitForHomePage() {
  cy.get(
    'cx-page-slot cx-banner img[alt="Save Big On Select SLR & DSLR Cameras"]'
  ).should('exist');
  clickHamburger();
}

context(`${formats.mobile.width + 1}p resolution - Big happy path`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should register successfully', () => {
    waitForHomePage();

    bigHappyPath.registerUser();

    waitForHomePage();

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
    clickHamburger();
    bigHappyPath.viewOrderHistory();
    clickHamburger();
    bigHappyPath.signOut();
  });
});
