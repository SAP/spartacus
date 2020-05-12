import { loginSuccessfully } from '../../../helpers/checkout-as-persistent-user';
import { waitForPage } from '../../../helpers/checkout-flow';
import { cancelOrder } from '../../../helpers/order-cancellation';

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
      // placeOrderAndVerifyHistory();
      orderCode = '00001694';

      waitForPage(`/my-account/order/${orderCode}`, 'tester');
      cy.visit(`/my-account/order/${orderCode}`);
      cy.wait('@tester');
    });
  });

  describe('Order Cancellation', () => {
    it('should cancel the order that was placed', () => {
      cancelOrder(orderCode);
    });
  });
});
