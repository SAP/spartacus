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
const ROOM_SIZE = 'ROOM_SIZE';
const CAMERA_FORMAT_PICTURES = 'CAMERA_FORMAT_PICTURES';

// List of attribute values
const WHITE = 'WHITE';
const TITAN = 'TITAN';
const SDHC = 'SDHC';
const RAW = 'RAW';

function goToConfigPage(configuratorType, product) {
  cy.visit(
    `/electronics-spa/en/USD/configure${configuratorType}/product/entityKey/${product}`
  ).then(() => {
    configuration.isConfigPageDisplayed();
  });
}

function goToConfigOverviewPage(configuratorType, product) {
  cy.visit(
    `/electronics-spa/en/USD/configureOverview${configuratorType}/product/entityKey/${product}`
  ).then(() => {
    configurationOverview.isConfigOverviewPageDisplayed();
  });
}

function goToPDPage(product) {
  cy.visit(`electronics-spa/en/USD/product/${product}/${product}`).then(() => {
    cy.get('.ProductDetailsPageTemplate').should('be.visible');
  });
}

function goToCart() {
  cy.visit('/electronics-spa/en/USD/cart').then(() => {
    cy.get('cx-cart-details').should('be.visible');
  });
}

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      productSearch.searchForProduct(testProduct);
      configuration.clickOnConfigureBtn();
    });

    it('should be able to navigate from the product details page', () => {
      goToPDPage(testProduct);
      configuration.clickOnConfigureBtn();
    });

    it('should be able to navigate from the overview page', () => {
      goToConfigOverviewPage(configurator, testProduct);
      configurationOverview.navigateToConfigurationPage();
      configuration.isConfigPageDisplayed();
    });

    // Failing test
    it('should be able to navigate from the cart', () => {
      goToConfigPage(configurator, testProduct);
      configuration.clickAddToCartBtn();
      goToCart();
      //We assume only one product is in the cart
      configuration.clickOnEditConfigurationLink();
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      goToPDPage(testProduct);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnViewCartBtnOnPD();
      cart.verifyCartNotEmpty();
      configuration.clickOnEditConfigurationLink();
    });
  });

  describe('Configure Product', () => {
    it.skip('Image Attribute Types - Single Selection', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isAttributeDisplayed(ROOM_SIZE, radioGroup);
      configuration.selectAttribute(COLOUR_HT, single_selection_image, WHITE);
      configuration.isImageSelected(COLOUR_HT, single_selection_image, WHITE);
      configuration.selectAttribute(COLOUR_HT, single_selection_image, TITAN);
      configuration.isImageSelected(COLOUR_HT, single_selection_image, TITAN);
    });

    it('Checkboxes should be still selected after group change', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isAttributeDisplayed(CAMERA_MODE, radioGroup);
      configuration.clickOnNextBtn();
      configuration.selectAttribute(CAMERA_SD_CARD, checkBoxList, SDHC);
      configuration.clickOnPreviousBtn();
      configuration.clickOnNextBtn();
      configuration.isCheckboxSelected(CAMERA_SD_CARD, SDHC);
    });
  });

  describe('Group Status', () => {
    it('should set group status for single level product', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isGroupMenuDisplayed();

      //is that no status is displayed initially
      configuration.isStatusIconNotDisplayed(BASICS);
      configuration.isStatusIconNotDisplayed(SPECIFICATION);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // navigate to Specification, is that Basics status changes to Error
      configuration.clickOnNextBtn();
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconNotDisplayed(SPECIFICATION);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // navigate to Display, is that Specification status changes to Error
      configuration.clickOnNextBtn();
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconDisplayed(SPECIFICATION, ERROR);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // complete group Display, navigate back, is status changes to Complete
      configuration.selectAttribute(CAMERA_DISPLAY, radioGroup, 'P5');
      configuration.clickOnPreviousBtn();
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconDisplayed(SPECIFICATION, ERROR);
      configuration.isStatusIconDisplayed(DISPLAY, COMPLETE);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // select mandatory field in group Specification
      // and check whether status changes to complete
      configuration.selectAttribute(CAMERA_FORMAT_PICTURES, radioGroup, RAW);
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconDisplayed(SPECIFICATION, COMPLETE);
      configuration.isStatusIconDisplayed(DISPLAY, COMPLETE);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);
    });

    it('should set group status for multi level product', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isGroupMenuDisplayed();

      // no status should be displayed initially
      configuration.isStatusIconNotDisplayed(GENERAL);
      configuration.isStatusIconNotDisplayed(VIDEO_SYSTEM);
      configuration.isStatusIconNotDisplayed(AUDIO_SYSTEM);
      configuration.isStatusIconNotDisplayed(SOURCE_COMPONENTS);

      // navigate to video system subgroup, no status initially
      configuration.clickOnNextBtn();
      configuration.isStatusIconNotDisplayed(PROJECTOR);
      configuration.isStatusIconNotDisplayed(FLAT_PANEL);

      // navigate to flat-panel TV, group projector should be completed
      configuration.clickOnNextBtn();
      configuration.isStatusIconDisplayed(PROJECTOR, COMPLETE);
      configuration.isStatusIconNotDisplayed(FLAT_PANEL);

      // navigate back to group projector, status should be completed
      configuration.clickOnPreviousBtn();
      configuration.isStatusIconDisplayed(PROJECTOR, COMPLETE);
      configuration.isStatusIconDisplayed(FLAT_PANEL, COMPLETE);

      // navigate back to General, check completed status
      configuration.clickOnPreviousBtn();
      configuration.isStatusIconDisplayed(GENERAL, COMPLETE);
      configuration.isStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);

      // navigate to Audio System subgroup, is no status is displayed initially
      configuration.clickOnNextBtn();
      configuration.clickOnNextBtn();
      configuration.clickOnNextBtn();
      configuration.isStatusIconNotDisplayed(FRONT_SPEAKERS);
      configuration.isStatusIconNotDisplayed(CENTER_SPEAKER);
      configuration.isStatusIconNotDisplayed(REAR_SPEAKER);
      configuration.isStatusIconNotDisplayed(SUBWOOFER);

      // navigate to Center Speaker
      configuration.clickOnNextBtn();
      configuration.isStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);

      // navigate back to Front Speaker, check completed status
      configuration.clickOnPreviousBtn();
      configuration.isStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);
      configuration.isStatusIconDisplayed(CENTER_SPEAKER, COMPLETE);
      configuration.isStatusIconNotDisplayed(REAR_SPEAKER);
      configuration.isStatusIconNotDisplayed(SUBWOOFER);

      // navigate back to General group, is that Audio system is not fully completed
      configuration.clickOnPreviousBtn();
      configuration.clickOnPreviousBtn();
      configuration.clickOnPreviousBtn();

      configuration.isStatusIconDisplayed(GENERAL, COMPLETE);
      configuration.isStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);
      configuration.isStatusIconNotDisplayed(AUDIO_SYSTEM);
      configuration.isStatusIconNotDisplayed(SOURCE_COMPONENTS);
    });

    it('should keep group status information when adding product to the cart', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isGroupMenuDisplayed();

      //is that no status is displayed initially
      configuration.isStatusIconNotDisplayed(BASICS);
      configuration.isStatusIconNotDisplayed(SPECIFICATION);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // navigate to Specification, is that Basics status changes to Error
      configuration.clickOnNextBtn();
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconNotDisplayed(SPECIFICATION);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // navigate to Display, is that Specification status changes to Error
      configuration.clickOnNextBtn();
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconDisplayed(SPECIFICATION, ERROR);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      configuration.clickAddToCartBtn();
      configurationOverview.continueToCart();

      //We assume only one product is in the cart
      configuration.clickOnEditConfigurationLink();

      configuration.isGroupMenuDisplayed();

      //The group status information should be still available for the cart configuration
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconDisplayed(SPECIFICATION, ERROR);
      configuration.isStatusIconDisplayed(DISPLAY, ERROR);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);
    });
  });

  describe('Group handling', () => {
    it('should navigate between groups', () => {
      goToConfigPage(configurator, testProduct);
      configuration.clickOnNextBtn();
      configuration.clickOnNextBtn();
      configuration.clickOnPreviousBtn();
    });

    it('should check if group buttons are clickable', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isNextBtnEnabled();
      configuration.isPreviousBtnDisabled();

      configuration.clickOnNextBtn();
      configuration.isPreviousBtnEnabled();
      configuration.clickOnNextBtn();
      configuration.clickOnNextBtn();
      configuration.clickOnNextBtn();
      configuration.isNextBtnDisabled();
    });

    it('should navigate using the group menu', () => {
      goToPDPage(testProduct);
      configuration.isCategoryNavigationDisplayed();

      configuration.clickOnConfigureBtn();
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
      configuration.clickOnNextBtn();
      configuration.clickOnNextBtn();
      configuration.clickOnPreviousBtn();
    });

    it.skip('should navigate using the group menu for multi level product', () => {
      goToConfigPage(configurator, testProductMultiLevel);
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
