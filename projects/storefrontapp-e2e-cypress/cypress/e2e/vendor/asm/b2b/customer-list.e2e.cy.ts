/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import * as checkout from '../../../../helpers/checkout-flow';
import { ELECTRONICS_BASESITE } from '../../../../helpers/checkout-flow';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  after(() => {
    Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
  });
  describe('ASM Customer list', () => {
    it('checking custom list features (CXSPA-2722)', () => {
      cy.cxConfig({
        context: {
          baseSite: ['powertools-spa'],
          currency: ['USD'],
        },
      });
      asm.addCartForB2BCustomer();
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      asm.agentLogin('brandon.leclair@acme.com', 'pw4all');
      asm.asmB2bCustomerLists();
      asm.agentSignOut();
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

      asm.agentLogin('jules.hasson@acme.com', 'pw4all');
      asm.asmB2bCustomerListPagination();
      asm.agentSignOut();
    });
  });
});
