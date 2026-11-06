/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configuration from '../../../helpers/product-configurator';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as configurationOverviewVc from '../../../helpers/product-configurator-overview-vc';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';

// UI types
const radioGroup = 'radioGroup';
const checkBoxList = 'checkBoxList';

// Group Status
const WARNING = 'WARNING';

// List of groups
const BASICS = 'Basics';
const SPECIFICATION = 'Specification';
const GENERAL = 'General';
const VIDEO_SYSTEM = 'Video System';
const SOURCE_COMPONENTS = 'Source Components';
const PROJECTOR = 'Projector';

// List of conflict groups
const CONFLICT_FOR_GAMING_CONSOLE = 'Conflict for Gaming Console';

// List of attributes
const CAMERA_MODE = 'CAMERA_MODE';
const CAMERA_SD_CARD = 'CAMERA_SD_CARD';
const PROJECTOR_TYPE = 'PROJECTOR_TYPE';
const GAMING_CONSOLE = 'GAMING_CONSOLE';

// List of attribute values
const SDHC = 'SDHC';
const PROJECTOR_LCD = 'PROJECTOR_LCD';
const GAMING_CONSOLE_YES = 'GAMING_CONSOLE_YES';
const GAMING_CONSOLE_NO = 'GAMING_CONSOLE_NO';

// Conflict message
const Conflict_msg_gaming_console =
  'Gaming console cannot be selected with LCD projector';

context('Product Configuration', () => {
  viewportContext(['desktop'], () => {
    const commerceRelease: configurationVc.CommerceRelease = {};

    before(() => {
      configurationVc.checkCommerceRelease(
        electronicsShop,
        testProduct,
        commerceRelease
      );
    });

    beforeEach(() => {
      clearAllStorage();
      configurationVc.registerConfigurationRoute();
      configurationVc.registerConfigurationUpdateRoute();
      configurationOverviewVc.registerConfigurationOverviewRoute();
      cy.viewport(1280, 1500);
      cy.visit('/');
      clickAllowAllFromBanner();
    });

    describe('Configure product', () => {
      it('should keep checkboxes selected after group change', () => {
        configurationVc.goToConfigurationPage(
          electronicsShop,
          testProduct,
          commerceRelease.isPricingEnabled
        );
        configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
        configurationVc.clickOnNextBtnAndWait(
          SPECIFICATION,
          commerceRelease.isPricingEnabled
        );
        configurationVc.selectAttributeAndWait(
          CAMERA_SD_CARD,
          checkBoxList,
          SDHC,
          commerceRelease.isPricingEnabled
        );
        configurationVc.clickOnPreviousBtnAndWait(
          BASICS,
          commerceRelease.isPricingEnabled
        );
        configurationVc.clickOnNextBtnAndWait(
          SPECIFICATION,
          commerceRelease.isPricingEnabled
        );
        configuration.checkValueSelected(checkBoxList, CAMERA_SD_CARD, SDHC);
      });
    });

    describe('Conflict solver', () => {
      beforeEach(() => {
        configurationVc.goToConfigurationPage(
          electronicsShop,
          testProductMultiLevel,
          commerceRelease.isPricingEnabled
        );
      });

      function prepareConflict() {
        configurationVc.clickOnNextBtnAndWait(
          PROJECTOR,
          commerceRelease.isPricingEnabled
        );
        configurationVc.selectAttributeAndWait(
          PROJECTOR_TYPE,
          radioGroup,
          PROJECTOR_LCD,
          commerceRelease.isPricingEnabled
        );
        configurationVc.clickOnPreviousBtnAndWait(
          GENERAL,
          commerceRelease.isPricingEnabled
        );
        configurationVc.clickOnGroupAndWait(
          3,
          commerceRelease.isPricingEnabled
        );

        configurationVc.selectConflictingValueAndWait(
          GAMING_CONSOLE,
          radioGroup,
          GAMING_CONSOLE_YES,
          1,
          commerceRelease.isPricingEnabled
        );
      }

      it('should support the conflict solving process', () => {
        prepareConflict();
        configurationVc.checkStatusIconDisplayed(SOURCE_COMPONENTS, WARNING);
        configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, WARNING);
        configurationVc.deselectConflictingValueAndWait(
          GAMING_CONSOLE,
          radioGroup,
          GAMING_CONSOLE_NO,
          commerceRelease.isPricingEnabled
        );

        configurationVc.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);
        configurationVc.checkStatusIconNotDisplayed(VIDEO_SYSTEM);
        configurationVc.selectConflictingValueAndWait(
          GAMING_CONSOLE,
          radioGroup,
          GAMING_CONSOLE_YES,
          1,
          commerceRelease.isPricingEnabled
        );

        // Navigate to a conflict group via clicking on 'Conflict Detected' link

        configurationVc.checkViewInConfigurationLinkDisplayed(GAMING_CONSOLE);
        // Only perform this piece if backend allows to navigate from attribute group to conflict group
        if (commerceRelease.isAtLeast2211) {
          configurationVc.clickOnConflictDetectedAndWait(GAMING_CONSOLE);
          configuration.checkCurrentGroupActive(CONFLICT_FOR_GAMING_CONSOLE);
          configurationVc.checkConflictDescriptionDisplayed(
            Conflict_msg_gaming_console
          );

          // Navigate to a group that contains an attribute which is involved in a conflict via clicking on 'View in Configuration' link
          configurationVc.checkViewInConfigurationLinkDisplayed(GAMING_CONSOLE);
          configurationVc.clickOnViewInConfigurationAndWait(GAMING_CONSOLE);
          configuration.checkCurrentGroupActive(SOURCE_COMPONENTS);
          configuration.checkAttributeDisplayed(GAMING_CONSOLE, radioGroup);

          // finally navigate to overview page and check conflict behavior on it
          configurationVc.clickAddToCartBtn();
          configurationOverviewVc.verifyNotificationBannerOnOP(0, 1); // 0 issues, 1 conflict
          configurationOverviewVc.clickOnResolveConflictsLinkOnOP();
          configuration.checkCurrentGroupActive(CONFLICT_FOR_GAMING_CONSOLE);
          configurationVc.checkConflictDescriptionDisplayed(
            Conflict_msg_gaming_console
          );
        }
      });

      it('should display a success message on conflict resolution (CXSPA-2374)', () => {
        prepareConflict();
        configurationVc.checkGlobalMessageNotDisplayed();
        configurationVc.deselectConflictingValueAndWait(
          GAMING_CONSOLE,
          radioGroup,
          GAMING_CONSOLE_NO,
          commerceRelease.isPricingEnabled
        );
        configurationVc.checkGlobalMessageContains(
          `Conflicts have been resolved`
        );
      });
    });
  });
});
