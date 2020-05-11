import { loginSuccessfully } from '../../../helpers/checkout-as-persistent-user';
import { doPlaceOrder } from '../../../helpers/order-history';

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

    it('should add a product to cart', () => {
      doPlaceOrder().then(() => {
        doPlaceOrder().then((orderData: any) => {
          cy.waitForOrderToBePlacedRequest(
            undefined,
            undefined,
            orderData.body.code
          );
          cy.visit('/my-account/orders');
          cy.get('cx-order-history h3').should('contain', 'Order history');
          cy.reload();
          cy.get('.cx-order-history-code > .cx-order-history-value').should(
            'contain',
            orderData.body.code
          );
          cy.get('.cx-order-history-total > .cx-order-history-value').should(
            'contain',
            orderData.body.totalPrice.formattedValue
          );
        });
      });
    });
  });
});
