export function waitForOrderToBePlacedRequest(
  orderNumber: string,
  contentCatalog: string = 'electronics-spa'
) {
  cy.request({
    method: 'GET',
    url: `${Cypress.env(
      'API_URL'
    )}/rest/v2/${contentCatalog}/users/current/orders?pageSize=5&lang=en&curr=USD`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
          .token.access_token
      }`,
    },
  }).then(res => {
    if (
      res.status === 200 &&
      res.body.orders.filter(order => order.code === orderNumber)
    ) {
      return;
    } else {
      waitForOrderToBePlacedRequest(orderNumber, contentCatalog);
    }
  });
}

export function currentSpecificOrderRoute(orderNumber: string) {
  cy.server();
  cy.route(
    `${Cypress.env(
      'API_URL'
    )}/rest/v2/electronics-spa/users/current/orders/${orderNumber}*`
  ).as('order_cart');
}

export function waitCurrentSpecificOrder() {
  cy.wait('@order_cart')
    .its('status')
    .should('eq', 200);
}
