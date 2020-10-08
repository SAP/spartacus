import * as orderApproval from '../../../helpers/b2b/b2b-order-approval';
import { signOutUser } from '../../../helpers/login';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import {
  ORDER_CODE,
  pendingOrder,
} from '../../../sample-data/b2b-order-approval';

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

    cy.visit(`/my-account/order/${ORDER_CODE}`);
    cy.get('cx-order-details-approval-details').within(() => {
      cy.get('tr').should('have.length', pendingOrder.permissionResults.length);
    });

    pendingOrder.permissionResults.forEach((permission, index) => {
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
      .first()
      .should('contain', ORDER_CODE);
  });
});
