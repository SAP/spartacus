/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { interceptPost } from '../../support/utils/intercept';
import { waitForPage } from './../../helpers/navigation';
import { standardUser } from './../../sample-data/shared-users';

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

export function listenForUserVerficationCodeEmailReceive(
  customerEmail: string,
  limitCount: number
) {
  const mailCCV2Url =
    Cypress.env('MAIL_CCV2_URL') +
    Cypress.env('MAIL_CCV2_PREFIX') +
    '/search?query=' +
    customerEmail +
    '&limit=' +
    limitCount;

  cy.wait(5000); // allow time for email event handlers

  cy.request({
    method: 'GET',
    url: mailCCV2Url,
  }).then((response) => {
    if (response.body.count != limitCount) {
      listenForUserVerficationCodeEmailReceive(customerEmail, limitCount);
    }
  });
}

export function listenForTokenAuthenticationRequest(): string {
  const aliasName = 'tokenAuthentication';
  cy.intercept({
    method: 'POST',
    path: '/authorizationserver/oauth/token',
  }).as(aliasName);

  return `@${aliasName}`;
}

export function extractVerficationCode() {}

export function registerAndLogin(email: string, password: string) {
  visitLoginPage();
  cy.get('button.btn-register').click();
  cy.get('cx-otp-register-form form').within(() => {
    cy.get('ng-select[formcontrolname="titleCode"]')
      .click()
      .get('div.ng-option')
      .contains('Mr')
      .click();
    cy.get('[formcontrolname="firstName"]')
      .clear()
      .type(standardUser.registrationData.firstName);
    cy.get('[formcontrolname="lastName"]')
      .clear()
      .type(standardUser.registrationData.lastName);
    cy.get('[formcontrolname="email"]').clear().type(email);
    cy.get('[formcontrolname="termsandconditions"]').click();
    cy.get('button[type=submit]').click();
  });
  listenForUserVerficationCodeEmailReceive(email, 1);

  const mailCCV2Url =
    Cypress.env('MAIL_CCV2_URL') + Cypress.env('MAIL_CCV2_PREFIX') + '/search';

  cy.request({
    method: 'GET',
    url: mailCCV2Url,
    qs: {
      query: email,
      limit: 3,
      sort: 'desc',
    },
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
    listenForTokenAuthenticationRequest();
    cy.get('cx-registration-verification-token-form').within(() => {
      cy.get('[formcontrolname="tokenCode"]').clear().type(verificationCode);
      cy.get('[formcontrolname="password"]').clear().type(password);
      cy.get('[formcontrolname="passwordconf"]').clear().type(password);

      cy.get('button[type=submit]').click();
      const loginPage = waitForPage('/login', 'getLoginPage');
      cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
    });
  });

  loginWithOTP(email, password, 3);
}

export function loginWithOTP(
  email: string,
  password: string,
  mailMessageLimitCount: number
) {
  listenForCreateVerificationToken();

  cy.log(`🛒 Logging in user ${email} from the login form`);
  cy.get('cx-otp-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]').clear().type(email);
    cy.get('[formcontrolname="password"]').clear().type(password);
    cy.get('button[type=submit]').click();
  });

  cy.wait('@createVerificationToken')
    .its('response.statusCode')
    .should('eq', 201);

  cy.get('cx-verification-token-form').should('exist');
  cy.get('cx-verification-token-form').should('be.visible');

  listenForUserVerficationCodeEmailReceive(email, mailMessageLimitCount);

  const mailCCV2UrlV2 =
    Cypress.env('MAIL_CCV2_URL') + Cypress.env('MAIL_CCV2_PREFIX') + '/search';

  cy.request({
    method: 'GET',
    url: mailCCV2UrlV2,
    qs: {
      query: email,
      limit: mailMessageLimitCount,
    },
  }).then((response) => {
    const subject = '[Spartacus Electronics Site] Login Verification Code';
    const verificationCodeEmailStartText =
      'Please use the following verification code to log in Spartacus Electronics Site: ';

    const items = response.body.messages;
    const sortedMessages = items
      .sort((a, b) => {
        const dateA = new Date(a.Created).getTime();
        const dateB = new Date(b.Created).getTime();
        return dateB - dateA;
      })
      .filter((item) => item.Subject === subject);

    const emailBody = sortedMessages[0].Snippet;

    const verificationCodeEmailStartIndex =
      emailBody.indexOf(verificationCodeEmailStartText) +
      verificationCodeEmailStartText.length;

    const verificationCode = emailBody.substring(
      verificationCodeEmailStartIndex,
      verificationCodeEmailStartIndex + 8
    );
    cy.log('Extracted verification code: ' + verificationCode);

    listenForTokenAuthenticationRequest();
    cy.get('cx-verification-token-form form').within(() => {
      cy.get('[formcontrolname="tokenCode"]').clear().type(verificationCode);
      cy.get('button[type=submit]').click();
    });
    cy.wait('@tokenAuthentication')
      .its('response.statusCode')
      .should('eq', 200);
  });
}
