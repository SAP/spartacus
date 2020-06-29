import { manipulateCartQuantity } from '../../../../helpers/cart';
import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Currency switch - cart page', () => {
  const cartPath = siteContextSelector.CART_PATH;

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    manipulateCartQuantity();
  });

  siteContextSelector.stub(
    siteContextSelector.CART_REQUEST,
    siteContextSelector.CART_REQUEST_ALIAS
  );

  describe('cart page', () => {
    it('should change currency in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        cartPath,
        siteContextSelector.CART_REQUEST_ALIAS,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + cartPath
      );
    });

    it('should change currency for cart details', () => {
      siteContextSelector.siteContextChange(
        cartPath,
        siteContextSelector.CART_REQUEST_ALIAS,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );

      cy.get('cx-cart-item-list .cx-price .cx-value').should(
        'have.text',
        ' ¥9,771 '
      );

      cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
        'have.text',
        ' ¥29,313 '
      );
    });
  });
});
