import * as cart from '../../helpers/cart';

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

context('Cart Import/Export', () => {
  describe('Single product', () => {
    it('should export cart', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300938,1,Photosmart E317 Digital Camera,$114.12\r\n`;

      addProductToCart();

      exportCart(EXPECTED_CSV);
    });

    xit('should import cart', () => {});
  });

  describe('Single product with larger quantity', () => {
    it('should export cart', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n300938,3,Photosmart E317 Digital Camera,$342.36\r\n`;

      addProductToCart();
      addProductToCart();
      addProductToCart();

      exportCart(EXPECTED_CSV);
    });

    xit('should import cart', () => {});
  });

  describe('Multiple products', () => {
    it('should export cart', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n300938,1,Photosmart E317 Digital Camera,$114.12\r\n3470545,1,EASYSHARE M381,$370.72\r\n`;

      addProductToCart(cart.products[0].code);
      addProductToCart(cart.products[1].code);
      addProductToCart(cart.products[2].code);

      exportCart(EXPECTED_CSV);
    });

    xit('should import cart', () => {});
  });

  describe('Multiple products with varied quantities', () => {
    it('should export cart', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n300938,2,Photosmart E317 Digital Camera,$228.24\r\n3470545,3,EASYSHARE M381,"$1,112.16"\r\n`;

      addProductToCart(cart.products[0].code);
      addProductToCart(cart.products[1].code);
      addProductToCart(cart.products[1].code);
      addProductToCart(cart.products[2].code);
      addProductToCart(cart.products[2].code);
      addProductToCart(cart.products[2].code);

      exportCart(EXPECTED_CSV);
    });

    xit('should import cart', () => {});
  });

  describe('Normal products with configurable products', () => {
    it('should export cart', () => {
      const EXPECTED_CSV = `Code,Quantity,Name,Price\r\n1934793,1,PowerShot A480,$99.85\r\n1934793,1,PowerShot A480,$99.85\r\n1934793,1,PowerShot A480,$99.85\r\n300938,3,Photosmart E317 Digital Camera,$342.36\r\n`;

      addProductToCart(cart.products[0].code);
      addProductToCart(cart.products[0].code);
      addProductToCart(cart.products[0].code);
      addProductToCart(cart.products[1].code);
      addProductToCart(cart.products[1].code);
      addProductToCart(cart.products[1].code);

      exportCart(EXPECTED_CSV);
    });

    xit('should import cart', () => {});
  });

  describe('Non-default expot configuration', () => {
    before(() => {
      cy.cxConfig(nonDefaultImportExportConfig);
    });

    it('should export cart', () => {
      const EXPECTED_CSV = `Code 8=D Quantity 8=D Name 8=D [importExport:exportEntries.columnNames.manufacturer] 8=D Price 8=D [importExport:exportEntries.columnNames.primaryImageFormat] 8=D [importExport:exportEntries.columnNames.invalidKey]\r\n1934793 8=D 1 8=D PowerShot A480 8=D Canon 8=D true 8=D thumbnail 8=D \r\n300938 8=D 1 8=D Photosmart E317 Digital Camera 8=D HP 8=D true 8=D thumbnail 8=D \r\n`;

      addProductToCart(cart.products[0].code);
      addProductToCart(cart.products[1].code);

      exportCart(EXPECTED_CSV);
    });

    xit('should import cart', () => {});
  });

  xdescribe('Configurable products', () => {});

  xdescribe('Variable products', () => {});
});

/**
 * Navigates to the PDP page to add the product with the given code.
 * @param productCode identifies the unique product to add.
 */
function addProductToCart(productCode: string = cart.products[1].code) {
  cart.registerCartRefreshRoute();
  cy.visit(`/product/${productCode}`);
  cart.clickAddToCart();
  cy.wait('@refresh_cart');
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
