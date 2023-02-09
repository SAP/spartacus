// Used by tests not suporting TestIsolation introduced in Cypress12
export function clearCacheTestIsolation() {
  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
}
