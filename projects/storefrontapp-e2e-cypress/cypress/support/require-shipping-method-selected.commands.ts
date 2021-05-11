declare namespace Cypress {
  interface Chainable {
    /**
       * Make sure you have shipping method selected. Returns shipping method object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireShippingMethodSelected(auth);
        ```
       */
    requireShippingMethodSelected: (
      auth: {},
      cartId?: string
    ) => Cypress.Chainable<{}>;
  }
}

Cypress.Commands.add('requireShippingMethodSelected', (auth, cartId) => {
  const cartQueryValue = cartId || 'current';

  function getDeliveryModes() {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts/${cartQueryValue}/deliverymodes`,
      headers: {
        Authorization: `bearer ${auth.access_token}`,
      },
    });
  }

  function setShippingMethod(deliveryMode) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts/${cartQueryValue}/deliverymode?deliveryModeId=${deliveryMode}`,
      form: false,
      headers: {
        Authorization: `bearer ${auth.access_token}`,
      },
    });
  }

  cy.server();
  getDeliveryModes().then((resp) =>
    setShippingMethod(resp.body.deliveryModes[0].code).then((resp) =>
      cy.wrap(resp)
    )
  );
});
