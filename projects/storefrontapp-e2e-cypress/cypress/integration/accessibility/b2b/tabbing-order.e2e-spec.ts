import { tabbingOrderConfig as config } from '../../../helpers/accessibility/b2b/tabbing-order.config';
import {
  approvalDetailTabbingOrder,
  approvalFormTabbingOrder,
  approvalListTabbingOrder,
  rejectionFormTabbingOrder,
} from '../../../helpers/accessibility/tabbing-order/b2b/order-approval';
import { loginB2bApprover } from '../../../helpers/b2b/b2b-order-approval';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

describe('Tabbing order for B2B', () => {
  describe('Order Approval', () => {
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

    context('Approval List', () => {
      it('should allow to navigate with tab key', () => {
        loginB2bApprover();
        approvalListTabbingOrder(config.orderApprovalList);
      });
    });

    context('Approval Detail', () => {
      it('should allow to navigate with tab key', () => {
        loginB2bApprover();
        approvalDetailTabbingOrder(config.orderApprovalDetail);
      });
    });

    context('Approval Form', () => {
      it('should allow to navigate with tab key', () => {
        loginB2bApprover();
        approvalFormTabbingOrder(config.orderApprovalForm);
      });
    });

    context('Rejection Form', () => {
      it('should allow to navigate with tab key', () => {
        loginB2bApprover();
        rejectionFormTabbingOrder(config.orderRejectionForm);
      });
    });
  });
});
