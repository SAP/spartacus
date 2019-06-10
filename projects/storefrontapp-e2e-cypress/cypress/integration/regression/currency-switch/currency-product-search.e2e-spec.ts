import * as siteContextSelector from '../../../helpers/site-context-selector';

describe('Currency switch - product-search page', () => {
  const productSearchPath = siteContextSelector.PRODUCT_SEARCH_PATH;
  const jpCurrency = '¥290';

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('product-search page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyCurrencyChangeUrl(productSearchPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.currencyChange(productSearchPath);

      cy.get('cx-product-list-item .cx-product-price:first')
        .invoke('text')
        .should('contains', jpCurrency);
    });

    it('should change language in the search result', () => {
      siteContextSelector.currencyChange(productSearchPath);

      cy.get('cx-searchbox input').type('fun');
      cy.get('cx-searchbox .products .price:first').should(
        'have.text',
        jpCurrency
      );
    });
  });
});
