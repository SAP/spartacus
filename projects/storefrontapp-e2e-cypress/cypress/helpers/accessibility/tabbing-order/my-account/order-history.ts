import { verifyTabbingOrder } from '../../tabbing-order';
import { doPlaceOrder } from '../../../order-history';
import { TabElement, TabbingOrderTypes } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function orderHistoryNoOrdersTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/orders');

  verifyTabbingOrder(containerSelector, config);
}

export function orderHistoryWithOrdersTabbingOrder() {
  doPlaceOrder().then((orderData: any) => {
    const config: TabElement[] = [
      {
        type: TabbingOrderTypes.GENERIC_INPUT,
      },
      {
        value: '«',
        type: TabbingOrderTypes.LINK,
      },
      {
        value: '1',
        type: TabbingOrderTypes.LINK,
      },
      {
        value: '»',
        type: TabbingOrderTypes.LINK,
      },
      {
        value: orderData.body.code,
        type: TabbingOrderTypes.LINK,
      },
      {
        value: orderData.body.date,
        type: TabbingOrderTypes.LINK,
      },
      {
        value: 'In Process',
        type: TabbingOrderTypes.LINK,
      },
      {
        value: orderData.body.totalPrice.formattedValue,
        type: TabbingOrderTypes.LINK,
      },
      {
        type: TabbingOrderTypes.GENERIC_INPUT,
      },
      {
        value: '«',
        type: TabbingOrderTypes.LINK,
      },
      {
        value: '1',
        type: TabbingOrderTypes.LINK,
      },
      {
        value: '»',
        type: TabbingOrderTypes.LINK,
      },
    ];

    cy.visit('/my-account/orders');

    verifyTabbingOrder(containerSelector, config);
  });
}
