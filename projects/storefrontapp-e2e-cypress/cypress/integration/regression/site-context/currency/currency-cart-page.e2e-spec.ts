import * as siteContextSelector from '../../../../helpers/site-context-selector';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

describe('Currency switch - cart page', () => {
  const cartPath = siteContextSelector.CART_PATH;
  let cartId = '';

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.requireLoggedIn();

    cy.window().then((win) => {
      const savedState = JSON.parse(
        win.localStorage.getItem('spartacus-local-data')
      );
      const accessToken = savedState.auth.userToken.token.access_token;
      cy.addToCart('300938', '3', accessToken).then((cartCode) => {
        cartId = cartCode;
      });

      cy.visit('/cart');
    });
  });

  describe('cart page', () => {
    const baseUrl = `${Cypress.env('API_URL')}/${Cypress.env(
      'OCC_PREFIX'
    )}/${Cypress.env('BASE_SITE')}`;

    it('should change currency in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        cartPath,
        siteContextSelector.CART_REQUEST_ALIAS,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + cartPath
      );
    });

    it.only('should change currency for cart details', () => {
      cy.route('GET', `${baseUrl}/currencies?lang=en&curr=USD`).as(
        'currencies_request'
      );
      cy.wait(`@currencies_request`).its('status').should('eq', 200);

      cy.route(
        'GET',
        `${baseUrl}/users/current/carts/${cartId}?fields=*&curr=JPY`
      ).as('switchedCartContext');
      switchSiteContext('JPY', 'Currency');
      cy.wait('@switchedCartContext').then((xhr) => {
        const cartItemPrice =
          xhr.response.body.entries[0].basePrice.formattedValue;
        const cartSubtotal = xhr.response.body.subTotal.formattedValue;
        cy.get('cx-cart-item-list .cx-price .cx-value').should(
          'contain',
          cartItemPrice
        );

        cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
          'contain',
          cartSubtotal
        );
      });
    });
  });
});
