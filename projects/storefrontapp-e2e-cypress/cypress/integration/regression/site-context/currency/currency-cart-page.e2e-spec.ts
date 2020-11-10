import * as siteContextSelector from '../../../../helpers/site-context-selector';
import { switchSiteContext } from '../../../../support/utils/switch-site-context';

context('Currency switch - cart page', () => {
  const cartPath = siteContextSelector.CART_PATH;
  let cartId = '';

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.requireLoggedIn();

    cy.window().then((win) => {
      // clear currency and language data from session storage
      win.sessionStorage.clear();

      const savedState = JSON.parse(
        win.localStorage.getItem('spartacus⚿⚿auth')
      );
      const accessToken = savedState.token.access_token;
      cy.addToCart('300938', '3', accessToken).then((cartCode) => {
        cartId = cartCode;
      });
    });

    cy.server();
    cy.visit('/cart');

    cy.route('GET', siteContextSelector.CURRENCY_REQUEST).as(
      'currencies_request'
    );
    cy.wait(`@currencies_request`).its('status').should('eq', 200);
  });

  describe('cart page', () => {
    const baseUrl = `${Cypress.env('API_URL')}/${Cypress.env(
      'OCC_PREFIX'
    )}/${Cypress.env('BASE_SITE')}`;

    it('should change currency in the url', () => {
      cy.route('GET', siteContextSelector.CART_REQUEST).as(
        siteContextSelector.CART_REQUEST_ALIAS
      );

      siteContextSelector.verifySiteContextChangeUrl(
        cartPath,
        siteContextSelector.CART_REQUEST_ALIAS,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + cartPath
      );
    });

    it('should change currency for cart details', () => {
      cy.route(
        'GET',
        `${baseUrl}/users/current/carts/${cartId}?fields=*&curr=${siteContextSelector.CURRENCY_JPY}`
      ).as('switchedCartContext');

      switchSiteContext(
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );
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
