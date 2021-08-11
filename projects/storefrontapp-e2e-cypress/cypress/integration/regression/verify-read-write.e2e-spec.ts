import * as checkout from '../../helpers/checkout-flow';

const DOWNLOADS_FOLDER = Cypress.config('downloadsFolder');
const TEST_FILE = `${DOWNLOADS_FOLDER}/test-file.txt`;
const TEST_FILE_CONTENT = 'This is a test file.';
const TEST_DOWNLOAD_FILE = `${DOWNLOADS_FOLDER}/data.csv`;

context('Verify Read/Write on Cypress', () => {
  /**
   * Verifies that files are read and written correctly on the machine running tests.
   *
   * NOTE: Clean up is not done correctly when using using `cy:open`. Delete 'cypress/downloads'
   * manually when running tests on a local machine.
   *
   * Cypress issue regarding `cy:open`:
   * https://github.com/cypress-io/cypress/issues/14870
   */
  describe('Read/Write', () => {
    it('should not initially exist from some leftover test run', () => {
      cy.readFile(TEST_FILE).should('not.exist');
    });

    it('should write a file', () => {
      cy.writeFile(TEST_FILE, TEST_FILE_CONTENT);
    });

    it('should read file', () => {
      cy.readFile(TEST_FILE).should('exist').and('contain', TEST_FILE_CONTENT);
    });
  });

  /**
   * Verifies downloads work on the machine running tests by running scenarios where a files are downloaded.
   */
  describe('Downloads', () => {
    it('should downloaded exported cart file to verify downloads', () => {
      cy.cxConfig({ checkout: { guest: true } });
      cy.readFile(TEST_DOWNLOAD_FILE).should('not.exist');
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCart();
      cy.get('cx-added-to-cart-dialog a')
        .contains('view cart')
        .click({ force: true });
      cy.get('cx-export-entries button').contains('Export to CSV').click();
      cy.readFile(TEST_DOWNLOAD_FILE)
        .should('exist')
        .and('contain', 'Code,Quantity,Name,Price');
    });
  });
});
