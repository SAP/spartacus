import { viewportContext } from '../../../../helpers/viewport-context';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import * as securePortal from '../../../../helpers/b2b/b2b-secure-portal';

context('B2B - Secure Portal', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      clearAllStorage();
    });

    describe('Secure Portal - Routing', () => {
      describe('Routing restrictions', () => {
        before(() => {
          securePortal.getStubbedBasesites();
        });

        it('should redirect to the login page when accessing home', () => {
            cy.visit('/faq');
            cy.url().should('contain', '/login');
        });
      });
    });
  });
});
