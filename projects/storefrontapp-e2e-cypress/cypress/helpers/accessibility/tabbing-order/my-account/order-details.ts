import { verifyTabbingOrder } from '../../tabbing-order';
import { doPlaceOrder } from '../../../order-history';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function orderDetailsTabbingOrder(config: TabElement[]) {
  doPlaceOrder().then((orderData: any) => {
    cy.intercept({
      method: 'GET',
      pathname: `${Cypress.env(
        'API_URL'
      )}/rest/v2/electronics-spa/users/current/orders/*`,
    }).as('getOrders');

    cy.visit(`/my-account/order/${orderData.body.code}`);

    cy.wait('@getOrders');

    cy.get('cx-cart-item');

    verifyTabbingOrder(containerSelector, config);
  });
}
