/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quickOrder from '../../../helpers/b2b/b2b-quick-order';
import { viewportContext } from '../../../helpers/viewport-context';
import * as sampleData from '../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('B2B - Quick Order', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
    });

    describe('Accessibility - keyboarding', () => {
      it('should conform to tabbing order for quick order page', () => {
        quickOrder.visitQuickOrderPage();
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.verifyInputHasFocus();
        quickOrder.verifyQuickOrderListQuantity(1);
        quickOrder.verifyQuickOrderPageTabbingOrder();
      });

      it('should conform to tabbing order for cart page', () => {
        quickOrder.prepareCartWithProduct();
        quickOrder.verifyCartPageTabbingOrder();
      });
    });
  });
});
