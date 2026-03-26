/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configuration from '../../../helpers/product-configurator';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as configurationOverviewVc from '../../../helpers/product-configurator-overview-vc';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import * as common from '../../../helpers/common';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';

// UI types
const radioGroup = 'radioGroup';

// Group Status
const ERROR = 'ERROR';
const COMPLETE = 'COMPLETE';

// List of groups
const BASICS = 'Basics';
const SPECIFICATION = 'Specification';
const DISPLAY = 'Display';
const LENS = 'Lens';
const OPTIONS = 'Options';
const GENERAL = 'General';
const VIDEO_SYSTEM = 'Video System';
const AUDIO_SYSTEM = 'Audio System';
const SOURCE_COMPONENTS = 'Source Components';
const PROJECTOR = 'Projector';
const FRONT_SPEAKERS = 'Front Speakers';
const CENTER_SPEAKER = 'Center Speaker';
const REAR_SPEAKER = 'Rear Speakers';
const SUBWOOFER = 'Subwoofer';
const FLAT_PANEL = 'Flat-panel TV';

// List of attributes
const CAMERA_PIXELS = 'CAMERA_PIXELS';
const CAMERA_DISPLAY = 'CAMERA_DISPLAY';
const CAMERA_MODE = 'CAMERA_MODE';
const CAMERA_FORMAT_PICTURES = 'CAMERA_FORMAT_PICTURES';
const SPEAKER_TYPE_FRONT = 'SPEAKER_TYPE_FRONT';

// List of attribute values
const JPEG = 'JPEG';
const P5 = 'P5';

