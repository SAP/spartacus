/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';
import * as asm from '../../../helpers/asm';

const containerSelector = 'cx-asm-main-ui';
const containerSelectorForCustomerLists = 'cx-customer-list';

export function asmTabbingOrderNotLoggedIn(config: TabElement[]) {
  cy.visit('/?asm=true');
  verifyTabbingOrder(containerSelector, config);
}

export function asmTabbingOrderNoSelectedUser(config: TabElement[]) {
  cy.visit('/?asm=true');
  asm.agentLogin('asagent', 'pw4all');

  const customerSearchRequestAlias = asm.listenForCustomerSearchRequest();
  cy.get('cx-customer-selection form').within(() => {
    cy.get('[formcontrolname="searchTerm"]').type('Linda Wolf');
  });
  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  verifyTabbingOrder(containerSelector, config);
}

export function asmTabbingOrderWithSelectedUser(config: TabElement[]) {
  cy.visit('/?asm=true');
  asm.agentLogin('asagent', 'pw4all');

  const customerSearchRequestAlias = asm.listenForCustomerSearchRequest();
  cy.get('cx-customer-selection form').within(() => {
    cy.get('[formcontrolname="searchTerm"]').type('Linda Wolf');
  });
  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);
  cy.get('cx-customer-selection div.asm-results button').first().click();

  verifyTabbingOrder(containerSelector, config);
}

export function asmTabbingOrderWithCustomerList(config: TabElement[]) {
  cy.visit('/?asm=true');
  asm.agentLogin('asagent', 'pw4all');

  const customerListsRequestAlias = asm.listenForCustomerListsRequest();
  cy.get('cx-asm-main-ui div.cx-asm-customer-list a').click();
  cy.get('cx-customer-list').should('exist');
  cy.get('cx-customer-list h2').should('exist');
  cy.wait(customerListsRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  verifyTabbingOrder(containerSelectorForCustomerLists, config);
}
