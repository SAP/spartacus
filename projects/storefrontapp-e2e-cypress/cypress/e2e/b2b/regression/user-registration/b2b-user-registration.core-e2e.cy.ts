/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  fillOrganizationUserRegistrationForm,
  navigateToOrganizationUserRegisterPage,
  submitOrganizationUserRegistrationForm,
  verifyGlobalMessageAfterRegistration,
  verifyTabbingOrder,
} from '../../../../helpers/b2b/b2b-user-registration';
import { viewportContext } from '../../../../helpers/viewport-context';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { isolateTests } from '../../../../support/utils/test-isolation';
import { getSampleUser } from './../../../../sample-data/checkout-flow';

context('B2B - User Registration', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTests();
    beforeEach(() => {
      clearAllStorage();
    });

    describe('Registration form', () => {
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
      });
    });
  });
});
