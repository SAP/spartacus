import * as importExport from '../../../helpers/cart-import-export';
import { viewportContext } from '../../../helpers/viewport-context';

context('Cart Import/Export', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      Cypress.config('requestTimeout', 30000);
      cy.window().then((win) => win.sessionStorage.clear());
    });
    importExport.testImportExportSingleProduct();
    importExport.testImportExportLargerQuantity();
  });
});
