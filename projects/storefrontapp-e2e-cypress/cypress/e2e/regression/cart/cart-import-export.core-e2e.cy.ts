import * as importExport from '../../../helpers/cart-import-export';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Cart Import/Export', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
    });
    importExport.testImportExportSingleProduct();
    importExport.testImportExportLargerQuantity();
  });
});
