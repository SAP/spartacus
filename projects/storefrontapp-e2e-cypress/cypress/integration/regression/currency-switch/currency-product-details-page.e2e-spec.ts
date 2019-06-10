import * as siteContextSelector from '../../../helpers/site-context-selector';

describe('Language switch - product-details page', () => {
  const productDetailsPath = siteContextSelector.PRODUCT_PATH_2;
  const jpCurrency = ' ¥12,750 ';

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('product-details page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyCurrencyChangeUrl(productDetailsPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.currencyChange(productDetailsPath);

      cy.get('cx-product-summary .price').should('have.text', jpCurrency);
    });

    it('should change language in the modal', () => {
      siteContextSelector.currencyChange(productDetailsPath);

      cy.get('cx-add-to-cart button.btn-primary').click();
      cy.get('cx-added-to-cart-dialog .cx-price .cx-value').should(
        'have.text',
        jpCurrency
      );
    });
  });
});
