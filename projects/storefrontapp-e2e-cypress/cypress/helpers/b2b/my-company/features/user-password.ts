import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { fillLoginForm, LoginUser } from '../../../auth-forms';
import { waitForPage } from '../../../checkout-flow';
import { INPUT_TYPE, MyCompanyConfig } from '../models';
import { loginAsMyCompanyAdmin } from '../my-company.utils';
import { completeForm, FormType } from './utils/form';

export function userPasswordTest(config: MyCompanyConfig): void {
  const TEST_PASSWORD = 'tE5tP@$5';
  const TEST_PASSWORD_2 = 'P@$5tE5t';
  const codeRow = config.rows?.find((row) => row.useInUrl || row.useCookie);
  const emailRow = config.rows?.find((row) => row.variableName === 'email');
  const firstNameRow = config.rows?.find(
    (row) => row.variableName === 'firstName'
  );

  const user: LoginUser = {
    username: emailRow.updateValue,
    password: TEST_PASSWORD,
  };
  const user2: LoginUser = {
    username: emailRow.updateValue,
    password: TEST_PASSWORD_2,
  };

  describe(`User Password`, () => {
    it('should set user password', () => {
      if (codeRow.useCookie) {
        cy.getCookie(codeRow.useCookie).then((cookie) => {
          setUserPasswordAsAdmin(cookie.value, TEST_PASSWORD);
        });
      } else {
        setUserPasswordAsAdmin(codeRow.updateValue, TEST_PASSWORD);
      }
    });

    it('should log in with set password', () => {
      cy.visit('/login');
      fillLoginForm(user);
      cy.get('cx-login .cx-login-greet').contains(
        `Hi, ${firstNameRow.updateValue}`
      );
      logOut();
    });

    it('should reset password and login again', () => {
      if (codeRow.useCookie) {
        cy.getCookie(codeRow.useCookie).then((cookie) => {
          setUserPasswordAsAdmin(cookie.value, TEST_PASSWORD_2);
        });
      } else {
        setUserPasswordAsAdmin(codeRow.updateValue, TEST_PASSWORD_2);
      }

      cy.visit('/login');
      fillLoginForm(user);
      cy.get('cx-global-message').contains(
        'Bad credentials. Please login again.'
      );
      fillLoginForm(user2);
      cy.get('cx-login .cx-login-greet').contains(
        `Hi, ${firstNameRow.updateValue}`
      );
      logOut();
    });
  });

  function setUserPasswordAsAdmin(code: string, newPassword: string) {
    loginAsMyCompanyAdmin();
    cy.visit(`${config.baseUrl}/${code}`);

    cy.get('cx-org-user-details section.details a.link')
      .contains('Change password')
      .click();

    completeForm(
      [
        {
          formLabel: 'New password',
          createValue: newPassword,
          inputType: INPUT_TYPE.TEXT,
        },
        {
          formLabel: 'Retype new password',
          createValue: newPassword,
          inputType: INPUT_TYPE.TEXT,
        },
      ],
      FormType.CREATE
    );

    cy.intercept('PATCH', `**`).as('patch');
    cy.get('div.header button').contains('Save').click();
    cy.wait('@patch');

    clearAllStorage();
  }
}

function logOut() {
  const logoutPage = waitForPage('/logout', 'getLogoutPage');
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
  cy.wait(`@${logoutPage}`);
}
