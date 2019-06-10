import * as siteContextSelector from '../../helpers/site-context-selector';

context('Language Switcher', () => {
  const productPath = siteContextSelector.PRODUCT_PATH_1;

  beforeEach(() => {
    cy.server();
    siteContextSelector.createGerericQuery(
      siteContextSelector.LANGUAGE_REQUEST,
      siteContextSelector.LANGUAGES
    );
  });

  describe('Product Page', () => {
    it('switch language should work and language should be persistent in url', () => {
      siteContextSelector.verifyLanguageChange(productPath);
    });
  });
});
