import * as configuration from '../../helpers/product-configurator-vc';
import * as configurationOverview from '../../helpers/product-configurator-vc-overview';
import * as productSearch from '../../helpers/product-search';

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
      cy.server();
      cy.route(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/products/suggestions?term=CONF_CAMERA_SL*`
      ).as('productSearch');
      productSearch.searchForProduct(testProduct);
      cy.wait('@productSearch');
      configuration.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the product details page', () => {
      configuration.goToPDPage(electronicsShop, testProduct);
      configuration.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the overview page', () => {
      configurationOverview.goToConfigOverviewPage(
        electronicsShop,
        testProduct
      );
      configurationOverview.navigateToConfigurationPage();
      configuration.checkConfigPageDisplayed();
    });
  });

  describe('Configure Product', () => {
    it('should support image attribute type - single selection', () => {
      configuration.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.checkAttributeDisplayed(ROOM_SIZE, radioGroup);
      configuration.selectAttribute(COLOUR_HT, single_selection_image, WHITE);
      configuration.checkImageSelected(
        single_selection_image,
        COLOUR_HT,
        WHITE
      );
      configuration.selectAttribute(COLOUR_HT, single_selection_image, TITAN);
      configuration.checkImageSelected(
        single_selection_image,
        COLOUR_HT,
        TITAN
      );
    });

    it('should keep checkboxes selected after group change', () => {
      cy.server();
      cy.route(
        'PATCH',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/ccpconfigurator/*`
      ).as('updateConfig');
      configuration.goToConfigurationPage(electronicsShop, testProduct);
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
      cy.server();
      cy.route(
        'PATCH',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/ccpconfigurator/*`
      ).as('updateConfig');
      configuration.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkGroupMenuDisplayed();

      //is that no status is displayed initially
      configuration.checkStatusIconNotDisplayed(BASICS);
      configuration.checkStatusIconNotDisplayed(SPECIFICATION);
      configuration.checkStatusIconNotDisplayed(DISPLAY);
      configuration.checkStatusIconNotDisplayed(LENS);
      configuration.checkStatusIconNotDisplayed(OPTIONS);

      // navigate to Specification, is that Basics status changes to Error
      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.checkStatusIconDisplayed(BASICS, ERROR);
      configuration.checkStatusIconNotDisplayed(SPECIFICATION);
      configuration.checkStatusIconNotDisplayed(DISPLAY);
      configuration.checkStatusIconNotDisplayed(LENS);
      configuration.checkStatusIconNotDisplayed(OPTIONS);

      // navigate to Display, is that Specification status changes to Error
      configuration.clickOnNextBtn(DISPLAY);
      configuration.checkStatusIconDisplayed(BASICS, ERROR);
      configuration.checkStatusIconDisplayed(SPECIFICATION, ERROR);
      configuration.checkStatusIconNotDisplayed(DISPLAY);
      configuration.checkStatusIconNotDisplayed(LENS);
      configuration.checkStatusIconNotDisplayed(OPTIONS);

      // complete group Display, navigate back, is status changes to Complete
      configuration.selectAttribute(CAMERA_DISPLAY, radioGroup, P5);
      cy.wait('@updateConfig');
      configuration.clickOnPreviousBtn(SPECIFICATION);
      configuration.checkStatusIconDisplayed(BASICS, ERROR);
      configuration.checkStatusIconDisplayed(SPECIFICATION, ERROR);
      configuration.checkStatusIconDisplayed(DISPLAY, COMPLETE);
      configuration.checkStatusIconNotDisplayed(LENS);
      configuration.checkStatusIconNotDisplayed(OPTIONS);

      // select mandatory field in group Specification
      // and check whether status changes to complete
      configuration.selectAttribute(CAMERA_FORMAT_PICTURES, radioGroup, JPEG);
      cy.wait('@updateConfig');
      configuration.checkStatusIconDisplayed(BASICS, ERROR);
      configuration.checkStatusIconDisplayed(SPECIFICATION, COMPLETE);
      configuration.checkStatusIconDisplayed(DISPLAY, COMPLETE);
      configuration.checkStatusIconNotDisplayed(LENS);
      configuration.checkStatusIconNotDisplayed(OPTIONS);
    });

    it('should set group status for multi level product', () => {
      configuration.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.checkGroupMenuDisplayed();

      // no status should be displayed initially
      configuration.checkStatusIconNotDisplayed(GENERAL);
      configuration.checkStatusIconNotDisplayed(VIDEO_SYSTEM);
      configuration.checkStatusIconNotDisplayed(AUDIO_SYSTEM);
      configuration.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);

      // navigate to video system subgroup, no status initially
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.checkStatusIconNotDisplayed(PROJECTOR);
      configuration.checkStatusIconNotDisplayed(FLAT_PANEL);

      // navigate to flat-panel TV, group projector should be completed
      configuration.clickOnNextBtn(FLAT_PANEL);
      configuration.checkStatusIconDisplayed(PROJECTOR, COMPLETE);
      configuration.checkStatusIconNotDisplayed(FLAT_PANEL);

      // navigate back to group projector, status should be completed
      configuration.clickOnPreviousBtn(PROJECTOR);
      configuration.checkStatusIconDisplayed(PROJECTOR, COMPLETE);
      configuration.checkStatusIconDisplayed(FLAT_PANEL, COMPLETE);

      // navigate back to General, check completed status
      configuration.clickOnPreviousBtn(GENERAL);
      configuration.checkStatusIconDisplayed(GENERAL, COMPLETE);
      configuration.checkStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);

      // navigate to Audio System subgroup, is no status is displayed initially
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.clickOnNextBtn(FLAT_PANEL);
      configuration.clickOnNextBtn(FRONT_SPEAKERS);
      configuration.checkStatusIconNotDisplayed(FRONT_SPEAKERS);
      configuration.checkStatusIconNotDisplayed(CENTER_SPEAKER);
      configuration.checkStatusIconNotDisplayed(REAR_SPEAKER);
      configuration.checkStatusIconNotDisplayed(SUBWOOFER);

      // navigate to Center Speaker
      configuration.clickOnNextBtn(CENTER_SPEAKER);
      configuration.checkStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);

      // navigate back to Front Speaker, check completed status
      configuration.clickOnPreviousBtn(FRONT_SPEAKERS);
      configuration.checkStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);
      configuration.checkStatusIconDisplayed(CENTER_SPEAKER, COMPLETE);
      configuration.checkStatusIconNotDisplayed(REAR_SPEAKER);
      configuration.checkStatusIconNotDisplayed(SUBWOOFER);

      // navigate back to General group, is that Audio system is not fully completed
      configuration.clickOnPreviousBtn(FLAT_PANEL);
      configuration.clickOnPreviousBtn(PROJECTOR);
      configuration.clickOnPreviousBtn(GENERAL);

      configuration.checkStatusIconDisplayed(GENERAL, COMPLETE);
      configuration.checkStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);
      configuration.checkStatusIconNotDisplayed(AUDIO_SYSTEM);
      configuration.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);
    });
  });

  describe('Group Handling', () => {
    it('should navigate between groups', () => {
      configuration.goToConfigurationPage(electronicsShop, testProduct);
      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.clickOnNextBtn(DISPLAY);
      configuration.clickOnPreviousBtn(SPECIFICATION);
    });

    it('should check if group buttons are clickable', () => {
      configuration.goToConfigurationPage(electronicsShop, testProduct);
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
      configuration.goToConfigurationPage(electronicsShop, testProduct);
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);

      configuration.clickOnGroup(2);
      configuration.checkAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
      configuration.clickOnGroup(1);
      configuration.checkAttributeDisplayed(CAMERA_PIXELS, radioGroup);
    });

    it('should navigate using the previous and next button for multi level product', () => {
      configuration.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.clickOnNextBtn(FLAT_PANEL);
      configuration.clickOnPreviousBtn(PROJECTOR);
    });

    it('should navigate using the group menu for multi level product', () => {
      configuration.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.clickOnGroup(2);
      configuration.checkAttributeDisplayed(SPEAKER_TYPE_FRONT, radioGroup);
    });
  });
});
