/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */


export function visitLoginPage() {
  cy.visit('/');
  cy.getLoginRegisterLink({ clickAndWait: true });
}

describe('Tabbing order for B2B OTP registration', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('B2B OTP Registration', () => {
    context('B2B OTP Registration page', () => {
      beforeEach(() => {
        visitLoginPage();
        cy.get('cx-link.cx-organization-user-register-button').click();      
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
          '&limit=1';

        cy.request({
          method: 'GET',
          url: mailCCV2Url,
        }).then((response) => {
          const verificationCodeEmailStartText =
            'Please use the following verification code to register in Spartacus powertools Site: ';
          const items = response.body.messages;
          const emailBody = items[0].Snippet;

          const verificationCodeEmailStartIndex =
            emailBody.indexOf(verificationCodeEmailStartText) +
            verificationCodeEmailStartText.length;
          const verificationCode = emailBody.substring(
            verificationCodeEmailStartIndex,
            verificationCodeEmailStartIndex + 8
          );

          listenForOrgUserRegistrationRequest();
          cy.get('cx-verification-token-form').within(() => {
            cy.get('[formcontrolname="tokenCode"]')
              .clear()
              .type(verificationCode);
            cy.get('button[type=submit]').click();
          });
          cy.wait('@OrgUserRegistration')
          .its('response.statusCode')
          .should('eq', 201);
        });
      });
    });
  });

  describe('Rate limit for registration', () => {
    it('Should display error message when create verification token with registration up to rate limit (CXSPA-9111)', () => {
      for (let i = 0; i < 6; i++) {
        visitLoginPage();
        cy.get('cx-link.cx-organization-user-register-button').click();      
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

export function listenForOrgUserRegistrationRequest(): string {
  const aliasName = 'OrgUserRegistration';
  cy.intercept({
    method: 'POST',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/orgUsers?*`,
  }).as(aliasName);

  return `@${aliasName}`;
}

export function listenForUserVerficationCodeEmailReceive(
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
      listenForUserVerficationCodeEmailReceive(customerEmail);
    }
  });
}
