import * as cart from '../../helpers/cart';
import * as configuration from '../../helpers/product-configuration';
import * as configurationOverview from '../../helpers/product-configuration-overview';
import * as productSearch from '../../helpers/product-search';
import { formats } from '../../sample-data/viewports';
import * as login from '../../helpers/login';

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
const PROJECTOR_SCREEN = 'Projection Screen';
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
const PROJECTOR_TYPE = 'PROJECTOR_TYPE';
const GAMING_CONSOLE = 'GAMING_CONSOLE';

// List of attribute values
const WHITE = 'WHITE';
const TITAN = 'TITAN';
const SDHC = 'SDHC';
const RAW = 'RAW';
const PROJECTOR_LCD = 'PROJECTOR_LCD';
const P5 = 'P5';
const GAMING_CONSOLE_YES = 'GAMING_CONSOLE_YES';
const GAMING_CONSOLE_NO = 'GAMING_CONSOLE_NO';

// List of conflict groups
const CONFLICT_FOR_GAMING_CONSOLE = 'Conflict for Gaming Console';

// Conflict message
const Conflict_msg_gaming_console =
  'Gaming console cannot be selected with LCD projector';

function goToPDPage(product) {
  const location = `electronics-spa/en/USD/product/${product}/${product}`;
  cy.visit(location).then(() => {
    cy.location('pathname').should('contain', location);
    cy.get('.ProductDetailsPageTemplate').should('be.visible');
  });
}

