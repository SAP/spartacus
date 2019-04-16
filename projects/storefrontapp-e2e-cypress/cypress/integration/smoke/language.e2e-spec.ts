const BASE_URL = Cypress.config().baseUrl;

// Use language switcher to change languages to Deutsch
function switchLanguage() {
  cy.get('label')
    .contains('Language')
    .parent()
    .children('select')
    .select('de');
}

context('Language Switcher', () => {
  describe('Product Page', () => {
    const PRODUCT_URL_EN = '/electronics/en/USD/product/';
    const PRODUCT_URL_DE = '/electronics/de/USD/product/';
    const PRODUCT_ID = '3595723';

    it('switch language should work and language should be persistent in url', () => {
      // Load Product Page in English
      cy.visit(`/${PRODUCT_URL_EN}${PRODUCT_ID}`);

      // URL should change to contain 'de' as language after language switch
      switchLanguage();
      cy.url().should('eq', `${BASE_URL}${PRODUCT_URL_DE}${PRODUCT_ID}`);
    });
  });

  describe('Login Page', () => {
    const LOGIN_URL_EN = '/electronics/en/USD/login';

    it('user input should not be removed on language change', () => {
      const TEST_EMAIL = 'testEmail';

      // Load Login Page in English
      cy.visit(`/${LOGIN_URL_EN}`);

      // Add email input into email login field
      cy.get('input[type="email"]').type(TEST_EMAIL);

      // Check email remains in input after language switch
      switchLanguage();
      cy.get('input[type="email"]').should('contain', TEST_EMAIL);
    });
  });
});
