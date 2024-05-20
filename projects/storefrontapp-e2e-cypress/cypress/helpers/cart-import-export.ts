/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from './cart';
import { waitForPage, waitForProductPage } from './checkout-flow';

const DOWNLOADS_FOLDER = Cypress.config('downloadsFolder');
const TEST_DOWNLOAD_FILE = `${DOWNLOADS_FOLDER}/cart.csv`;

/**
 * Config format for `importCartTest`.
 */
export interface ImportConfig {
  /**
   * File name of imported file.
   */
  fileName: string;
  /**
   * Detemrines the context for the import data.
   */
  context: ImportExportContext;
  /**
   * Path to the page which contains import button.
   */
  importButtonPath: string;
  /**
   * Time of cart being saved.
   */
  saveTime: string;
  /**
   * Expected quantity of products in cart.
   */
  quantity: number;
  /**
   * Expected total cost of cart.
   */
  total: string;
  /**
   * Headers of columns from csv.
   */
  headers: string[];
  /**
   * CSV data as an array (use `convertCsvToArray()`)
   */
  expectedData: string[];
  /**
   * Additional config for saved cart details.
   */
  savedCartConfig?: SavedCartConfig;
}

export interface SavedCartConfig {
  /**
   * Specifies name for saved cart.
   */
  name: string;
  /**
   * Specifies description for saved cart.
   */
  description?: string;
}

export enum ImportExportContext {
  ACTIVE_CART = 'cart',
  SAVED_CART = 'savedCart',
}

/**
 * Converts a csv into an array interpretable for the `importCartTest` method.
 */
export function convertCsvToArray(csv: string): Array<string> {
  return csv.replaceAll('\r\n', ',').split(',');
}

/**
 * Gets the header names of columns from a csv string.
 */
export function getCsvHeaders(csv: string): Array<string> {
  return csv.split('\r\n', 1)[0].split(',');
}

/**
 * Gets the current date in a format matching the 'Saved Date' column.
 */
export function getSavedDate(): string {
  const d = new Date();
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
  const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
  return `${month} ${day}, ${year}`;
}

export const nonDefaultImportExportConfig = {
  cartImportExport: {
    file: {
      // Alternative separator
      separator: '|',
    },
    export: {
      additionalColumns: [
        {
          // Display `manufacturer` value property instead of name
          name: {
            key: 'name',
          },
          value: 'product.manufacturer',
        },
        // Display boolean value instead of price
        {
          name: {
            key: 'price',
          },
          value: 'product.availableForPickup',
        },
      ],
    },
  },
};

export const configurableProductConfig = {
  cartImportExport: {
    export: {
      additionalColumns: [
        {
          name: {
            key: 'engravedTextHeading',
          },
          value: 'configurationInfos.0.configurationValue',
        },
        {
          name: {
            key: 'fontSize',
          },
          value: 'configurationInfos.1.configurationValue',
        },
        {
          name: {
            key: 'fontType',
          },
          value: 'configurationInfos.2.configurationValue',
        },
      ],
    },
  },
};

/**
 * Check that the restored cart contains the correct products.
 */
export function verifyCart(config: ImportConfig) {
  const rowLength = config.headers.length;
  const rowCount = (config.expectedData.length - 1 - rowLength) / rowLength;

  const cartPage = waitForPage('/cart', 'getCartPage');
  cy.visit('/cart');
  cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

  for (let i = 0; i < rowCount; i++) {
    cy.get('.cx-item-list-row')
      .eq(i)
      .within(() => {
        for (let j = 0; j < config.headers.length; j++) {
          const cell = config.expectedData[rowLength + rowLength * i + j];
          switch (config.headers[j]) {
            case 'Code':
              return cy.get('div.cx-code').contains(cell);
            case 'Quantity':
              return cy
                .get('div.cx-quantity cx-item-counter input')
                .should('have.value', cell);
            case 'Name':
              return cy.get('div.cx-name').contains(cell);
            case 'Price':
              return cy.get('div.cx-price').contains(cell);
            case '[importExport:exportEntries.columnNames.engravedTextHeading]':
              cy.get('div.cx-configuration-info .cx-label').contains(
                'Engraved Text'
              );
              return cy
                .get('div.cx-configuration-info .cx-value')
                .contains(cell);
            case '[importExport:exportEntries.columnNames.fontSize]':
              cy.get('div.cx-configuration-info .cx-label').contains(
                'Font Size'
              );
              return cy
                .get('div.cx-configuration-info .cx-value')
                .contains(cell);
            case '[importExport:exportEntries.columnNames.fontType]':
              cy.get('div.cx-configuration-info .cx-label').contains(
                'Font Type'
              );
              return cy
                .get('div.cx-configuration-info .cx-value')
                .contains(cell);
          }
        }
      });
  }

  cy.get('cx-cart-item-list .cx-remove-btn').should('be.enabled');
}

/**
 * Restore the imported cart from the saved carts list.
 */
