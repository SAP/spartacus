import { loginAsMyCompanyAdmin } from './b2b/my-company/my-company.utils';
import * as cart from './cart';

const DOWNLOADS_FOLDER = Cypress.config('downloadsFolder');
const TEST_DOWNLOAD_FILE = `${DOWNLOADS_FOLDER}/cart.csv`;

/**
 * Config format for `importCartTest`.
 */
export interface ImportConfig {
  /**
   * Name of cart.
   */
  name: string;
  /**
   * Description of cart.
   */
  description: string;
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
  importExport: {
    file: {
      // Alternative separator
      separator: ' 8=D ',
    },
    export: {
      additionalColumns: [
        // Regular key and value
        {
          name: {
            key: 'name',
          },
          value: 'product.name',
        },
        // String value with invalid key
        {
          name: {
            key: 'manufacturer',
          },
          value: 'product.manufacturer',
        },
        // Boolean value with valid (non-relevant) key
        {
          name: {
            key: 'price',
          },
          value: 'product.availableForPickup',
        },
        // Deep value with invalid key
        {
          name: {
            key: 'primaryImageFormat',
          },
          value: 'product.images.PRIMARY.thumbnail.format',
        },
        // Invalid key and value
        {
          name: {
            key: 'invalidKey',
          },
          value: 'invalidValue',
        },
      ],
    },
  },
};

export const configurableProductConfig = {
  importExport: {
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

  cy.visit('cart');

  for (let i = 0; i < rowCount; i++) {
    cy.get('cx-cart-item')
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
  cy.get('cx-saved-cart-form-dialog div.cx-saved-cart-form-footer button')
    .contains('Restore')
    .click();
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
      cy.get(`td.cx-saved-cart-list-cart-name`).contains(config.name);
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
  cy.intercept('GET', `**/users/*/carts/*?fields=**`).as('refresh_cart');
  cy.intercept('POST', `**/users/*/carts/*/entries?**`).as('addToCart');
  cy.visit(`/product/${productCode}`);
  cart.clickAddToCart();
  cy.wait(['@refresh_cart', '@addToCart']);
}

/**
 * Goes to the cart page and clicks the button to export cart.
 * @param expectedData will compare the data of the downloaded .csv to the parsed string.
 */
export function exportCart(expectedData?: string) {
  cy.visit('cart');
  cy.get('cx-export-order-entries button').contains('Export to CSV').click();
  if (expectedData) {
    cy.readFile(TEST_DOWNLOAD_FILE).should('contain', expectedData);
  }
}

/**
 * Standardized E2E Test for import cart scenarios.
 */
export function importCartTestFromConfig(config: ImportConfig) {
  loginAsMyCompanyAdmin();

  cy.visit('my-account/saved-carts');
  cy.get('cx-import-order-entries button').contains('Import Products').click();
  cy.readFile(TEST_DOWNLOAD_FILE).then((file) => {
    cy.writeFile(`cypress/downloads/${config.name}.csv`, file);
  });
  cy.get(
    'cx-import-entries-dialog cx-file-upload input[type="file"]'
  ).attachFile({ filePath: `../downloads/${config.name}.csv` });
  cy.get(
    'cx-import-entries-dialog textarea[formcontrolname="description"]'
  ).type(config.description);

  cy.intercept('GET', '**/users/current/carts/*?**').as('import');
  cy.get('cx-import-entries-dialog button').contains('Upload').click();

  cy.wait('@import').then((xhr) => {
    cy.get(
      'cx-import-entries-summary div.cx-import-entries-summary-status'
    ).contains(`Products has been loaded to cart ${config.name}`);

    const importedCart = xhr.response.body;

    cy.get(
      'cx-import-entries-summary div.cx-import-entries-summary-footer button'
    )
      .contains('Close')
      .click();

    verifyImportedData(config, importedCart);
    restoreCart(importedCart);
    verifyCart(config);
  });
}

/**
 * Attempt to upload a csv by filling out import cart form and clicking "Upload".
 */
export function attemptUpload(csvPath: string) {
  loginAsMyCompanyAdmin();

  cy.visit('my-account/saved-carts');
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

  cy.intercept('GET', '**/users/current/carts/*?**').as('import');
  cy.get('cx-import-entries-dialog button').contains('Upload').click();
}
