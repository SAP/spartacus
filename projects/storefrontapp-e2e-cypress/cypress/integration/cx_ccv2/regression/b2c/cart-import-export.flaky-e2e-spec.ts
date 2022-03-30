import * as cart from '../../../../helpers/cart';
import * as importExport from '../../../../helpers/cart-import-export';
import { APPAREL_BASESITE } from '../../../../helpers/variants/apparel-checkout-flow';
import { viewportContext } from '../../../../helpers/viewport-context';

// TODO. Fix Priority 2. Remove this line after this spec runs successfully with CCV2.

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

    describe.skip('Multiple products', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n300938,1,Photosmart E317 Digital Camera,$114.12\r\n3470545,1,EASYSHARE M381,$370.72\r\n`;

      it.skip('should export cart', () => {
        importExport.addProductToCart(cart.products[0].code);
        importExport.addProductToCart(cart.products[1].code);
        importExport.addProductToCart(cart.products[2].code);
        importExport.exportCart(EXPECTED_CSV);
      });

      it.skip('should import cart', () => {
        importExport.importCartTestFromConfig({
          name: 'Multi-Product Cart',
          description: 'A test description for Multi-Product Cart.',
          saveTime: importExport.getSavedDate(),
          quantity: 3,
          total: '$564.69',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });
    });

    describe('Multiple products with varied quantities', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n1934793,1,PowerShot A480,$99.85\r\n300938,3,Photosmart E317 Digital Camera,$342.36\r\n`;

      it('should export cart', () => {
        importExport.addProductToCart(cart.products[0].code);
        importExport.addProductToCart(cart.products[0].code);
        importExport.addProductToCart(cart.products[1].code);
        importExport.addProductToCart(cart.products[1].code);
        importExport.addProductToCart(cart.products[1].code);
        importExport.exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        importExport.importCartTestFromConfig({
          name: 'Multi-Product Cart with varied quantities',
          description:
            'A test description for Multi-Product Cart with varied quantities.',
          saveTime: importExport.getSavedDate(),
          quantity: 5,
          total: '$522.06',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });
    });

    describe('Non-default export configuration', () => {
      const EXPECTED_CSV = `Code|Quantity|Name|Price\r\n1934793|1|Canon|true\r\n300938|1|HP|true\r\n`;

      beforeEach(() => {
        cy.cxConfig(importExport.nonDefaultImportExportConfig);
      });

      it('should export cart', () => {
        importExport.addProductToCart(cart.products[0].code);
        importExport.addProductToCart(cart.products[1].code);
        importExport.exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        importExport.importCartTestFromConfig({
          name: 'Non-default export Cart',
          description: 'A test description for Non-default export Cart.',
          saveTime: importExport.getSavedDate(),
          quantity: 2,
          total: '$193.97',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });
    });

    describe('Variable products', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300785814,1,Maguro Pu Belt plaid LXL,£24.26\r\n`;
      const variableProductCode = '300785814';

      beforeEach(() => {
        cy.cxConfig({
          context: {
            baseSite: [APPAREL_BASESITE],
            currency: ['GBP'],
          },
        });
      });

      it('should export cart', () => {
        importExport.addProductToCart(variableProductCode);
        importExport.exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        importExport.importCartTestFromConfig({
          name: 'Variable products Cart',
          description: 'A test description for Variable products Cart.',
          saveTime: importExport.getSavedDate(),
          quantity: 1,
          total: '£24.26',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });
    });
  });
});
