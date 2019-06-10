import * as cart from '../../../helpers/cart';
import * as siteContextSelector from '../../../helpers/site-context-selector';

describe('Language switch - cart page', () => {
  const cartPath = siteContextSelector.CART_PATH;
  const jpCurrency = ' ¥9,720 ';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    cart.addProductWhenLoggedIn(false);
  });

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('cart page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyCurrencyChangeUrl(cartPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.currencyChange(cartPath);

      cy.get('cx-cart-item-list .cx-price .cx-value').should(
        'have.text',
        jpCurrency
      );
    });
  });
});
