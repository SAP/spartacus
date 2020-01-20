import { checkAllElements } from '../tabbing-order';
import { doPlaceOrder } from '../../order-history';
import { TabElement } from '../tabbing-order.model';

export function paymentDetailsTabbingOrder(config: TabElement[]) {
  doPlaceOrder().then(() =>
    doPlaceOrder().then(() => {
      cy.visit('/my-account/payment-details');

      cy.get('cx-payment-methods a')
        .first()
        .focus();

      checkAllElements(config);
    })
  );
}
