const JPY_CURR = 'JPY';
const USD_CURR = 'USD';
const BASE_URL = Cypress.config().baseUrl;
const CONTENT_CATALOG = 'electronics-spa';

const changeCurrency = (currency: string) => {
  cy.get('.SiteContext label')
    .contains('Currency')
    .parent()
    .children('select')
    .select(currency);
};

context.only('Currency change', () => {
  let PRODUCT_URL_USD: string;
  let PRODUCT_URL_JPY: string;
  let PRODUCT_ID: string;

  describe('on the product page', () => {
    beforeEach(() => {
      PRODUCT_URL_USD = `/${CONTENT_CATALOG}/en/${USD_CURR}/product/`;
      PRODUCT_URL_JPY = `/${CONTENT_CATALOG}/en/${JPY_CURR}/product/`;
      PRODUCT_ID = '280916';
    });

    it('should change the currency and be persistent in the url ', () => {
      cy.visit(`/${PRODUCT_URL_USD}${PRODUCT_ID}`);

      changeCurrency(JPY_CURR);

      cy.url().should('eq', `${BASE_URL}${PRODUCT_URL_JPY}${PRODUCT_ID}`);
    });
  });

  describe('on the login page', () => {
    let LOGIN_URL_USD: string;
    let TEST_EMAIL: string;

    beforeEach(() => {
      LOGIN_URL_USD = 'electronics/en/USD/login';
      TEST_EMAIL = 'My email';
    });

    it('user input should not be removed on currency change', () => {
      cy.visit(`/${LOGIN_URL_USD}`);
      cy.get('input[type="email"]').type(TEST_EMAIL);

      changeCurrency(JPY_CURR);

      cy.get('input[type="email"]').should('contain', TEST_EMAIL);
    });
  });
});
