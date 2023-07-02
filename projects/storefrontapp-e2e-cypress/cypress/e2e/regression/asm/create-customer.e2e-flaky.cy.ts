/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import * as checkout from '../../../helpers/checkout-flow';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Assisted Service Module', () => {
  beforeEach(() => {
    clearAllStorage();
  });

  describe('Create Customer', () => {
    it('should be able to create a new customer by agent click button (CXSPA-1594)', () => {
      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');

      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      asm.agentLogin('asagent', 'pw4all');

      cy.log('--> Open create customer dialog on customer selection dropdown');
      asm.asmOpenCreateCustomerDialogOnCustomerSelectionDropdown();

      cy.log('--> close create customer dialog');
      asm.asmCloseCreateCustomerDialog();

      cy.log('--> Open create customer dialog on customer list dialog');
      asm.asmOpenCreateCustomerDialogOnCustomerListDialog();

      cy.log('--> fill form');
      let user = getSampleUser();
      asm.fillCreateCustomerForm(user);

      cy.log('--> submit form');
      asm
        .submitCreateCustomerForm()
        .its('response.statusCode')
        .should('eq', 201);

      cy.get('cx-customer-emulation').should('be.visible');

      asm.agentSignOut();

      const backOfficeUrl =
        Cypress.env('BACK_OFFICE_URL') + Cypress.env('BACK_OFFICE_PREFIX');
      cy.log('--> Go to ' + backOfficeUrl + ' to update the customer password');
      cy.visit(backOfficeUrl);

      const sentArgs = { email: user.email, password: user.password };
      cy.origin(backOfficeUrl, { args: sentArgs }, ({ email, password }) => {
        cy.get('.z-loading-indicator', { timeout: 30000 }).should('not.exist');
        cy.get('[ytestid="loginButton"]').should('exist');
        cy.get('[ytestid="loginButton"]').should('be.visible');

        cy.get('[ytestid="j_username"]').clear({ force: true });
        cy.get('[ytestid="j_password"]').clear({ force: true });

        cy.get('[ytestid="j_username"]')
          .scrollIntoView()
          .type('CustomerSupportAgent');
        cy.get('[ytestid="j_username"]').should(
          'have.value',
          'CustomerSupportAgent'
        );
        cy.get('[ytestid="j_password"]').scrollIntoView().type('pw4all');
        cy.get('[ytestid="j_password"]').should('have.value', 'pw4all');
        cy.get('[ytestid="loginButton"]').click({ force: true });

        cy.get('[ytestid="yw-textsearch-searchbox"]', {
          timeout: 30000,
        }).should('be.visible');

        cy.get('[ytestid="customersupport_backoffice_explorerTree_customers"]')
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true });

        cy.get('[ytestid="yw-textsearch-searchbox"]').should('be.visible');
        cy.get('[ytestid="yw-textsearch-searchbox"]').within(() => {
          cy.get('input').clear({ force: true });
        });
        cy.get('[ytestid="yw-textsearch-searchbox"]').type(email);
        cy.get('[ytestid="yw-textsearch-searchbox"]')
          .next()
          .click({ force: true });
        cy.get('.progressTitle').should('be.visible');
        cy.get('.progressTitle').should('not.exist');
        cy.get('tr', { timeout: 3000 })
          .contains('td', email)
          .click({ force: true });

        cy.get('[ytestid="hmc.password_head"]')
          .should('be.visible')
          .click({ force: true });

        cy.get('[ytestid="user-password-provided"]')
          .scrollIntoView()
          .type(password);

        cy.get('[ytestid="user-password-confirmed"]')
          .scrollIntoView()
          .type(password);

        cy.get('[ytestid="toolbarContainer"] [ytestid="saveButton"]', {
          timeout: 5000,
        }).should('be.enabled');
        cy.get('[ytestid="toolbarContainer"] [ytestid="saveButton"]')
          .eq(1)
          .click({ force: true });

        cy.contains(
          '[ytestid="backofficeGlobalNotification"] span[ytestid="notificationMessage0"]',
          'Saved items'
        );
      });

      cy.log('--> Return to Spartacus to verify login');
      checkout.visitHomePage();
      cy.log('--> Log in to Spartacus');
      checkout.signInUser(user);
    });
  });

  describe('Failed to Create Customer', () => {
    it('should display validation errors if form is empty (CXSPA-1594)', () => {
      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      asm.agentLogin('asagent', 'pw4all');

      cy.log('--> Open create customer dialog on customer list dialog');
      asm.asmOpenCreateCustomerDialogOnCustomerListDialog();

      cy.log('--> submit form');
      /*
       * If form is not valid we should not expect call to the API
       */
      asm.submitCreateCustomerForm(false);

      cy.log('--> valid form');
      asm.verifyFormErrors();

      cy.log('--> close create customer dialog');
      asm.asmCloseCreateCustomerDialog();

      asm.agentSignOut();
    });
    it('should be not able to create a new customer with invalid user data by agent (CXSPA-1594)', () => {
      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      asm.agentLogin('asagent', 'pw4all');

      cy.log('--> Open create customer dialog on customer list dialog');
      asm.asmOpenCreateCustomerDialogOnCustomerListDialog();

      let user = getSampleUser();
      user.email = myCompanyAdminUser.registrationData?.email;
      cy.log('--> fill form');
      asm.fillCreateCustomerForm(user);

      cy.log('--> submit form');
      asm
        .submitCreateCustomerForm()
        .its('response.statusCode')
        .should('eq', 400);

      cy.get('div.message-container cx-message').should('exist');
      cy.get('div.message-container cx-message').should('be.visible');
      cy.get('div.message-container cx-message').should('have.length', 2);
      cy.get('div.message-container cx-message')
        .eq(1)
        .should('contain', 'Enter a different email address as');

      let invalidUser = asm.invalidUser;
      cy.log('--> fill form');
      asm.fillCreateCustomerForm(invalidUser);

      cy.log('--> submit form');
      asm
        .submitCreateCustomerForm()
        .its('response.statusCode')
        .should('eq', 400);

      cy.get('div.message-container cx-message').should('exist');
      cy.get('div.message-container cx-message').should('be.visible');
      cy.get('div.message-container cx-message').should('have.length', 4);
      cy.get('div.message-container cx-message')
        .eq(1)
        .should('contain', 'Enter a valid email address.');
      cy.get('div.message-container cx-message')
        .eq(2)
        .should('contain', 'Enter a valid first name.');
      cy.get('div.message-container cx-message')
        .eq(3)
        .should('contain', 'Enter a valid last name.');

      cy.log('--> close create customer dialog');
      asm.asmCloseCreateCustomerDialog();

      asm.agentSignOut();
    });
  });
});
