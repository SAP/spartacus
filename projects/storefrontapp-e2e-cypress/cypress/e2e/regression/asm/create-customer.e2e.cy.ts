/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import * as checkout from '../../../helpers/checkout-flow';
import { generateMail, randomString } from '../../../helpers/user';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

const user = getSampleUser();

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

      user.email = generateMail(randomString(), true);
      asm.fillCreateCustomerForm(user);

      cy.log('--> submit form');
      asm
        .submitCreateCustomerForm()
        .its('response.statusCode')
        .should('eq', 201);

      cy.get('cx-customer-emulation').should('be.visible');

      const backOfficeUrl =
        Cypress.env('BACK_OFFICE_URL') + Cypress.env('BACK_OFFICE_PREFIX');
      cy.log('--> Go to ' + backOfficeUrl + ' to update the customer password');
      cy.visit(backOfficeUrl);

      const sentArgs = { email: user.email, password: user.password };
      cy.origin(backOfficeUrl, { args: sentArgs }, ({ email, password }) => {
        cy.get('.z-loading-indicator', { timeout: 30000 }).should('not.exist');
        cy.get("[type='button'],[type='submit']", { timeout: 30000 }).contains(
          'Sign'
        );
        cy.wait(5000);
        cy.get("input[name='j_username']")
          .scrollIntoView()
          .type('CustomerSupportAgent', { force: true, log: true });
        cy.get("input[name='j_password']")
          .scrollIntoView()
          .type('pw4all', { force: true, log: false });
        cy.get("[type='button'],[type='submit']")
          .contains('Sign')
          .click({ force: true });

        cy.get('[aria-label="Tickets selected"]', { timeout: 50000 }).should(
          'have.class',
          'z-treerow-selected'
        );
        cy.wait(5000);

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
    });

    it('vertify login to Spartacus (CXSPA-1594)', () => {
      cy.log('--> Return to Spartacus to verify login');
      checkout.visitHomePage();
      cy.log('--> Log in to Spartacus');
      checkout.signInUser(user);
      cy.get('cx-login .cx-login-greet').should('be.visible');
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
    });

    // TODO(#CXSPA-5165): enable this case
    it.skip('should be not able to create a new customer with duplicated user data by agent (CXSPA-1594)', () => {
      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      asm.agentLogin('asagent', 'pw4all');

      cy.log('--> Open create customer dialog on customer list dialog');
      asm.asmOpenCreateCustomerDialogOnCustomerListDialog();

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

      asm.asmCloseCreateCustomerDialog();
    });

    it('should be not able to create a new customer with invalid user data by agent (CXSPA-1594)', () => {
      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      asm.agentLogin('asagent', 'pw4all');

      cy.log('--> Open create customer dialog on customer list dialog');
      asm.asmOpenCreateCustomerDialogOnCustomerListDialog();

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
    });
  });
});
