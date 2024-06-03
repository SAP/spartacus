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
    '/users/anonymous/verificationToken?*'
  );
}

export function listenForUserVerficationCodeEmailReceive(
  customerEmail: string
) {
  const mailCCV2Url =
    Cypress.env('MAIL_CCV2_URL') +
    Cypress.env('MAIL_CCV2_PREFIX') +
    '/search?query=' +
    customerEmail +
    '&kind=to';

  cy.request({
    method: 'GET',
    url: mailCCV2Url,
  }).then((response) => {
    if (response.body.total != 2) {
      listenForUserVerficationCodeEmailReceive(customerEmail);
    }
  });
}

describe('OTP Login', () => {
  viewportContext(['mobile'], () => {
    describe('Create OTP', () => {
      beforeEach(() => {
        cy.visit('/login');
      });

      it('should be able to create a new OTP by customer click Sign In button (CXSPA-6672)', () => {
        const user = login.registerUserFromLoginPage();
        listenForCreateVerificationToken();

        cy.log(`🛒 Logging in user ${user.email} from the login form`);
        cy.get('cx-otp-login-form form').within(() => {
          cy.get('[formcontrolname="userId"]').clear().type(user.email);
          cy.get('[formcontrolname="password"]').clear().type(user.password);
          cy.get('button[type=submit]').click();
        });

        cy.wait('@createVerificationToken')
          .its('response.statusCode')
          .should('eq', 201);

        cy.get('cx-verification-token-form').should('exist');
        cy.get('cx-verification-token-form').should('be.visible');

        listenForUserVerficationCodeEmailReceive(user.email);

        const mailCCV2Url =
          Cypress.env('MAIL_CCV2_URL') +
          Cypress.env('MAIL_CCV2_PREFIX') +
          '/search?query=' +
          user.email +
          '&kind=to&start=0&limit=2';

        cy.request({
          method: 'GET',
          url: mailCCV2Url,
        }).then((response) => {
          const subject =
            '[Spartacus Electronics Site] Login Verification Code';
          const verificationCodeEmailStartText =
            'Please use the following verification code to log in Spartacus Electronics Site:</p>';
          const lableP = '<p>';

          const items = response.body.items;
          const emailBody =
            subject === items[0].Content.Headers.Subject[0]
              ? items[0].Content.Body
              : items[1].Content.Body;

          const verificationCodeEmailStartIndex =
            emailBody.indexOf(verificationCodeEmailStartText) +
            verificationCodeEmailStartText.length;
          const verificationCodeStartIndex =
            emailBody.indexOf(lableP, verificationCodeEmailStartIndex) +
            lableP.length;
          const verificationCode = emailBody.substring(
            verificationCodeStartIndex,
            verificationCodeStartIndex + 8
          );
          cy.log('Extracted verification code: ' + verificationCode);

          login.listenForTokenAuthenticationRequest();
          cy.get('cx-verification-token-form form').within(() => {
            cy.get('[formcontrolname="tokenCode"]')
              .clear()
              .type(verificationCode);
            cy.get('button[type=submit]').click();
          });
          cy.wait('@tokenAuthentication')
            .its('response.statusCode')
            .should('eq', 200);
        });
      });
    });

    describe('Failed to Create OTP', () => {
      beforeEach(() => {
        cy.visit('/login');
      });
      it('should not be able to create OTP with invalid user data (CXSPA-6672)', () => {
        listenForCreateVerificationToken();

        cy.get('cx-otp-login-form form').within(() => {
          cy.get('[formcontrolname="userId"]')
            .clear()
            .type('test.user@sap.coma');
          cy.get('[formcontrolname="password"]').clear().type('1234');
          cy.get('button[type=submit]').click();
        });

        cy.wait('@createVerificationToken')
          .its('response.statusCode')
          .should('eq', 400);

        cy.get('cx-global-message').within(() => {
          cy.get('span').contains('Email is not valid.');
        });
      });
    });

    describe('Verification token', () => {
      it('Should go back to login page when click back button (CXSPA-6689)', () => {
        cy.visit('/login/verify-token');

        cy.get('cx-verification-token-form').should('exist');

        cy.get('cx-verification-token-form form').within(() => {
          cy.get('div.verify-container button').contains('Back').click();
        });

        cy.get('cx-verification-token-form').should('not.exist');
        cy.get('cx-otp-login-form form').should('exist');
      });
    });
  });
});
