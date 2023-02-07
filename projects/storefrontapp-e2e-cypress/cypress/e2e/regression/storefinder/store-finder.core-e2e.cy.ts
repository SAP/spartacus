/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as storeFinder from '../../../helpers/store-finder';
import { clearCacheCy12 } from '../../../helpers/utils-cypress12';

context('Store finder', { testIsolation: false }, () => {
  clearCacheCy12();
  before(() => {
    cy.visit('/store-finder');
  });

  storeFinder.testAllowViewAllStores();
  storeFinder.testAllowViewStoreDetails();
});
