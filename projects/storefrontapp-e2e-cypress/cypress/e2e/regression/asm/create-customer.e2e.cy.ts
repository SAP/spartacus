/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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

      const user = getSampleUser();
      asm.fillCreateCustomerForm(user);

      cy.log('--> submit form');
      asm
        .submitCreateCustomerForm()
        .its('response.statusCode')
        .should('eq', 201);

      cy.get('cx-customer-emulation').should('be.visible');
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

    it('should be not able to create a new customer with duplicated user data by agent (CXSPA-1594)', () => {
      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      asm.agentLogin('asagent', 'pw4all');

      cy.log('--> Open create customer dialog on customer list dialog');
      asm.asmOpenCreateCustomerDialogOnCustomerListDialog();

      const user = getSampleUser();
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
