import * as cart from '../../helpers/cart';
import * as configuration from '../../helpers/product-configuration';
import * as configurationOverview from '../../helpers/product-configuration-overview';
import * as productSearch from '../../helpers/product-search';
import { formats } from '../../sample-data/viewports';

const testProduct = 'CONF_CAMERA_SL';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';
const configurator = 'CPQCONFIGURATOR';

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
  before(() => {
    cy.visit('/');
  });

  describe.skip('Navigate to Product Configuration Page', () => {
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

  describe.skip('Configure Product', () => {
    it.skip('Image Attribute Types - Single Selection', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isConfigPageDisplayed();
      configuration.isAttributeDisplayed('ROOM_SIZE', 'radioGroup');

      configuration.selectAttribute(
        'COLOUR_HT',
        'single_selection_image',
        'WHITE'
      );

      configuration.isImageSelected(
        'COLOUR_HT',
        'single_selection_image',
        'WHITE'
      );

      configuration.selectAttribute(
        'COLOUR_HT',
        'single_selection_image',
        'TITAN'
      );

      configuration.isImageSelected(
        'COLOUR_HT',
        'single_selection_image',
        'TITAN'
      );
    });

    it('Checkboxes should be still selected after group change', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();
      configuration.isConfigPageDisplayed();
      configuration.isAttributeDisplayed('CAMERA_MODE', 'radioGroup');
      configuration.clickOnNextGroupBtn('CAMERA_PIXELS', 'radioGroup');
      configuration.selectAttribute('CAMERA_SD_CARD', 'checkBoxList', 'SDHC');
      cy.wait(1500);
      configuration.clickOnPreviousGroupBtn('CAMERA_MODE', 'radioGroup');
      configuration.clickOnNextGroupBtn('CAMERA_PIXELS', 'radioGroup');
      configuration.isCheckboxSelected('CAMERA_SD_CARD', 'SDHC');
    });
  });

  describe.skip('Group Status', () => {
    it('should set group status for single level product', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();
      configuration.isGroupMenuDisplayed();

      //is that no status is displayed initially
      configuration.isNoStatusIconDisplayed('Basics');
      configuration.isNoStatusIconDisplayed('Specification');
      configuration.isNoStatusIconDisplayed('Display');
      configuration.isNoStatusIconDisplayed('Lens');
      configuration.isNoStatusIconDisplayed('Options');

      // navigate to Specification, is that Basics status changes to Error
      configuration.clickOnNextGroupBtn('CAMERA_PIXELS', 'radioGroup');
      configuration.isStatusIconDisplayed('Basics', 'ERROR');
      configuration.isNoStatusIconDisplayed('Specification');
      configuration.isNoStatusIconDisplayed('Display');
      configuration.isNoStatusIconDisplayed('Lens');
      configuration.isNoStatusIconDisplayed('Options');

      // navigate to Display, is that Specification status changes to Error
      configuration.clickOnNextGroupBtn('CAMERA_DISPLAY', 'radioGroup');
      configuration.isStatusIconDisplayed('Basics', 'ERROR');
      configuration.isStatusIconDisplayed('Specification', 'ERROR');
      configuration.isNoStatusIconDisplayed('Display');
      configuration.isNoStatusIconDisplayed('Lens');
      configuration.isNoStatusIconDisplayed('Options');

      // complete group Display, navigate back, is status changes to Complete
      configuration.selectAttribute('CAMERA_DISPLAY', 'radioGroup', 'P5');
      cy.wait(1500);

      configuration.clickOnPreviousGroupBtn('CAMERA_PIXELS', 'radioGroup');
      configuration.isStatusIconDisplayed('Basics', 'ERROR');
      configuration.isStatusIconDisplayed('Specification', 'ERROR');
      configuration.isStatusIconDisplayed('Display', 'COMPLETE');
      configuration.isNoStatusIconDisplayed('Lens');
      configuration.isNoStatusIconDisplayed('Options');

      // select mandatory field in group Specification
      // and check wheter status changes to complete
      configuration.selectAttribute(
        'CAMERA_FORMAT_PICTURES',
        'radioGroup',
        'RAW'
      );
      cy.wait(1500);

      configuration.isStatusIconDisplayed('Basics', 'ERROR');
      configuration.isStatusIconDisplayed('Specification', 'COMPLETE');
      configuration.isStatusIconDisplayed('Display', 'COMPLETE');
      configuration.isNoStatusIconDisplayed('Lens');
      configuration.isNoStatusIconDisplayed('Options');
    });

    it('should set group status for multi level product', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isConfigPageDisplayed();
      configuration.isGroupMenuDisplayed();

      // no status should be displayed initially
      configuration.isNoStatusIconDisplayed('General');
      configuration.isNoStatusIconDisplayed('Video System');
      configuration.isNoStatusIconDisplayed('Audio System');
      configuration.isNoStatusIconDisplayed('Source Components');

      // navigate to video system subgroup, no status initially
      configuration.clickOnNextGroupBtn('PROJECTOR_TYPE', 'radioGroup');
      configuration.isNoStatusIconDisplayed('Projector');
      configuration.isNoStatusIconDisplayed('Flat-panel TV');

      // navigate to flat-panel TV, group projector should be completed
      configuration.clickOnNextGroupBtn('FLAT_PANEL_TV', 'radioGroup');
      configuration.isStatusIconDisplayed('Projector', 'COMPLETE');
      configuration.isNoStatusIconDisplayed('Flat-panel TV');

      // navigate back to group projector, status should be completed
      configuration.clickOnPreviousGroupBtn('PROJECTOR_TYPE', 'radioGroup');
      configuration.isStatusIconDisplayed('Projector', 'COMPLETE');
      configuration.isStatusIconDisplayed('Flat-panel TV', 'COMPLETE');

      // navigate back to General, check completed status
      configuration.clickOnPreviousGroupBtn('ROOM_SIZE', 'radioGroup');
      configuration.isStatusIconDisplayed('General', 'COMPLETE');
      configuration.isStatusIconDisplayed('Video System', 'COMPLETE');

      // navigate to Audio System subgroup, is no status is displayed initially
      configuration.clickOnNextGroupBtn('PROJECTOR_TYPE', 'radioGroup');
      configuration.clickOnNextGroupBtn('FLAT_PANEL_TV', 'radioGroup');
      configuration.clickOnNextGroupBtn('SPEAKER_TYPE_FRONT', 'radioGroup');
      configuration.isNoStatusIconDisplayed('Front Speakers');
      configuration.isNoStatusIconDisplayed('Center Speaker');
      configuration.isNoStatusIconDisplayed('Rear Speakers');
      configuration.isNoStatusIconDisplayed('Subwoofer');

      // navigate to Center Speaker
      configuration.clickOnNextGroupBtn('SPEAKER_TYPE', 'radioGroup');
      configuration.isStatusIconDisplayed('Front Speakers', 'COMPLETE');

      // navigate back to Front Speaker, check completed status
      configuration.clickOnPreviousGroupBtn('SPEAKER_TYPE_FRONT', 'radioGroup');
      configuration.isStatusIconDisplayed('Front Speakers', 'COMPLETE');
      configuration.isStatusIconDisplayed('Center Speaker', 'COMPLETE');
      configuration.isNoStatusIconDisplayed('Rear Speakers');
      configuration.isNoStatusIconDisplayed('Subwoofer');

      // navigate back to General group, is that Audio system is not fully completed
      configuration.clickOnPreviousGroupBtn('FLAT_PANEL_TV', 'radioGroup');
      configuration.clickOnPreviousGroupBtn('PROJECTOR_TYPE', 'radioGroup');
      configuration.clickOnPreviousGroupBtn('ROOM_SIZE', 'radioGroup');

      configuration.isStatusIconDisplayed('General', 'COMPLETE');
      configuration.isStatusIconDisplayed('Video System', 'COMPLETE');
      configuration.isNoStatusIconDisplayed('Audio System');
      configuration.isNoStatusIconDisplayed('Source Components');
    });
  });

  describe.skip('Group handling', () => {
    it('should navigate between groups', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();

      configuration.clickOnNextGroupBtn('CAMERA_PIXELS', 'radioGroup');
      configuration.clickOnNextGroupBtn('CAMERA_DISPLAY', 'radioGroup');
      configuration.clickOnPreviousGroupBtn('CAMERA_PIXELS', 'radioGroup');
    });

    it('should check if group buttons are clickable', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();

      configuration.isNextBtnEnabled();
      configuration.isPreviousBtnDisabled();

      configuration.clickOnNextGroupBtn('CAMERA_PIXELS', 'radioGroup');
      configuration.isPreviousBtnEnabled();
      configuration.clickOnNextGroupBtn('CAMERA_DISPLAY', 'radioGroup');
      configuration.clickOnNextGroupBtn(
        'CAMERA_LENS_MANUFACTURER',
        'radioGroup'
      );
      configuration.clickOnNextGroupBtn('CAMERA_OPTIONS', 'checkBoxList');
      configuration.isNextBtnDisabled();
    });

    it('should navigate using the group menu', () => {
      goToPDPage(testProduct);
      configuration.isCategoryNavigationDisplayed();

      configuration.clickOnConfigureBtn();
      configuration.isConfigPageDisplayed();
      configuration.isCategoryNavigationNotDisplayed();
      configuration.isGroupMenuDisplayed();
      configuration.isAttributeDisplayed('CAMERA_MODE', 'radioGroup');

      configuration.clickOnGroup(2);
      configuration.isAttributeDisplayed('CAMERA_DISPLAY', 'radioGroup');
      configuration.clickOnGroup(1);
      configuration.isAttributeDisplayed('CAMERA_PIXELS', 'radioGroup');
    });

    //TODO: this test should be moved to integration/mobile/product-configuration folder
    it('should navigate using the group menu in mobile resolution', () => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
      goToConfigPage(configurator, testProduct);
      configuration.isConfigPageDisplayed();
      configuration.isGroupMenuNotDisplayed();
      configuration.isHamburgerDisplayed();
      configuration.isAttributeDisplayed('CAMERA_MODE', 'radioGroup');

      configuration.clickHamburger();
      configuration.isGroupMenuDisplayed();

      configuration.clickOnGroup(2);
      configuration.isAttributeDisplayed('CAMERA_DISPLAY', 'radioGroup');
    });

    it('should navigate using the previous and next button for multi level product', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isConfigPageDisplayed();

      configuration.clickOnNextGroupBtn('PROJECTOR_TYPE', 'radioGroup');
      configuration.clickOnNextGroupBtn('FLAT_PANEL_TV', 'radioGroup');
      configuration.clickOnPreviousGroupBtn('PROJECTOR_TYPE', 'radioGroup');
    });

    it.skip('should navigate using the group menu for multi level product', () => {
      goToConfigPage(configurator, testProductMultiLevel);
      configuration.isConfigPageDisplayed();

      configuration.clickOnGroup(2);
      configuration.isAttributeDisplayed('CPQ_HT_RECV_MODEL2', 'dropdown');
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
