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
    const productCode = '479742';
    it('Should be able to checkout a b2c order via API (CXSPA-1595)', function () {
      cy.login('aaron.customer@hybris.com', 'pw4all').then(() => {
        const auth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
        console.info(auth);
        cy.addToCart(productCode, 1, auth.token.access_token).then((cartId) => {
          cy.requireDeliveryAddressAdded(
            getSampleUser().address,
            auth.token,
            cartId
          );
          cy.requireDeliveryMethodSelected(auth.token, cartId);
          cy.requirePaymentMethodAdded(cartId);
          cy.requirePlacedOrder(auth.token, cartId);
        });
      });
    });

    it('Should be able to create a b2c cart via API (CXSPA-1595)', function () {
      cy.login('aaron.customer@hybris.com', 'pw4all').then(() => {
        const auth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
        cy.addToCart(productCode, 1, auth.token.access_token);
      });
    });

    it('checking custom list features', () => {
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
