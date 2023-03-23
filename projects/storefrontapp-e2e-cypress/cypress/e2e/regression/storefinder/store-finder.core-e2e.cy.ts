/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as storeFinder from '../../../helpers/store-finder';
import { isolateTests } from '../../../support/utils/test-isolation';

context('Store finder', { testIsolation: false }, () => {
  isolateTests();
  before(() => {
    cy.visit('/store-finder');
  });

  storeFinder.testAllowViewAllStores();
  storeFinder.testAllowViewStoreDetails();
});
