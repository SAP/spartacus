import { checkAllElements, TabElement } from '../tabbing-order';
import { doPlaceOrder } from '../../order-history';

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
