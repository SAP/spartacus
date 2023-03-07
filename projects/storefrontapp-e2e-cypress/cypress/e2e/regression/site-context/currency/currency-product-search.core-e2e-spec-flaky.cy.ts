import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Currency switch - product-search page', () => {
  const productSearchPath = siteContextSelector.PRODUCT_SEARCH_PATH;
  const jpCurrency = '¥';

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('product-search page', () => {
    it('should change currency in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        productSearchPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + productSearchPath
      );
    });

    it('should change currency in the page', () => {
      siteContextSelector.siteContextChange(
        productSearchPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );

      cy.get('cx-product-list-item .cx-product-price').should(
        'contain',
        jpCurrency
      );
    });

    it('should change currency in the search result', () => {
      siteContextSelector.siteContextChange(
        productSearchPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );

      cy.get('cx-searchbox input').type('fun');
      cy.get('cx-searchbox .products .price').should('contain', jpCurrency);
    });
  });
});
