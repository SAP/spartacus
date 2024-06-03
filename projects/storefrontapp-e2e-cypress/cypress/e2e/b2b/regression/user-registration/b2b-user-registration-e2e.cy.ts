/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  fillOrganizationUserRegistrationForm,
  navigateToOrganizationUserRegisterPage,
  submitOrganizationUserRegistrationForm,
  verifyFormErrors,
  verifyGlobalMessageAfterRegistration,
  verifyRedirectionToLoginPage,
  verifyTabbingOrder,
} from '../../../../helpers/b2b/b2b-user-registration';
import { viewportContext } from '../../../../helpers/viewport-context';
import { getSampleUser } from '../../../../sample-data/checkout-flow';
import { myCompanyAdminUser } from '../../../../sample-data/shared-users';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { isolateTests } from '../../../../support/utils/test-isolation';

context('B2B - User Registration', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
    });

    describe('Registration form', { testIsolation: false }, () => {
      isolateTests();
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.visit('/');
      });

      it('should navigate to organization user registration page (CXSPA-215)', () => {
        navigateToOrganizationUserRegisterPage();
      });

      it('should fill registration form and register user (CXSPA-215)', () => {
        fillOrganizationUserRegistrationForm(
          getSampleUser(),
          'Please register my account'
        );
      });

      it('should verify tabbing order (CXSPA-215)', () => {
        // Accessibility
        verifyTabbingOrder();
      });

      it('should submit the form filled with data (CXSPA-215)', () => {
        submitOrganizationUserRegistrationForm();
      });

      it('should verify global message after successful registration (CXSPA-215)', () => {
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

        it('should display validation errors if form is empty (CXSPA-215)', () => {
          navigateToOrganizationUserRegisterPage();

          /*
           * If form is not valid we should not expect call to the API
           */
          submitOrganizationUserRegistrationForm(false);
          verifyFormErrors();
        });

        it('should display error global message if user exists (CXSPA-215)', () => {
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
