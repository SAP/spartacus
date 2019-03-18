import * as cart from '../../../helpers/cart';
import { formats } from '../../../sample-data/viewports';

function clickSearchIcon() {
  cy.get('cx-searchbox [aria-label="Search "]').click();
}

function clickHamburger() {
  cy.get('cx-header [aria-label="Menu"]').click();
}

describe(`${formats.mobile.width + 1}p resolution - Cart`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should add products to cart via search autocomplete', () => {
    clickSearchIcon();
    cart.addProductToCartViaAutoComplete();
  });

  it('should add products to cart through search result page', () => {
    clickSearchIcon();
    cart.addProductToCartViaSearchPage();
  });

  it('should display empty cart if no items added and when items are removed', () => {
    cart.removeAllItemsFromCart();
  });

  it('should add product to cart as anonymous and merge when logged in', () => {
    cart.loginRegisteredUser();

    clickSearchIcon();
    cart.addProductWhenLoggedIn();

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
