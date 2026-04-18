/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Currency switch - product-details page', () => {
  const productDetailsPath = siteContextSelector.PRODUCT_PATH_2;
  const jpCurrencyExp: RegExp = /^¥\s*12[,.]750$/;

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('product-details page', () => {
    it('should change currency in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        productDetailsPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + productDetailsPath
      );
    });

    it('should change currency in the page', () => {
      siteContextSelector.siteContextChange(
        productDetailsPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );

      // Workaround for CI backend returning '¥ 12.750' while
      // dev backend returns '¥12,750'
      cy.get('cx-product-summary .price')
        .invoke('text')
        .invoke('trim')
        .should('match', jpCurrencyExp);
    });

    it('should change currency in the modal', () => {
      siteContextSelector.siteContextChange(
        productDetailsPath,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );

      // Workaround for CI backend returning '¥ 12.750' while
      // dev backend returns '¥12,750'
      cy.get('cx-add-to-cart button.btn-primary').click();
      cy.get('cx-added-to-cart-dialog .cx-price .cx-value')
        .invoke('text')
        .invoke('trim')
        .should('match', jpCurrencyExp);
    });
  });
});
