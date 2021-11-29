import * as cart from '../../../helpers/cart';
import * as importExport from '../../../helpers/cart-import-export';
import { viewportContext } from '../../../helpers/viewport-context';

context('Cart Import/Export', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    describe('Single product', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300938,1,Photosmart E317 Digital Camera,$114.12\r\n`;

      it('should export cart', () => {
        importExport.addProductToCart(cart.products[1].code);
        importExport.exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        importExport.importCartTestFromConfig({
          name: 'Single Product Cart',
          description: 'A test description for Single Product Cart.',
          saveTime: importExport.getSavedDate(),
          quantity: 1,
          total: '$114.12',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });
    });

    describe('Single product with larger quantity', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300938,3,Photosmart E317 Digital Camera,$342.36\r\n`;

      it('should export cart', () => {
        importExport.addProductToCart();
        importExport.addProductToCart();
        importExport.addProductToCart();
        importExport.exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        importExport.importCartTestFromConfig({
          name: 'Single Product (Lg Qty) Cart',
          description: 'A test description for Single Product (Lg Qty) Cart.',
          saveTime: importExport.getSavedDate(),
          quantity: 3,
          total: '$322.36',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });
    });
  });
});
