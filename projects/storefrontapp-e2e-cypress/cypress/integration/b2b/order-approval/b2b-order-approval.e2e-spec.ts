import * as orderApproval from '../../../helpers/b2b/b2b-order-approval';
import { signOutUser } from '../../../helpers/login';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import * as sampleData from '../../../sample-data/b2b-order-approval';

context('B2B - Order Approval', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should display order approval details in order details page', () => {
    orderApproval.loginB2bUser();
    orderApproval.getPendingOrderDetails();

    cy.visit(`/my-account/order/${sampleData.ORDER_CODE}`);
    cy.get('cx-order-details-approval-details').within(() => {
      cy.get('tr').should(
        'have.length',
        sampleData.pendingOrder.permissionResults.length
      );
    });

    sampleData.pendingOrder.permissionResults.forEach((permission, index) => {
      cy.get('cx-order-details-approval-details tr')
        .eq(index)
        .within(() => {
          cy.get('.cx-approval-approverName').should(
            'contain',
            permission.approverName
          );
        });
    });

    signOutUser();
  });

  it('should display order approval list', () => {
    orderApproval.loginB2bApprover();
    orderApproval.getOrderApprovalList();
    cy.visit(`/my-account/approval-dashboard`);

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(0)
      .should(
        'contain',
        sampleData.approvalOrderList.orderApprovals[0].order.code
      );

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(1)
      .should('contain', 'None');

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(2)
      .should(
        'contain',
        sampleData.approvalOrderList.orderApprovals[0].order.orgCustomer.name
      );

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(3)
      .should('contain', 'October 7, 2020');

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(4)
      .should('contain', 'Pending Approval');

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(5)
      .should(
        'contain',
        sampleData.approvalOrderList.orderApprovals[0].order.totalPrice
          .formattedValue
      );
  });

  it('TODO should approve the order', () => {
    orderApproval.loginB2bApprover();
  });

  it('TODO should reject the order', () => {
    orderApproval.loginB2bApprover();
  });
});
