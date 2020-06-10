import * as cart from '../../helpers/cart';
import * as configuration from '../../helpers/product-configuration';
import * as configurationOverview from '../../helpers/product-configuration-overview';
import * as productSearch from '../../helpers/product-search';
import { formats } from '../../sample-data/viewports';

const testProduct = 'CONF_CAMERA_SL';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';
const configurator = 'CPQCONFIGURATOR';

// UI types
const radioGroup = 'radioGroup';
const single_selection_image = 'single_selection_image';
const dropdown = 'dropdown';
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
const PROJECTOR_TYPE = 'PROJECTOR_TYPE';
const FLAT_PANEL_TV = 'FLAT_PANEL_TV';
const ROOM_SIZE = 'ROOM_SIZE';
const SPEAKER_TYPE_FRONT = 'SPEAKER_TYPE_FRONT';
const SPEAKER_TYPE = 'SPEAKER_TYPE';
const CAMERA_LENS_MANUFACTURER = 'CAMERA_LENS_MANUFACTURER';
const CAMERA_OPTIONS = 'CAMERA_OPTIONS';
const CAMERA_FORMAT_PICTURES = 'CAMERA_FORMAT_PICTURES';

// List of attribute values
const WHITE = 'WHITE';
const TITAN = 'TITAN';
const SDHC = 'SDHC';
const RAW = 'RAW';

function goToConfigPage(configurator, testProduct) {
  cy.visit(
    `/electronics-spa/en/USD/configure${configurator}/product/entityKey/${testProduct}`
  );
}

function goToConfigOverviewPage(configurator, testProduct) {
  cy.visit(
    `/electronics-spa/en/USD/configureOverview${configurator}/product/entityKey/${testProduct}`
  );
}

function goToPDPage(testProduct) {
  cy.visit(`electronics-spa/en/USD/product/${testProduct}/${testProduct}`);
}

