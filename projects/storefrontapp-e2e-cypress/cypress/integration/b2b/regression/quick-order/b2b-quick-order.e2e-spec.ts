import * as quickOrder from '../../../../helpers/b2b/b2b-quick-order';
import { viewportContext } from '../../../../helpers/viewport-context';

context('B2B - Quick Order', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.window().then((win) => win.localStorage.clear());
      cy.clearLocalStorageMemory();
    });

    describe('Accessibility - keyboarding', () => {

    describe('Cart page', () => {
      describe('Anonymous user', () => {
        beforeEach(() => {
          quickOrder.visitCartPage();
        });

        afterEach(() => {
          cy.location('pathname').should('contain', '/login');
        });

      // TODO
      });
    });

    describe('Quick Order Page', () => {
    // TODO
    });
  });
});
