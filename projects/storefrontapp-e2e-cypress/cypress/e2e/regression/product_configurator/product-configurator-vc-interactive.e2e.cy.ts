/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configuration from '../../../helpers/product-configurator';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as configurationOverviewVc from '../../../helpers/product-configurator-overview-vc';
import * as configurationVc from '../../../helpers/product-configurator-vc';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';

// UI types
const radioGroup = 'radioGroup';
const single_selection_image = 'single_selection_image';
const checkBoxList = 'checkBoxList';

// Group Status
const ERROR = 'ERROR';
const COMPLETE = 'COMPLETE';
const WARNING = 'WARNING';

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

// List of conflict groups
const CONFLICT_FOR_GAMING_CONSOLE = 'Conflict for Gaming Console';

// List of attributes
const COLOUR_HT = 'COLOUR_HT';
const CAMERA_PIXELS = 'CAMERA_PIXELS';
const CAMERA_DISPLAY = 'CAMERA_DISPLAY';
const CAMERA_MODE = 'CAMERA_MODE';
const CAMERA_SD_CARD = 'CAMERA_SD_CARD';
const ROOM_SIZE = 'ROOM_SIZE';
const CAMERA_FORMAT_PICTURES = 'CAMERA_FORMAT_PICTURES';
const SPEAKER_TYPE_FRONT = 'SPEAKER_TYPE_FRONT';
const PROJECTOR_TYPE = 'PROJECTOR_TYPE';
const GAMING_CONSOLE = 'GAMING_CONSOLE';

// List of attribute values
const WHITE = 'COLOUR_HT_WHITE';
const TITAN = 'COLOUR_HT_TITAN';
const SDHC = 'SDHC';
const JPEG = 'JPEG';
const P5 = 'P5';
const PROJECTOR_LCD = 'PROJECTOR_LCD';
const GAMING_CONSOLE_YES = 'GAMING_CONSOLE_YES';
const GAMING_CONSOLE_NO = 'GAMING_CONSOLE_NO';

