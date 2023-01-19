import { getSampleUser } from '../../../../sample-data/checkout-flow';
import { viewportContext } from '../../../../helpers/viewport-context';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import {
  fillOrganizationUserRegistrationForm,
  navigateToOrganizationUserRegisterPage,
  submitOrganizationUserRegistrationForm,
  verifyFormErrors,
  verifyGlobalMessageAfterRegistration,
  verifyRedirectionToLoginPage,
  verifyTabbingOrder,
} from '../../../../helpers/b2b/b2b-user-registration';
import { myCompanyAdminUser } from '../../../../sample-data/shared-users';

context('B2B - User Registration', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
    });

    describe('Registration form', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.visit('/');
      });

      it('should navigate to organization user registration page', () => {
        navigateToOrganizationUserRegisterPage();
      });

      it('should fill registration form and register user', () => {
        fillOrganizationUserRegistrationForm(
          getSampleUser(),
          'Please register my account'
        );
      });

      it('should verify tabbing order', () => {
        // Accessibility
        verifyTabbingOrder();
      });

      it('should submit the form filled with data', () => {
        submitOrganizationUserRegistrationForm();
      });

      it('should verify global message after successful registration', () => {
        const message =
          'Thank you for registering! A representative will contact you shortly and confirm your access information.';
        verifyGlobalMessageAfterRegistration(message);
        verifyRedirectionToLoginPage();
      });

      describe('Form errors', () => {
        before(() => {
          cy.window().then((win) => win.sessionStorage.clear());
          cy.visit('/');
        });

        it('should display validation errors if form is empty', () => {
          navigateToOrganizationUserRegisterPage();

          /*
           * If form is not valid we should not expect call to the API
           */
          submitOrganizationUserRegistrationForm(false);
          verifyFormErrors();
        });

        it('should display error global message if user exists', () => {
          let user = getSampleUser();
          user.email = myCompanyAdminUser.registrationData?.email;

          fillOrganizationUserRegistrationForm(user);
          submitOrganizationUserRegistrationForm();
          verifyGlobalMessageAfterRegistration(
            'User with this e-mail address already exists.'
          );
        });
      });
    });
  });
});
