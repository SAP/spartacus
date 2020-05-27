import * as cart from '../../helpers/cart';
import * as configuration from '../../helpers/product-configuration';
import * as configurationOverview from '../../helpers/product-configuration-overview';
import * as productSearch from '../../helpers/product-search';
import { formats } from '../../sample-data/viewports';

const testProduct = 'CONF_CAMERA_SL';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';
const configurator = 'CPQCONFIGURATOR';

function goToConfigurationPage(configurator, testProduct) {
  cy.visit(
    `/electronics-spa/en/USD/configure${configurator}/product/entityKey/${testProduct}`
  );
}

function goToConfigurationOverviewPage(configurator, testProduct) {
  cy.visit(
    `/electronics-spa/en/USD/configureOverview${configurator}/product/entityKey/${testProduct}`
  );
}

function goToProductDetailsPage(testProduct) {
  cy.visit(`electronics-spa/en/USD/product/${testProduct}/${testProduct}`);
}

function goToCart() {
  cy.visit('/electronics-spa/en/USD/cart');
}

context('Product Configuration', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      productSearch.searchForProduct(testProduct);
      configuration.clickOnConfigureButton();
      configuration.verifyConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the product details page', () => {
      goToProductDetailsPage(testProduct);
      configuration.clickOnConfigureButton();
      configuration.verifyConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the overview page', () => {
      goToConfigurationOverviewPage(configurator, testProduct);
      configurationOverview.verifyConfigurationOverviewPageIsDisplayed();
      configurationOverview.navigateToConfigurationPage();
      configuration.verifyConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the cart', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.clickAddToCartButton();
      configuration.verifyOverviewPageIsDisplayed();
      cy.wait(1500);
      goToCart();
      cy.wait(1500);
      //We assume only one product is in the cart
      configuration.clickOnConfigureCartEntryButton();
      configuration.verifyConfigurationPageIsDisplayed();
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      goToProductDetailsPage(testProduct);
      configuration.clickOnAddToCartButtonOnProductDetails();
      configuration.clickOnViewCartButtonOnProductDetails();
      cart.verifyCartNotEmpty();
      configuration.clickOnConfigureCartEntryButton();
      configuration.verifyConfigurationPageIsDisplayed();
    });
  });

  describe('Configure Product', () => {
    it.skip('Image Attribute Types - Single Selection', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyAttributeIsDisplayed('ROOM_SIZE', 'radioGroup');

      configuration.selectAttribute(
        'COLOUR_HT',
        'single_selection_image',
        'WHITE'
      );

      configuration.verifyImageIsSelected(
        'COLOUR_HT',
        'single_selection_image',
        'WHITE'
      );

      configuration.selectAttribute(
        'COLOUR_HT',
        'single_selection_image',
        'TITAN'
      );

      configuration.verifyImageIsSelected(
        'COLOUR_HT',
        'single_selection_image',
        'TITAN'
      );
    });

    it('Checkboxes should be still selected after group change', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyAttributeIsDisplayed('CAMERA_MODE', 'radioGroup');
      configuration.clickOnNextGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.selectAttribute('CAMERA_SD_CARD', 'checkBoxList', 'SDHC');
      cy.wait(1500);
      configuration.clickOnPreviousGroupButton('CAMERA_MODE', 'radioGroup');
      configuration.clickOnNextGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.verifyCheckboxIsSelected('CAMERA_SD_CARD', 'SDHC');
    });

    it('should set group status for single level product', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyGroupMenuIsDisplayed();

      //verify that no status is displayed initially
      configuration.verifyNoStatusIconDisplayed('Basics');
      configuration.verifyNoStatusIconDisplayed('Specification');
      configuration.verifyNoStatusIconDisplayed('Display');
      configuration.verifyNoStatusIconDisplayed('Lens');
      configuration.verifyNoStatusIconDisplayed('Options');

      // navigate to Specification, verify that Basics status changes to Error
      configuration.clickOnNextGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.verifyStatusIconDisplayed('Basics', 'ERROR');
      configuration.verifyNoStatusIconDisplayed('Specification');
      configuration.verifyNoStatusIconDisplayed('Display');
      configuration.verifyNoStatusIconDisplayed('Lens');
      configuration.verifyNoStatusIconDisplayed('Options');

      // navigate to Display, verify that Specification status changes to Error
      configuration.clickOnNextGroupButton('CAMERA_DISPLAY', 'radioGroup');
      configuration.verifyStatusIconDisplayed('Basics', 'ERROR');
      configuration.verifyStatusIconDisplayed('Specification', 'ERROR');
      configuration.verifyNoStatusIconDisplayed('Display');
      configuration.verifyNoStatusIconDisplayed('Lens');
      configuration.verifyNoStatusIconDisplayed('Options');

      // complete group Display, navigate back, verify status changes to Complete
      configuration.selectAttribute('CAMERA_DISPLAY', 'radioGroup', 'P5');
      cy.wait(1500);

      configuration.clickOnPreviousGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.verifyStatusIconDisplayed('Basics', 'ERROR');
      configuration.verifyStatusIconDisplayed('Specification', 'ERROR');
      configuration.verifyStatusIconDisplayed('Display', 'COMPLETE');
      configuration.verifyNoStatusIconDisplayed('Lens');
      configuration.verifyNoStatusIconDisplayed('Options');

      // select mandatory field in group Specification
      // and check wheter status changes to complete
      configuration.selectAttribute(
        'CAMERA_FORMAT_PICTURES',
        'radioGroup',
        'RAW'
      );
      cy.wait(1500);

      configuration.verifyStatusIconDisplayed('Basics', 'ERROR');
      configuration.verifyStatusIconDisplayed('Specification', 'COMPLETE');
      configuration.verifyStatusIconDisplayed('Display', 'COMPLETE');
      configuration.verifyNoStatusIconDisplayed('Lens');
      configuration.verifyNoStatusIconDisplayed('Options');
    });

    it('should set group status for multi level product', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyGroupMenuIsDisplayed();

      // no status should be displayed initially
      configuration.verifyNoStatusIconDisplayed('General');
      configuration.verifyNoStatusIconDisplayed('Video System');
      configuration.verifyNoStatusIconDisplayed('Audio System');
      configuration.verifyNoStatusIconDisplayed('Source Components');

      // navigate to video system subgroup, no status initially
      configuration.clickOnNextGroupButton('PROJECTOR_TYPE', 'radioGroup');
      configuration.verifyNoStatusIconDisplayed('Projector');
      configuration.verifyNoStatusIconDisplayed('Flat-panel TV');

      // navigate to flat-panel TV, group projector should be completed
      configuration.clickOnNextGroupButton('FLAT_PANEL_TV', 'radioGroup');
      configuration.verifyStatusIconDisplayed('Projector', 'COMPLETE');
      configuration.verifyNoStatusIconDisplayed('Flat-panel TV');

      // navigate back to group projector, status should be completed
      configuration.clickOnPreviousGroupButton('PROJECTOR_TYPE', 'radioGroup');
      configuration.verifyStatusIconDisplayed('Projector', 'COMPLETE');
      configuration.verifyStatusIconDisplayed('Flat-panel TV', 'COMPLETE');

      // navigate back to General, check completed status
      configuration.clickOnPreviousGroupButton('ROOM_SIZE', 'radioGroup');
      configuration.verifyStatusIconDisplayed('General', 'COMPLETE');
      configuration.verifyStatusIconDisplayed('Video System', 'COMPLETE');

      // navigate to Audio System subgroup, verify no status is displayed initially
      configuration.clickOnNextGroupButton('PROJECTOR_TYPE', 'radioGroup');
      configuration.clickOnNextGroupButton('FLAT_PANEL_TV', 'radioGroup');
      configuration.clickOnNextGroupButton('SPEAKER_TYPE_FRONT', 'radioGroup');
      configuration.verifyNoStatusIconDisplayed('Front Speakers');
      configuration.verifyNoStatusIconDisplayed('Center Speaker');
      configuration.verifyNoStatusIconDisplayed('Rear Speakers');
      configuration.verifyNoStatusIconDisplayed('Subwoofer');

      // navigate to Center Speaker
      configuration.clickOnNextGroupButton('SPEAKER_TYPE', 'radioGroup');
      configuration.verifyStatusIconDisplayed('Front Speakers', 'COMPLETE');

      // navigate back to Front Speaker, check completed status
      configuration.clickOnPreviousGroupButton(
        'SPEAKER_TYPE_FRONT',
        'radioGroup'
      );
      configuration.verifyStatusIconDisplayed('Front Speakers', 'COMPLETE');
      configuration.verifyStatusIconDisplayed('Center Speaker', 'COMPLETE');
      configuration.verifyNoStatusIconDisplayed('Rear Speakers');
      configuration.verifyNoStatusIconDisplayed('Subwoofer');

      // navigate back to General group, verify that Audio system is not fully completed
      configuration.clickOnPreviousGroupButton('FLAT_PANEL_TV', 'radioGroup');
      configuration.clickOnPreviousGroupButton('PROJECTOR_TYPE', 'radioGroup');
      configuration.clickOnPreviousGroupButton('ROOM_SIZE', 'radioGroup');

      configuration.verifyStatusIconDisplayed('General', 'COMPLETE');
      configuration.verifyStatusIconDisplayed('Video System', 'COMPLETE');
      configuration.verifyNoStatusIconDisplayed('Audio System');
      configuration.verifyNoStatusIconDisplayed('Source Components');
    });
  });

  describe.skip('Group handling', () => {
    it('should navigate between groups', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnNextGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.clickOnNextGroupButton('CAMERA_DISPLAY', 'radioGroup');
      configuration.clickOnPreviousGroupButton('CAMERA_PIXELS', 'radioGroup');
    });

    it('should check if group buttons are clickable', () => {
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.verifyNextGroupButtonIsEnabled();
      configuration.verifyPreviousGroupButtonIsDisabled();

      configuration.clickOnNextGroupButton('CAMERA_PIXELS', 'radioGroup');
      configuration.verifyPreviousGroupButtonIsEnabled();
      configuration.clickOnNextGroupButton('CAMERA_DISPLAY', 'radioGroup');
      configuration.clickOnNextGroupButton(
        'CAMERA_LENS_MANUFACTURER',
        'radioGroup'
      );
      configuration.clickOnNextGroupButton('CAMERA_OPTIONS', 'checkBoxList');
      configuration.verifyNextGroupButtonIsDisabled();
    });

    it('should navigate using the group menu', () => {
      goToProductDetailsPage(testProduct);
      configuration.verifyCategoryNavigationIsDisplayed();

      configuration.clickOnConfigureButton();
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyCategoryNavigationIsNotDisplayed();
      configuration.verifyGroupMenuIsDisplayed();
      configuration.verifyAttributeIsDisplayed('CAMERA_MODE', 'radioGroup');

      configuration.clickOnGroup(2);
      configuration.verifyAttributeIsDisplayed('CAMERA_DISPLAY', 'radioGroup');
      configuration.clickOnGroup(1);
      configuration.verifyAttributeIsDisplayed('CAMERA_PIXELS', 'radioGroup');
    });

    //TODO: this test should be moved to integration/mobile/product-configuration folder
    it('should navigate using the group menu in mobile resolution', () => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
      goToConfigurationPage(configurator, testProduct);
      configuration.verifyConfigurationPageIsDisplayed();
      configuration.verifyGroupMenuIsNotDisplayed();
      configuration.verifyHamburgerIsDisplayed();
      configuration.verifyAttributeIsDisplayed('CAMERA_MODE', 'radioGroup');

      configuration.clickHamburger();
      configuration.verifyGroupMenuIsDisplayed();

      configuration.clickOnGroup(2);
      configuration.verifyAttributeIsDisplayed('CAMERA_DISPLAY', 'radioGroup');
    });

    it('should navigate using the previous and next button for multi level product', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnNextGroupButton('PROJECTOR_TYPE', 'radioGroup');
      configuration.clickOnNextGroupButton('FLAT_PANEL_TV', 'radioGroup');
      configuration.clickOnPreviousGroupButton('PROJECTOR_TYPE', 'radioGroup');
    });

    it.skip('should navigate using the group menu for multi level product', () => {
      goToConfigurationPage(configurator, testProductMultiLevel);
      configuration.verifyConfigurationPageIsDisplayed();

      configuration.clickOnGroup(2);
      configuration.verifyAttributeIsDisplayed(
        'CPQ_HT_RECV_MODEL2',
        'dropdown'
      );
    });
  });
});
