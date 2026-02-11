/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as login from '../../../helpers/login';
import { waitForPage } from '../../../helpers/navigation';
import { viewportContext } from '../../../helpers/viewport-context';
import { user } from '../../../sample-data/checkout-flow';
import { interceptPost } from '../../../support/utils/intercept';

export function visitLoginPage() {
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.visit('/');
  cy.wait(`@${homePage}`);
  cy.getLoginRegisterLink({ clickAndWait: true });
}

export function listenForCreateVerificationToken(): string {
  return interceptPost(
    'createVerificationToken',
    '/users/anonymous/verificationToken?*'
  );
}

export function listenForUserRegistrationVerficationCodeEmailReceive(
  customerEmail: string
) {
  const mailCCV2Url =
    Cypress.env('MAIL_CCV2_URL') +
    Cypress.env('MAIL_CCV2_PREFIX') +
    '/search?query=' +
    customerEmail +
    '&limit=1';

  cy.wait(5000); // allow time for email event handlers

  cy.request({
    method: 'GET',
    url: mailCCV2Url,
  }).then((response) => {
    if (response.body.count != 1) {
      listenForUserRegistrationVerficationCodeEmailReceive(customerEmail);
    }
  });
}

export function listenForUserVerficationCodeEmailReceive(
  customerEmail: string
) {
  const mailCCV2Url =
    Cypress.env('MAIL_CCV2_URL') +
    Cypress.env('MAIL_CCV2_PREFIX') +
    '/search?query=' +
    customerEmail +
    '&limit=3';

  cy.wait(5000); // allow time for email event handlers

  cy.request({
    method: 'GET',
    url: mailCCV2Url,
  }).then((response) => {
    if (response.body.count != 3) {
      listenForUserVerficationCodeEmailReceive(customerEmail);
    }
  });
}

describe('OTP Login', () => {
  viewportContext(['mobile'], () => {
    describe('Create OTP', () => {
      beforeEach(() => {
        visitLoginPage();
        cy.get('button.btn-register').click();
        cy.get('cx-otp-register-form form').within(() => {
          cy.get('ng-select[formcontrolname="titleCode"]')
            .click()
            .get('div.ng-option')
            .contains('Mr')
            .click();
          cy.get('[formcontrolname="firstName"]').clear().type(user.firstName);
          cy.get('[formcontrolname="lastName"]').clear().type(user.lastName);
          cy.get('[formcontrolname="email"]').clear().type(user.email);
          cy.get('[formcontrolname="termsandconditions"]').click();
          cy.get('button[type=submit]').click();
        });
        listenForUserRegistrationVerficationCodeEmailReceive(user.email);

        const mailCCV2Url =
          Cypress.env('MAIL_CCV2_URL') +
          Cypress.env('MAIL_CCV2_PREFIX') +
          '/search?query=' +
          user.email +
          '&limit=1';

        cy.request({
          method: 'GET',
          url: mailCCV2Url,
        }).then((response) => {
          const verificationCodeEmailStartText =
            'Please use the following verification code to register in Spartacus Electronics Site: ';
          const items = response.body.messages;
          const emailBody = items[0].Snippet;

          const verificationCodeEmailStartIndex =
            emailBody.indexOf(verificationCodeEmailStartText) +
            verificationCodeEmailStartText.length;
          const verificationCode = emailBody.substring(
            verificationCodeEmailStartIndex,
            verificationCodeEmailStartIndex + 8
          );
          login.listenForTokenAuthenticationRequest();
          cy.get('cx-registration-verification-token-form').within(() => {
            cy.get('[formcontrolname="tokenCode"]')
              .clear()
              .type(verificationCode);
            cy.get('[formcontrolname="password"]').clear().type(user.password);
            cy.get('[formcontrolname="passwordconf"]')
              .clear()
              .type(user.password);

            cy.get('button[type=submit]').click();
            const loginPage = waitForPage('/login', 'getLoginPage');
            cy.wait(`@${loginPage}`)
              .its('response.statusCode')
              .should('eq', 200);
          });
        });
      });

      it('should be able to create a new OTP by customer click Sign In button (CXSPA-6672)', () => {
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
          '&limit=3';

        cy.request({
          method: 'GET',
          url: mailCCV2Url,
        }).then((response) => {
          const subject =
            '[Spartacus Electronics Site] Login Verification Code';
          const verificationCodeEmailStartText =
            'Please use the following verification code to log in Spartacus Electronics Site: ';

          const items = response.body.messages;
          const emailBody =
            subject === items[0].Subject
              ? items[0].Snippet
              : subject === items[1].Subject
                ? items[1].Snippet
                : items[2].Snippet;

          const verificationCodeEmailStartIndex =
            emailBody.indexOf(verificationCodeEmailStartText) +
            verificationCodeEmailStartText.length;

          const verificationCode = emailBody.substring(
            verificationCodeEmailStartIndex,
            verificationCodeEmailStartIndex + 8
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
  });

  describe('Verification token', () => {
    it('Should go back to login page when click back button (CXSPA-6689)', () => {
      visitLoginPage();

      cy.get('cx-otp-login-form form').within(() => {
        cy.get('[formcontrolname="userId"]').as('usr').clear();
        cy.get('@usr').type('test.user@sap.com');
        cy.get('[formcontrolname="password"]').as('pas').clear();
        cy.get('@pas').type('1234');
        cy.get('button[type=submit]').click();
      });

      cy.get('cx-verification-token-form').should('exist');

      cy.get('cx-verification-token-form form').within(() => {
        cy.get('div.verify-container button').contains('Back').click();
      });

      cy.get('cx-verification-token-form').should('not.exist');
      cy.get('cx-otp-login-form form').should('exist');
    });
  });

  describe('Rate limit for login', () => {
    it('Should display error message when create verification token with login up to rate limit (CXSPA-9111)', () => {
      for (let i = 0; i < 6; i++) {
        visitLoginPage();
        cy.get('cx-otp-login-form form', { timeout: 10000 }).should('exist');
        cy.get('cx-otp-login-form form').within(() => {
          cy.get('[formcontrolname="userId"]')
            .as('usr' + i)
            .clear();
          cy.get('@usr' + i).type(user.email);
          cy.get('[formcontrolname="password"]')
            .as('pas' + i)
            .clear();
          cy.get('@pas' + i).type(user.password);
          cy.get('button[type=submit]').click();
          cy.wait(1000);
        });
      }

      cy.get('cx-verification-token-form').should('exist');
      cy.get('.rate-limit-error-display').should('exist');
    });
  });
});
