/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { listenForTokenAuthenticationRequest } from '../../../../helpers/login';

describe('Tabbing order for B2B OTP registration', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('B2B OTP Registration', () => {
    context('B2B OTP Registration page', () => {
      beforeEach(() => {
        cy.visit('/login/register');
      });
      it('should allow to navigate with tab key for otp registration form and otp verification page(CXSPA-8772)', () => {
        cy.get('cx-user-registration-form').should('exist');
        cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
        cy.get('[formcontrolname="firstName"]').type('John');
        cy.get('[formcontrolname="lastName"]').type('Doe');
        cy.get('[formcontrolname="companyName"]').type('My Company Inc.');
        var email =
          'test.test' + Math.floor(Math.random() * 10001) + '@sap.com';
        cy.get('[formcontrolname="email"]').type(email);

        cy.get('button[type=submit]').click();
        cy.get('cx-verification-token-form').should('exist');
        listenForUserVerficationCodeEmailReceive(email);
        const mailCCV2Url =
          Cypress.env('MAIL_CCV2_URL') +
          Cypress.env('MAIL_CCV2_PREFIX') +
          '/search?query=' +
          email +
          '&kind=to&start=0&limit=1';

        cy.request({
          method: 'GET',
          url: mailCCV2Url,
        }).then((response) => {
          const verificationCodeEmailStartText =
            'Please use the following verification code to register in Spartacus powertools Site:</p>';
          const lableP = '<p>';
          const items = response.body.items;
          const emailBody = items[0].Content.Body;

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

          listenForTokenAuthenticationRequest();
          cy.get('cx-verification-token-form').within(() => {
            cy.get('[formcontrolname="tokenCode"]')
              .clear()
              .type(verificationCode);
            cy.get('button[type=submit]').click();
          });
          cy.get('cx-global-message').should('exist');
          cy.get('cx-global-message').contains(
            'Thank you for registering! A representative will contact you shortly and confirm your access information.'
          );
          cy.get('cx-login').should('exist');
        });
      });
    });
  });

  describe('Rate limit for registration', () => {
    it('Should display error message when create verification token with registration up to rate limit (CXSPA-9111)', () => {
      for (let i = 0; i < 6; i++) {
        cy.visit('/login/register');
        cy.get('cx-user-registration-form form').within(() => {
          cy.get('ng-select[formcontrolname="titleCode"]')
            .click()
            .get('div.ng-option')
            .contains('Mr')
            .click();
          cy.get('[formcontrolname="firstName"]').clear().type('John');
          cy.get('[formcontrolname="lastName"]').clear().type('Doe');
          cy.get('[formcontrolname="companyName"]')
            .clear()
            .type('My Company Inc.');
          cy.get('[formcontrolname="email"]').clear().type('test@example.com');
          cy.get('button[type=submit]').click();
          cy.wait(1000);
        });
      }

      cy.get('cx-verification-token-form').should('exist');
      cy.get('.rate-limit-error-display').should('exist');
    });
  });
});

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
    if (response.body.total != 1) {
      listenForUserVerficationCodeEmailReceive(customerEmail);
    }
  });
}
