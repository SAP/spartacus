/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cdc from '../../../../helpers/vendor/cdc/cdc';
import {
  user,
  organisation,
  getSampleUser,
} from '../../../../sample-data/checkout-flow';
import { isolateTests } from '../../../../support/utils/test-isolation';
import {
  fillOrganizationUserRegistrationForm,
  navigateToOrganizationUserRegisterPage,
  submitOrganizationUserRegistrationForm,
  verifyFormErrors,
  verifyGlobalMessageAfterRegistration,
  verifyRedirectionToLoginPage,
  verifyTabbingOrder,
} from '../../../../helpers/b2b/b2b-user-registration';

describe('Register B2B Organisation when CDC enabled', () => {
  describe('Register B2B Organisation with Screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/register-org');
    });

    it('should register organization and request received message should appear', () => {
      cdc.registerOrg(user, organisation);
      cdc.verifyOrgRegistrationRequestReceived();
    });
  });

  describe(
    'Registration B2B Organization with Native UI',
    { testIsolation: false },
    () => {
      isolateTests();
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
        cy.get('cx-user-registration-form').within(() => {
          cy.get('button[type=submit]').click();
        });
      });

      it('should verify global message after successful registration', () => {
        const message =
          'Thank you for registering! A representative will contact you shortly and confirm your access information.';
        verifyGlobalMessageAfterRegistration(message);
        //   verifyRedirectionToLoginPage();
        //   cdc.verifyOrgRegistrationRequestReceived();
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
          cy.get('cx-user-registration-form').within(() => {
            cy.get('button[type=submit]').click();
          });
          verifyFormErrors();
        });
      });
    }
  );
});