context('Product Configuration', () => {
  const commerceRelease: configurationVc.CommerceRelease = {};

  before(() => {
    configurationVc.checkCommerceRelease(
      electronicsShop,
      testProduct,
      commerceRelease
    );
  });

  beforeEach(() => {
    configurationVc.registerConfigurationRoute();
    configurationVc.registerConfigurationUpdateRoute();
    configurationOverviewVc.registerConfigurationOverviewRoute();
    cy.visit('/');
  });

  describe('Navigate to product configuration page', () => {
    it('should be able to navigate from the product search result', () => {
      clickAllowAllFromBanner();
      configuration.searchForProduct(testProduct);
      configurationVc.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the product details page', () => {
      clickAllowAllFromBanner();
      common.goToPDPage(electronicsShop, testProduct);
      configurationVc.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the add-to-cart dialog by clicking on "Edit Configuration" link', () => {
      clickAllowAllFromBanner();
      common.goToPDPage(electronicsShop, testProduct);
      common.clickOnAddToCartBtnOnPD();
      common.clickOnConfigurationLink();
      configurationVc.checkConfigPageDisplayed();
    });

    it('should be able to navigate from the add-to-cart dialog by clicking on "Resolve Issues" link', () => {
      clickAllowAllFromBanner();
      common.goToPDPage(electronicsShop, testProduct);
      common.clickOnAddToCartBtnOnPD();
      common.clickOnResolveIssuesLink();
      configurationVc.checkConfigPageDisplayed();
    });

    it('should be able to navigate from the overview page', () => {
      clickAllowAllFromBanner();
      configurationOverviewVc.goToConfigOverviewPage(
        electronicsShop,
        testProduct
      );
      configurationOverviewVc.navigateToConfigurationPage();
      configurationVc.checkConfigPageDisplayed();
    });
  });

  describe('Group status', () => {
    it('should set group status for single level product', () => {
      clickAllowAllFromBanner();

      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProduct,
        commerceRelease.isPricingEnabled
      );
      configuration.checkGroupMenuDisplayed();

      //is that no status is displayed initially
      configurationVc.checkStatusIconNotDisplayed(BASICS);
      configurationVc.checkStatusIconNotDisplayed(SPECIFICATION);
      configurationVc.checkStatusIconNotDisplayed(DISPLAY);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // navigate to Specification, is that Basics status changes to Error
      configurationVc.clickOnNextBtnAndWait(
        SPECIFICATION,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconDisplayed(BASICS, ERROR);
      configurationVc.checkStatusIconNotDisplayed(SPECIFICATION);
      configurationVc.checkStatusIconNotDisplayed(DISPLAY);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // navigate to Display, is that Specification status changes to Error
      configurationVc.clickOnNextBtnAndWait(
        DISPLAY,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconDisplayed(BASICS, ERROR);
      configurationVc.checkStatusIconDisplayed(SPECIFICATION, ERROR);
      configurationVc.checkStatusIconNotDisplayed(DISPLAY);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // complete group Display, navigate back, is status changes to Complete
      configurationVc.selectAttributeAndWait(
        CAMERA_DISPLAY,
        radioGroup,
        P5,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnPreviousBtnAndWait(
        SPECIFICATION,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconDisplayed(BASICS, ERROR);
      configurationVc.checkStatusIconDisplayed(SPECIFICATION, ERROR);
      configurationVc.checkStatusIconDisplayed(DISPLAY, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // select mandatory field in group Specification
      // and check whether status changes to complete
      configurationVc.selectAttributeAndWait(
        CAMERA_FORMAT_PICTURES,
        radioGroup,
        JPEG,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconDisplayed(BASICS, ERROR);
      configurationVc.checkStatusIconDisplayed(SPECIFICATION, COMPLETE);
      configurationVc.checkStatusIconDisplayed(DISPLAY, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);
    });

    it('should set group status for multi level product', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel,
        commerceRelease.isPricingEnabled
      );
      configuration.checkGroupMenuDisplayed();

      // no status should be displayed initially
      configurationVc.checkStatusIconNotDisplayed(GENERAL);
      configurationVc.checkStatusIconNotDisplayed(VIDEO_SYSTEM);
      configurationVc.checkStatusIconNotDisplayed(AUDIO_SYSTEM);
      configurationVc.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);

      // navigate to video system subgroup, no status initially
      configurationVc.clickOnNextBtnAndWait(
        PROJECTOR,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconNotDisplayed(PROJECTOR);
      configurationVc.checkStatusIconNotDisplayed(FLAT_PANEL);

      // navigate to flat-panel TV, group projector should be completed
      configurationVc.clickOnNextBtnAndWait(
        FLAT_PANEL,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconDisplayed(PROJECTOR, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(FLAT_PANEL);

      // navigate back to group projector, status should be completed
      configurationVc.clickOnPreviousBtnAndWait(
        PROJECTOR,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconDisplayed(PROJECTOR, COMPLETE);
      configurationVc.checkStatusIconDisplayed(FLAT_PANEL, COMPLETE);

      // navigate back to General, check completed status
      configurationVc.clickOnPreviousBtnAndWait(
        GENERAL,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconDisplayed(GENERAL, COMPLETE);
      configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);

      // navigate to Audio System subgroup, is no status is displayed initially
      configurationVc.clickOnNextBtnAndWait(
        PROJECTOR,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnNextBtnAndWait(
        FLAT_PANEL,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnNextBtnAndWait(
        FRONT_SPEAKERS,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconNotDisplayed(FRONT_SPEAKERS);
      configurationVc.checkStatusIconNotDisplayed(CENTER_SPEAKER);
      configurationVc.checkStatusIconNotDisplayed(REAR_SPEAKER);
      configurationVc.checkStatusIconNotDisplayed(SUBWOOFER);

      // navigate to Center Speaker
      configurationVc.clickOnNextBtnAndWait(
        CENTER_SPEAKER,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);

      // navigate back to Front Speaker, check completed status
      configurationVc.clickOnPreviousBtnAndWait(
        FRONT_SPEAKERS,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);
      configurationVc.checkStatusIconDisplayed(CENTER_SPEAKER, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(REAR_SPEAKER);
      configurationVc.checkStatusIconNotDisplayed(SUBWOOFER);

      // navigate back to General group, is that Audio system is not fully completed
      configurationVc.clickOnPreviousBtnAndWait(
        FLAT_PANEL,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnPreviousBtnAndWait(
        PROJECTOR,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnPreviousBtnAndWait(
        GENERAL,
        commerceRelease.isPricingEnabled
      );

      configurationVc.checkStatusIconDisplayed(GENERAL, COMPLETE);
      configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(AUDIO_SYSTEM);
      configurationVc.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);
    });
  });

  describe('Group handling', () => {
    it('should navigate between groups using the previous and next button', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProduct,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnNextBtnAndWait(
        SPECIFICATION,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnNextBtnAndWait(
        DISPLAY,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnPreviousBtnAndWait(
        SPECIFICATION,
        commerceRelease.isPricingEnabled
      );
    });

    it('should check if group buttons are clickable', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProduct,
        commerceRelease.isPricingEnabled
      );
      configuration.checkNextBtnEnabled();
      configuration.checkPreviousBtnDisabled();

      configurationVc.clickOnNextBtnAndWait(
        SPECIFICATION,
        commerceRelease.isPricingEnabled
      );
      configuration.checkPreviousBtnEnabled();
      configurationVc.clickOnNextBtnAndWait(
        DISPLAY,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnNextBtnAndWait(
        LENS,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnNextBtnAndWait(
        OPTIONS,
        commerceRelease.isPricingEnabled
      );
      configuration.checkNextBtnDisabled();
    });

    it('should navigate using the group menu', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProduct,
        commerceRelease.isPricingEnabled
      );
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);

      configurationVc.clickOnGroupAndWait(2, commerceRelease.isPricingEnabled);
      configuration.checkAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
      configurationVc.clickOnGroupAndWait(1, commerceRelease.isPricingEnabled);
      configuration.checkAttributeDisplayed(CAMERA_PIXELS, radioGroup);
    });

    it('should navigate using the previous and next button for multi level product', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnNextBtnAndWait(
        PROJECTOR,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnNextBtnAndWait(
        FLAT_PANEL,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnPreviousBtnAndWait(
        PROJECTOR,
        commerceRelease.isPricingEnabled
      );
    });

    it('should navigate using the group menu for multi level product', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnGroupAndWait(2, commerceRelease.isPricingEnabled);
      configuration.checkAttributeDisplayed(SPEAKER_TYPE_FRONT, radioGroup);
    });
  });
});
