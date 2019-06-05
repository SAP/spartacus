import * as siteContextSelector from '../../sample-data/site-context-selector';
import { switchSiteContext } from '../../support/utils/switch-site-context';

context('Language Switcher', () => {
  beforeEach(() => {
    cy.server();
    cy.route(siteContextSelector.LANGUAGE_REQUEST).as('languages');
  });

  describe('Product Page', () => {
    it('switch language should work and language should be persistent in url', () => {
      // Load Product Page in English
      cy.visit(siteContextSelector.PRODUCT_URL_EN);
      cy.wait('@languages');

      // URL should change to contain 'ja' as language after language switch
      switchSiteContext(siteContextSelector.LANGUAGE_JA, 'Language');
      cy.url().should('eq', siteContextSelector.PRODUCT_URL_JA);
      // clean after test, go back to default english language
      switchSiteContext(siteContextSelector.LANGUAGE_EN, 'Language');
    });
  });
});
