import * as configuration from '../../../helpers/product-configurator';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import * as configurationOverviewVc from '../../../helpers/product-configurator-overview-vc';

const electronicsShop = 'electronics-spa';
const testProductMultiLevel = 'CONF_HOME_THEATER_ML';
const testProduct = 'CONF_CAMERA_SL';

// UI types
const radioGroup = 'radioGroup';

// Group Status
const WARNING = 'WARNING';

// List of groups
const GENERAL = 'General';
const VIDEO_SYSTEM = 'Video System';
const SOURCE_COMPONENTS = 'Source Components';
const PROJECTOR = 'Projector';

// List of conflict groups
const CONFLICT_FOR_GAMING_CONSOLE = 'Conflict for Gaming Console';

// Conflict message
const Conflict_msg_gaming_console =
  'Gaming console cannot be selected with LCD projector';

// List of attributes
const PROJECTOR_TYPE = 'PROJECTOR_TYPE';
const GAMING_CONSOLE = 'GAMING_CONSOLE';
const CAMERA_MODE = 'CAMERA_MODE';

// List of attribute values
const PROJECTOR_LCD = 'PROJECTOR_LCD';
const GAMING_CONSOLE_YES = 'GAMING_CONSOLE_YES';
const GAMING_CONSOLE_NO = 'GAMING_CONSOLE_NO';

context('Product Configuration - 2205', () => {
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

  describe('Conflict Solver', () => {
    it('should support the conflict solving process', () => {
      configurationVc.goToConfigurationPage(
        electronicsShop,
        testProductMultiLevel
      );
      configurationVc.registerConfigurationUpdateRoute();
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

      // Navigate to a conflict group via clicking on 'Conflict Detected' link
      configurationVc.clickOnConflictDetected(GAMING_CONSOLE);
      configuration.checkCurrentGroupActive(CONFLICT_FOR_GAMING_CONSOLE);
      configurationVc.checkConflictDescriptionDisplayed(
        Conflict_msg_gaming_console
      );

      // Navigate to a group that contains an attribute which is involved in a conflict via clicking on 'View in Configuration' link
      configurationVc.clickOnViewInConfiguration(GAMING_CONSOLE);
      configuration.checkCurrentGroupActive(SOURCE_COMPONENTS);
      configuration.checkAttributeDisplayed(GAMING_CONSOLE, radioGroup);

      // finally navigate to overview page and check conflict behavior on it
      configurationOverviewVc.registerConfigurationOvOCC();
      configurationVc.clickAddToCartBtn();
      configurationOverviewVc.verifyNotificationBannerOnOP(0, 1); // 0 issues, 1 conflict
      configurationOverviewVc.clickOnResolveConflictsLinkOnOP();
      configuration.checkCurrentGroupActive(CONFLICT_FOR_GAMING_CONSOLE);
      configurationVc.checkConflictDescriptionDisplayed(
        Conflict_msg_gaming_console
      );
    });
  });
});

context('Variant Carousel for Product Configuration', () => {
  let configUISettings: any;

  beforeEach(() => {
    configUISettings = {
      productConfigurator: {
        enableVariantSearch: false, // disable variant search
      },
    };
    cy.cxConfig(configUISettings);
  });

  afterEach(() => {
    configUISettings.productConfigurator.enableVariantSearch = false; // disable variant search
  });

  describe.only('Disable variant search', () => {
    it('should not display any variant carousel', () => {
      //Go to the configuration
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      // Verify whether attribute is displayed
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
      // Verify whether variant carousel is not displayed
      configuration.checkVariantCarouselNotDisplayed();
    });
  });

  describe.only('Enable variant search', () => {
    it('should display variant carousel', () => {
      configUISettings.productConfigurator.enableVariantSearch = true; // enable variant search
      cy.cxConfig(configUISettings);
      //Go to the configuration
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      // Verify whether attribute is displayed
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
      // Verify whether variant carousel is displayed
      configuration.checkVariantCarouselDisplayed();
    });
  });
});
