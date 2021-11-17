import * as alerts from './global-message';

export function signOut() {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages`,
    query: {
      pageLabelOrId: '/logout',
    },
  }).as('logOut');
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
  cy.wait('@logOut');
  cy.visit('/');
}

export function verifyGlobalMessageAfterRegistration() {
  const alert = alerts.getSuccessAlert();

  alert.should('contain', 'Please log in with provided credentials.');
  cy.location().should((location) => {
    expect(location.pathname).to.match(/\/login$/);
  });
}
