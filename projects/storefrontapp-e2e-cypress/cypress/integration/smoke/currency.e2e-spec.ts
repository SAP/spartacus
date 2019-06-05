import * as siteContextSelector from '../../sample-data/site-context-selector';
import { switchSiteContext } from '../../support/utils/switch-site-context';

context('Currency change', () => {
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
      cy.visit(siteContextSelector.PRODUCT_URL_USD);
      cy.wait('@currencies');

      switchSiteContext(siteContextSelector.CURRENCY_JPY, 'Currency');

      cy.url().should('eq', siteContextSelector.PRODUCT_URL_JPY);
      switchSiteContext(siteContextSelector.CURRENCY_USD, 'Currency');
    });

    it('should display the chosen currency', () => {
      cy.visit(siteContextSelector.PRODUCT_URL_USD);
      cy.wait('@currencies');

      switchSiteContext(siteContextSelector.CURRENCY_JPY, 'Currency');

      cy.get('.price').should('contain', '¥690');
      switchSiteContext(siteContextSelector.CURRENCY_USD, 'Currency');
      cy.get('.price').should('contain', '$8.20');
    });
  });

  describe('on the login page', () => {
    const LOGIN_URL_USD = `/${
      siteContextSelector.CONTENT_CATALOG
    }/en/USD/login`;
    const TEST_EMAIL = 'my@email.com';

    it('user input should not be removed on currency change', () => {
      cy.visit(`${LOGIN_URL_USD}`);
      cy.get('input[type="email"]').type(TEST_EMAIL);
      cy.wait('@currencies');

      switchSiteContext(siteContextSelector.CURRENCY_JPY, 'Currency');

      cy.get('input[type="email"]').should('have.value', TEST_EMAIL);
    });
  });
});
