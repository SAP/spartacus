import { tabbingOrderConfig as config } from '../../../../helpers/accessibility/b2b/tabbing-order.config';
import { verifyTabbingOrder } from '../../../../helpers/accessibility/tabbing-order';
import * as orderApproval from '../../../../helpers/b2b/b2b-order-approval';
import * as sampleData from '../../../../sample-data/b2b-order-approval';

describe('B2B - Order Approval', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Check order approval in Order details page for customer', () => {
    it('should display order approval details in order details page', () => {
      orderApproval.loginB2bUser();
      orderApproval.getStubbedPendingOrderDetails();

      cy.visit(`/my-account/order/${sampleData.ORDER_CODE}`);
      assertPermissionResults(sampleData.pendingOrder);
    });
  });

  describe('Order approval list and details for order approver', () => {
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
      cy.wait('@order_approval_list')
        .its('response.statusCode')
        .should('eq', 200);

      orderApproval.checkApprovalDashboardMenuOptionExistence(true);

      assertApprovalListRowData(0, orderApprovalRow.order.code);
      assertApprovalListRowData(1, sampleData.none);
      assertApprovalListRowData(2, orderApprovalRow.order.orgCustomer.name);
      assertApprovalListRowData(3, sampleData.orderPlacedDate);
      assertApprovalListRowData(4, sampleData.statusPendingApproval);
      assertApprovalListRowData(
        5,
        orderApprovalRow.order.totalPrice.formattedValue
      );
    });

    it('should approve the order', () => {
      orderApproval.getStubbedOrderApprovalDetail();
      orderApproval.visitOrderApprovalDetailPage();
      cy.wait('@orderApprovalPending');
      orderApproval.makeStubbedDecision();
      orderApproval.getStubbedApprovedOrderApprovalDetail();

      cy.get('cx-order-approval-detail-form .btn-primary').eq(1).click();
      // Accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.orderApprovalForm
      );
      cy.get('cx-order-approval-detail-form textarea').type('test approval');
      // Submit the form
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
      // Accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.orderRejectionForm
      );
      cy.get('cx-order-approval-detail-form textarea').type('test rejection');
      // Submit the form
      cy.get('cx-order-approval-detail-form .btn-primary').click();
      cy.wait('@orderApprovalRejected');

      cy.get('cx-order-approval-detail-form').should('contain', 'Back To List');
      cy.get('cx-order-approval-detail-form .btn-primary').should('not.exist');
      assertPermissionResults(sampleData.rejectedOrderDetails.order);
    });
  });
});

function assertPermissionResults(order) {
  cy.get('cx-order-detail-permission-results').within(() => {
    cy.get('tr').should('have.length', order.permissionResults.length);
  });

  order.permissionResults.forEach((permission, index) => {
    cy.get('cx-order-detail-permission-results tr')
      .eq(index)
      .within(() => {
        cy.get('.cx-approval-approverName').should(
          'contain',
          permission.approverName
        );
      });
  });
}

function assertApprovalListRowData(index: number, value: string) {
  cy.get('cx-order-approval-list a.cx-order-approval-value')
    .eq(index)
    .should('contain', value);
}
