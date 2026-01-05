/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import { addProductToB2BCart } from '../../../../helpers/asm';
import { agentLoginForJDK21 } from '../../../../helpers/auth-forms';
import * as checkout from '../../../../helpers/checkout-flow';
import { ELECTRONICS_BASESITE } from '../../../../helpers/checkout-flow';
import {
  getASMB2BCustomer2,
  getB2BAgent,
  getB2BAgent2,
} from '../../../../sample-data/asm-flow';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

context('Assisted Service Module', () => {
  const customer2 = getASMB2BCustomer2();
  const b2bAgent = getB2BAgent();
  const b2bAgent2 = getB2BAgent2();
  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  after(() => {
    Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
  });
  describe('ASM Customer list', () => {
    it('checking custom list features (CXSPA-1595)', () => {
      cy.cxConfig({
        context: {
          baseSite: ['powertools-spa'],
          currency: ['USD'],
        },
      });

      const productCode = '3592865';

      cy.whenJDK17(() => {
        addProductToB2BCart(customer2.email, customer2.password, productCode);
      });
      cy.whenJDK21(() => {
        checkout.visitHomePage();
        cy.addProductToB2BCartForJDK21(
          productCode,
          1,
          customer2.email,
          customer2.password
        );
      });

      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.whenJDK17(() => {
        asm.agentLogin(b2bAgent.userName, b2bAgent.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2bAgent.userName, b2bAgent.password);
      });

      asm.asmB2bCustomerLists();
      cy.contains('button[formcontrolname="logoutCustomer"]', 'End Session')
        .should('be.visible')
        .click();
      cy.get('button.logout[title="Sign Out"]').should('be.visible').click();
      cy.get('button.close[title="Close ASM"]').should('be.visible').click();
    });

    it('checking pagination (CXSPA-2109)', () => {
      cy.cxConfig({
        context: {
          baseSite: ['powertools-spa'],
          currency: ['USD'],
        },
      });
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.whenJDK17(() => {
        asm.agentLogin(b2bAgent2.userName, b2bAgent2.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2bAgent2.userName, b2bAgent2.password);
      });

      asm.asmB2bCustomerListPagination();
    });
  });
});
