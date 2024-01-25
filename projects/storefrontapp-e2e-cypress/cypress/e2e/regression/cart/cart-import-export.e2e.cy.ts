/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from '../../../helpers/cart';
import * as importExport from '../../../helpers/cart-import-export';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { ImportExportContext } from './../../../helpers/cart-import-export';

context('Cart Import/Export', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
    });

    // Core test. Repeat in mobile viewport.
    importExport.testImportExportSingleProduct();

    // Core test. Repeat in mobile viewport.
    importExport.testImportExportLargerQuantity();

    describe('Multiple products', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n300938,1,Photosmart E317 Digital Camera,$114.12\r\n3470545,1,EASYSHARE M381,$370.72\r\n`;

      it('should export cart', () => {
        importExport.addProductToCart(cart.products[0].code);
        importExport.addProductToCart(cart.products[1].code);
        importExport.addProductToCart(cart.products[2].code);
        importExport.exportCart(EXPECTED_CSV);
      });

      it('should import to active cart', () => {
        importExport.importCartTestFromConfig({
          fileName: 'cart-multiple-products',
          context: ImportExportContext.ACTIVE_CART,
          importButtonPath: 'cart',
          saveTime: importExport.getSavedDate(),
          quantity: 3,
          total: '$564.69',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });

      it('should import to saved cart', () => {
        importExport.importCartTestFromConfig({
          fileName: 'cart-multiple-products',
          context: ImportExportContext.SAVED_CART,
          importButtonPath: '/my-account/saved-carts',
          saveTime: importExport.getSavedDate(),
          quantity: 3,
          total: '$564.69',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
          savedCartConfig: {
            name: 'Multi-Product Cart',
            description: 'A test description for Multi-Product Cart.',
          },
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

      it('should import to active cart', () => {
        importExport.importCartTestFromConfig({
          fileName: 'cart-multi-product',
          context: ImportExportContext.ACTIVE_CART,
          importButtonPath: 'cart',
          saveTime: importExport.getSavedDate(),
          quantity: 5,
          total: '$522.06',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });

      it('should import to saved cart', () => {
        importExport.importCartTestFromConfig({
          context: ImportExportContext.SAVED_CART,
          fileName: 'cart-multi-product',
          importButtonPath: '/my-account/saved-carts',
          saveTime: importExport.getSavedDate(),
          quantity: 5,
          total: '$522.06',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
          savedCartConfig: {
            name: 'Multi-Product Cart with varied quantities',
            description:
              'A test description for Multi-Product Cart with varied quantities.',
          },
        });
      });
    });

    describe('Normal products with configurable products', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n1934793,1,PowerShot A480,$99.85\r\n1934793,1,PowerShot A480,$99.85\r\n300938,3,Photosmart E317 Digital Camera,$342.36\r\n`;

      it('should export cart', () => {
        importExport.addProductToCart(cart.products[0].code);
        importExport.addProductToCart(cart.products[0].code);
        importExport.addProductToCart(cart.products[0].code);
        importExport.addProductToCart(cart.products[1].code);
        importExport.addProductToCart(cart.products[1].code);
        importExport.addProductToCart(cart.products[1].code);
        importExport.exportCart(EXPECTED_CSV);
      });

      it('should import to active cart', () => {
        importExport.importCartTestFromConfig({
          fileName: 'cart-normal-product',
          context: ImportExportContext.ACTIVE_CART,
          importButtonPath: 'cart',
          saveTime: importExport.getSavedDate(),
          quantity: 6,
          total: '$621.91',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });

      it('should import to saved cart', () => {
        importExport.importCartTestFromConfig({
          fileName: 'cart-normal-product',
          context: ImportExportContext.SAVED_CART,
          importButtonPath: '/my-account/saved-carts',
          saveTime: importExport.getSavedDate(),
          quantity: 6,
          total: '$621.91',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
          savedCartConfig: {
            name: 'Normal and Configurable Products Cart',
            description:
              'A test description for Normal and Configurable Products Cart.',
          },
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

      it('should import to active cart', () => {
        importExport.importCartTestFromConfig({
          fileName: 'cart-non-default',
          context: ImportExportContext.ACTIVE_CART,
          importButtonPath: 'cart',
          saveTime: importExport.getSavedDate(),
          quantity: 2,
          total: '$193.97',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
        });
      });

      it('should import to saved cart', () => {
        importExport.importCartTestFromConfig({
          fileName: 'cart-non-default',
          context: ImportExportContext.SAVED_CART,
          importButtonPath: '/my-account/saved-carts',
          saveTime: importExport.getSavedDate(),
          quantity: 2,
          total: '$193.97',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
          savedCartConfig: {
            name: 'Non-default export Cart',
            description: 'A test description for Non-default export Cart.',
          },
        });
      });
    });

    // TODO: Enable and improve once importing configurable products is supported (#13456)
    xdescribe('Configurable products', () => {
      const EXPECTED_CSV = `Code,Quantity,[importExport:exportEntries.columnNames.engravedTextHeading],[importExport:exportEntries.columnNames.fontSize],[importExport:exportEntries.columnNames.fontType]\r\n1934793,1,PowerShot,14,Comic Sans\r\n`;

      beforeEach(() => {
        cy.cxConfig(importExport.configurableProductConfig);
      });

      it('should export cart', () => {
        importExport.addProductToCart(cart.products[0].code);
        importExport.exportCart(EXPECTED_CSV);
      });

      it('should import to saved cart', () => {
        importExport.importCartTestFromConfig({
          fileName: 'cart-configurable-products',
          context: ImportExportContext.SAVED_CART,
          importButtonPath: '/my-account/saved-carts',
          saveTime: importExport.getSavedDate(),
          quantity: 1,
          total: '$99.85',
          headers: importExport.getCsvHeaders(EXPECTED_CSV),
          expectedData: importExport.convertCsvToArray(EXPECTED_CSV),
          savedCartConfig: {
            name: 'Configurable products Cart',
            description: 'A test description for Configurable products Cart.',
          },
        });
      });
    });

    describe('Malformed CSVs', () => {
      it('should NOT import empty csv file', () => {
        const CSV = 'empty.csv';
        cy.writeFile(`cypress/downloads/${CSV}`, '');
        importExport.attemptUpload(`../downloads/${CSV}`);

        cy.get('cx-import-entries-dialog cx-form-errors p').contains(
          'File should not be empty'
        );
      });

      it('should NOT import malformed csv file', () => {
        const CSV = 'malformed.csv';
        cy.writeFile(`cypress/downloads/${CSV}`, 'I am wrong :(');
        importExport.attemptUpload(`../downloads/${CSV}`);

        cy.get('cx-import-entries-dialog cx-form-errors p').contains(
          'File is not parsable'
        );
      });

      it('should only import remaining stock', () => {
        const toImport = `Code,Quantity\r\n325234,999\r\n`;
        const CSV = 'limited-quantity.csv';
        cy.writeFile(`cypress/downloads/${CSV}`, toImport);

        cy.intercept('GET', /\.*\/users\/current\/carts\/(\d*)\?fields=.*/).as(
          'import'
        );
        importExport.attemptUpload(`../downloads/${CSV}`);
        cy.wait('@import').its('response.statusCode').should('eq', 200);

        cy.get('.cx-import-entries-summary-warnings p').contains(
          `1 product was not imported totally.`
        );

        cy.get('.cx-import-entries-summary-warnings p')
          .contains(`Show`)
          .click();

        cy.get('.cx-import-entries-summary-warnings li').contains(
          ` has been reduced to `
        );
      });
    });
  });
});
