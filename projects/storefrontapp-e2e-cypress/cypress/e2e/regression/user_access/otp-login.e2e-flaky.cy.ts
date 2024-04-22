/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';
import { interceptPost } from '../../../support/utils/intercept';

export function listenForCreateVerificationToken(): string {
  return interceptPost(
    'createVerificationToken',
    'users/anonymous/verificationToken'
  );
}

describe('OTP Login', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.visit('/login');
    });

    describe('Create OTP', () => {
      it('should be able to create a new OTP by customer click Sign In button (CXSPA-6672)', () => {
        const user = login.registerUserFromLoginPage();
        listenForCreateVerificationToken();

        cy.log(`🛒 Logging in user ${user.email} from the login form`);
        cy.get('cx-otp-login-form form').within(() => {
          cy.get('[formcontrolname="userId"]').clear().type(user.email);
          cy.get('[formcontrolname="password"]').clear().type(user.password);
          cy.get('button[type=submit]').click();
        });
        // cy.wait('@createVerificationToken')
        //   .its('response.statusCode')
        //   .should('eq', 201);

        cy.get('cx-verification-token-form').should('exist');
        cy.get('cx-verification-token-form').should('be.visible');
        cy.get(login.userGreetSelector).should('not.exist');
      });
    });

    describe('Failed to Create OTP', () => {
      it('should be not able to create OTP with invalid user data (CXSPA-6672)', () => {
        listenForCreateVerificationToken();
        cy.get('cx-otp-login-form form').within(() => {
          cy.get('[formcontrolname="userId"]')
            .clear()
            .type('test.user@sap.coma');
          cy.get('[formcontrolname="password"]').clear().type('1234');
          cy.get('button[type=submit]').click();
        });
        // cy.wait('@createVerificationToken')
        //   .its('response.statusCode')
        //   .should('eq', 400);

        cy.get('cx-global-message').within(() => {
          cy.get('span').contains('Email is not valid.');
        });
      });
    });
  });
});
