import { retrieveTokenAndLogin } from '../../../helpers/checkout-as-persistent-user';
import {
  fullyCancelOrder,
  placeOrder,
} from '../../../helpers/order-cancellation';

let orderCode: string;

context('Order Cancellation - Desktop', () => {
  before(() => {
    cy.window().then((win: Window) => {
      win.localStorage.clear();
    });

    retrieveTokenAndLogin();
    orderCode = placeOrder();
  });

  describe('Order Cancellation', () => {
    it('should fully cancel an order', () => {
      fullyCancelOrder(orderCode);
    });

    it('should partially cancel an order', () => {
      // WIP
    });
  });
});
