import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Currency switch - product-details page', () => {
  const productDetailsPath = siteContextSelector.PRODUCT_PATH_2;
  const jpCurrency = ' ¥12,750 ';

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('product-details page', () => {
    it('should change currency in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        productDetailsPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + productDetailsPath
      );
    });

    it('should change currency in the page', () => {
      siteContextSelector.siteContextChange(
        productDetailsPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );

      cy.get('cx-product-summary .price').should('have.text', jpCurrency);
    });

    it('should change currency in the modal', () => {
      siteContextSelector.siteContextChange(
        productDetailsPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );

      cy.get('cx-add-to-cart button.btn-primary').click();
      cy.get('cx-added-to-cart-dialog .cx-price .cx-value').should(
        'have.text',
        jpCurrency
      );
    });
  });
});
