import { tabbingOrderConfig as config } from '../../../helpers/accessibility/b2b/tabbing-order.config';
import * as orderApproval from '../../../helpers/b2b/b2b-order-approval';
import * as sampleData from '../../../sample-data/b2b-order-approval';

describe('B2B - Order Approval', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Order Approval - Accessibility.', () => {
    before(() => {
      orderApproval.loginB2bApprover();
      cy.saveLocalStorage();
    });
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    context('Approval List', () => {
      it('should allow to navigate with tab key', () => {
        orderApproval.approvalListTabbingOrder(config.orderApprovalList);
      });
    });

    context('Approval Detail', () => {
      it('should allow to navigate with tab key', () => {
        orderApproval.approvalDetailTabbingOrder(config.orderApprovalDetail);
      });
    });

    context('Approval Form', () => {
      it('should allow to navigate with tab key', () => {
        orderApproval.approvalFormTabbingOrder(config.orderApprovalForm);
      });
    });

    context('Rejection Form', () => {
      it('should allow to navigate with tab key', () => {
        orderApproval.rejectionFormTabbingOrder(config.orderRejectionForm);
      });
    });
  });

  describe('B2B - Check order approval in Order details page for customer', () => {
    it('should display order approval details in order details page', () => {
      orderApproval.loginB2bUser();
      orderApproval.getStubbedPendingOrderDetails();

      cy.visit(`/my-account/order/${sampleData.ORDER_CODE}`);
      assertPermissionResults(sampleData.pendingOrder);
    });
  });

  describe('B2B - Order approval list and details for order approver', () => {
    before(() => {
      orderApproval.loginB2bApprover();
      cy.saveLocalStorage();
    });
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    it('should display order approval list', () => {
      const orderApprovalRow = sampleData.approvalOrderList.orderApprovals[0];
      orderApproval.getStubbedOrderApprovalList();
      orderApproval.visitOrderApprovalListPage();
      cy.wait('@order_approval_list').its('status').should('eq', 200);

      assertApprovalListRowData(0, orderApprovalRow.order.code);
      assertApprovalListRowData(1, sampleData.none);
      assertApprovalListRowData(2, orderApprovalRow.order.orgCustomer.name);
      assertApprovalListRowData(3, sampleData.orderPlacedDate);
      assertApprovalListRowData(4, sampleData.statusPendingApproval);
      assertApprovalListRowData(
        5,
        orderApprovalRow.order.totalPrice.formattedValue
      );

      // test the sort dropdown
      cy.get('.top cx-sorting .ng-select').ngSelect('Order Number');
      cy.wait('@order_approval_list').its('status').should('eq', 200);

      cy.get('@order_approval_list')
        .its('url')
        .should('contain', 'sort=byOrderNumber');
    });

    it('Should display approval detail page', () => {
      orderApproval.getStubbedOrderApprovalDetail();
      orderApproval.visitOrderApprovalDetailPage();

      assertButtons();
      assertPermissionResults(sampleData.approvalOrderDetail.order);
      assertOrderDetails();
    });

    it('should approve the order', () => {
      orderApproval.getStubbedOrderApprovalDetail();
      orderApproval.visitOrderApprovalDetailPage();
      cy.wait('@orderApprovalPending');
      orderApproval.makeStubbedDecision();
      orderApproval.getStubbedApprovedOrderApprovalDetail();

      cy.get('cx-order-approval-detail-form .btn-primary').eq(1).click();
      cy.get('cx-order-approval-detail-form textarea').type('test approval');
      cy.get('cx-order-approval-detail-form .btn-primary').click();
      cy.wait('@orderApprovalApproved');

      cy.get('cx-order-approval-detail-form').should('contain', 'Back To List');
      cy.get('cx-order-approval-detail-form .btn-primary').should('not.exist');
      assertPermissionResults(sampleData.approvedOrderDetails.order);
    });

    it('should reject the order', () => {
      orderApproval.getStubbedOrderApprovalDetail();
      orderApproval.visitOrderApprovalDetailPage();
      cy.wait('@orderApprovalPending');

      orderApproval.makeStubbedDecision();
      orderApproval.getStubbedRejectedOrderApprovalDetail();

      cy.get('cx-order-approval-detail-form .btn-primary').eq(0).click();
      cy.get('cx-order-approval-detail-form textarea').type('test rejection');
      cy.get('cx-order-approval-detail-form .btn-primary').click();
      cy.wait('@orderApprovalRejected');

      cy.get('cx-order-approval-detail-form').should('contain', 'Back To List');
      cy.get('cx-order-approval-detail-form .btn-primary').should('not.exist');
      assertPermissionResults(sampleData.rejectedOrderDetails.order);
    });
  });
});

