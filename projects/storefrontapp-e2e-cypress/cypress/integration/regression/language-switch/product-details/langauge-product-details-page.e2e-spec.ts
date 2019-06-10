import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - product-details page', () => {
  const productDetailsPath =
    '/product/1687508/Stativ%20mit%20Fernbedienung%20VCT-80AV';
  const deutschName = 'Stativ mit Fernbedienung';

  siteContextSelector.stub();

  describe('product-details page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(productDetailsPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(productDetailsPath);

      cy.get('cx-product-summary .description p').should(
        'have.text',
        deutschName
      );
    });

    it('should change language in the modal', () => {
      siteContextSelector.languageChange(productDetailsPath);

      cy.get('cx-add-to-cart button.btn-primary').click();
      cy.get('cx-added-to-cart-dialog .cx-link')
        .invoke('text')
        .should('contains', deutschName);
    });
  });
});
