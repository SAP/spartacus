const DOWNLOADS_FOLDER = Cypress.config('downloadsFolder');
const TEST_FILE = 'test-file.txt';
const TEST_FILE_PATH = `${DOWNLOADS_FOLDER}/${TEST_FILE}`;

/**
 * Verifies that files are read and written correctly on the machine running tests.
 * 
 * NOTE: Clean up is not done correctly when using using `cy:open`. Delete 'cypress/downloads' 
 * manually when running tests on a local machine.
 * 
 * Cypress issue regarding `cy:open`:
 * https://github.com/cypress-io/cypress/issues/14870
 */
context('Verify Read/Write on Cypress', () => {
  describe('Read/Write', () => {
    it('should not initially exist from some leftover test run', () => {
      cy.readFile(TEST_FILE_PATH).should('not.exist');
    });

    it('should write a file', () => {
      cy.writeFile(TEST_FILE_PATH, 'This is a test file.');
    });

    it('should read file', () => {
      cy.readFile(TEST_FILE_PATH).should('exist');
    });
  });
});