function assertButtons() {
  cy.get('cx-order-approval-detail-form a.btn').should(
    'contain',
    'Back To List'
  );
  cy.get('cx-order-approval-detail-form .btn-primary')
    .eq(0)
    .should('contain', 'Reject Order...');
  cy.get('cx-order-approval-detail-form .btn-primary')
    .eq(1)
    .should('contain', 'Approve Order...');
}

function assertPermissionResults(order) {
  cy.get('cx-order-details-approval-details').within(() => {
    cy.get('tr').should('have.length', order.permissionResults.length);
  });

  order.permissionResults.forEach((permission, index) => {
    cy.get('cx-order-details-approval-details tr')
      .eq(index)
      .within(() => {
        cy.get('.cx-approval-approverName').should(
          'contain',
          permission.approverName
        );
      });
  });
}

function assertOrderDetails() {
  const order = sampleData.approvalOrderDetail.order;
  const entry = order.entries[0];
  // assert order status
  cy.get('cx-order-details-items .cx-list-status').should(
    'contain',
    sampleData.statusPendingApproval
  );

  // assert products
  cy.get('.cx-item-list-row .cx-link').should('contain', entry.product.name);
  cy.get('.cx-item-list-row .cx-code').should('contain', entry.product.code);
  cy.get('.cx-item-list-row .cx-price').should(
    'contain',
    entry.basePrice.formattedValue
  );
  cy.get('.cx-item-list-row .cx-total').should(
    'contain',
    entry.totalPrice.formattedValue
  );

  // asserts order details
  assertOrderDetailsCard(0, order.code);
  assertOrderDetailsCard(1, 'Oct 07 2020');
  assertOrderDetailsCard(2, sampleData.statusPendingApproval);
  assertOrderDetailsCard(
    3,
    `${order.deliveryAddress.firstName} ${order.deliveryAddress.lastName}`
  );
  assertOrderDetailsCard(3, order.deliveryAddress.formattedAddress);
  assertOrderDetailsCard(3, order.deliveryAddress.country.name);
  assertOrderDetailsCard(4, order.deliveryMode.name);
  assertOrderDetailsCard(4, order.deliveryMode.description);
  assertOrderDetailsCard(4, order.deliveryMode.deliveryCost.formattedValue);


  // assert totals
  assertOrderSummary(0, order.subTotal.formattedValue);
  assertOrderSummary(1, order.deliveryCost.formattedValue);
  assertOrderSummary(2, order.totalTax.formattedValue);
  assertOrderSummary(3, order.totalPrice.formattedValue);
}

function assertApprovalListRowData(index: number, value: string) {
  cy.get('cx-order-approval-list a.cx-order-approval-value')
    .eq(index)
    .should('contain', value);
}

function assertOrderSummary(index: number, value: string) {
  cy.get('cx-order-details-totals .cx-summary-amount')
    .eq(index)
    .should('contain', value);
}

function assertOrderDetailsCard(index: number, value: string) {
  cy.get('cx-order-overview cx-card').eq(index).should('contain', value);
}
