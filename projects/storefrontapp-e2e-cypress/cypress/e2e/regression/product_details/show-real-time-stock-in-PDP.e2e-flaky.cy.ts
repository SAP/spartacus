/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { visitProductPage } from '../../../helpers/coupons/cart-coupon';
import * as sampleData from '../../../sample-data/inventory-display';
import { inventoryDisplayB2C } from '../../../sample-data/inventory-display';

export const stockSelector = 'cx-add-to-cart .info';

export function interceptProductAvailability() {
  cy.intercept('GET', '**/productAvailabilities**').as(
    'getProductAvailability'
  );
  return '@getProductAvailability';
}

export function configureInventoryDisplay(enable) {
  cy.cxConfig({
    cmsComponents: {
      ProductAddToCartComponent: {
        data: {
          inventoryDisplay: enable,
        },
      },
    },
  });
}

export function assertInventoryDisplay(alias, isInventoryDisplayActive) {
  cy.wait(alias).then((xhr) => {
    const body = xhr.response.body;
    expect(body.availabilityItems).to.not.be.undefined;

    const availability = body.availabilityItems[0]?.unitAvailabilities[0];
    const status = availability?.status;
    const stock = availability?.quantity;

    cy.get(stockSelector).then(($ele) => {
      const text = $ele.text().trim();
      if (isInventoryDisplayActive) {
        expect(text).to.equal(
          status === 'OUT_OF_STOCK'
            ? sampleData.stockOutOfStockLabel
            : `${stock} ${sampleData.stockLabel}`
        );
      } else {
        expect(text).to.equal(
          status === 'OUT_OF_STOCK'
            ? sampleData.stockOutOfStockLabel
            : sampleData.stockLabel
        );
      }
    });
  });
}

export function testInventoryDisplay(productCode, isInventoryDisplayActive) {
  const productDetailsAlias = interceptProductAvailability();
  visitProductPage(productCode);
  assertInventoryDisplay(productDetailsAlias, isInventoryDisplayActive);
}

describe('B2C - Real Time Stock Display - Inventory Display - disabled', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    configureInventoryDisplay(false);
  });

  it('should NOT render number of available stock', () => {
    testInventoryDisplay(
      inventoryDisplayB2C.IN_STOCK_WITH_QUANTITY_PRODUCT,
      false
    );
  });
  it('should show out of stock for product not in stock', () => {
    testInventoryDisplay(inventoryDisplayB2C.OUT_OF_STOCK_PRODUCT, false);
  });
});

describe('Inventory Display - active', () => {
  beforeEach(() => {
    configureInventoryDisplay(true);
  });

  it('should render number of available stock', () => {
    testInventoryDisplay(
      inventoryDisplayB2C.IN_STOCK_WITH_QUANTITY_PRODUCT,
      true
    );
  });
  it('should show out of stock for product not in stock', () => {
    testInventoryDisplay(inventoryDisplayB2C.OUT_OF_STOCK_PRODUCT, true);
  });
});
