export function clearCacheCy12() {
  beforeEach(() => {
    console.log('flo');
    cy.clearLocalStorage();
    cy.clearCookies();
  });
}
