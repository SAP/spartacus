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
    assertPermissionResults(sampleData.pendingOrder);
    signOutUser();
  });

  it('should display order approval list', () => {
    orderApproval.loginB2bApprover();
    orderApproval.getOrderApprovalList();
    orderApproval.visitOrderApprovalListPage();

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(0)
      .should(
        'contain',
        sampleData.approvalOrderList.orderApprovals[0].order.code
      );

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(1)
      .should('contain', sampleData.none);

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(2)
      .should(
        'contain',
        sampleData.approvalOrderList.orderApprovals[0].order.orgCustomer.name
      );

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(3)
      .should('contain', sampleData.orderPlacedDate);

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(4)
      .should('contain', sampleData.statusPendingApproval);

    cy.get('cx-order-approval-list a.cx-order-approval-value')
      .eq(5)
      .should(
        'contain',
        sampleData.approvalOrderList.orderApprovals[0].order.totalPrice
          .formattedValue
      );
  });

  it('Should display approval detail page', () => {
    orderApproval.loginB2bApprover();
    orderApproval.getOrderApprovalDetail();
    orderApproval.visitOrderApprovalDetailPage();

    assertButtons();
    assertPermissionResults(sampleData.approvalOrderDetail.order);
    assertOrderDetails();
  });

  it('should approve the order', () => {
    orderApproval.loginB2bApprover();
    orderApproval.getOrderApprovalDetail();
    orderApproval.visitOrderApprovalDetailPage();

    orderApproval.makeDecision();
    orderApproval.getApprovedOrderApprovalDetail();

    cy.get('cx-order-approval-detail-form .btn-primary').eq(1).click();
    cy.get('cx-order-approval-detail-form textarea').type('test approval');
    cy.get('cx-order-approval-detail-form .btn-primary').click();

    /*cy.get('cx-order-approval-detail-form').should(
      'contain',
      'Back To List'
    );*/

    cy.get('cx-order-approval-detail-form .btn-primary').should('not.exist');
    assertPermissionResults(sampleData.approvedOrderDetails.order);
  });

  it('should reject the order', () => {
    orderApproval.loginB2bApprover();
    orderApproval.getOrderApprovalDetail();
    orderApproval.visitOrderApprovalDetailPage();

    orderApproval.makeDecision();
    orderApproval.getRejectedOrderApprovalDetail();

    cy.get('cx-order-approval-detail-form .btn-primary').eq(0).click();
    cy.get('cx-order-approval-detail-form textarea').type('test rejection');
    cy.get('cx-order-approval-detail-form .btn-primary').click();

    /*cy.get('cx-order-approval-detail-form').should(
      'contain',
      'Back To List'
    );*/

    cy.get('cx-order-approval-detail-form .btn-primary').should('not.exist');
    assertPermissionResults(sampleData.rejectedOrderDetails.order);
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
  // assert order status
  cy.get('cx-order-details-items .cx-list-status').should(
    'contain',
    sampleData.statusPendingApproval
  );

  // assert products
  cy.get('.cx-item-list-row .cx-link').should(
    'contain',
    sampleData.approvalOrderDetail.order.entries[0].product.name
  );
  cy.get('.cx-item-list-row .cx-code').should(
    'contain',
    sampleData.approvalOrderDetail.order.entries[0].product.code
  );
  cy.get('.cx-item-list-row .cx-price').should(
    'contain',
    sampleData.approvalOrderDetail.order.entries[0].basePrice.formattedValue
  );
  cy.get('.cx-item-list-row .cx-total').should(
    'contain',
    sampleData.approvalOrderDetail.order.entries[0].totalPrice.formattedValue
  );

  // asserts order details
  cy.get('cx-order-overview cx-card')
    .eq(0)
    .should('contain', sampleData.approvalOrderDetail.order.code);

  cy.get('cx-order-overview cx-card').eq(1).should('contain', 'Oct 07 2020');

  cy.get('cx-order-overview cx-card')
    .eq(2)
    .should('contain', sampleData.statusPendingApproval);

  cy.get('cx-order-overview cx-card')
    .eq(3)
    .should(
      'contain',
      `${sampleData.approvalOrderDetail.order.deliveryAddress.firstName} ${sampleData.approvalOrderDetail.order.deliveryAddress.lastName}`
    );
  cy.get('cx-order-overview cx-card')
    .eq(3)
    .should(
      'contain',
      sampleData.approvalOrderDetail.order.deliveryAddress.formattedAddress
    );
  cy.get('cx-order-overview cx-card')
    .eq(3)
    .should(
      'contain',
      sampleData.approvalOrderDetail.order.deliveryAddress.country.name
    );

  cy.get('cx-order-overview cx-card')
    .eq(4)
    .should('contain', sampleData.approvalOrderDetail.order.deliveryMode.name);
  cy.get('cx-order-overview cx-card')
    .eq(4)
    .should(
      'contain',
      sampleData.approvalOrderDetail.order.deliveryMode.description
    );
  cy.get('cx-order-overview cx-card')
    .eq(4)
    .should(
      'contain',
      sampleData.approvalOrderDetail.order.deliveryMode.deliveryCost
        .formattedValue
    );

  // assert totals
  cy.get('cx-order-details-totals .cx-summary-amount')
    .eq(0)
    .should(
      'contain',
      sampleData.approvalOrderDetail.order.subTotal.formattedValue
    );
  cy.get('cx-order-details-totals .cx-summary-amount')
    .eq(1)
    .should(
      'contain',
      sampleData.approvalOrderDetail.order.deliveryCost.formattedValue
    );
  cy.get('cx-order-details-totals .cx-summary-amount')
    .eq(2)
    .should(
      'contain',
      sampleData.approvalOrderDetail.order.totalTax.formattedValue
    );
  cy.get('cx-order-details-totals .cx-summary-amount')
    .eq(3)
    .should(
      'contain',
      sampleData.approvalOrderDetail.order.totalPrice.formattedValue
    );
}
