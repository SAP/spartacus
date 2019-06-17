import { manipulateCartQuantity } from '../../../../helpers/cart';
import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - cart page', () => {
  const cartPath = siteContextSelector.CART_PATH;
  const jpCurrency_per_item = ' ¥9,720 ';
  const jpCurrency_total = ' ¥29,160 ';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    manipulateCartQuantity();
  });

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('cart page', () => {
    it('should change currency in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        cartPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + cartPath
      );
    });

    it('should change currency for price per item in the page', () => {
      siteContextSelector.siteContextChange(
        cartPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );

      cy.get('cx-cart-item-list .cx-price .cx-value').should(
        'have.text',
        jpCurrency_per_item
      );
    });

    it('should change currency for total price in the page', () => {
      siteContextSelector.siteContextChange(
        cartPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );

      cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
        'have.text',
        jpCurrency_total
      );
    });
  });
});
