import * as configurationCommon from '../../helpers/product-configuration';
import * as configuration from '../../helpers/product-configurator-vc';
import { formats } from '../../sample-data/viewports';

/**
 * This suite is marked as flaky due to performance (synchronization) issues on
 * https://spartacus-devci767.eastus.cloudapp.azure.com:9002 that we analyze in
 * https://cxjira.sap.com/browse/TIGER-7252
 */

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL';

// UI types
const radioGroup = 'radioGroup';

const CAMERA_DISPLAY = 'CAMERA_DISPLAY';
const CAMERA_MODE = 'CAMERA_MODE';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Group Handling', () => {
    it('should navigate using the group menu in mobile resolution', () => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
      configuration.goToConfigurationPage(electronicsShop, testProduct);
      configurationCommon.checkHamburgerDisplayed();
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);

      configuration.clickHamburger();
      configuration.checkGroupMenuDisplayed();

      configuration.clickOnGroup(2);
      configuration.checkAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
    });
  });
});
