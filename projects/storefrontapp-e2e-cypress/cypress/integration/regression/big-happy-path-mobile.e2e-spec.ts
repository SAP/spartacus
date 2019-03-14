import { formats } from '../../sample-data/viewports';
import * as bigHappyPath from '../../helpers/big-happy-path';

function clickHamburger() {
  cy.get('cx-header [aria-label="Menu"]').click();
}

function waitForHomePage() {
  cy.get('cx-dynamic-slot .ElectronicsHompageSplashBannerComponent').should(
    'exist'
  );
  clickHamburger();
}

context(`${formats.mobile.width + 1}p resolution - Big happy path`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should register successfully', () => {
    waitForHomePage();

    bigHappyPath.signInAndRegister();

    waitForHomePage();

    bigHappyPath.verifyUser();
  });

  it('should go to product page from category page', () => {
    bigHappyPath.changePage();
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
    bigHappyPath.displaySummaryPage();
  });

  it('should be able to check order in order history', () => {
    clickHamburger();
    bigHappyPath.viewOrderHistory();
    clickHamburger();
    bigHappyPath.signOut();
  });
});
