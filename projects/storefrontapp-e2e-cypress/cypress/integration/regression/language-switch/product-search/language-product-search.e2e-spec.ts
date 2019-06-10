import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - product-search page', () => {
  const productSearchPath =
    '/Open-Catalogue/Cameras/Film-Cameras/c/574?pageSize=10&categoryCode=574&query=:relevance:category:574';
  const deutschName = 'FUN Einwegkamera mit Blitz, 27+12 Bilder';

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('product-search page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(productSearchPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(productSearchPath);

      cy.get('cx-product-list-item .cx-product-name:first').should(
        'have.text',
        deutschName
      );
    });

    it('should change language in the search result', () => {
      siteContextSelector.languageChange(productSearchPath);

      cy.get('cx-searchbox input').type('fun');
      cy.get('cx-searchbox .products .name:first').should(
        'have.text',
        deutschName
      );
    });
  });
});
