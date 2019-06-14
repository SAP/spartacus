import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - product-search page', () => {
  const productSearchPath = siteContextSelector.PRODUCT_SEARCH_PATH;
  const deutschName = siteContextSelector.PRODUCT_NAME_SEARCH_DE;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('product-search page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        productSearchPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + productSearchPath
      );
    });

    beforeEach(() => {
      siteContextSelector.createGerericQuery(
        siteContextSelector.PAGE_REQUEST,
        siteContextSelector.PAGES
      );
    });

    it('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        productSearchPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );

      cy.wait(`@${siteContextSelector.PAGES}`);

      cy.get('cx-product-list-item .cx-product-name')
        .invoke('text')
        .should('contains', deutschName);
    });

    it('should change language in the search result', () => {
      siteContextSelector.siteContextChange(
        productSearchPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );

      cy.wait(`@${siteContextSelector.PAGES}`);

      cy.get('cx-searchbox input').type('fun');
      cy.get('cx-searchbox .products .name')
        .invoke('text')
        .should('contains', deutschName);
    });
  });
});
