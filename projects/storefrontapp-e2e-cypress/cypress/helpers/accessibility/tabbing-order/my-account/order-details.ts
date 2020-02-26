import { verifyTabbingOrder } from '../../tabbing-order';
import { doPlaceOrder } from '../../../order-history';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function orderDetailsTabbingOrder(config: TabElement[]) {
  doPlaceOrder().then((orderData: any) => {
    cy.visit(`/my-account/order/${orderData.body.code}`);

    verifyTabbingOrder(containerSelector, config);
  });
}
