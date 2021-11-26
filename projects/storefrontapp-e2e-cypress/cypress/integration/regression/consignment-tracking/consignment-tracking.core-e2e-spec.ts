import * as orderDetail from '../../../helpers/consignment-tracking';
import { viewportContext } from '../../../helpers/viewport-context';

describe('consignment tracking', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      orderDetail.loginUsingUserWithOrder();
    });

    it('should see tracking package button and tracking events when consignment is shipped', () => {
      cy.visit('/my-account/order/100000');
      cy.get('.cx-list').should('have.length', 3);
      cy.get('.cx-list')
        .first()
        .within(() => {
          cy.get('.cx-code').should('contain', '300938');
          cy.get('.btn-track').click();
        });
      cy.get('.event-body').should('have.length', 3);
      cy.get('.close').click();
      cy.get('.cx-list')
        .next()
        .within(() => {
          cy.get('.cx-code').should('contain', '1992693');
          cy.get('.btn-track').click();
        });
      cy.get('.no-tracking-heading').should('have.length', 1);
      cy.get('.close').click();
      cy.get('.cx-list')
        .last()
        .within(() => {
          cy.get('.cx-code').should('contain', '1377492');
          cy.get('.btn-track').should('have.length', 0);
        });
    });

    it('should not see tracking package button when no consignment', () => {
      cy.visit('/my-account/order/100001');
      cy.get('.btn-track').should('have.length', 0);
    });
  });
});
