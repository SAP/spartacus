const delay = 3000;

// 1 min in milliseconds
const timerTimeout = 60000;

// start time
let startTime = 0;

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
  })
    .then(
      (res) => new Promise((resolve) => setTimeout(() => resolve(res), delay))
    )
    .then((res: Cypress.Response) => {
      if (
        startTime > timerTimeout ||
        (res.status === 200 &&
          res.body.orders &&
          res.body.orders.length &&
          res.body.orders.filter((order) => order.code === orderNumber))
      ) {
        startTime = 0;
        return;
      } else {
        startTime += delay;
        waitForOrderToBePlacedRequest(orderNumber, contentCatalog);
      }
    });
}
