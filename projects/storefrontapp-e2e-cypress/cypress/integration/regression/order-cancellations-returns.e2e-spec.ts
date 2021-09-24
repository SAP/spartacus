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

  describe('Return request list and details', () => {
    it('should display return request list', () => {
      orderCancellationReturn.getStubbedReturnRequestList();
      orderCancellationReturn.visitReturnRequestListPage();
      cy.wait('@return_request_list')
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('cx-tab-paragraph-container button').eq(1).click();

      const returnRequest = sampleData.returnRequestList.returnRequests[0];
      cy.get('cx-order-return-request-list a.cx-order-history-value')
        .eq(0)
        .should('contain', returnRequest.rma);
      cy.get('cx-order-return-request-list a.cx-order-history-value')
        .eq(1)
        .should('contain', returnRequest.order.code);
      cy.get('cx-order-return-request-list .cx-order-history-placed').should(
        'contain',
        sampleData.REQUEST_CREATE_TIME
      );
      cy.get('cx-order-return-request-list .cx-order-history-status').should(
        'contain',
        sampleData.REQUEST_STATUS_PENDING
      );

      // test the sort dropdown
      cy.get('.top cx-sorting .ng-select').ngSelect('Return Number');
      cy.wait('@return_request_list')
        .its('response.statusCode')
        .should('eq', 200);
      cy.get('@return_request_list')
        .its('request.url')
        .should('contain', 'sort=byRMA');

      // accessibility
      verifyTabbingOrder(
        'cx-order-return-request-list',
        config.returnRequestList
      );
    });

    it('Should display return request detail page', () => {
      orderCancellationReturn.getStubbedReturnRequestDetails();
      orderCancellationReturn.visitReturnRequestDetailsPage();

      // assert buttons
      cy.get('cx-return-request-overview .btn-action').should(
        'contain',
        'Back'
      );
      cy.get('cx-return-request-overview .btn-primary').should(
        'contain',
        'Cancel Return Request'
      );

      // assert return request overview
      assertReturnRequestOverview(0, 'Return Request #', sampleData.RMA);
      assertReturnRequestOverview(1, 'For Order #', sampleData.ORDER_CODE);
      assertReturnRequestOverview(
        2,
        'Return status',
        sampleData.REQUEST_STATUS_PENDING
      );

      // assert returned items
      assertReturnedItems(sampleData.returnRequestDetails);

      // assert return totals
      assertReturnTotals(sampleData.returnRequestDetails);

      // accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.returnRequestDetails
      );
    });

    it('should cancel a return request', () => {
      orderCancellationReturn.getStubbedReturnRequestDetails();
      orderCancellationReturn.visitReturnRequestDetailsPage();

      orderCancellationReturn.cancelReturnRequest();
      cy.get('cx-return-request-overview .btn-primary').click();

      cy.get('cx-global-message').should(
        'contain',
        `Your return request (${sampleData.RMA}) was cancelled`
      );
      cy.get('cx-breadcrumb').should('contain', 'Order History');

      // after cancelling one return request, go to list page to check the request status
      orderCancellationReturn.getStubbedReturnRequestListAfterCancel();
      cy.wait('@return_request_list_after_cancel')
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('cx-tab-paragraph-container button').eq(1).click();
      cy.get('cx-order-return-request-list .cx-order-history-status').should(
        'contain',
        sampleData.REQUEST_STATUS_CANCELLING
      );

      // go to detail page to check the status and button
      orderCancellationReturn.getStubbedReturnRequestDetailsAfterCancel();
      cy.get('cx-order-return-request-list a.cx-order-history-value')
        .eq(0)
        .click();
      assertReturnRequestOverview(
        2,
        'Return status',
        sampleData.REQUEST_STATUS_CANCELLING
      );
      cy.get('cx-return-request-overview .btn-primary').should('not.exist');
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
    cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
    cy.get('cx-form-errors').should('contain', 'Select at least one item');

    cy.get('cx-item-counter button').eq(1).click();
    cy.get('cx-form-errors').should('not.contain', 'Select at least one item');
  }

  function cancelItem() {
    cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
    cy.get('cx-breadcrumb').should('contain', 'Cancel Order Confirmation');
  }

  function returnItem() {
    cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
    cy.get('cx-breadcrumb').should('contain', 'Return Order Confirmation');
  }

  function assertReturnRequestOverview(
    index: number,
    label: string,
    value: string
  ) {
    cy.get('cx-return-request-overview .cx-detail')
      .eq(index)
      .get('.cx-detail-label')
      .should('contain', label);
    cy.get('cx-return-request-overview .cx-detail')
      .eq(0)
      .get('.cx-detail-value')
      .should('contain', value);
  }

  function assertReturnedItems(returnRequestDetails) {
    cy.get('cx-return-request-items').within(() => {
      cy.get('.cx-item-list-row').should(
        'have.length',
        returnRequestDetails.returnEntries.length
      );
    });

    returnRequestDetails.returnEntries.forEach((entry, index) => {
      cy.get('cx-return-request-items .cx-item-list-row')
        .eq(index)
        .within(() => {
          cy.get('.cx-info-container').should(
            'contain',
            entry.orderEntry.product.name
          );
          cy.get('.cx-info-container').should(
            'contain',
            entry.orderEntry.product.code
          );
          cy.get('.cx-price').should(
            'contain',
            entry.orderEntry.basePrice.formattedValue
          );
          cy.get('.cx-quantity').should('contain', entry.expectedQuantity);
          cy.get('.cx-total').should(
            'contain',
            entry.refundAmount.formattedValue
          );
        });
    });
  }

  function assertReturnTotals(returnRequestDetails) {
    cy.get('cx-return-request-totals .cx-summary-row')
      .eq(0)
      .should('contain', returnRequestDetails.subTotal.formattedValue);
    cy.get('cx-return-request-totals .cx-summary-row')
      .eq(1)
      .should('contain', returnRequestDetails.deliveryCost.formattedValue);
    cy.get('cx-return-request-totals .cx-summary-row')
      .eq(2)
      .should('contain', returnRequestDetails.totalPrice.formattedValue);
  }
});
