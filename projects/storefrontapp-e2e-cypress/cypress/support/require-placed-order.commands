import { generateMail, randomString } from '../helpers/user';
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Make sure you have placed the order. Returns order object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requirePlacedOrder(); // default values
        cy.requirePlacedOrder(user, product, cart);
        ```
       */
      requirePlacedOrder: (
        user?: UserData,
        product?: ProductData,
        cart?: CartData
      ) => Cypress.Chainable<Order>;
    }
  }
}

Cypress.Commands.add(
  'requirePlacedOrder',
  (userData?: UserData, productData?: ProductData, cartData?: CartData) => {
    const orderData = {
      // compose orderData...
    };

    function placeOrder(orderData: {}) {
      return cy.request(orderData);
    }

    cy.server();

    placeOrder(orderData).then(res => {
      if (res.status === 201) {
        // sucessfully placed order
      } else {
        // something went wrong?
        cy.log(res);
      }
    });

    return cy.wrap(Order);
  }
);
