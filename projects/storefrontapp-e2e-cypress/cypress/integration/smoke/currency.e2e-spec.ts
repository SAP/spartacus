const changeCurrency = (currency: string) => {
  cy.get('.SiteContext label')
    .contains('Currency')
    .parent()
    .children('select')
    .select(currency);
};

context('Currency change', () => {
  const JPY_CURR = 'JPY';
  const USD_CURR = 'USD';
  const BASE_URL = Cypress.config().baseUrl;
  const CONTENT_CATALOG = 'electronics-spa';
  const PRODUCT_URL_USD = `/${CONTENT_CATALOG}/en/${USD_CURR}/product/`;
  const PRODUCT_URL_JPY = `/${CONTENT_CATALOG}/en/${JPY_CURR}/product/`;
  const PRODUCT_ID = '280916';

  beforeEach(() => {
    cy.server();
    cy.route(
      `${Cypress.env(
        'API_URL'
      )}/rest/v2/electronics-spa/currencies?lang=en&curr=USD`
    ).as('currencies');
  });

  describe('on the product page', () => {
    it('should change the currency and be persistent in the url ', () => {
      cy.visit(`${PRODUCT_URL_USD}${PRODUCT_ID}`);
      cy.wait('@currencies');

      changeCurrency(JPY_CURR);

      cy.url().should('eq', `${BASE_URL}${PRODUCT_URL_JPY}${PRODUCT_ID}`);
      changeCurrency(USD_CURR);
    });

    it('should display the chosen currency', () => {
      cy.visit(`${PRODUCT_URL_USD}${PRODUCT_ID}`);
      cy.wait('@currencies');

      changeCurrency(JPY_CURR);

      cy.get('.price').should('contain', '¥690');
      changeCurrency(USD_CURR);
      cy.get('.price').should('contain', '$8.20');
    });
  });

  describe('on the login page', () => {
    const LOGIN_URL_USD = `/${CONTENT_CATALOG}/en/USD/login`;
    const TEST_EMAIL = 'my@email.com';

    it('user input should not be removed on currency change', () => {
      cy.visit(`${LOGIN_URL_USD}`);
      cy.get('input[type="email"]').type(TEST_EMAIL);
      cy.wait('@currencies');

      changeCurrency(JPY_CURR);

      cy.get('input[type="email"]').should('have.value', TEST_EMAIL);
    });
  });
});
