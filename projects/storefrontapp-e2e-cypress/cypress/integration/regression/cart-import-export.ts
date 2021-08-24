import { loginAsMyCompanyAdmin } from '../../helpers/b2b/my-company/my-company.utils';
import * as cart from '../../helpers/cart';
import { APPAREL_BASESITE } from '../../helpers/variants/apparel-checkout-flow';
import { viewportContext } from '../../helpers/viewport-context';

interface ImportConfig {
  name: string;
  description: string;
  saveTime: string;
  quantity: number;
  total: string;
  headers: Array<string>;
}

const DOWNLOADS_FOLDER = Cypress.config('downloadsFolder');
const TEST_DOWNLOAD_FILE = `${DOWNLOADS_FOLDER}/data.csv`;
const nonDefaultImportExportConfig = {
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
const configurableProductConfig = {
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

context('Cart Import/Export', () => {
  viewportContext(['mobile', 'desktop'], () => {
    describe('Single product', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300938,1,Photosmart E317 Digital Camera,$114.12\r\n`;
      const headers = getCsvHeaders(EXPECTED_CSV);
      const expectedData = convertCsvToArray(EXPECTED_CSV);

      it('should export cart', () => {
        addProductToCart();

        exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        const importConfig: ImportConfig = {
          name: 'Single Product Cart',
          description: 'A test description for Single Product Cart.',
          saveTime: getSavedDate(),
          quantity: 1,
          total: '$114.12',
          headers: headers,
        };
        importData(importConfig, expectedData);
      });
    });

    describe('Single product with larger quantity', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300938,3,Photosmart E317 Digital Camera,$342.36\r\n`;
      const headers = getCsvHeaders(EXPECTED_CSV);
      const expectedData = convertCsvToArray(EXPECTED_CSV);

      it('should export cart', () => {
        addProductToCart();
        addProductToCart();
        addProductToCart();

        exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        const importConfig: ImportConfig = {
          name: 'Single Product (Lg Qty) Cart',
          description: 'A test description for Single Product (Lg Qty) Cart.',
          saveTime: getSavedDate(),
          quantity: 3,
          total: '$342.36',
          headers: headers,
        };
        importData(importConfig, expectedData);
      });
    });

    describe('Multiple products', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n300938,1,Photosmart E317 Digital Camera,$114.12\r\n3470545,1,EASYSHARE M381,$370.72\r\n`;
      const expectedData = convertCsvToArray(EXPECTED_CSV);
      const headers = getCsvHeaders(EXPECTED_CSV);

      it('should export cart', () => {
        addProductToCart(cart.products[0].code);
        addProductToCart(cart.products[1].code);
        addProductToCart(cart.products[2].code);

        exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        const importConfig: ImportConfig = {
          name: 'Multi-Product Cart',
          description: 'A test description for Multi-Product Cart.',
          saveTime: getSavedDate(),
          quantity: 3,
          total: '$564.69',
          headers: headers,
        };
        importData(importConfig, expectedData);
      });
    });

    describe('Multiple products with varied quantities', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n300938,2,Photosmart E317 Digital Camera,$228.24\r\n3470545,3,EASYSHARE M381,"$1,112.16"\r\n`;
      const expectedData = convertCsvToArray(EXPECTED_CSV);
      const headers = getCsvHeaders(EXPECTED_CSV);

      it('should export cart', () => {
        addProductToCart(cart.products[0].code);
        addProductToCart(cart.products[1].code);
        addProductToCart(cart.products[1].code);
        addProductToCart(cart.products[2].code);
        addProductToCart(cart.products[2].code);
        addProductToCart(cart.products[2].code);

        exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        const importConfig: ImportConfig = {
          name: 'Multi-Product Cart with varied quantities',
          description:
            'A test description for Multi-Product Cart with varied quantities.',
          saveTime: getSavedDate(),
          quantity: 6,
          total: '$564.69',
          headers: headers,
        };
        importData(importConfig, expectedData);
      });
    });

    describe('Normal products with configurable products', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n1934793,1,PowerShot A480,$99.85\r\n1934793,1,PowerShot A480,$99.85\r\n300938,3,Photosmart E317 Digital Camera,$342.36\r\n`;
      const expectedData = convertCsvToArray(EXPECTED_CSV);
      const headers = getCsvHeaders(EXPECTED_CSV);

      it('should export cart', () => {
        addProductToCart(cart.products[0].code);
        addProductToCart(cart.products[0].code);
        addProductToCart(cart.products[0].code);
        addProductToCart(cart.products[1].code);
        addProductToCart(cart.products[1].code);
        addProductToCart(cart.products[1].code);

        exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        const importConfig: ImportConfig = {
          name: 'Normal and Configurable Products Cart',
          description:
            'A test description for Normal and Configurable Products Cart.',
          saveTime: getSavedDate(),
          quantity: 6,
          total: '$564.69',
          headers: headers,
        };
        importData(importConfig, expectedData);
      });
    });

    describe('Non-default export configuration', () => {
      const EXPECTED_CSV = `Code 8=D Quantity 8=D Name 8=D [importExport:exportEntries.columnNames.manufacturer] 8=D Price 8=D [importExport:exportEntries.columnNames.primaryImageFormat] 8=D [importExport:exportEntries.columnNames.invalidKey]\r\n1934793 8=D 1 8=D PowerShot A480 8=D Canon 8=D true 8=D thumbnail 8=D \r\n300938 8=D 1 8=D Photosmart E317 Digital Camera 8=D HP 8=D true 8=D thumbnail 8=D \r\n`;
      const expectedData = convertCsvToArray(EXPECTED_CSV);
      const headers = getCsvHeaders(EXPECTED_CSV);

      before(() => {
        cy.cxConfig(nonDefaultImportExportConfig);
      });

      it('should export cart', () => {
        addProductToCart(cart.products[0].code);
        addProductToCart(cart.products[1].code);

        exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        const importConfig: ImportConfig = {
          name: 'Non-default export Cart',
          description: 'A test description for Non-default export Cart.',
          saveTime: getSavedDate(),
          quantity: 2,
          total: '$564.69',
          headers: headers,
        };
        importData(importConfig, expectedData);
      });
    });

    describe('Configurable products', () => {
      const EXPECTED_CSV = `Code,Quantity,[importExport:exportEntries.columnNames.engravedTextHeading],[importExport:exportEntries.columnNames.fontSize],[importExport:exportEntries.columnNames.fontType]\r\n1934793,1,PowerShot,14,Comic Sans\r\n`;
      const expectedData = convertCsvToArray(EXPECTED_CSV);
      const headers = getCsvHeaders(EXPECTED_CSV);

      before(() => {
        cy.cxConfig(configurableProductConfig);
      });

      it('should export cart', () => {
        addProductToCart(cart.products[0].code);

        exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        const importConfig: ImportConfig = {
          name: 'Configurable products Cart',
          description: 'A test description for Configurable products Cart.',
          saveTime: getSavedDate(),
          quantity: 1,
          total: '$564.69',
          headers: headers,
        };
        importData(importConfig, expectedData);
      });
    });

    describe('Variable products', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300785814,1,Maguro Pu Belt plaid LXL,£24.26\r\n`;
      const expectedData = convertCsvToArray(EXPECTED_CSV);
      const headers = getCsvHeaders(EXPECTED_CSV);
      const variableProductCode = '300785814';

      before(() => {
        cy.cxConfig({
          context: {
            baseSite: [APPAREL_BASESITE],
            currency: ['GBP'],
          },
        });
      });

      it('should export cart', () => {
        addProductToCart(variableProductCode);

        exportCart(EXPECTED_CSV);
      });

      it('should import cart', () => {
        const importConfig: ImportConfig = {
          name: 'Variable products Cart',
          description: 'A test description for Variable products Cart.',
          saveTime: getSavedDate(),
          quantity: 1,
          total: '$564.69',
          headers: headers,
        };
        importData(importConfig, expectedData);
      });
    });
  });
});

