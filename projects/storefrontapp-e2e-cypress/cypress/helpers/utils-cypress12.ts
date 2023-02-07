export function clearCacheCy12() {
  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
}
