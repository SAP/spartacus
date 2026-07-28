/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import { agentLoginForJDK21 } from '../../../../helpers/auth-forms';
import * as b2bCheckout from '../../../../helpers/b2b/b2b-checkout';
import * as alerts from '../../../../helpers/global-message';
import {
  getASMB2BCustomer,
  getB2BAgent,
} from '../../../../sample-data/asm-flow';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

context('B2B - ASM Account Checkout', () => {
  const invalid_cost_center = 'Rustic_Global';
  const valid_cost_center = 'Pronto_Services';
  const customer = getASMB2BCustomer();
  const b2bAgent = getB2BAgent();

  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  it('should show error on invalid cost center', () => {
    cy.log('--> Agent logging in');
    cy.visit('/?asm=true');
    cy.get('cx-asm-main-ui').should('exist');
    cy.get('cx-asm-main-ui').should('be.visible');
    cy.whenJDK17(() => {
      asm.agentLogin(b2bAgent.userName, b2bAgent.password);
    });

    cy.whenJDK21(() => {
      cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
      agentLoginForJDK21(b2bAgent.userName, b2bAgent.password);
    });
    cy.log('--> Agent emulate customer');
    asm.startCustomerEmulation(customer, true);

    b2bCheckout.addB2bProductToCartAndCheckout();
    cy.get('cx-payment-type').within(() => {
      cy.findByText('Account').click({ force: true });
    });
    cy.get('button.btn-primary').should('be.enabled').click({ force: true });
    cy.intercept('PUT', '*costcenter?costCenterId=*').as('costCenterReq');

    cy.get('cx-cost-center').within(() => {
      cy.get('select').then((select) => {
        cy.get('select').select(valid_cost_center);
        if (select.find(`option:contains("${invalid_cost_center}")`).length) {
          cy.get('select').select(invalid_cost_center);
          cy.wait('@costCenterReq')
            .its('response.statusCode')
            .should('eq', 400);
          alerts.getErrorAlert().contains('Invalid cost center.');
          alerts.getErrorAlert().then((alert) => {
            cy.wrap(alert).within(() => {
              cy.get('button').click();
            });
          });
        }
      });
    });
  });
});