function getSavedDate(): string {
  const d = new Date();
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${month} ${day}, ${year}`;
}

/**
 * Navigates to the PDP page to add the product with the given code.
 * @param productCode identifies the unique product to add.
 */
function addProductToCart(productCode: string = cart.products[1].code) {
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
function exportCart(expectedData?: string) {
  cy.visit('cart');
  cy.get('cx-export-entries button').contains('Export to CSV').click();
  if (expectedData) {
    cy.readFile(TEST_DOWNLOAD_FILE).should('contain', expectedData);
  }
}

function convertCsvToArray(csv: string): Array<string> {
  return csv.replaceAll('\r\n', ',').split(',');
}

function getCsvHeaders(csv: string): Array<string> {
  return csv.split('\r\n', 1)[0].split(',');
}

function importData(config: ImportConfig, expectedData) {
  loginAsMyCompanyAdmin();

  cy.visit('my-account/saved-carts');
  cy.get('cx-import-entries button').contains('Import Products').click();
  cy.get(
    'cx-import-entries-form cx-file-upload input[type="file"]'
  ).attachFile({ filePath: '../downloads/data.csv' });
  cy.wait(2000);
  cy.get('cx-import-entries-form input[formcontrolname="name"]').type(
    config.name
  );
  cy.get('cx-import-entries-form textarea[formcontrolname="description"]').type(
    config.description
  );

  cy.intercept('GET', '**/users/current/carts/*?**').as('import');
  cy.get('cx-import-entries-form button').contains('Upload').click();

  cy.wait('@import').then((xhr) => {
    cy.get(
      'cx-import-entries-summary div.cx-import-entries-summary-status'
    ).contains(`Products has been loaded to new cart "${config.name}".`);

    // cy.get('p.cx-import-entries-summary-successes').contains(
    //   `${config.quantity} out of ${config.quantity} products have been imported successfully.`
    // );

    const importedCart = xhr.response.body;

    cy.get(
      'cx-import-entries-summary div.cx-import-entries-summary-footer button'
    )
      .contains('Close')
      .click();

    verifyImportedData();
    restoreCart();
    verifyCart();

    /**
     * Check that the imported cart displays correctly in saved carts list.
     */
    function verifyImportedData() {
      cy.get(`cx-saved-cart-list td.cx-saved-cart-list-cart-id`)
        .contains(importedCart.code)
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
     * Restore the imported cart from the saved carts list.
     */
    function restoreCart() {
      cy.get('cx-saved-cart-list td.cx-saved-cart-list-cart-id')
        .contains(importedCart.code)
        .parentsUntil('tr')
        .get('td.cx-saved-cart-list-make-cart-active')
        .contains('Make cart active')
        .click();
      cy.get('cx-saved-cart-form-dialog div.cx-saved-cart-form-footer button')
        .contains('Restore')
        .click();
      cy.get('cx-global-message').contains(
        `Existing cart is activated by ${importedCart.code} successfully.`
      );
    }

    /**
     * Check that the restored cart contains the correct products.
     */
    function verifyCart() {
      const rowLength = config.headers.length;
      const rowCount = (expectedData.length - 1 - rowLength) / rowLength;

      cy.visit('cart');

      for (let i = 0; i < rowCount; i++) {
        cy.get('cx-cart-item')
          .eq(i)
          .within(() => {
            for (let j = 0; j < config.headers.length; j++) {
              const cell = expectedData[rowLength + rowLength * i + j];
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
              }
            }
          });
      }
    }
  });
}
