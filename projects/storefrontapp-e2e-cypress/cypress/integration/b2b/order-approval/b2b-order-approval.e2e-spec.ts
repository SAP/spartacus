import * as orderApproval from '../../../helpers/b2b/b2b-order-approval';
import {
  //b2bAccountShipToUser,
  //b2bProduct,
  //cartWithB2bProduct,
  //order_type,
  POWERTOOLS_BASESITE,
} from '../../../sample-data/b2b-checkout';
import { signOutUser } from '../../../helpers/login';

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

    orderApproval.placeOrder().then((resp) => {
      //const orderCode = resp.body.code;
      const orderCode = '00000130';
      orderApproval.waitForOrderPending(orderCode).then((response) => {
        expect(response.body.permissionResults[0]?.approverName).to.eq(
          'Hanna Schmidt'
        );
        cy.visit(`/my-account/order/${orderCode}`);
        cy.get('cx-order-details-approval-details').within(() => {
          cy.get('tr').should(
            'have.length',
            response.body.permissionResults.length
          );
        });

        response.body.permissionResults.forEach((permission, index) => {
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
    });
  });

  it('should display order approval list', () => {
    orderApproval.loginB2bUser();

    orderApproval.placeOrder().then((resp) => {
      const orderCode = resp.body.code;
      orderApproval.waitForOrderPending(orderCode).then(() => {
        signOutUser();

        orderApproval.loginApprover();
        orderApproval.getOrderApprovalListRoute();
        cy.visit(`/my-account/approval-dashboard`);
        cy.wait('@order_approval_list').its('status').should('eq', 200);

        cy.get('cx-order-approval-list a.cx-order-approval-value')
          .first()
          .should('contain', orderCode);
      });
    });
  });
});
