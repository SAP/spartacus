import * as siteContextSelector from '../../../../sample-data/site-context-selector';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

describe('Language switch - product-details page', () => {
  const productDetailsPath =
    '/USD/product/1687508/Stativ%20mit%20Fernbedienung%20VCT-80AV';
  const deutschName = 'Stativ mit Fernbedienung';

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.server();
    cy.route(siteContextSelector.LANGUAGE_REQUEST).as('languages');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('product-details page', () => {
    it('should change language in the url', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + productDetailsPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.url().should(
        'eq',
        siteContextSelector.FULL_BASE_URL_DE + productDetailsPath
      );
    });

    it('should change language in the page', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + productDetailsPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.get('cx-product-summary .description p').should(
        'have.text',
        deutschName
      );
    });

    it('should change language in the modal', () => {
      cy.visit(siteContextSelector.FULL_BASE_URL_EN + productDetailsPath);
      cy.wait('@languages');

      switchSiteContext(siteContextSelector.LANGUAGE_DE, 'Language');

      cy.get('cx-add-to-cart button.btn-primary').click();
      cy.get('cx-added-to-cart-dialog .cx-link')
        .invoke('text')
        .should('contains', deutschName);
    });
  });
});
