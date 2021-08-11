context('Verify Read/Write on Cypress', () => {
  describe('Read/Write', () => {
    it('should not initially exist from some leftover test run', () => {
      cy.readFile('/tmp/test-file.txt').should('not.exist');
    });

    it('should write a file', () => {
      cy.writeFile('/tmp/test-file.txt', 'This is a test file.');
    });

    it('should read file', () => {
      cy.readFile('/tmp/test-file.txt').should('exist');
    });
  });
});