export function restoreCart(cart) {
  cy.get('cx-saved-cart-list td.cx-saved-cart-list-cart-id')
    .contains(cart.code)
    .parentsUntil('tr')
    .get('td.cx-saved-cart-list-make-cart-active')
    .contains('Make cart active')
    .click();
  cy.intercept(
    'PATCH',
    /\.*\/users\/current\/carts\/(\d*)\/restoresavedcart.*/
  ).as('restoreSavedCart');
  cy.get('cx-saved-cart-form-dialog div.cx-saved-cart-form-footer button')
    .contains('Restore')
    .click();
  cy.wait('@restoreSavedCart').its('response.statusCode').should('eq', 200);
  cy.get('cx-global-message').contains(
    `Existing cart is activated by ${cart.code} successfully.`
  );
}

/**
 * Check that the imported cart displays correctly in saved carts list.
 */
export function verifyImportedData(config: ImportConfig, cart) {
  cy.get(`cx-saved-cart-list td.cx-saved-cart-list-cart-id`)
    .contains(cart.code)
    .parentsUntil('tr')
    .parent()
    .within(() => {
      cy.get(`td.cx-saved-cart-list-cart-name`).contains(
        config.savedCartConfig?.name
      );
      cy.get(`td.cx-saved-cart-list-date-saved`).contains(config.saveTime);
      cy.get(`td.cx-saved-cart-list-quantity`).contains(config.quantity);
      cy.get(`td.cx-saved-cart-list-total`).contains(config.total);
    });
}

/**
 * Navigates to the PDP page to add the product with the given code.
 * @param productCode identifies the unique product to add.
 */
export function addProductToCart(productCode: string = cart.products[1].code) {
  cy.intercept('GET', `**/users/*/carts/*?fields=**`).as('refreshCart');
  cy.intercept('POST', `**/users/*/carts/*/entries?**`).as('addToCart');
  const productPage = waitForProductPage(productCode, 'getProductPage');
  cy.visit(`/product/${productCode}`);
  cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
  cart.clickAddToCart();
  cy.wait(['@refreshCart', '@addToCart']);
  cy.get('cx-added-to-cart-dialog a.btn-primary')
    .contains('view cart')
    .scrollIntoView()
    .should('be.visible');
}

/**
 * Goes to the cart page and clicks the button to export cart.
 * @param expectedData will compare the data of the downloaded .csv to the parsed string.
 */
export function exportCart(expectedData?: string) {
  const DOWNLOADS_FOLDER = Cypress.config('downloadsFolder');
  cy.task('deleteFolder', DOWNLOADS_FOLDER);

  const cartPage = waitForPage('/cart', 'getCartPage');
  cy.visit('/cart');
  cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-export-order-entries button')
    .contains('Export Product to CSV')
    .click();
  cy.get('cx-global-message').contains(
    'CSV file will download automatically to your device'
  );
  if (expectedData) {
    cy.readFile(TEST_DOWNLOAD_FILE).should('contain', expectedData);
  }
}

/**
 * Standardized E2E Test for import cart scenarios.
 */
export function importCartTestFromConfig(config: ImportConfig) {
  cy.requireLoggedIn();

  const cartPage = waitForPage(
    config.importButtonPath,
    `get${config.context}age`
  );
  cy.visit(config.importButtonPath);
  cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

  cy.get('cx-import-order-entries button').contains('Import Products').click();
  cy.readFile(TEST_DOWNLOAD_FILE).then((file) => {
    cy.writeFile(`cypress/downloads/${config.fileName}.csv`, file);
  });
  cy.get(
    'cx-import-entries-dialog cx-file-upload input[type="file"]'
  ).attachFile({ filePath: `../downloads/${config.fileName}.csv` });

  if (config.savedCartConfig) {
    cy.get('cx-import-entries-dialog input[formcontrolname="name"]')
      .clear()
      .type(config.savedCartConfig?.name);
    cy.get(
      'cx-import-entries-dialog textarea[formcontrolname="description"]'
    ).type(config.savedCartConfig?.description);
  }

  cy.intercept('GET', /\.*\/users\/current\/carts\/(\d*)\?fields=.*/).as(
    'import'
  );
  cy.get('cx-import-entries-dialog button').contains('Upload').click();

  cy.wait('@import').its('response.statusCode').should('eq', 200);

  cy.get('@import').then((xhr: any) => {
    cy.get(
      'cx-import-entries-summary div.cx-import-entries-summary-status'
    ).contains(
      `Products has been loaded to cart ${config.savedCartConfig?.name || ''}`
    );

    const importedCart = xhr.response.body;

    cy.get(
      'cx-import-entries-summary div.cx-import-entries-summary-footer button'
    )
      .contains('Close')
      .click();

    if (config.context === ImportExportContext.SAVED_CART) {
      verifyImportedData(config, importedCart);
      restoreCart(importedCart);
    }

    verifyCart(config);
  });
}

/**
 * Attempt to upload a csv by filling out import cart form and clicking "Upload".
 */
