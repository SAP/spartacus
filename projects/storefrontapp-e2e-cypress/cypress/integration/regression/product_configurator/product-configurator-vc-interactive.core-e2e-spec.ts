import { ConfiguratorUISettingsConfig } from '@spartacus/product-configurator/rulebased';
import * as configuration from '../../../helpers/product-configurator';
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
const COLOUR_HT = 'COLOUR_HT';
const CAMERA_PIXELS = 'CAMERA_PIXELS';
const CAMERA_DISPLAY = 'CAMERA_DISPLAY';
const CAMERA_MODE = 'CAMERA_MODE';
const CAMERA_SD_CARD = 'CAMERA_SD_CARD';
const ROOM_SIZE = 'ROOM_SIZE';
const CAMERA_FORMAT_PICTURES = 'CAMERA_FORMAT_PICTURES';
const SPEAKER_TYPE_FRONT = 'SPEAKER_TYPE_FRONT';

// List of attribute values
const WHITE = 'COLOUR_HT_WHITE';
const TITAN = 'COLOUR_HT_TITAN';
const SDHC = 'SDHC';
const JPEG = 'JPEG';
const P5 = 'P5';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      configuration.searchForProduct(testProduct);
      configurationVc.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the product details page', () => {
      configurationVc.goToPDPage(electronicsShop, testProduct);
      configurationVc.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the overview page', () => {
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
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.checkAttributeDisplayed(ROOM_SIZE, radioGroup);
      configuration.selectAttribute(COLOUR_HT, single_selection_image, WHITE);
      configurationVc.checkImageSelected(
        single_selection_image,
        COLOUR_HT,
        WHITE
      );
      configuration.selectAttribute(COLOUR_HT, single_selection_image, TITAN);
      configurationVc.checkImageSelected(
        single_selection_image,
        COLOUR_HT,
        TITAN
      );
    });

    it('should keep checkboxes selected after group change', () => {
      cy.intercept({
        method: 'PATCH',
        pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/ccpconfigurator/*`,
      }).as('updateConfig');
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.selectAttribute(CAMERA_SD_CARD, checkBoxList, SDHC);
      cy.wait('@updateConfig');
      configuration.clickOnPreviousBtn(BASICS);
      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.checkValueSelected(checkBoxList, CAMERA_SD_CARD, SDHC);
    });
  });

  describe('Group Status', () => {
    it('should set group status for single level product', () => {
      cy.intercept({
        method: 'PATCH',
        pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/ccpconfigurator/*`,
      }).as('updateConfig');
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkGroupMenuDisplayed();

      //is that no status is displayed initially
      configurationVc.checkStatusIconNotDisplayed(BASICS);
      configurationVc.checkStatusIconNotDisplayed(SPECIFICATION);
      configurationVc.checkStatusIconNotDisplayed(DISPLAY);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // navigate to Specification, is that Basics status changes to Error
      configuration.clickOnNextBtn(SPECIFICATION);
      configurationVc.checkStatusIconDisplayed(BASICS, ERROR);
      configurationVc.checkStatusIconNotDisplayed(SPECIFICATION);
      configurationVc.checkStatusIconNotDisplayed(DISPLAY);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // navigate to Display, is that Specification status changes to Error
      configuration.clickOnNextBtn(DISPLAY);
      configurationVc.checkStatusIconDisplayed(BASICS, ERROR);
      configurationVc.checkStatusIconDisplayed(SPECIFICATION, ERROR);
      configurationVc.checkStatusIconNotDisplayed(DISPLAY);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // complete group Display, navigate back, is status changes to Complete
      configuration.selectAttribute(CAMERA_DISPLAY, radioGroup, P5);
      cy.wait('@updateConfig');
      configuration.clickOnPreviousBtn(SPECIFICATION);
      configurationVc.checkStatusIconDisplayed(BASICS, ERROR);
      configurationVc.checkStatusIconDisplayed(SPECIFICATION, ERROR);
      configurationVc.checkStatusIconDisplayed(DISPLAY, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);

      // select mandatory field in group Specification
      // and check whether status changes to complete
      configuration.selectAttribute(CAMERA_FORMAT_PICTURES, radioGroup, JPEG);
      cy.wait('@updateConfig');
      configurationVc.checkStatusIconDisplayed(BASICS, ERROR);
      configurationVc.checkStatusIconDisplayed(SPECIFICATION, COMPLETE);
      configurationVc.checkStatusIconDisplayed(DISPLAY, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(LENS);
      configurationVc.checkStatusIconNotDisplayed(OPTIONS);
    });

    it('should set group status for multi level product', () => {
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
      configuration.clickOnNextBtn(PROJECTOR);
      configurationVc.checkStatusIconNotDisplayed(PROJECTOR);
      configurationVc.checkStatusIconNotDisplayed(FLAT_PANEL);

      // navigate to flat-panel TV, group projector should be completed
      configuration.clickOnNextBtn(FLAT_PANEL);
      configurationVc.checkStatusIconDisplayed(PROJECTOR, COMPLETE);
      configurationVc.checkStatusIconNotDisplayed(FLAT_PANEL);

      // navigate back to group projector, status should be completed
      configuration.clickOnPreviousBtn(PROJECTOR);
      configurationVc.checkStatusIconDisplayed(PROJECTOR, COMPLETE);
      configurationVc.checkStatusIconDisplayed(FLAT_PANEL, COMPLETE);

      // navigate back to General, check completed status
      configuration.clickOnPreviousBtn(GENERAL);
      configurationVc.checkStatusIconDisplayed(GENERAL, COMPLETE);
      configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);

      // navigate to Audio System subgroup, is no status is displayed initially
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.clickOnNextBtn(FLAT_PANEL);
      configuration.clickOnNextBtn(FRONT_SPEAKERS);
      configurationVc.checkStatusIconNotDisplayed(FRONT_SPEAKERS);
      configurationVc.checkStatusIconNotDisplayed(CENTER_SPEAKER);
      configurationVc.checkStatusIconNotDisplayed(REAR_SPEAKER);
      configurationVc.checkStatusIconNotDisplayed(SUBWOOFER);

      // navigate to Center Speaker
      configuration.clickOnNextBtn(CENTER_SPEAKER);
      configurationVc.checkStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);

      // navigate back to Front Speaker, check completed status
      configuration.clickOnPreviousBtn(FRONT_SPEAKERS);
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
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.clickOnNextBtn(DISPLAY);
      configuration.clickOnPreviousBtn(SPECIFICATION);
    });

    it('should check if group buttons are clickable', () => {
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkNextBtnEnabled();
      configuration.checkPreviousBtnDisabled();

      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.checkPreviousBtnEnabled();
      configuration.clickOnNextBtn(DISPLAY);
      configuration.clickOnNextBtn(LENS);
      configuration.clickOnNextBtn(OPTIONS);
      configuration.checkNextBtnDisabled();
    });

    it('should navigate using the group menu', () => {
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);

      configurationVc.clickOnGroup(2);
      configuration.checkAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
      configurationVc.clickOnGroup(1);
      configuration.checkAttributeDisplayed(CAMERA_PIXELS, radioGroup);
    });

    it('should navigate using the previous and next button for multi level product', () => {
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.clickOnNextBtn(FLAT_PANEL);
      configuration.clickOnPreviousBtn(PROJECTOR);
    });

    it('should navigate using the group menu for multi level product', () => {
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configurationVc.clickOnGroup(2);
      configuration.checkAttributeDisplayed(SPEAKER_TYPE_FRONT, radioGroup);
    });
  });
});

context('Retract mode for Product Configuration', () => {
  let configUISettings: ConfiguratorUISettingsConfig;

  beforeEach(() => {
    configUISettings = {
      productConfigurator: {
        addRetractOption: true, // enable retract triggered
      },
    };
    cy.cxConfig(configUISettings);
    //Go to the configuration
    configurationVc.goToConfigurationPage(electronicsShop, testProduct);
    // Verify whether attribute is displayed
    configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
  });

  afterEach(() => {
    configUISettings.productConfigurator.addRetractOption = false; // disable retract triggered
  });

  describe('Enable retract mode', () => {
    it('should lead to additional retract value displayed', () => {
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
  });

  describe('Selecting retract mode', () => {
    it('should de-select the currently selected value', () => {
      //Select another value and verify whether a corresponding value is selected
      configuration.selectAttribute(CAMERA_MODE, radioGroup, 'S');
      configuration.checkValueSelected(radioGroup, CAMERA_MODE, 'S');
      configuration.selectAttribute(CAMERA_MODE, radioGroup, 'P');
      configuration.checkValueSelected(radioGroup, CAMERA_MODE, 'P');
      // Select a retract value and verify whether it is selected
      configuration.selectAttribute(
        CAMERA_MODE,
        radioGroup,
        '###RETRACT_VALUE_CODE###'
      );
      configuration.checkValueSelected(
        radioGroup,
        CAMERA_MODE,
        '###RETRACT_VALUE_CODE###'
      );
    });
  });
});
