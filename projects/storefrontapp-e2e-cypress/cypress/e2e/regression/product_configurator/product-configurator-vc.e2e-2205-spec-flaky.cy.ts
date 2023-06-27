import * as configuration from '../../../helpers/product-configurator';
import * as configurationVc from '../../../helpers/product-configurator-vc';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

// UI types
const radioGroup = 'radioGroup';

// List of attributes
const CAMERA_MODE = 'CAMERA_MODE';

context('Variant Carousel for Product Configuration', () => {
  let configuratorCoreConfig: any;

  beforeEach(() => {
    configuratorCoreConfig = {
      productConfigurator: {
        enableVariantSearch: false, // disable variant search
      },
    };
    cy.cxConfig(configuratorCoreConfig);
  });

  afterEach(() => {
    configuratorCoreConfig.productConfigurator.enableVariantSearch = false; // disable variant search
  });

  describe('Disable variant search', () => {
    it('should not display any variant carousel', () => {
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
      configuratorCoreConfig.productConfigurator.enableVariantSearch = true; // enable variant search
      cy.cxConfig(configuratorCoreConfig);
      //Go to the configuration
      configurationVc.goToConfigurationPage(electronicsShop, testProduct);
      // Verify whether attribute is displayed
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);
      // Verify whether variant carousel is displayed
      configuration.checkVariantCarouselDisplayed();
    });
  });
});
