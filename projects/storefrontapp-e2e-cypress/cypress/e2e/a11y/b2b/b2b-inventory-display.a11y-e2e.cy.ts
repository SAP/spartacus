/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { configureInventoryDisplay } from '../../../helpers/inventory-display';
import { inventoryDisplayB2B } from '../../../sample-data/inventory-display';

describe(
  'Inventory display - Access Continuum test',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
      configureInventoryDisplay(true);
    });

    it('Number of products displayed', () => {
      cy.visit(
        `/product/${inventoryDisplayB2B.IN_STOCK_WITH_QUANTITY_PRODUCT}`
      );
      cy.get('#add-to-card-stock-info').a11yRunContinuumTest();
    });

    it('out of stock - message', () => {
      cy.visit(`/product/${inventoryDisplayB2B.OUT_OF_STOCK_PRODUCT}`);
      cy.get('#add-to-card-stock-info').a11yRunContinuumTest();
    });

    it('In stock - message', () => {
      cy.visit(`/product/${inventoryDisplayB2B.FORCE_IN_STOCK_PRODUCT}`);
      cy.get('#add-to-card-stock-info').a11yRunContinuumTest();
    });

    it('Number of products with plus sign', () => {
      cy.visit(`/product/${inventoryDisplayB2B.THRESHOLD_STOCK}`);
      cy.get('#add-to-card-stock-info').a11yRunContinuumTest();
    });
  }
);
