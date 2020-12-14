const delay = 3000;

// 1 min in milliseconds
const timerTimeout = 180000;
const consignmentTimerTimeout = 180000;

// start time
let startTime = 0;

/**
 * Waits until order is available in orders API response.
 * @param orderNumber Order number to wait for. Without this parameter it will check if at least one order exists
 * @param contentCatalog Content catalog you are testing
 * @param currency Currency you are using
 */
export function waitForOrderToBePlacedRequest(
  orderNumber?: string,
  contentCatalog: string = Cypress.env('BASE_SITE'),
  currency: string = 'USD'
) {
  const {
    userId,
    token: { access_token },
  } = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}${Cypress.env(
      'OCC_PREFIX'
    )}/${contentCatalog}/users/${userId}/${Cypress.env(
      'OCC_PREFIX_ORDER_ENDPOINT'
    )}?pageSize=5&lang=en&curr=${currency}`,
    headers: {
      Authorization: `bearer ${access_token}`,
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
          (!orderNumber ||
            res.body.orders.filter((order) => order.code === orderNumber)
              .length > 0)) ||
        (res.status === 200 &&
          res.body.replenishmentOrders &&
          res.body.replenishmentOrders.length &&
          (!orderNumber ||
            res.body.replenishmentOrders.filter(
              (order) => order.replenishmentOrderCode === orderNumber
            ).length > 0))
      ) {
        startTime = 0;
        return;
      } else {
        startTime += delay;
        waitForOrderToBePlacedRequest(orderNumber, contentCatalog, currency);
      }
    });
}

export function waitForOrderWithConsignmentToBePlacedRequest(
  orderNumber?: string,
  contentCatalog: string = Cypress.env('BASE_SITE'),
  elapsedTime = 0
) {
  const {
    userId,
    token: { access_token },
  } = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}${Cypress.env(
      'OCC_PREFIX'
    )}/${contentCatalog}/users/${userId}/orders/${orderNumber}?pageSize=5&lang=en&curr=USD`,
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  })
    .then(
      (res) => new Promise((resolve) => setTimeout(() => resolve(res), delay))
    )
    .then((res: Cypress.Response) => {
      if (
        elapsedTime > consignmentTimerTimeout ||
        (res.status === 200 &&
          res.body &&
          res.body.consignments &&
          res.body.consignments.length)
      ) {
        return;
      } else {
        elapsedTime += delay;
        waitForOrderWithConsignmentToBePlacedRequest(
          orderNumber,
          contentCatalog,
          elapsedTime
        );
      }
    });
}
