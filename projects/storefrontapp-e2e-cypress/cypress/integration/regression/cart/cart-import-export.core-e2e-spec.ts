import * as importExport from '../../../helpers/cart-import-export';
import { viewportContext } from '../../../helpers/viewport-context';

context('Cart Import/Export', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      //Temporary change. Test repeatability in pipeline.
      Cypress.config(
        'requestTimeout',
        Number(Cypress.config('requestTimeout')) * 2
      );
      cy.window().then((win) => win.sessionStorage.clear());
    });
    importExport.testImportExportSingleProduct();
    importExport.testImportExportLargerQuantity();
  });
});