function goToCart() {
  cy.visit('/electronics-spa/en/USD/cart');
}

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      productSearch.searchForProduct(testProduct);
      configuration.clickOnConfigureBtn();
      configuration.isConfigPageDisplayed();
    });

    it('should be able to navigate from the product details page', () => {
      goToPDPage(testProduct);
      configuration.clickOnConfigureBtn();
      configuration.isConfigPageDisplayed();
    });

    it('should be able to navigate from the overview page', () => {
      goToConfigOverviewPage(configurator, testProduct);
      configurationOverview.isConfigOverviewPageDisplayed();
      configurationOverview.navigateToConfigurationPage();
      configuration.isConfigPageDisplayed();
    });

    it('should be able to navigate from the cart', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();
      configuration.clickAddToCartBtn();
      configuration.isOverviewPageDisplayed();
      cy.wait(1500);
      goToCart();
      cy.wait(1500);
      //We assume only one product is in the cart
      configuration.clickOnConfigureCartEntryBtn();
      configuration.isConfigPageDisplayed();
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      goToPDPage(testProduct);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnViewCartBtnOnPD();
      cart.verifyCartNotEmpty();
      configuration.clickOnConfigureCartEntryBtn();
      configuration.isConfigPageDisplayed();
    });
  });

  describe('Configure Product', () => {
    it.skip('Image Attribute Types - Single Selection', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isConfigPageDisplayed();
      configuration.isAttributeDisplayed(ROOM_SIZE, radioGroup);

      configuration.selectAttribute(COLOUR_HT, single_selection_image, WHITE);

      configuration.isImageSelected(COLOUR_HT, single_selection_image, WHITE);

      configuration.selectAttribute(COLOUR_HT, single_selection_image, TITAN);

      configuration.isImageSelected(COLOUR_HT, single_selection_image, TITAN);
    });

    it('Checkboxes should be still selected after group change', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();
      configuration.isConfigPageDisplayed();
      configuration.isAttributeDisplayed(CAMERA_MODE, radioGroup);
      configuration.clickOnNextBtn(CAMERA_PIXELS, radioGroup);
      configuration.selectAttribute(CAMERA_SD_CARD, checkBoxList, SDHC);
      cy.wait(1500);
      configuration.clickOnPreviousBtn(CAMERA_MODE, radioGroup);
      configuration.clickOnNextBtn(CAMERA_PIXELS, radioGroup);
      configuration.isCheckboxSelected(CAMERA_SD_CARD, SDHC);
    });
  });

  describe('Group Status', () => {
    it('should set group status for single level product', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();
      configuration.isGroupMenuDisplayed();

      //is that no status is displayed initially
      configuration.isStatusIconNotDisplayed(BASICS);
      configuration.isStatusIconNotDisplayed(SPECIFICATION);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // navigate to Specification, is that Basics status changes to Error
      configuration.clickOnNextBtn(CAMERA_PIXELS, radioGroup);
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconNotDisplayed(SPECIFICATION);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // navigate to Display, is that Specification status changes to Error
      configuration.clickOnNextBtn(CAMERA_DISPLAY, radioGroup);
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconDisplayed(SPECIFICATION, ERROR);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // complete group Display, navigate back, is status changes to Complete
      configuration.selectAttribute(CAMERA_DISPLAY, radioGroup, 'P5');
      cy.wait(1500);

      configuration.clickOnPreviousBtn(CAMERA_PIXELS, radioGroup);
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconDisplayed(SPECIFICATION, ERROR);
      configuration.isStatusIconDisplayed(DISPLAY, COMPLETE);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // select mandatory field in group Specification
      // and check wheter status changes to complete
      configuration.selectAttribute(CAMERA_FORMAT_PICTURES, radioGroup, RAW);
      cy.wait(1500);

      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconDisplayed(SPECIFICATION, COMPLETE);
      configuration.isStatusIconDisplayed(DISPLAY, COMPLETE);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);
    });

    it('should set group status for multi level product', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isConfigPageDisplayed();
      configuration.isGroupMenuDisplayed();

      // no status should be displayed initially
      configuration.isStatusIconNotDisplayed(GENERAL);
      configuration.isStatusIconNotDisplayed(VIDEO_SYSTEM);
      configuration.isStatusIconNotDisplayed(AUDIO_SYSTEM);
      configuration.isStatusIconNotDisplayed(SOURCE_COMPONENTS);

      // navigate to video system subgroup, no status initially
      configuration.clickOnNextBtn(PROJECTOR_TYPE, radioGroup);
      configuration.isStatusIconNotDisplayed(PROJECTOR);
      configuration.isStatusIconNotDisplayed(FLAT_PANEL);

      // navigate to flat-panel TV, group projector should be completed
      configuration.clickOnNextBtn(FLAT_PANEL_TV, radioGroup);
      configuration.isStatusIconDisplayed(PROJECTOR, COMPLETE);
      configuration.isStatusIconNotDisplayed(FLAT_PANEL);

      // navigate back to group projector, status should be completed
      configuration.clickOnPreviousBtn(PROJECTOR_TYPE, radioGroup);
      configuration.isStatusIconDisplayed(PROJECTOR, COMPLETE);
      configuration.isStatusIconDisplayed(FLAT_PANEL, COMPLETE);

      // navigate back to General, check completed status
      configuration.clickOnPreviousBtn(ROOM_SIZE, radioGroup);
      configuration.isStatusIconDisplayed(GENERAL, COMPLETE);
      configuration.isStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);

      // navigate to Audio System subgroup, is no status is displayed initially
      configuration.clickOnNextBtn(PROJECTOR_TYPE, radioGroup);
      configuration.clickOnNextBtn(FLAT_PANEL_TV, radioGroup);
      configuration.clickOnNextBtn(SPEAKER_TYPE_FRONT, radioGroup);
      configuration.isStatusIconNotDisplayed(FRONT_SPEAKERS);
      configuration.isStatusIconNotDisplayed(CENTER_SPEAKER);
      configuration.isStatusIconNotDisplayed(REAR_SPEAKER);
      configuration.isStatusIconNotDisplayed(SUBWOOFER);

      // navigate to Center Speaker
      configuration.clickOnNextBtn(SPEAKER_TYPE, radioGroup);
      configuration.isStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);

      // navigate back to Front Speaker, check completed status
      configuration.clickOnPreviousBtn(SPEAKER_TYPE_FRONT, radioGroup);
      configuration.isStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);
      configuration.isStatusIconDisplayed(CENTER_SPEAKER, COMPLETE);
      configuration.isStatusIconNotDisplayed(REAR_SPEAKER);
      configuration.isStatusIconNotDisplayed(SUBWOOFER);

      // navigate back to General group, is that Audio system is not fully completed
      configuration.clickOnPreviousBtn(FLAT_PANEL_TV, radioGroup);
      configuration.clickOnPreviousBtn(PROJECTOR_TYPE, radioGroup);
      configuration.clickOnPreviousBtn(ROOM_SIZE, radioGroup);

      configuration.isStatusIconDisplayed(GENERAL, COMPLETE);
      configuration.isStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);
      configuration.isStatusIconNotDisplayed(AUDIO_SYSTEM);
      configuration.isStatusIconNotDisplayed(SOURCE_COMPONENTS);
    });
  });

  describe('Group handling', () => {
    it('should navigate between groups', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();

      configuration.clickOnNextBtn(CAMERA_PIXELS, radioGroup);
      configuration.clickOnNextBtn(CAMERA_DISPLAY, radioGroup);
      configuration.clickOnPreviousBtn(CAMERA_PIXELS, radioGroup);
    });

    it('should check if group buttons are clickable', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();

      configuration.isNextBtnEnabled();
      configuration.isPreviousBtnDisabled();

      configuration.clickOnNextBtn(CAMERA_PIXELS, radioGroup);
      configuration.isPreviousBtnEnabled();
      configuration.clickOnNextBtn(CAMERA_DISPLAY, radioGroup);
      configuration.clickOnNextBtn(CAMERA_LENS_MANUFACTURER, radioGroup);
      configuration.clickOnNextBtn(CAMERA_OPTIONS, checkBoxList);
      configuration.isNextBtnDisabled();
    });

    it('should navigate using the group menu', () => {
      goToPDPage(testProduct);
      configuration.isCategoryNavigationDisplayed();

      configuration.clickOnConfigureBtn();
      configuration.isConfigPageDisplayed();
      configuration.isCategoryNavigationNotDisplayed();
      configuration.isGroupMenuDisplayed();
      configuration.isAttributeDisplayed(CAMERA_MODE, radioGroup);

      configuration.clickOnGroup(2);
      configuration.isAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
      configuration.clickOnGroup(1);
      configuration.isAttributeDisplayed(CAMERA_PIXELS, radioGroup);
    });

    //TODO: this test should be moved to integration/mobile/product-configuration folder
    it('should navigate using the group menu in mobile resolution', () => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();
      configuration.isGroupMenuNotDisplayed();
      configuration.isHamburgerDisplayed();
      configuration.isAttributeDisplayed(CAMERA_MODE, radioGroup);

      configuration.clickHamburger();
      configuration.isGroupMenuDisplayed();

      configuration.clickOnGroup(2);
      configuration.isAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
    });

    it('should navigate using the previous and next button for multi level product', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isConfigPageDisplayed();

      configuration.clickOnNextBtn(PROJECTOR_TYPE, radioGroup);
      configuration.clickOnNextBtn(FLAT_PANEL_TV, radioGroup);
      configuration.clickOnPreviousBtn(PROJECTOR_TYPE, radioGroup);
    });

    it.skip('should navigate using the group menu for multi level product', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isConfigPageDisplayed();

      configuration.clickOnGroup(2);
      configuration.isAttributeDisplayed('CPQ_HT_RECV_MODEL2', dropdown);
    });
  });

  describe('Order Confirmation and Order History', () => {
    it('Navigation to Overview Page for order confirmation and order history', () => {
      configuration.login();
      productSearch.searchForProduct(testProductMultiLevel);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnProceedToCheckoutBtnOnPD();
      configuration.checkout();
    });
  });
});
