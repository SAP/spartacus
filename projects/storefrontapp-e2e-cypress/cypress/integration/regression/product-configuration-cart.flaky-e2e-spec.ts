import * as cart from '../../helpers/cart';
import * as login from '../../helpers/login';
import * as configurationCommon from '../../helpers/product-configuration';
import * as configurationOverviewCommon from '../../helpers/product-configuration-overview';
import * as configuration from '../../helpers/product-configurator-vc';
import * as configurationOverview from '../../helpers/product-configurator-vc-overview';
import * as productSearch from '../../helpers/product-search';

/**
 * This suite is marked as flaky due to performance (synchronization) issues on
 * https://spartacus-devci767.eastus.cloudapp.azure.com:9002 that we analyze in
 * https://cxjira.sap.com/browse/TIGER-7252
 */

const electronicsShop = 'electronics-spa';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';

// UI types
const radioGroup = 'radioGroup';

// Group Status
const WARNING = 'WARNING';

// List of groups
const GENERAL = 'General';
const VIDEO_SYSTEM = 'Video System';
const SOURCE_COMPONENTS = 'Source Components';
const PROJECTOR = 'Projector';
const PROJECTOR_SCREEN = 'Projection Screen';
const FRONT_SPEAKERS = 'Front Speakers';
const CENTER_SPEAKER = 'Center Speaker';
const REAR_SPEAKER = 'Rear Speakers';
const SUBWOOFER = 'Subwoofer';

// List of attributes
const PROJECTOR_TYPE = 'PROJECTOR_TYPE';
const GAMING_CONSOLE = 'GAMING_CONSOLE';

// List of attribute values
const PROJECTOR_LCD = 'PROJECTOR_LCD';
const GAMING_CONSOLE_YES = 'GAMING_CONSOLE_YES';
const GAMING_CONSOLE_NO = 'GAMING_CONSOLE_NO';

// List of conflict groups
const CONFLICT_FOR_GAMING_CONSOLE = 'Conflict for Gaming Console';

// Conflict message
const Conflict_msg_gaming_console =
  'Gaming console cannot be selected with LCD projector';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the cart', () => {
      configuration.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.clickAddToCartBtn();
      configuration.goToCart(electronicsShop);
      //We assume only one product is in the cart
      configuration.clickOnEditConfigurationLink(0);
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      cy.server();
      cy.route(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/products/suggestions?term=CONF_HOME_THEATER_ML*`
      ).as('productSearch');
      productSearch.searchForProduct(testProductMultiLevel);
      cy.wait('@productSearch');
      configurationCommon.clickOnAddToCartBtnOnPD();
      configurationCommon.clickOnViewCartBtnOnPD();
      cart.verifyCartNotEmpty();
      configuration.clickOnEditConfigurationLink(0);
    });
  });

  describe('Conflict Solver', () => {
    it('should support the conflict solving process', () => {
      cy.server();
      cy.route(
        'PATCH',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/ccpconfigurator/*`
      ).as('updateConfig');
      configuration.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.selectAttribute(PROJECTOR_TYPE, radioGroup, PROJECTOR_LCD);
      cy.wait('@updateConfig');
      configuration.clickOnPreviousBtn(GENERAL);
      configuration.clickOnGroup(3);

      configuration.selectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_YES,
        1
      );
      cy.wait('@updateConfig');
      configuration.checkStatusIconDisplayed(SOURCE_COMPONENTS, WARNING);
      configuration.checkStatusIconDisplayed(VIDEO_SYSTEM, WARNING);
      configuration.deselectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_NO
      );
      cy.wait('@updateConfig');
      configuration.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);
      configuration.checkStatusIconNotDisplayed(VIDEO_SYSTEM);
      configuration.selectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_YES,
        1
      );
      cy.wait('@updateConfig');
      configuration.clickOnPreviousBtn(SUBWOOFER);
      configuration.clickOnPreviousBtn(REAR_SPEAKER);
      configuration.clickOnPreviousBtn(CENTER_SPEAKER);
      configuration.clickOnPreviousBtn(FRONT_SPEAKERS);
      configuration.clickOnPreviousBtn(PROJECTOR_SCREEN);
      configuration.clickOnPreviousBtn(PROJECTOR);
      configuration.checkConflictDetectedMsgDisplayed(PROJECTOR_TYPE);
      configuration.clickOnPreviousBtn(GENERAL);
      configuration.clickOnPreviousBtn(CONFLICT_FOR_GAMING_CONSOLE);
      configuration.checkConflictDescriptionDisplayed(
        Conflict_msg_gaming_console
      );
      configuration.clickOnNextBtn(GENERAL);
      configuration.checkStatusIconDisplayed(SOURCE_COMPONENTS, WARNING);
      configuration.checkStatusIconDisplayed(VIDEO_SYSTEM, WARNING);
      configurationOverviewCommon.registerConfigurationOvOCC();
      configuration.clickAddToCartBtn();
      // Navigate to Overview page and verify whether the resolve issues banner is displayed and how many issues are there
      configurationOverview.verifyNotificationBannerOnOP(1);
      // Navigate to cart and verify whether the  the resolve issues banner is displayed and how many issues are there
      configurationOverviewCommon.clickContinueToCartBtnOnOP();
      configuration.verifyNotificationBannerInCart(0, 1);
      // Navigate back to the configuration page
      configuration.clickOnEditConfigurationLink(0);
      // Navigate to Overview page and back to configuration via 'Resolve issues' link
      configuration.clickAddToCartBtn();
      // Click 'Resolve issues' link in the banner and navigate back to the configuration
      configurationOverview.clickOnResolveIssuesLinkOnOP();
      configuration.checkConflictDescriptionDisplayed(
        Conflict_msg_gaming_console
      );
      configuration.clickOnNextBtn(GENERAL);
      // Navigate back to the configuration page and deselect conflicting value
      configuration.clickOnGroup(3);
      configuration.deselectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_NO
      );
      //Click 'Add to cart' and verify whether the resolve issues banner is not displayed anymore
      configurationOverviewCommon.registerConfigurationOvOCC();
      configuration.clickAddToCartBtn();
      configurationOverview.verifyNotificationBannerOnOP();
      // Click 'Continue to cart' and verify whether there is a resolve issues banner in the cart entry list
      configurationOverviewCommon.clickContinueToCartBtnOnOP();
      configuration.verifyNotificationBannerInCart(0);
    });
  });

  describe('Configuration process', () => {
    it('should support the product configuration aspect in product search, cart, checkout and order history', () => {
      login.registerUser();
      login.loginUser();
      productSearch.searchForProduct(testProductMultiLevel);
      configurationCommon.clickOnAddToCartBtnOnPD();
      configurationCommon.clickOnProceedToCheckoutBtnOnPD();
      configurationCommon.checkout();
      configurationCommon.navigateToOrderDetails();
      //don't check the order history aspect because this part is flaky
      //configuration.selectOrderByOrderNumberAlias();
      login.signOutUser();
    });
  });
});
