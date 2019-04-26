// Use language switcher to change language
function switchLanguage(lang: string) {
  cy.get('.SiteContext label')
    .contains('Language')
    .parent()
    .children('select')
    .select(lang);
}

context('Language Switcher', () => {
  const BASE_URL = Cypress.config().baseUrl;
  const CONTENT_CATALOG = 'electronics-spa';
  const CURRENCY = 'USD';

  describe('Product Page', () => {
    const PRODUCT_URL_EN = `/${CONTENT_CATALOG}/en/${CURRENCY}/product/`;
    const PRODUCT_URL_DE = `/${CONTENT_CATALOG}/de/${CURRENCY}/product/`;
    const PRODUCT_ID = '3595723';

    it('switch language should work and language should be persistent in url', () => {
      // Load Product Page in English
      cy.visit(`${PRODUCT_URL_EN}${PRODUCT_ID}`);

      // URL should change to contain 'de' as language after language switch
      switchLanguage('de');
      cy.url().should('eq', `${BASE_URL}${PRODUCT_URL_DE}${PRODUCT_ID}`);
      // clean after test, go back to default english language
      switchLanguage('en');
    });
  });
});
