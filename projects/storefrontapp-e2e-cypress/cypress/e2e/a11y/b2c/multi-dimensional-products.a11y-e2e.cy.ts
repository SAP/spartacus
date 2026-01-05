/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { multiDBaseProduct } from '../../../sample-data/multi-dimensional-flow';

describe('Multi Dimensional Products Accessibility', () => {
  before(() => {
    cy.a11yContinuumSetup();
    cy.visit(`product/${multiDBaseProduct.code}`);
  });

  it('Multi Dimensional Product', () => {
    cy.get(
      'cx-product-multi-dimensional-selector .variant-generic-selector'
    ).a11yRunContinuumTest();
  });
});
