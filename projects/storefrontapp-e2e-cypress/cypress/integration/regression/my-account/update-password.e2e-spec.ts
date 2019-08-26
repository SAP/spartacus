import { login } from '../../../helpers/auth-forms';
import * as helper from '../../../helpers/login';
import * as alerts from '../../../helpers/global-message';

describe('My Account - Update Password', () => {
  const PAGE_TITLE_UPDATE_PASSWORD = 'Update Password';
  const PAGE_TITLE_HOME = 'Homepage';
  const PAGE_URL_UPDATE_PASSWORD = '/my-account/update-password';
  const PAGE_URL_LOGIN = '/login';

  describe('when an anonymous user tries to access the page', () => {
    it('should be redirected to the login page', () => {
      cy.visit(PAGE_URL_UPDATE_PASSWORD);
      cy.url().should('contain', PAGE_URL_LOGIN);
    });
  });

  describe('when a user is authenticated', () => {
    let user: any;
    const newPassword = 'newPassword123!';

    before(() => {
      cy.window().then(win => {
        win.sessionStorage.clear();
      });
      cy.visit('/');
      user = helper.registerUser();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    beforeEach(() => {
      cy.visit(PAGE_URL_UPDATE_PASSWORD);
      cy.url().should('contain', PAGE_URL_UPDATE_PASSWORD);
      cy.title().should('eq', PAGE_TITLE_UPDATE_PASSWORD);
    });

    it('should access the update password page from the menu.', () => {
      cy.visit('/');
      cy.selectUserMenuOption({
        option: 'Password',
      });
      cy.url().should('contain', PAGE_URL_UPDATE_PASSWORD);
      cy.title().should('eq', PAGE_TITLE_UPDATE_PASSWORD);
    });

    it('should cancel bring back to the home page.', () => {
      cy.get('cx-update-password button[type="button"]').click();
      cy.title().should('eq', PAGE_TITLE_HOME);
      alerts.getAlert().should('not.exist');
    });

    it('should display server error if old password is wrong.', () => {
      alerts.getErrorAlert().should('not.exist');
      cy.get('[formcontrolname="oldPassword"]').type('wrongpassword');
      cy.get('[formcontrolname="newPassword"]').type(newPassword);
      cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
      cy.get('cx-update-password button[type="submit"]').click();
      cy.url().should('contain', PAGE_URL_UPDATE_PASSWORD);
      alerts.getErrorAlert().should('exist');
    });

    it('should update the password with success.', () => {
      alerts.getSuccessAlert().should('not.exist');
      cy.get('[formcontrolname="oldPassword"]').type(user.password);
      cy.get('[formcontrolname="newPassword"]').type(newPassword);
      cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
      cy.get('cx-update-password button[type="submit"]').click();
      cy.title().should('eq', PAGE_TITLE_HOME);
      alerts.getSuccessAlert().should('exist');

      helper.signOutUser();
      cy.contains(/Sign In/i).click();
      login(user.email, newPassword);
      cy.get(helper.userGreetSelector).should('exist');
    });
  });
});
