/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { configureProductWithVariants } from '../../../helpers/variants/apparel-checkout-flow';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('Variants Accessibility test', { testIsolation: false }, () => {
  isolateTestsBefore();
  before(() => {
    configureProductWithVariants();
    cy.a11yContinuumSetup();
    cy.visit('/p/300785814');
  });
  it('Product Details', () => {
    cy.get(
      'cx-product-variants-container .variant-section'
    ).a11yRunContinuumTest();
  });
});
