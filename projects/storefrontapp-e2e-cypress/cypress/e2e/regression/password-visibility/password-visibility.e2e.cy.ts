/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForPage } from '../../../helpers/navigation';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { whenJDK17 } from '../../../support/utils/jdk-versions';
import { visitLoginPage } from '../../../support/utils/login';

context('Password Visibility', () => {
  viewportContext(['mobile'], () => {
    beforeEach(() => {
      clearAllStorage();
    });

    whenJDK17(() => {
      it('should hide password by default', () => {
        const loginPage = waitForPage('/login', 'getLoginPage');
        visitLoginPage();
        cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

        cy.get('cx-password-visibility-toggle [aria-pressed="false"]').should(
          'be.visible'
        );

        //type password and assert
        cy.get('input[aria-label="Enter Your Password"]').should(
          'have.attr',
          'type',
          'password'
        );
        cy.get('input[aria-label="Enter Your Password"]').type('abc');
        cy.get('input[aria-label="Enter Your Password"]').should(
          'have.value',
          'abc'
        );

        cy.get('cx-password-visibility-toggle button').click();
        cy.get('input[aria-label="Enter Your Password"]').should(
          'have.attr',
          'type',
          'text'
        );
        cy.get('input[aria-label="Enter Your Password"]').should(
          'have.value',
          'abc'
        );
        cy.get('cx-password-visibility-toggle [aria-pressed="true"]').should(
          'be.visible'
        );
      });
    });

    it('should verify password is hidden by default on registration page', () => {
      const registerPage = waitForPage('/login/register', 'getRegisterPage');
      cy.visit('/login/register');
      cy.wait(`@${registerPage}`).its('response.statusCode').should('eq', 200);

      cy.get('cx-password-visibility-toggle button').should('have.length', 2);
    });

    it('should verify password is hidden by default on my account password page', () => {
      cy.requireLoggedIn();
      const myAccountUpdatePasswordPage = waitForPage(
        '/my-account/update-password',
        'getMyAccountUpdatePasswordPage'
      );
      cy.visit('/my-account/update-password');
      cy.wait(`@${myAccountUpdatePasswordPage}`)
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('cx-password-visibility-toggle button').should('have.length', 3);
    });
  });
});
