/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as storeFinder from '../../../helpers/store-finder';

context('Store finder', () => {
  before(() => {
    cy.visit('/store-finder');
  });

  storeFinder.testAllowViewAllStores();
  storeFinder.testAllowViewStoreDetails();
});
