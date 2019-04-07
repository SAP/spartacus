import * as helper from '../../helpers/login';

context('My Account - Update Password', () => {
  let user: any;
  const newPassword = 'newPassword123!';

  before(() => {
    cy.visit('/');
    user = helper.registerUser();
    helper.signOutUser();
  });

  beforeEach(() => {
    cy.visit('/');
    helper.loginWithCredentials(user.email, user.password);
    cy.selectUserMenuOption('Password');
    cy.url().should('match', /\/my-account\/update-password/);
  });

  it('should display server error if old password is wrong.', () => {
    cy.get('cx-global-message .alert-danger').should('not.exist');
    cy.get('[formcontrolname="oldPassword"]').type('wrongpassword');
    cy.get('[formcontrolname="newPassword"]').type(newPassword);
    cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
    cy.get('cx-update-password button[type="submit"]').click();
    cy.url().should('match', /\/my-account\/update-password/);
    cy.get('cx-global-message .alert-danger').should('exist');
    cy.visit('/');
    helper.signOutUser();
  });

  it('should update the password with success.', () => {
    cy.get('cx-global-message .alert-info').should('not.exist');
    cy.get('[formcontrolname="oldPassword"]').type(user.password);
    cy.get('[formcontrolname="newPassword"]').type(newPassword);
    cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
    cy.get('cx-update-password button[type="submit"]').click();
    cy.url().should('match', /\//);
    cy.get('cx-global-message .alert-info').should('exist');

    helper.signOutUser();
    helper.loginWithCredentials(user.email, newPassword);
    cy.get(helper.userGreetSelector).should('exist');
  });
});
