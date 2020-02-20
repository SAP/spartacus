import * as cart from '../../helpers/cart';
import { formats } from '../../sample-data/viewports';

function clickSearchIcon() {
  cy.get('cx-searchbox cx-icon[aria-label="search"]').click();
}

function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

describe(`${formats.mobile.width + 1}p resolution - Cart`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should add products to cart via search autocomplete', () => {
    cart.addProductToCartViaAutoComplete(true);
  });

  it('should add products to cart through search result page', () => {
    cart.addProductToCartViaSearchPage(true);
  });

  it('should display empty cart if no items added and when items are removed', () => {
    cart.removeAllItemsFromCart();
  });

  it('should add product to cart as anonymous and merge when logged in', () => {
    cart.registerCreateCartRoute();
    cart.registerSaveCartRoute();
    cart.loginRegisteredUser();

    cart.addProductWhenLoggedIn(true);

    clickHamburger();
    cart.logOutAndNavigateToEmptyCart();

    clickSearchIcon();
    cart.addProductAsAnonymous();

    clickHamburger();
    cart.verifyMergedCartWhenLoggedIn();

    clickHamburger();
    cart.logOutAndEmptyCart();
  });

  it('should add product to cart and manipulate quantity', () => {
    clickSearchIcon();
    cart.manipulateCartQuantity();
  });

  it('should be unable to add out of stock products to cart', () => {
    clickSearchIcon();
    cart.outOfStock();
  });
});
