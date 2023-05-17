/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';
import { asmTabbingOrderWithCustomerList } from '../../helpers/accessibility/tabbing-order/asm';
import { ELECTRONICS_BASESITE } from '../../helpers/checkout-flow';
import { POWERTOOLS_BASESITE } from '../../sample-data/b2b-checkout';

context('Tabbing order for ASM B2b Customer List', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  after(() => {
    Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
  });

  describe('ASM', () => {
    it('should allow to navigate with tab key for customer List (CXSPA-2722)', () => {
      cy.cxConfig({
        context: {
          baseSite: ['powertools-spa'],
          currency: ['USD'],
        },
      });
      asmTabbingOrderWithCustomerList(
        config.asmWithCustomerLists,
        'jules.hasson@acme.com'
      );
    });
  });
});
