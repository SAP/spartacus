import * as cart from '../../helpers/cart';
import * as configuration from '../../helpers/product-configurator';
import * as configurationOverview from '../../helpers/product-configurator-overview';
import * as configurationVc from '../../helpers/product-configurator-vc';
import * as configurationOverviewVc from '../../helpers/product-configurator-overview-vc';
import * as configurationCart from '../../helpers/product-configurator-cart';
import * as configurationCartVc from '../../helpers/product-configurator-cart-vc';

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
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configurationVc.clickAddToCartBtn();
      configurationVc.goToCart(electronicsShop);
      //We assume only one product is in the cart
      configurationCart.clickOnEditConfigurationLink(0);
    });

    it('should be able to navigate from the cart after adding product directly to the cart', () => {
      configuration.searchForProduct(testProductMultiLevel);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnViewCartBtnOnPD();
      cart.verifyCartNotEmpty();
      configurationCart.clickOnEditConfigurationLink(0);
    });
  });

  describe('Conflict Solver', () => {
    it('should support the conflict solving process', () => {
      cy.intercept({
        method: 'PATCH',
        path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/ccpconfigurator/*`,
      }).as('updateConfig');
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configuration.clickOnNextBtn(PROJECTOR);
      configuration.selectAttribute(PROJECTOR_TYPE, radioGroup, PROJECTOR_LCD);
      cy.wait('@updateConfig');
      configuration.clickOnPreviousBtn(GENERAL);
      configurationVc.clickOnGroup(3);

      configurationVc.selectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_YES,
        1
      );
      cy.wait('@updateConfig');
      configurationVc.checkStatusIconDisplayed(SOURCE_COMPONENTS, WARNING);
      configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, WARNING);
      configurationVc.deselectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_NO
      );
      cy.wait('@updateConfig');
      configurationVc.checkStatusIconNotDisplayed(SOURCE_COMPONENTS);
      configurationVc.checkStatusIconNotDisplayed(VIDEO_SYSTEM);
      configurationVc.selectConflictingValue(
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
      configurationVc.checkConflictDetectedMsgDisplayed(PROJECTOR_TYPE);
      configuration.clickOnPreviousBtn(GENERAL);
      configuration.clickOnPreviousBtn(CONFLICT_FOR_GAMING_CONSOLE);
      configurationVc.checkConflictDescriptionDisplayed(
        Conflict_msg_gaming_console
      );
      configuration.clickOnNextBtn(GENERAL);
      configurationVc.checkStatusIconDisplayed(SOURCE_COMPONENTS, WARNING);
      configurationVc.checkStatusIconDisplayed(VIDEO_SYSTEM, WARNING);
      configurationOverviewVc.registerConfigurationOvOCC();
      configurationVc.clickAddToCartBtn();
      // Navigate to Overview page and verify whether the resolve issues banner is displayed and how many issues are there
      configurationOverviewVc.verifyNotificationBannerOnOP(1);
      // Navigate to cart and verify whether the  the resolve issues banner is displayed and how many issues are there
      configurationOverview.clickContinueToCartBtnOnOP();
      configurationCartVc.verifyNotificationBannerInCart(0, 1);
      // Navigate back to the configuration page
      configurationCart.clickOnEditConfigurationLink(0);
      // Navigate to Overview page and back to configuration via 'Resolve issues' link
      configurationVc.clickAddToCartBtn();
      // Click 'Resolve issues' link in the banner and navigate back to the configuration
      configurationOverviewVc.clickOnResolveIssuesLinkOnOP();
      configurationVc.checkConflictDescriptionDisplayed(
        Conflict_msg_gaming_console
      );
      configuration.clickOnNextBtn(GENERAL);
      // Navigate back to the configuration page and deselect conflicting value
      configurationVc.clickOnGroup(3);
      configurationVc.deselectConflictingValue(
        GAMING_CONSOLE,
        radioGroup,
        GAMING_CONSOLE_NO
      );
      //Click 'Add to cart' and verify whether the resolve issues banner is not displayed anymore
      configurationOverviewVc.registerConfigurationOvOCC();
      configurationVc.clickAddToCartBtn();
      configurationOverviewVc.verifyNotificationBannerOnOP();
      // Click 'Continue to cart' and verify whether there is a resolve issues banner in the cart entry list
      configurationOverview.clickContinueToCartBtnOnOP();
      configurationCartVc.verifyNotificationBannerInCart(0);
    });
  });

  describe('Configuration process', () => {
    it('should support the product configuration aspect in product search, cart, checkout and order history', () => {
      configuration.completeOrderProcess(testProductMultiLevel);
    });
  });
});
