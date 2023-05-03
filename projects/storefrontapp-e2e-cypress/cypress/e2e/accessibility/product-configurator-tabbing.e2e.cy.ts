/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyTabbingOrder } from '../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig as tabConfig } from '../../helpers/accessibility/tabbing-order.config';
import { clickAllowAllFromBanner } from '../../helpers/anonymous-consents';
import * as configuration from '../../helpers/product-configurator';
import * as configurationOverview from '../../helpers/product-configurator-overview';
import * as configurationVc from '../../helpers/product-configurator-vc';
/**
 * This suite is marked as flaky due to performance (synchronization) issues on
 * https://spartacus-devci767.eastus.cloudapp.azure.com:9002 that we analyze in
 * https://cxjira.sap.com/browse/TIGER-7252
 */

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

const containerSelectorConfigForm = 'main';
const containerSelectorOverviewForm = 'main';

// List of attributes
const CAMERA_MODE = 'CAMERA_MODE';
const CAMERA_COLOR = 'CAMERA_COLOR';
const CAMERA_SD_CARD = 'CAMERA_SD_CARD';
const CAMERA_PIXELS = 'CAMERA_PIXELS';

// attribute types
const RADIO_GROUP = 'radioGroup';
const CHECKBOX_LIST = 'checkBoxList';

// attribute values
const CAMERA_MODE_PROFESSIONAL = 'P';
const CAMERA_COLOR_METALLIC = 'METALLIC';
const CAMERA_SD_CARD_SDXC = 'SDXC';
const CAMERA_PIXELS_P8 = 'P8';

// group names
const SPECIFICATION = 'Specification';

context('Product Configuration', () => {
  const commerceRelease: configurationVc.CommerceRelease = {};
  let configuratorCoreConfig: any;

  before(() => {
    configurationVc.checkCommerceRelease(
      electronicsShop,
      testProduct,
      commerceRelease
    );
  });

  beforeEach(() => {
    configuratorCoreConfig = {
      productConfigurator: {
        enableVariantSearch: false, // disable variant search, so that we are sure not to count the variant component
      },
    };
    cy.cxConfig(configuratorCoreConfig);
    configurationVc.registerConfigurationRoute();
    configurationVc.registerConfigurationUpdateRoute();
    cy.visit('/');
  });

  describe('Product Config Tabbing', () => {
    it('should allow to navigate with tab key', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProduct,
        commerceRelease.isPricingEnabled
      );

      verifyTabbingOrder(
        containerSelectorConfigForm,
        tabConfig.productConfigurationPage
      );

      configurationVc.selectAttributeAndWait(
        CAMERA_MODE,
        RADIO_GROUP,
        CAMERA_MODE_PROFESSIONAL,
        commerceRelease.isPricingEnabled
      );
      configuration.navigateToOverviewPage();
      configurationVc.checkGlobalMessageNotDisplayed();
      configurationOverview.checkConfigOverviewPageDisplayed();
      configurationVc.checkGhostAnimationNotDisplayed();

      verifyTabbingOrder(
        containerSelectorOverviewForm,
        tabConfig.productConfigurationOverview
      );
    });
  });

  describe('Product Config Keep Focus', () => {
    it('should keep focus after selection', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProduct,
        commerceRelease.isPricingEnabled
      );

      configurationVc.selectAttributeAndWait(
        CAMERA_COLOR,
        RADIO_GROUP,
        CAMERA_COLOR_METALLIC,
        commerceRelease.isPricingEnabled
      );

      configuration.checkFocus(
        CAMERA_COLOR,
        RADIO_GROUP,
        CAMERA_COLOR_METALLIC
      );

      configurationVc.clickOnNextBtnAndWait(
        SPECIFICATION,
        commerceRelease.isPricingEnabled
      );
      configuration.checkFocus(CAMERA_PIXELS, RADIO_GROUP, CAMERA_PIXELS_P8);

      configurationVc.selectAttributeAndWait(
        CAMERA_SD_CARD,
        CHECKBOX_LIST,
        CAMERA_SD_CARD_SDXC,
        commerceRelease.isPricingEnabled
      );

      configuration.checkFocus(
        CAMERA_SD_CARD,
        CHECKBOX_LIST,
        CAMERA_SD_CARD_SDXC
      );
    });
  });
});
