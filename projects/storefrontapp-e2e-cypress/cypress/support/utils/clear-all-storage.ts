export function clearAllStorage(): void {
  cy.window().then((win) => win.sessionStorage.clear());
  cy.window().then((win) => win.localStorage.clear());
  cy.clearLocalStorageMemory();
}
