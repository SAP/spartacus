/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import { agentLoginForJDK21 } from '../../../helpers/auth-forms';
import * as checkout from '../../../helpers/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();
  });

  describe('ASM Customer list', () => {
    it('checking custom list features (CXSPA-1595)', () => {
      const custom = 'aaron.customer@hybris.com';
      const pwd = 'pw4all';
      const productCode = '479742';
      asm.placeOrderForB2CCustomer(custom, pwd, productCode);
      cy.whenJDK17(() => {
        asm.addProductToB2CCart(custom, pwd, productCode);
      });
      cy.whenJDK21(() => {
        checkout.signOutUser();
        cy.addToCartForJDK21(productCode, 1, custom, pwd);
      });
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.whenJDK17(() => {
        asm.agentLogin('asagent', 'pw4all');
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21('asagent', 'pw4all');
      });
      asm.asmCustomerLists();
    });

    it('checking pagination (CXSPA-2109)', () => {
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.whenJDK17(() => {
        asm.agentLogin('asagent', 'pw4all');
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21('asagent', 'pw4all');
      });
      asm.asmCustomerListPagination();
    });

    it('checking c360 view link in customer list (CXSPA-6858)', () => {
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.whenJDK17(() => {
        asm.agentLogin('asagent', 'pw4all');
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21('asagent', 'pw4all');
      });
      asm.asmCustomerListC360Link();
    });
  });
});
