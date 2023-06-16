/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import * as checkout from '../../../../helpers/checkout-flow';
import { getSampleUser } from '../../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

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
      asm.addProductToB2CCart(custom, pwd, productCode);
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      asm.agentLogin('asagent', 'pw4all');
      asm.asmCustomerLists();
      asm.agentSignOut();
    });

    it('checking pagination (CXSPA-2109)', () => {
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      asm.agentLogin('asagent', 'pw4all');
      asm.asmCustomerListPagination();
      asm.agentSignOut();
    });
  });
});