function goToCart() {
  const location = '/electronics-spa/en/USD/cart';
  cy.visit('/electronics-spa/en/USD/cart').then(() => {
    cy.location('pathname').should('contain', location);
    cy.get('h1').contains('Your Shopping Cart').should('be.visible');
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
      configuration.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the product details page', () => {
      goToPDPage(testProduct);
      configuration.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the overview page', () => {
      configurationOverview.goToConfigOverviewPage(configurator, testProduct);
      configurationOverview.navigateToConfigurationPage();
      configuration.isConfigPageDisplayed();
    });

    // Failing test
    it('should be able to navigate from the cart', () => {
      configuration.goToConfigurationPage(configurator, testProduct);
      configuration.clickAddToCartBtn();
      goToCart();
      //We assume only one product is in the cart
      configuration.clickOnEditConfigurationLink(0);
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      productSearch.searchForProduct(testProduct);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnViewCartBtnOnPD();
      cart.verifyCartNotEmpty();
      configuration.clickOnEditConfigurationLink(0);
    });
  });

  describe('Configure Product', () => {
    it.skip('Image Attribute Types - Single Selection', () => {
      configuration.goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.isAttributeDisplayed(ROOM_SIZE, radioGroup);
      configuration.selectAttribute(COLOUR_HT, single_selection_image, WHITE);
      configuration.isImageSelected(COLOUR_HT, single_selection_image, WHITE);
      configuration.selectAttribute(COLOUR_HT, single_selection_image, TITAN);
      configuration.isImageSelected(COLOUR_HT, single_selection_image, TITAN);
    });

    it('Checkboxes should be still selected after group change', () => {
      configuration.goToConfigurationPage(configurator, testProduct);
      configuration.isAttributeDisplayed(CAMERA_MODE, radioGroup);
      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.selectAttribute(CAMERA_SD_CARD, checkBoxList, SDHC);
      configuration.clickOnPreviousBtn(BASICS);
      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.isCheckboxSelected(CAMERA_SD_CARD, SDHC);
    });
  });

  describe('Group Status', () => {
    it('should set group status for single level product', () => {
      configuration.goToConfigurationPage(configurator, testProduct);
      configuration.isGroupMenuDisplayed();

      //is that no status is displayed initially
      configuration.isStatusIconNotDisplayed(BASICS);
      configuration.isStatusIconNotDisplayed(SPECIFICATION);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // navigate to Specification, is that Basics status changes to Error
      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconNotDisplayed(SPECIFICATION);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // navigate to Display, is that Specification status changes to Error
      configuration.clickOnNextBtn(DISPLAY);
      configuration.isStatusIconDisplayed(BASICS, ERROR);
      configuration.isStatusIconDisplayed(SPECIFICATION, ERROR);
      configuration.isStatusIconNotDisplayed(DISPLAY);
      configuration.isStatusIconNotDisplayed(LENS);
      configuration.isStatusIconNotDisplayed(OPTIONS);

      // complete group Display, navigate back, is status changes to Complete
      configuration.selectAttribute(CAMERA_DISPLAY, radioGroup, P5);
      configuration.clickOnPreviousBtn(SPECIFICATION);
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
      configuration.goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.isGroupMenuDisplayed();

      // no status should be displayed initially
      configuration.isStatusIconNotDisplayed(GENERAL);
      configuration.isStatusIconNotDisplayed(VIDEO_SYSTEM);
      configuration.isStatusIconNotDisplayed(AUDIO_SYSTEM);
      configuration.isStatusIconNotDisplayed(SOURCE_COMPONENTS);

      // navigate to video system subgroup, no status initially
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.isStatusIconNotDisplayed(PROJECTOR);
      configuration.isStatusIconNotDisplayed(FLAT_PANEL);

      // navigate to flat-panel TV, group projector should be completed
      configuration.clickOnNextBtn(FLAT_PANEL);
      configuration.isStatusIconDisplayed(PROJECTOR, COMPLETE);
      configuration.isStatusIconNotDisplayed(FLAT_PANEL);

      // navigate back to group projector, status should be completed
      configuration.clickOnPreviousBtn(PROJECTOR);
      configuration.isStatusIconDisplayed(PROJECTOR, COMPLETE);
      configuration.isStatusIconDisplayed(FLAT_PANEL, COMPLETE);

      // navigate back to General, check completed status
      configuration.clickOnPreviousBtn(GENERAL);
      configuration.isStatusIconDisplayed(GENERAL, COMPLETE);
      configuration.isStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);

      // navigate to Audio System subgroup, is no status is displayed initially
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.clickOnNextBtn(FLAT_PANEL);
      configuration.clickOnNextBtn(FRONT_SPEAKERS);
      configuration.isStatusIconNotDisplayed(FRONT_SPEAKERS);
      configuration.isStatusIconNotDisplayed(CENTER_SPEAKER);
      configuration.isStatusIconNotDisplayed(REAR_SPEAKER);
      configuration.isStatusIconNotDisplayed(SUBWOOFER);

      // navigate to Center Speaker
      configuration.clickOnNextBtn(CENTER_SPEAKER);
      configuration.isStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);

      // navigate back to Front Speaker, check completed status
      configuration.clickOnPreviousBtn(FRONT_SPEAKERS);
      configuration.isStatusIconDisplayed(FRONT_SPEAKERS, COMPLETE);
      configuration.isStatusIconDisplayed(CENTER_SPEAKER, COMPLETE);
      configuration.isStatusIconNotDisplayed(REAR_SPEAKER);
      configuration.isStatusIconNotDisplayed(SUBWOOFER);

      // navigate back to General group, is that Audio system is not fully completed
      configuration.clickOnPreviousBtn(FLAT_PANEL);
      configuration.clickOnPreviousBtn(PROJECTOR);
      configuration.clickOnPreviousBtn(GENERAL);

      configuration.isStatusIconDisplayed(GENERAL, COMPLETE);
      configuration.isStatusIconDisplayed(VIDEO_SYSTEM, COMPLETE);
      configuration.isStatusIconNotDisplayed(AUDIO_SYSTEM);
      configuration.isStatusIconNotDisplayed(SOURCE_COMPONENTS);
    });
  });

  describe('Group Handling', () => {
    it('should navigate between groups', () => {
      configuration.goToConfigurationPage(configurator, testProduct);
      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.clickOnNextBtn(DISPLAY);
      configuration.clickOnPreviousBtn(SPECIFICATION);
    });

    it('should check if group buttons are clickable', () => {
      configuration.goToConfigurationPage(configurator, testProduct);
      configuration.isNextBtnEnabled();
      configuration.isPreviousBtnDisabled();

      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.isPreviousBtnEnabled();
      configuration.clickOnNextBtn(DISPLAY);
      configuration.clickOnNextBtn(LENS);
      configuration.clickOnNextBtn(OPTIONS);
      configuration.isNextBtnDisabled();
    });

    it('should navigate using the group menu', () => {
      configuration.goToConfigurationPage(configurator, testProduct);
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
      configuration.goToConfigurationPage(configurator, testProduct);
      configuration.isHamburgerDisplayed();
      configuration.isAttributeDisplayed(CAMERA_MODE, radioGroup);

      configuration.clickHamburger();
      configuration.isGroupMenuDisplayed();

      configuration.clickOnGroup(2);
      configuration.isAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
    });

    it('should navigate using the previous and next button for multi level product', () => {
      configuration.goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.clickOnNextBtn(FLAT_PANEL);
      configuration.clickOnPreviousBtn(PROJECTOR);
    });

    it.skip('should navigate using the group menu for multi level product', () => {
      configuration.goToConfigurationPage(configurator, testProductMultiLevel);
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
      configuration.navigateToOrderDetails();
      configuration.goToOrderHistory();
      configuration.selectOrderByOrderNumberAlias();
      login.signOutUser();
    });
  });

  describe('Conflict Solver', () => {
    it('Run through the conflict solving process', () => {
      configuration.goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.selectAttribute(PROJECTOR_TYPE, radioGroup, PROJECTOR_LCD);
      configuration.clickOnPreviousBtn(GENERAL);
      configuration.clickOnGroup(3);

      configuration.selectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_YES,
        1
      );

      configuration.deselectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_NO
      );

      configuration.selectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_YES,
        1
      );

      configuration.clickOnPreviousBtn(SUBWOOFER);
      configuration.clickOnPreviousBtn(REAR_SPEAKER);
      configuration.clickOnPreviousBtn(CENTER_SPEAKER);
      configuration.clickOnPreviousBtn(FRONT_SPEAKERS);
      configuration.clickOnPreviousBtn(PROJECTOR_SCREEN);
      configuration.clickOnPreviousBtn(PROJECTOR);
      configuration.isConflictDetectedMsgDisplayed(PROJECTOR_TYPE);
      configuration.clickOnPreviousBtn(GENERAL);
      configuration.clickOnPreviousBtn(CONFLICT_FOR_GAMING_CONSOLE);
      configuration.isConflictDescriptionDisplayed(Conflict_msg_gaming_console);

      // Navigate to Overview page and verify whether the resolve issues banner is displayed and how many issues are there
      configuration.clickAddToCartBtn();
      // *** Functionally works, but not for multilevel product. Waiting for fix im CORE ***
      //configurationOverview.verifyNotificationBannerOnOP(1);

      // Navigate to cart and verify whether the  the resolve issues banner is displayed and how many issues are there
      configurationOverview.clickContinueToCartBtnOnOP();
      // *** Functionally works, but not for multilevel product. Waiting for fix im CORE ***
      //configuration.verifyNotificationBannerInCart(0,1);
      // Navigate back to the configuration page
      configuration.clickOnEditConfigurationLink(0);
      // Navigate to Overview page and back to configuration via 'Resolve issues' link
      configuration.clickAddToCartBtn();
      // Click 'Resolve issues' link in the banner and navigate back to the configuration
      // *** Functionally works, but not for multilevel product. Waiting for fix im CORE ***
      //configurationOverview.clickOnResolveIssuesLinkOnOP();

      // Navigate back to the configuration page and deselect conflicting value
      //configuration.clickOnGroup(3);
      //configuration.deselectConflictingValue(GAMING_CONSOLE, radioGroup, GAMING_CONSOLE_NO);

      //Click 'Add to cart' and verify whether the resolve issues banner is not displayed anymore
      //configuration.clickAddToCartBtn();
      // *** Functionally works, but not for multilevel product. Waiting for fix im CORE ***
      //configurationOverview.verifyNotificationBannerOnOP();

      // Click 'Continue to cart' and verify whether there is a resolve issues banner in the cart entry list
      //configurationOverview.clickContinueToCartBtnOnOP();
      // *** Functionally works, but not for multilevel product. Waiting for fix im CORE ***
      //configuration.verifyNotificationBannerInCart(0);
    });
  });
});
