/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as configuration from '../../../helpers/product-configurator';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

// UI types
const radioGroup = 'radioGroup';

const CAMERA_DISPLAY = 'CAMERA_DISPLAY';
const CAMERA_MODE = 'CAMERA_MODE';

viewportContext(['mobile'], () => {
  describe('Group Handling', () => {
    beforeEach(() => {
      clearAllStorage();
    });

    beforeEach(() => {
      configurationVc.registerConfigurationRoute();
      cy.visit('/');
      clickAllowAllFromBanner();
    });

    it('should navigate using the group menu in mobile resolution', () => {
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkHamburgerDisplayed();
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);

      configuration.clickHamburger();
      configuration.checkGroupMenuDisplayed();

      configurationVc.clickOnGroupAndWait(2);
      configuration.checkAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
    });
  });
});
