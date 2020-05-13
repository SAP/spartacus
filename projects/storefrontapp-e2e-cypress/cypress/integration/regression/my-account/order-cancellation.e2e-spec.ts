import { loginSuccessfully } from '../../../helpers/checkout-as-persistent-user';
import {
  cancelOrder,
  placeOrderAndVerifyHistory,
} from '../../../helpers/order-cancellation';

let orderCode: string;

context('Order Cancellation - Desktop', () => {
  before(() => {
    cy.window().then((win: Window) => {
      win.localStorage.clear();
    });
  });

  describe('Order Placement', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should login and redirect to front page', () => {
      loginSuccessfully();
    });

    it('should place an order and then display order history details page', () => {
      orderCode = placeOrderAndVerifyHistory();
    });
  });

  describe('Order Cancellation', () => {
    it('should cancel the order that was placed', () => {
      cancelOrder(orderCode);
    });
  });
});