export function attemptUpload(csvPath: string) {
  cy.requireLoggedIn();
  const savedCartPage = waitForPage(
    '/my-account/saved-carts',
    'getSavedCartsPage'
  );
  cy.visit('/my-account/saved-carts');
  cy.wait(`@${savedCartPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-import-order-entries button').contains('Import Products').click();
  cy.get(
    'cx-import-entries-dialog cx-file-upload input[type="file"]'
  ).attachFile({ filePath: csvPath }, { allowEmpty: true });
  cy.get('cx-import-entries-dialog input[formcontrolname="name"]').type(
    'Test Cart'
  );
  cy.get(
    'cx-import-entries-dialog textarea[formcontrolname="description"]'
  ).type('A test description.');

  cy.get('cx-import-entries-dialog button').contains('Upload').click();
}

/**
 * Test import / export single product.
 */
export function testImportExportSingleProduct() {
  describe('Single product', () => {
    const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300938,1,Photosmart E317 Digital Camera,$114.12\r\n`;

    it('should export cart', () => {
      addProductToCart(cart.products[1].code);
      exportCart(EXPECTED_CSV);
    });

    it('should import to active cart', () => {
      importCartTestFromConfig({
        fileName: 'cart-single',
        context: ImportExportContext.ACTIVE_CART,
        importButtonPath: 'cart',
        saveTime: getSavedDate(),
        quantity: 1,
        total: '$114.12',
        headers: getCsvHeaders(EXPECTED_CSV),
        expectedData: convertCsvToArray(EXPECTED_CSV),
      });
    });

    it('should import to saved cart', () => {
      importCartTestFromConfig({
        fileName: 'cart-single',
        context: ImportExportContext.SAVED_CART,
        importButtonPath: '/my-account/saved-carts',
        saveTime: getSavedDate(),
        quantity: 1,
        total: '$114.12',
        headers: getCsvHeaders(EXPECTED_CSV),
        expectedData: convertCsvToArray(EXPECTED_CSV),
        savedCartConfig: {
          name: 'Single Product Cart',
          description: 'A test description for Single Product Cart.',
        },
      });
    });
  });
}

/**
 * Test import / export single product larger quantity.
 */
export function testImportExportLargerQuantity() {
  describe('Single product with larger quantity', () => {
    const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300938,3,Photosmart E317 Digital Camera,$342.36\r\n`;

    it('should export cart', () => {
      addProductToCart();
      addProductToCart();
      addProductToCart();
      exportCart(EXPECTED_CSV);
    });

    it('should import to active cart', () => {
      importCartTestFromConfig({
        fileName: 'cart-lg-qty',
        context: ImportExportContext.ACTIVE_CART,
        importButtonPath: 'cart',
        saveTime: getSavedDate(),
        quantity: 3,
        total: '$322.36',
        headers: getCsvHeaders(EXPECTED_CSV),
        expectedData: convertCsvToArray(EXPECTED_CSV),
      });
    });

    it('should import to saved cart', () => {
      importCartTestFromConfig({
        fileName: 'cart-lg-qty',
        context: ImportExportContext.SAVED_CART,
        importButtonPath: '/my-account/saved-carts',
        saveTime: getSavedDate(),
        quantity: 3,
        total: '$322.36',
        headers: getCsvHeaders(EXPECTED_CSV),
        expectedData: convertCsvToArray(EXPECTED_CSV),
        savedCartConfig: {
          name: 'Single Product (Lg Qty) Cart',
          description: 'A test description for Single Product (Lg Qty) Cart.',
        },
      });
    });
  });
}

/**
 * Test import / export with apparel products
 */
export function testImportExportWithApparelProducts() {
  describe('Apparel products', () => {
    const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300785814,1,Maguro Pu Belt plaid LXL,£24.26\r\n`;
    const apparelProductCode = '300785814';

    it('should export cart', () => {
      addProductToCart(apparelProductCode);
      exportCart(EXPECTED_CSV);
    });

    // TODO: Disabled because of missing sample-data for import button in active cart (apparel)
    // it('should import to active cart', () => {
    //   importCartTestFromConfig({
    //     fileName: 'cart-variants',
    //     context: ImportExportContext.ACTIVE_CART,
    //     importButtonPath: 'cart',
    //     saveTime: getSavedDate(),
    //     quantity: 1,
    //     total: '£24.26',
    //     headers: getCsvHeaders(EXPECTED_CSV),
    //     expectedData: convertCsvToArray(EXPECTED_CSV),
    //   });
    // });

    it('should import to saved cart', () => {
      importCartTestFromConfig({
        fileName: 'cart-variants',
        context: ImportExportContext.SAVED_CART,
        importButtonPath: '/my-account/saved-carts',
        saveTime: getSavedDate(),
        quantity: 1,
        total: '£24.26',
        headers: getCsvHeaders(EXPECTED_CSV),
        expectedData: convertCsvToArray(EXPECTED_CSV),
        savedCartConfig: {
          name: 'Apparel products Cart',
          description: 'A test description for Apparel products Cart.',
        },
      });
    });
  });
}
