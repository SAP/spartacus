import { manipulateCartQuantity } from '../../../../helpers/cart';
import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - cart page', () => {
  const cartPath = siteContextSelector.CART_PATH;
  const deutschName = siteContextSelector.PRODUCT_NAME_CART_DE;

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    manipulateCartQuantity();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  siteContextSelector.stub(
    siteContextSelector.CART_REQUEST,
    siteContextSelector.CART
  );

  describe('cart page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        cartPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + cartPath
      );
    });

    it('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        cartPath,
        siteContextSelector.CART,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );

      cy.get('cx-cart-item-list .cx-link').should('contain', deutschName);
    });
  });
});
