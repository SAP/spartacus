import * as configuration from '../../helpers/product-configuration';
import { formats } from '../../sample-data/viewports';

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
      configuration.checkHamburgerDisplayed();
      configuration.checkAttributeDisplayed(CAMERA_MODE, radioGroup);

      configuration.clickHamburger();
      configuration.checkGroupMenuDisplayed();

      configuration.clickOnGroup(2);
      configuration.checkAttributeDisplayed(CAMERA_DISPLAY, radioGroup);
    });
  });
});
