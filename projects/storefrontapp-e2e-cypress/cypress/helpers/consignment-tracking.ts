import { waitForPage } from './checkout-flow';

export function loginUsingUserWithOrder() {
  const username = 'test-user-with-orders@sap.cx.com';
  const password = 'pw4all';
  cy.login(username, password);

  const homePage = waitForPage('homepage', 'getHomePage');

  cy.visit('/');

  cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);

  cy.get('.cx-login-greet').should('contain', 'Test User');
}
