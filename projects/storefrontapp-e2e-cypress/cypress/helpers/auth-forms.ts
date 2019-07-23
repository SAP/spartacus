/* Use this methods if you need to test UI for login/register (eg. form validation).
 If you only need to be logged in to check other feature use `requireLoggedIn` command */

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function register({
  firstName,
  lastName,
  email,
  password,
}: RegisterUser) {
  cy.get('cx-register form').within(() => {
    // cy.get('[formcontrolname="titleCode"]').select('mr');
    cy.get('[formcontrolname="titleCode"]')
      .click()
      .within(() => {
        cy.get('.ng-dropdown-panel .ng-option:nth-child(2)').click();
      });
    cy.get('[formcontrolname="firstName"]').type(firstName);
    cy.get('[formcontrolname="lastName"]').type(lastName);
    cy.get('[formcontrolname="email"]').type(email);
    cy.get('[formcontrolname="password"]').type(password);
    cy.get('[formcontrolname="passwordconf"]').type(password);
    cy.get('[formcontrolname="termsandconditions"]').check();
    cy.get('button[type="submit"]').click();
  });
}

export function login(username: string, password: string) {
  cy.get('cx-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]')
      .clear()
      .type(username);
    cy.get('[formcontrolname="password"]')
      .clear()
      .type(password);
    cy.get('button[type=submit]').click();
  });
}
