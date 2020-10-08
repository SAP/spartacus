import { tabbingOrderConfig as config } from '../../../helpers/accessibility/b2b/tabbing-order.config';
import { approvalListTabbingOrder } from '../../../helpers/accessibility/tabbing-order/b2b/order-approval';
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
        cy.window().then((win) => win.sessionStorage.clear());
        loginB2bApprover();
        approvalListTabbingOrder(config.orderApprovalList);
      });
    });
    context('Approval Detail', () => {
      it('should allow to navigate with tab key', () => {});
    });
  });
});
