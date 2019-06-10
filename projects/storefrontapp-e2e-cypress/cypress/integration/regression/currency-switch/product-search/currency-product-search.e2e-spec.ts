import * as siteContextSelector from '../../../../sample-data/site-context-selector';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

describe('Currency switch - product-search page', () => {
  const productSearchPath =
    '/USD/Open-Catalogue/Cameras/Film-Cameras/c/574?pageSize=10&categoryCode=574&query=:relevance:category:574';
  const deutschName = 'FUN Einwegkamera mit Blitz, 27+12 Bilder';

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.server();
    cy.route(siteContextSelector.CURRENCY_REQUEST).as('languages');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('product-search page', () => {
    it('should change language in the url', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + productSearchPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.CURRENCY_JPY, 'Currency');

      cy.url().should(
        'eq',
        siteContextSelector.FULL_BASE_URL_DE + productSearchPath
      );
    });

    it('should change language in the page', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + productSearchPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.CURRENCY_JPY, 'Currency');

      cy.get('cx-product-list-item .cx-product-name:first').should(
        'have.text',
        deutschName
      );
    });

    it('should change language in the search result', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + productSearchPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.CURRENCY_JPY, 'Currency');

      cy.get('cx-searchbox input').type('fun');
      cy.get('cx-searchbox .products .name:first').should(
        'have.text',
        deutschName
      );
    });
  });
});
