import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import { generateMail, randomString } from '../../../helpers/user';

context('Password Visibility', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

  it('should hide password by default', () => {
    cy.visit('/login');
    cy.get('button[aria-label="Show password"]').should('be.visible');
  });

  it('should show and hide password when toggled', () => {
    cy.visit('/login');
    cy.get('button[aria-label="Show password"]').click();

    cy.get('button[aria-label="Hide password"]').click();

  });

  it('should verify on other pages', () => {
    //on registration page
    cy.visit('/login/register');
    cy.get('button[aria-label="Show password"]').should('have.length', 2);

    //on my account update password page
    standardUser.registrationData.email = generateMail(randomString(), true);
    cy.requireLoggedIn(standardUser);
    cy.visit('/my-account/update-password');
    cy.get('button[aria-label="Show password"]').should('have.length', 3);

  });
});
});
