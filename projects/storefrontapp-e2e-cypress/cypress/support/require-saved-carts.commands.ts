import { b2bProduct } from '../sample-data/b2b-checkout';
import { savedActiveCartForm } from '../sample-data/b2b-saved-cart';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       *  Returns Saved Cart Object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireSavedCart(auth);
        ```
       */
      requireSavedCart: (
        auth: {},
        productData?: {},
        savedCartForm?: {}
      ) => Cypress.Chainable<any>;
    }
  }
}

Cypress.Commands.add(
  'requireSavedCart',
  (auth, productData = b2bProduct, savedCartForm = savedActiveCartForm[2]) => {
    function saveCart(cartCode: string) {
      return cy.request({
        method: 'PATCH',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/${cartCode}/save?saveCartName=${
          savedCartForm.name
        }&saveCartDescription=${savedCartForm.description}`,
        headers: {
          Authorization: `bearer ${auth.access_token}`,
        },
      });
    }

    cy.requireProductAddedToCart(auth, productData).then((cart) => {
      saveCart(cart.cartId).then((response) => {
        Cypress.log({
          name: 'requireSavedCart',
          displayName: 'Save cart (require)',
          message: [`🛒 Successfully saved a cart`],
          consoleProps: () => {
            return {
              'Cart ID': cart.cartId,
              'Saved Cart Data': response.body,
            };
          },
        });
        cy.wrap(response.body.savedCartData);
      });
    });
  }
);
