/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import { agentLoginForJDK21 } from '../../../helpers/auth-forms';
import * as checkout from '../../../helpers/checkout-flow';
import {
  getASMB2CCustomer,
  getB2CAgent,
  getProductCode,
} from '../../../sample-data/asm-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

const agent = getB2CAgent();
context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();
  });

  describe('ASM Customer list', () => {
    it('checking custom list features (CXSPA-1595)', () => {
      const customer = getASMB2CCustomer();

      const productCode = getProductCode();
      asm.placeOrderForB2CCustomer(
        customer.email,
        customer.password,
        productCode
      );
      cy.whenJDK17(() => {
        asm.addProductToB2CCart(customer.email, customer.password, productCode);
      });
      cy.whenJDK21(() => {
        checkout.signOutUser();
        cy.addToCartForJDK21(productCode, 1, customer.email, customer.password);
      });
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.whenJDK17(() => {
        asm.agentLogin(agent.userName, agent.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(agent.userName, agent.password);
      });
      asm.asmCustomerLists();
    });

    it('checking pagination (CXSPA-2109)', () => {
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.whenJDK17(() => {
        asm.agentLogin(agent.userName, agent.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(agent.userName, agent.password);
      });
      asm.asmCustomerListPagination();
    });

    it('checking c360 view link in customer list (CXSPA-6858)', () => {
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.whenJDK17(() => {
        asm.agentLogin(agent.userName, agent.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(agent.userName, agent.password);
      });
      asm.asmCustomerListC360Link();
    });
  });
});
