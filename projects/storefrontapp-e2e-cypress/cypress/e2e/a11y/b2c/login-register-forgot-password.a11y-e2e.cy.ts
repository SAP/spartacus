/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { whenJDK17 } from '../../../support/utils/jdk-versions';
import { visitLoginPage } from '../../../support/utils/login';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

/**
 * This test checks accessibility concerns on the pages for Login, Forgot Password, and Register
 */
describe(
  'Login, Register, and Forgot Password Page Accessibility',
  { testIsolation: false },
  () => {
    isolateTestsBefore();
    beforeEach(() => {
      cy.a11yContinuumSetup();
    });

    whenJDK17(() => {
      it('should pass a11y scan for the Login Page', () => {
        visitLoginPage();
        cy.get('input[formControlName="userId"]');
        cy.get('form').submit();
        cy.get('main').a11yRunContinuumTest();
      });
    });

    it('should pass a11y scan for the Forgot Password Page', () => {
      cy.visit('/login/forgot-password');
      cy.get('input[formControlName="userEmail"]');
      cy.get('form').submit();
      cy.get('main').a11yRunContinuumTest();
    });

    it('should pass a11y scan for the Register Page', () => {
      cy.visit('/login/register');
      cy.get('input[formControlName="email"]');
      cy.get('form').submit();
      cy.get('main').a11yRunContinuumTest();
    });
  }
);
