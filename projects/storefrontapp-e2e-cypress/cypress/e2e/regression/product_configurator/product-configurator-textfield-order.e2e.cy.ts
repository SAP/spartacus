/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configuration from '../../../helpers/product-configurator';

const testProduct = '1934793';

/**
 * Requires commerce core 22.05
 */
context('Textfield Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Configuration process', () => {
    it('should support configuration aspect in product search, cart, checkout and order history', () => {
      configuration.completeOrderProcess(testProduct);
    });
  });
});
