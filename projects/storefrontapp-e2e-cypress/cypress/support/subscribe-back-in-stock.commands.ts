declare namespace Cypress {
  interface Chainable {
    /**
       * Make sure you have subscribed back-in-stock interests.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.subscribeBackInStock(token, productCode, notificationType);
        ```
       */
    subscribeBackInStock: (
      token: string,
      productCodes: string[],
      notificationType: string
    ) => Cypress.Chainable<{}>;

    /**
       * Make sure you have unsubscribed back-in-stock interests.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.unsubscribeBackInStock(token, productCode, notificationType);
        ```
       */
    unsubscribeBackInStock: (
      token: string,
      productCodes: string[],
      notificationType: string
    ) => Cypress.Chainable<{}>;
  }
}

Cypress.Commands.add(
  'subscribeBackInStock',
  (auth, productCodes, notificationType) => {
    const apiUrl = Cypress.env('API_URL');

    function subscribe() {
      productCodes.forEach((productCode: string) => {
        cy.request({
          method: 'POST',
          url: `${apiUrl}/rest/v2/electronics-spa/users/current/productinterests?productCode=${productCode}&notificationType=${notificationType}`,
          form: false,
          headers: {
            Authorization: `bearer ${auth.userToken.token.access_token}`,
          },
        });
      });
    }

    cy.server();
    subscribe();
  }
);

Cypress.Commands.add(
  'unsubscribeBackInStock',
  (auth, productCodes, notificationType) => {
    const apiUrl = Cypress.env('API_URL');

    function unsubscribe() {
      productCodes.forEach((productCode: string) => {
        cy.request({
          method: 'DELETE',
          url: `${apiUrl}/rest/v2/electronics-spa/users/current/productinterests?productCode=${productCode}&notificationType=${notificationType}`,
          form: false,
          headers: {
            Authorization: `bearer ${auth.userToken.token.access_token}`,
          },
        });
      });
    }

    cy.server();
    unsubscribe();
  }
);
