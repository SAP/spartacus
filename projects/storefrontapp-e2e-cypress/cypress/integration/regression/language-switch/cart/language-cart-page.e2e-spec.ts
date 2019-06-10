import * as cart from '../../../../helpers/cart';
import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - cart page', () => {
  const cartPath = siteContextSelector.CART_PATH;
  const deutschName = siteContextSelector.PRODUCT_NAME_CART_DE;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    cart.addProductWhenLoggedIn(false);
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('cart page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(cartPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(cartPath);

      cy.get('cx-cart-item-list .cx-link')
        .invoke('text')
        .should('contains', deutschName);
    });
  });
});
