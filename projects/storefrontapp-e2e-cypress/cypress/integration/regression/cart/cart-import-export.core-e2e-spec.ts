import * as importExport from '../../../helpers/cart-import-export';
import { viewportContext } from '../../../helpers/viewport-context';

context('Cart Import/Export', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });
    importExport.testImportExportSingleProduct();
    importExport.testImportExportLargerQuantity();
  });
});
