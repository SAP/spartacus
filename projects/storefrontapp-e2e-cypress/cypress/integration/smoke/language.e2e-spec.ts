import * as siteContextSelector from '../../helpers/site-context-selector';

context('Language Switcher', () => {
  const PRODUCT_ID = '280916';
  const productPath = `/product/${PRODUCT_ID}`;

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
