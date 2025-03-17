/**
 * Utility function to check accessibility concerns using Access Continuum
 * @param strict If true, the test will fail if any accessibility concerns are found
 */
export function checkA11yConcerns(strict: boolean = true): void {
  it('should NOT have any accessibility concerns', () => {
    cy.a11yContinuumRunAllTests().a11YContinuumPrintResults();

    if (strict) {
      cy.a11YContinuumFailIfConcerns();
    }
  });
}
