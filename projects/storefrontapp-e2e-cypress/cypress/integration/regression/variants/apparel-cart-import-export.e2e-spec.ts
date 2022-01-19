import * as importExport from '../../../helpers/cart-import-export';
import { viewportContext } from '../../../helpers/viewport-context';

export const APPAREL_BASESITE = 'apparel-uk-spa';
export const APPAREL_CURRENCY = 'GBP';

context.skip('Apparel - Cart Import/Export', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
      Cypress.env('BASE_CURRENCY', APPAREL_CURRENCY);
    });

    beforeEach(() => {
      cy.cxConfig({
        context: {
          baseSite: [APPAREL_BASESITE],
          currency: [APPAREL_CURRENCY],
        },
      });
    });

    importExport.testImportExportWithVariableProducts();
  });
});
