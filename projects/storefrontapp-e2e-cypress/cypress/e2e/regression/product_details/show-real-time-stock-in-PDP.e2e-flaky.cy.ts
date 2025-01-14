/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { visitProductPage } from '../../../helpers/coupons/cart-coupon';
import * as sampleData from '../../../sample-data/inventory-display';
import { FeaturesConfig } from '@spartacus/core';

export const stockSelector = 'cx-add-to-cart .info';

export const GET_PRODUCT_AVAILABILITY_ENDPOINT_ALIAS = 'getProductDetails';

export function interceptProductAvailability(productCode: string) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/apparel-uk-spa/productAvailabilities?filters=${productCode}:ST`
  ).as(GET_PRODUCT_AVAILABILITY_ENDPOINT_ALIAS);

  return GET_PRODUCT_AVAILABILITY_ENDPOINT_ALIAS;
}

export function configureInventoryDisplay(enable: boolean) {
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

export function assertInventoryDisplay(
  productCode: string,
  alias: string,
  functionality: string,
  isInventoryDisplayActive: boolean
) {
  cy.get(`${alias}`).then((xhr) => {
    const body = xhr.response.body;
    const code = body.availabilityItems[0]?.productCode;
    const stock = body.availabilityItems[0]?.unitAvailabilities[0]?.quantity;
    const status = body.availabilityItems[0]?.unitAvailabilities[0]?.status;

    expect(code).to.equal(productCode);

    cy.get(stockSelector).then(($ele) => {
      const text = $ele.text().trim();

      if (isInventoryDisplayActive) {
        // Out of stock
        if (status === 'OUT_OF_STOCK' || functionality === 'OUT_OF_STOCK') {
          expect(text).to.equal(sampleData.stockOutOfStockLabel);
        } else {
          expect(text).to.equal(`${sampleData.stockLabel}`);
        }
      } else {
        if (status === 'OUT_OF_STOCK' || functionality === 'OUT_OF_STOCK') {
          expect(text).to.equal(sampleData.stockOutOfStockLabel);
        } else {
          expect(text).to.equal(`${sampleData.stockLabel}`);
        }
      }
    });
  });
}

export function testInventoryDisplay(
  productCode: string,
  functionality: string = '',
  isInventoryDisplayActive: boolean
) {
  const productDetailsAlias = interceptProductAvailability(productCode);
  visitProductPage(productCode);

  cy.wait(`@${productDetailsAlias}`)
    .its('response.statusCode')
    .should('eq', 200);

  assertInventoryDisplay(
    productCode,
    `@${productDetailsAlias}`,
    functionality,
    isInventoryDisplayActive
  );
}

describe('B2C - Real Time Stock Display - Inventory Display - disabled', () => {
  beforeEach(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    configureInventoryDisplay(false);
  });

  it('should NOT render number of available stock', () => {
    testInventoryDisplay('M_CR_1015', '', false);
  });
});

describe('Inventory Display - active', () => {
  beforeEach(() => {
    configureInventoryDisplay(true);
  });

  it('should render number of available stock', () => {
    cy.cxConfig({
      features: {
        showRealTimeStockInPDP: true,
      },
    } as FeaturesConfig);
    testInventoryDisplay('M_CR_1015', '', true);
  });
});
