/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as unitLevelOrderDetails from '../../../../helpers/b2b/b2b-order-details';
import * as sampleData from '../../../../sample-data/b2b-order-details';

describe('B2B - Unit-Level Order Details Page', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Check order details page', () => {
    it('should display buyer and unit on order details page for user with right to view Unit-Level Orders', () => {
      unitLevelOrderDetails.loginB2bUnitOrderViewer();
      unitLevelOrderDetails.getStubbedUnitLevelOrderDetails();
      cy.visit(`/my-account/unitLevelOrderDetails/${sampleData.ORDER_CODE}`);
      assertUnitLevelOrderDetails(sampleData.unitLevelOrder);
    });

    it('should not display order details page for user without right to view Unit-Level Orders', () => {
      unitLevelOrderDetails.loginB2bCommonUser();
      unitLevelOrderDetails.getStubbedUnitLevelOrderDetails();
      cy.visit(`/my-account/unitLevelOrderDetails/${sampleData.ORDER_CODE}`);
      assertExistenceOfNoPermissionMessage();
      cy.location('pathname').should(
        'not.contain',
        '/my-account/unitLevelOrderDetails/'
      );
    });
  });
});

function assertUnitLevelOrderDetails(order) {
  assertCommonFieldsOfOrderDetails(order);
  const buyerNameAndEmail = `${order.orgCustomer.name}  (${order.orgCustomer.uid})`;
  assertOrderDetailsCard(3, buyerNameAndEmail);
  assertOrderDetailsCard(4, order.orgUnit.name);
}

function assertExistenceOfNoPermissionMessage() {
  cy.get('cx-global-message').should(
    'contain',
    'No sufficient permissions to access this page'
  );
}

function assertCommonFieldsOfOrderDetails(order) {
  const entry = order.entries[0];
  // assert order summary
  cy.get('.cx-summary-card').should('have.length', 3);
  cy.get('.cx-summary-card')
    .eq(0)
    .within(() => {
      cy.get('.cx-card .cx-card-label')
        .first()
        .should('contain', sampleData.ORDER_CODE);
    });

  cy.get('.cx-summary-card')
    .eq(1)
    .within(() => {
      cy.get('.cx-card .cx-card-label')
        .first()
        .should('contain', order.orgCustomer.orgUnit.name);
    });
  cy.get('.cx-summary-card')
    .eq(2)
    .within(() => {
      cy.get('.cx-card .cx-card-label')
        .first()
        .should('contain', order.deliveryAddress.formattedAddress);
    });

  // assert order status
  cy.get('cx-order-details-items .cx-list-status').should(
    'contain',
    sampleData.ORDER_STATUS
  );

  // assert products
  cy.get('.cx-item-list-row .cx-link').should('contain', entry.product.name);
  cy.get('.cx-item-list-row .cx-code').should('contain', entry.product.code);
  cy.get('.cx-item-list-row .cx-price').should(
    'contain',
    entry.basePrice.formattedValue
  );

  cy.get('.cx-item-list-row .cx-total').should(
    'contain',
    entry.totalPrice.formattedValue
  );

  // asserts order details
  assertOrderDetailsCard(0, order.code);
  assertOrderDetailsCard(1, sampleData.ORDER_DATE);
  assertOrderDetailsCard(2, sampleData.ORDER_STATUS);
}

function assertOrderDetailsCard(index: number, value: string) {
  cy.get('cx-unit-level-order-overview cx-card')
    .eq(index)
    .should('contain', value);
}
