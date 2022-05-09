import * as importExport from '../../../helpers/cart-import-export';
import { viewportContext } from '../../../helpers/viewport-context';

context('Cart Import/Export', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });
    
    it(['cart_import_export'], 'should validate import export cart core functionality', () => {
      importExport.testImportExportSingleProduct();
      importExport.testImportExportLargerQuantity();
    });
  });
});
