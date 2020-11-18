import { verifyTabbingOrder } from '../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';
import * as orderCancellationReturn from '../../helpers/order-cancellations-returns';
import * as sampleData from '../../sample-data/order-cancellations-returns';

describe('Order Cancellations and Returns', () => {
  before(() => {
    cy.requireLoggedIn();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  describe('Should display cancel or return buttons in order details page', () => {
    it('should display cancel button in order details page', () => {
      orderCancellationReturn.getStubbedCancellableOrderDetails();
      orderCancellationReturn.visitOrderDetailPage();

      assertActionButtons('Cancel Items');

      // Accessibility
      verifyTabbingOrder(
        'cx-order-details-actions',
        config.orderDetailsCancelAction
      );
    });

    it('should display return button in order details page', () => {
      orderCancellationReturn.getStubbedReturnableOrderDetails();
      orderCancellationReturn.visitOrderDetailPage();

      assertActionButtons('Request a Return');

      // Accessibility
      verifyTabbingOrder(
        'cx-order-details-actions',
        config.orderDetailsReturnAction
      );
    });
  });

  describe('should cancel order', () => {
    it('should cancel', () => {
      orderCancellationReturn.getStubbedCancellableOrderDetails();
      orderCancellationReturn.visitCancelOrderPage();

      assertButtons();
      assertOrderItems(sampleData.orderDetails);

      // accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.cancelOrReturnOrder
      );

      // validate input
      validateInput();

      // cancel one item
      cancelItem();
    });

    it('should confirm cancel', () => {
      assertButtons(true);
      assertOrderItems(sampleData.orderDetails, true);

      // accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.confirmCancelOrReturnOrder
      );

      // confirm cancel
      orderCancellationReturn.confirmCancelOrder();
      cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
      cy.get('cx-global-message').should(
        'contain',
        `Your cancellation request was submitted (original order ${sampleData.ORDER_CODE} will be updated)`
      );
      cy.get('cx-breadcrumb').should('contain', 'Order History');
    });
  });

  describe('should return order', () => {
    it('should return', () => {
      orderCancellationReturn.getStubbedReturnableOrderDetails();
      orderCancellationReturn.visitReturnOrderPage();

      assertButtons();
      assertOrderItems(sampleData.orderDetails);

      // accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.cancelOrReturnOrder
      );

      // validate input
      validateInput();

      // return one item
      returnItem();
    });

    it('should confirm return', () => {
      assertButtons(true);
      assertOrderItems(sampleData.orderDetails, true);

      // accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.confirmCancelOrReturnOrder
      );

      // confirm return
      orderCancellationReturn.confirmReturnOrder();
      cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
      cy.get('cx-global-message').should(
        'contain',
        `Your return request (${sampleData.RMA}) was submitted`
      );
      cy.get('cx-breadcrumb').should('contain', 'Return Request Details');
    });
  });

  function assertActionButtons(btnText: string) {
    cy.get('cx-order-details-actions a.btn').should('contain', btnText);
  }

  function assertButtons(isConfirm = false) {
    cy.get('cx-amend-order-actions a.btn').should('contain', 'Back');
    if (isConfirm) {
      cy.get('cx-amend-order-actions .btn-primary').should(
        'contain',
        'Submit Request'
      );
    } else {
      cy.get('cx-amend-order-actions .btn-primary').should(
        'contain',
        'Continue'
      );
    }
  }

  function assertOrderItems(order: any, isConfirm = false) {
    if (!isConfirm) {
      cy.get('cx-amend-order-items button.cx-action-link').should(
        'contain',
        'Set all quantities to maximum '
      );
    }

    cy.get('cx-amend-order-items').within(() => {
      cy.get('.cx-item-list-row').should('have.length', order.entries.length);
    });

    order.entries.forEach((entry, index) => {
      cy.get('cx-amend-order-items .cx-item-list-row')
        .eq(index)
        .within(() => {
          cy.get('.cx-list-item-desc').should('contain', entry.product.name);
          cy.get('.cx-list-item-desc').should('contain', entry.product.code);
          cy.get('.cx-price').should('contain', entry.basePrice.formattedValue);
          if (isConfirm) {
            cy.get('.cx-quantity').should('contain', 1);
            cy.get('.cx-total').should(
              'contain',
              entry.basePrice.formattedValue
            );
          } else {
            cy.get('.cx-request-qty').should('contain', 1);
            cy.get('cx-item-counter').should('exist');
          }
        });
    });
  }

  function validateInput() {
    cy.get('cx-amend-order-actions')
      .findByText(/Continue/i)
      .click();
    cy.get('cx-form-errors').should('contain', 'Select at least one item');

    cy.get('cx-item-counter').findByText('+').click();
    cy.get('cx-form-errors').should('not.contain', 'Select at least one item');
  }

  function cancelItem() {
    cy.get('cx-amend-order-actions')
      .findByText(/Continue/i)
      .click();

    cy.get('cx-breadcrumb').should('contain', 'Cancel Order Confirmation');
  }

  function returnItem() {
    cy.get('cx-amend-order-actions')
      .findByText(/Continue/i)
      .click();

    cy.get('cx-breadcrumb').should('contain', 'Return Order Confirmation');
  }
});
