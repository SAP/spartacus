import { checkAllElements, TabElement } from '../tabbing-order';
import { doPlaceOrder } from '../../order-history';

export function reviewOrderTabbingOrder(config: TabElement[]) {
  doPlaceOrder().then((orderData: any) => {
    cy.visit(`/my-account/order/${orderData.body.code}`);
    cy.get('cx-order-details-items a')
      .first()
      .focus();
    checkAllElements(config);
  });
}
