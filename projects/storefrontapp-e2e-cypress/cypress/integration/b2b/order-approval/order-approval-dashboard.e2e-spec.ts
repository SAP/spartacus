import * as orderApproval from '../../../helpers/b2b/b2b-order-approval';

describe('B2B - Order Approval dashboard', () => {
  const APPROVAL_DASHBOARD_ROUTE =
    'powertools-spa/en/USD/my-account/approval-dashboard';

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Anonymous user', () => {
    it('should NOT be allowed to access order approval dashboard directly', () => {
      cy.visit(APPROVAL_DASHBOARD_ROUTE);
      cy.location('pathname').should('contain', '/login');
    });
  });

  describe('Unauthorized user (regular)', () => {
    before(() => {
      orderApproval.loginB2bUser();
    });

    it('should NOT display order approval option in menu', () => {
      cy.visit('/');
      orderApproval.checkApprovalDashboardMenuOptionExistence(false);
      cy.saveLocalStorage();
    });

    it('should NOT be allowed to access order approval dashboard directly', () => {
      cy.restoreLocalStorage();
      cy.visit(APPROVAL_DASHBOARD_ROUTE);
      cy.location('pathname').should('contain', '/login');
    });
  });

  describe('Authorized user (approver)', () => {
    before(() => {
      orderApproval.loginB2bApprover();
    });

    it('should display order approval option in menu', () => {
      cy.visit('/');
      orderApproval.checkApprovalDashboardMenuOptionExistence(true);
      cy.saveLocalStorage();
    });

    it('should BE allowed to access order approval dashboard directly', () => {
      cy.restoreLocalStorage();
      cy.visit(APPROVAL_DASHBOARD_ROUTE);
      cy.location('pathname').should('contain', 'approval-dashboard');
      cy.get('cx-breadcrumb > h1').should(
        'contain',
        'Order Approval Dashboard'
      );
      cy.get('cx-order-approval-list > table').should('exist');
    });
  });
});
