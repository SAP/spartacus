/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = 'cx-asm-main-ui';
const containerSelectorForCustomerLists = 'cx-customer-list';
const containerSelectorForCreateCustomerForm = 'cx-asm-create-customer-form';
const containerSelectorForInactiveCartDialog = 'cx-asm-save-cart-dialog';

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

export function asmTabbingOrderWithCustomerList(
  config: TabElement[],
  agent: string
) {
  cy.visit('/?asm=true');
  asm.agentLogin(agent, 'pw4all');

  const customerListsRequestAlias = asm.listenForCustomerListsRequest();
  cy.get('cx-asm-main-ui div.cx-asm-customer-list a').click();
  cy.get('cx-customer-list').should('exist');
  cy.get('cx-customer-list h2').should('exist');
  cy.wait(customerListsRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  verifyTabbingOrder(containerSelectorForCustomerLists, config);
}

export function asmTabbingOrderWithCreateCustomerForm(config: TabElement[]) {
  cy.visit('/?asm=true');
  asm.agentLogin('asagent', 'pw4all');

  cy.get('cx-asm-main-ui div.cx-asm-customer-list a').click();
  cy.get('cx-customer-list').should('exist');
  cy.get('cx-customer-list h2').should('exist');

  cy.get('cx-customer-list div.cx-dialog-header button').click();
  cy.get('cx-asm-create-customer-form').should('exist');
  cy.get('cx-asm-create-customer-form form').should('exist');

  verifyTabbingOrder(containerSelectorForCreateCustomerForm, config);
}

export function asmTabbingOrderWithSaveInactiveCartDialog(
  config: TabElement[]
) {
  const customer = asm.emulateCustomerPrepare('asagent', 'pw4all');

  asm.getCustomerId('asagent', 'pw4all', customer.email).then((customerId) => {
    asm
      .getInactiveCartIdAndAddProducts(
        customer.email,
        customer.password,
        '1934793',
        '2'
      )
      .then((inactiveCartId) => {
        cy.visit(
          `/assisted-service/emulate?customerId=${customerId}&cartId=${inactiveCartId}&cartType=inactive`
        );
        cy.get('.cx-asm-assignCart').should('exist');
        cy.get('button[id=asm-save-inactive-cart-btn]').should('exist');
        cy.get(
          'cx-customer-emulation input[formcontrolname="cartNumber"]'
        ).should('have.value', inactiveCartId);
        cy.get('cx-asm-main-ui cx-message').should('exist');
        cy.log('--> Click save button the dialog shold display');
        cy.get('button[id=asm-save-inactive-cart-btn]').click();
        verifyTabbingOrder(containerSelectorForInactiveCartDialog, config);
        cy.findByText(/Cancel/i).click();
        asm.agentSignOut();
      });
  });
}
