import { retrieveTokenAndLogin } from '../../../helpers/checkout-as-persistent-user';
import {
  fullyCancelOrder,
  partialCancelOrder,
  placeOrder,
} from '../../../helpers/order-cancellation';

let orderCode: string;

context('Order Cancellation - Desktop', () => {
  describe('Complete Order Cancellation', () => {
    before(() => {
      cy.window().then((win: Window) => {
        win.localStorage.clear();
      });

      retrieveTokenAndLogin();
      orderCode = placeOrder();
    });

    it('should fully cancel an order', () => {
      fullyCancelOrder(orderCode);
    });
  });

  describe('Partial Order Cancellation', () => {
    before(() => {
      cy.window().then((win: Window) => {
        win.localStorage.clear();
      });

      retrieveTokenAndLogin();
      orderCode = placeOrder(5);
    });

    it('should partially cancel an order', () => {
      partialCancelOrder();
    });
  });
});
