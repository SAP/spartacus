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
      res.body.orders &&
      res.body.orders.length &&
      res.body.orders.filter(order => order.code === orderNumber)
    ) {
      return;
    } else {
      waitForOrderToBePlacedRequest(orderNumber, contentCatalog);
    }
  });
}