// Conflict message
const Conflict_msg_gaming_console =
  'Gaming console cannot be selected with LCD projector';

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

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      clickAllowAllFromBanner();
      configuration.searchForProduct(testProduct);
      configurationVc.clickOnConfigureBtnInCatalog(testProduct);
    });

    it('should be able to navigate from the product details page', () => {
      clickAllowAllFromBanner();
      configurationVc.goToPDPage(electronicsShop, testProduct);
      configurationVc.clickOnConfigureBtnInCatalog(testProduct);
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

  describe('Configure Product', () => {
    it('should support image attribute type - single selection', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.checkAttributeDisplayed(ROOM_SIZE, radioGroup);
      configurationVc.selectAttributeAndWait(
        COLOUR_HT,
        single_selection_image,
        WHITE,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkImageSelected(
        single_selection_image,
        COLOUR_HT,
        WHITE
      );
      configurationVc.selectAttributeAndWait(
        COLOUR_HT,
        single_selection_image,
        TITAN,
        commerceRelease.isPricingEnabled
      );
      configurationVc.checkImageSelected(
        single_selection_image,
        COLOUR_HT,
        TITAN
      );
    });

    it('should keep checkboxes selected after group change', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
      configurationVc.clickOnNextBtnAndWait(SPECIFICATION);
      configurationVc.selectAttributeAndWait(
        CAMERA_SD_CARD,
        checkBoxList,
        SDHC,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnPreviousBtnAndWait(BASICS);
      configurationVc.clickOnNextBtnAndWait(SPECIFICATION);
      configuration.checkValueSelected(checkBoxList, CAMERA_SD_CARD, SDHC);
    });
  });

  describe('Group Status', () => {
    it('should set group status for single level product', () => {
      clickAllowAllFromBanner();

      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkGroupMenuDisplayed();

      //is that no status is displayed initially
      configurationVc.checkStatusIconNotDisplayed(BASICS);
      configurationVc.checkStatusIconNotDisplayed(SPECIFICATION);
      configurationVc.checkStatusIconNotDisplayed(DISPLAY);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // navigate to Specification, is that Basics status changes to Error
      configurationVc.clickOnNextBtnAndWait(SPECIFICATION);
      configurationVc.checkStatusIconDisplayed(BASICS, ERROR);
      configurationVc.checkStatusIconNotDisplayed(SPECIFICATION);
      configurationVc.checkStatusIconNotDisplayed(DISPLAY);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // navigate to Display, is that Specification status changes to Error
      configurationVc.clickOnNextBtnAndWait(DISPLAY);
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
      configurationVc.clickOnPreviousBtnAndWait(SPECIFICATION);
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
        testProductMultiLevel
      );
      configuration.checkGroupMenuDisplayed();

      // no status should be displayed initially
      configurationVc.checkStatusIconNotDisplayed(GENERAL);
      configurationVc.checkStatusIconNotDisplayed(VIDEO_SYSTEM);
      configurationVc.checkStatusIconNotDisplayed(AUDIO_SYSTEM);
      configurationVc.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);

      // navigate to video system subgroup, no status initially
      configurationVc.clickOnNextBtnAndWait(PROJECTOR);
      configurationVc.checkStatusIconNotDisplayed(PROJECTOR);
      configurationVc.checkStatusIconNotDisplayed(FLAT_PANEL);

      // navigate to flat-panel TV, group projector should be completed
      configurationVc.clickOnNextBtnAndWait(FLAT_PANEL);
      configurationVc.checkStatusIconDisplayed(PROJECTOR, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(FLAT_PANEL);

      // navigate back to group projector, status should be completed
      configurationVc.clickOnPreviousBtnAndWait(PROJECTOR);
      configurationVc.checkStatusIconDisplayed(PROJECTOR, COMPLETE);
      configurationVc.checkStatusIconDisplayed(FLAT_PANEL, COMPLETE);

      // navigate back to General, check completed status
      configurationVc.clickOnPreviousBtnAndWait(GENERAL);
      configurationVc.checkStatusIconDisplayed(GENERAL, COMPLETE);
      configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);

      // navigate to Audio System subgroup, is no status is displayed initially
      configurationVc.clickOnNextBtnAndWait(PROJECTOR);
      configurationVc.clickOnNextBtnAndWait(FLAT_PANEL);
      configurationVc.clickOnNextBtnAndWait(FRONT_SPEAKERS);
      configurationVc.checkStatusIconNotDisplayed(FRONT_SPEAKERS);
      configurationVc.checkStatusIconNotDisplayed(CENTER_SPEAKER);
      configurationVc.checkStatusIconNotDisplayed(REAR_SPEAKER);
      configurationVc.checkStatusIconNotDisplayed(SUBWOOFER);

      // navigate to Center Speaker
      configurationVc.clickOnNextBtnAndWait(CENTER_SPEAKER);
      configurationVc.checkStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);

      // navigate back to Front Speaker, check completed status
      configurationVc.clickOnPreviousBtnAndWait(FRONT_SPEAKERS);
      configurationVc.checkStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);
      configurationVc.checkStatusIconDisplayed(CENTER_SPEAKER, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(REAR_SPEAKER);
      configurationVc.checkStatusIconNotDisplayed(SUBWOOFER);

      // navigate back to General group, is that Audio system is not fully completed
      configuration.clickOnPreviousBtn(FLAT_PANEL);
      configuration.clickOnPreviousBtn(PROJECTOR);
      configuration.clickOnPreviousBtn(GENERAL);

      configurationVc.checkStatusIconDisplayed(GENERAL, COMPLETE);
      configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(AUDIO_SYSTEM);
      configurationVc.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);
    });
  });

  describe('Group Handling', () => {
    it('should navigate between groups', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configurationVc.clickOnNextBtnAndWait(SPECIFICATION);
      configurationVc.clickOnNextBtnAndWait(DISPLAY);
      configurationVc.clickOnPreviousBtnAndWait(SPECIFICATION);
    });

    it('should check if group buttons are clickable', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkNextBtnEnabled();
      configuration.checkPreviousBtnDisabled();

      configurationVc.clickOnNextBtnAndWait(SPECIFICATION);
      configuration.checkPreviousBtnEnabled();
      configurationVc.clickOnNextBtnAndWait(DISPLAY);
      configurationVc.clickOnNextBtnAndWait(LENS);
      configurationVc.clickOnNextBtnAndWait(OPTIONS);
      configuration.checkNextBtnDisabled();
    });

    it('should navigate using the group menu', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);

      configurationVc.clickOnGroupAndWait(2);
      configuration.checkAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
      configurationVc.clickOnGroupAndWait(1);
      configuration.checkAttributeDisplayed(CAMERA_PIXELS, radioGroup);
    });

    it('should navigate using the previous and next button for multi level product', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configurationVc.clickOnNextBtnAndWait(PROJECTOR);
      configurationVc.clickOnNextBtnAndWait(FLAT_PANEL);
      configurationVc.clickOnPreviousBtnAndWait(PROJECTOR);
    });

    it('should navigate using the group menu for multi level product', () => {
      clickAllowAllFromBanner();
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configurationVc.clickOnGroupAndWait(2);
      configuration.checkAttributeDisplayed(SPEAKER_TYPE_FRONT, radioGroup);
    });
  });

  describe('Retract mode for Product Configuration', () => {
    let configUISettings: any;

    beforeEach(() => {
      configUISettings = {
        productConfigurator: {
          addRetractOption: true, // enable retract triggered
        },
      };
      cy.cxConfig(configUISettings);
      //Go to the configuration
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      clickAllowAllFromBanner();
      // Verify whether attribute is displayed
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
    });

    afterEach(() => {
      configUISettings.productConfigurator.addRetractOption = false; // disable retract triggered
    });

    it('should lead to additional retract value displayed when enabled', () => {
      // Verify whether all values are displayed including 'No option selected' / a retract value
      configuration.checkAttrValueDisplayed(
        CAMERA_MODE,
        radioGroup,
        '###RETRACT_VALUE_CODE###'
      );
      configuration.checkAttrValueDisplayed(CAMERA_MODE, radioGroup, 'P');
      configuration.checkAttrValueDisplayed(CAMERA_MODE, radioGroup, 'S');
      //Verify whether a retract value is selected as a default value
      configuration.checkValueSelected(
        radioGroup,
        CAMERA_MODE,
        '###RETRACT_VALUE_CODE###'
      );
    });

    it('should de-select the currently selected value when selecting the retract option', () => {
      //Select another value and verify whether a corresponding value is selected
      configurationVc.selectAttributeAndWait(
        CAMERA_MODE,
        radioGroup,
        'S',
        commerceRelease.isPricingEnabled
      );
      configuration.checkValueSelected(radioGroup, CAMERA_MODE, 'S');

      configurationVc.selectAttributeAndWait(
        CAMERA_MODE,
        radioGroup,
        'P',
        commerceRelease.isPricingEnabled
      );
      configuration.checkValueSelected(radioGroup, CAMERA_MODE, 'P');

      // Select a retract value and verify whether it is selected
      configurationVc.selectAttributeAndWait(
        CAMERA_MODE,
        radioGroup,
        '###RETRACT_VALUE_CODE###',
        commerceRelease.isPricingEnabled
      );
      configuration.checkValueSelected(
        radioGroup,
        CAMERA_MODE,
        '###RETRACT_VALUE_CODE###'
      );
    });
  });

  describe('Conflict Solver', () => {
    let configUISettings: any;

    beforeEach(() => {
      configUISettings = {
        productConfigurator: {
          enableNavigationToConflict: true,
        },
      };
      cy.cxConfig(configUISettings);
      cy.visit('/');
    });

    afterEach(() => {
      configUISettings.productConfigurator.enableNavigationToConflict = false;
    });
    it('should support the conflict solving process', () => {
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configurationVc.registerConfigurationUpdateRoute();
      configurationVc.clickOnNextBtnAndWait(PROJECTOR);
      configurationVc.selectAttributeAndWait(
        PROJECTOR_TYPE,
        radioGroup,
        PROJECTOR_LCD,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnPreviousBtnAndWait(GENERAL);
      configurationVc.clickOnGroupAndWait(3);

      configurationVc.selectConflictingValueAndWait(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_YES,
        1,
        commerceRelease.isPricingEnabled
      );

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
      // Only perform this piece if backend allows to bavigate from attribute group to conflict group
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
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configurationVc.registerConfigurationUpdateRoute();
      configurationVc.clickOnNextBtnAndWait(PROJECTOR);
      configurationVc.selectAttributeAndWait(
        PROJECTOR_TYPE,
        radioGroup,
        PROJECTOR_LCD,
        commerceRelease.isPricingEnabled
      );
      configurationVc.clickOnPreviousBtnAndWait(GENERAL);
      configurationVc.clickOnGroupAndWait(3);

      configurationVc.selectConflictingValueAndWait(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_YES,
        1,
        commerceRelease.isPricingEnabled
      );
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
