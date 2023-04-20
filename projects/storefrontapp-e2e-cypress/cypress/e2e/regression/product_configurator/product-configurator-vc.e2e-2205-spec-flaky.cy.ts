import * as configuration from '../../../helpers/product-configurator';
import * as configurationVc from '../../../helpers/product-configurator-vc';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

// UI types
const radioGroup = 'radioGroup';

// List of attributes
const CAMERA_MODE = 'CAMERA_MODE';

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

  describe('Disable variant search', () => {
    it('should not display any variant carousel', () => {
      //this is to ensure that we don't have a configuration as part of
      //the redux state that already contains variants
      cy.reload(true);
      //Go to the configuration
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      // Verify whether attribute is displayed
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
      // Verify whether variant carousel is not displayed
      configuration.checkVariantCarouselNotDisplayed();
    });
  });

  describe('Enable variant search', () => {
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
