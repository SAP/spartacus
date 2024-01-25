/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as importExport from '../../../helpers/cart-import-export';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

export const APPAREL_BASESITE = 'apparel-uk-spa';
export const APPAREL_CURRENCY = 'GBP';

context('Apparel - Cart Import/Export', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
      Cypress.env('BASE_CURRENCY', APPAREL_CURRENCY);
    });

    beforeEach(() => {
      clearAllStorage();
      cy.cxConfig({
        context: {
          baseSite: [APPAREL_BASESITE],
          currency: [APPAREL_CURRENCY],
        },
      });
    });

    importExport.testImportExportWithApparelProducts();
  });
});
