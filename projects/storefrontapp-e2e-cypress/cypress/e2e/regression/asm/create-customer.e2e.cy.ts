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
    it('should be able to create a new customer by agent click button', () => {
      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      asm.agentLogin();

      cy.log('--> Open create customer dialog on customer selection dropdown');
      asm.asmOpenCreateCustomerDialogOnCustomerSelectionDropdown();

      cy.log('--> close create customer dialog');
      asm.asmCloseCreateCustomerDialog();

      cy.log('--> Open create customer dialog on customer list dialog');
      asm.asmOpenCreateCustomerDialogOnCustomerListDialog();

      cy.log('--> fill form');
      asm.fillCreateCustomerForm(getSampleUser());

      cy.log('--> submit form');
      asm
        .submitCraeteCustomerForm()
        .its('response.statusCode')
        .should('eq', 201);

      cy.get('cx-customer-emulation').should('be.visible');

      asm.agentSignOut();
    });
  });

  describe('Failed to Create Customer', () => {
    it('should display validation errors if form is empty', () => {
      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      asm.agentLogin();

      cy.log('--> Open create customer dialog on customer list dialog');
      asm.asmOpenCreateCustomerDialogOnCustomerListDialog();

      cy.log('--> submit form');
      /*
       * If form is not valid we should not expect call to the API
       */
      asm.submitCraeteCustomerForm(false);

      cy.log('--> valid form');
      asm.verifyFormErrors();

      cy.log('--> close create customer dialog');
      asm.asmCloseCreateCustomerDialog();

      asm.agentSignOut();
    });
    it('should be not able to create a new customer with dupcated email by agent', () => {
      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');
      asm.agentLogin();

      cy.log('--> Open create customer dialog on customer list dialog');
      asm.asmOpenCreateCustomerDialogOnCustomerListDialog();

      let user = getSampleUser();
      user.email = myCompanyAdminUser.registrationData?.email;
      cy.log('--> fill form');
      asm.fillCreateCustomerForm(user);

      cy.log('--> submit form');
      asm
        .submitCraeteCustomerForm()
        .its('response.statusCode')
        .should('eq', 400);

      cy.log('--> close create customer dialog');
      asm.asmCloseCreateCustomerDialog();

      asm.agentSignOut();
    });
  });
});
