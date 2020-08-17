import * as configuration from '../../helpers/product-configuration';
import * as configurationOverview from '../../helpers/product-configuration-overview';
import { tabbingOrderConfig as tabConfig } from '../../helpers/accessibility/tabbing-order.config';
import { verifyTabbingOrder } from '../../helpers/accessibility/tabbing-order';

const testProduct = 'CONF_CAMERA_SL';
const configurator = 'CPQCONFIGURATOR';

const containerSelectorConfigForm = '.VariantConfigurationTemplate';
const containerSelectorOverviewForm = '[class*=VariantConfig]';

// List of attributes
const CAMERA_MODE = 'CAMERA_MODE';
const CAMERA_COLOR = 'CAMERA_COLOR';
const CAMERA_SD_CARD = 'CAMERA_SD_CARD';
// attribute types
const RADIO_GROUP = 'radioGroup';
const CHECKBOX_LIST = 'checkBoxList';
// attribute values
const CAMERA_MODE_PROFESSIONAL = 'P';
const CAMERA_COLOR_METALLIC = 'METALLIC';
const CAMERA_SD_CARD_SDXC = 'SDXC';
// group names
const SPECIFICATION = 'Specification';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Product Config Tabbing', () => {
    it('should allow to navigate with tab key', () => {
      configuration.goToConfigPage(configurator, testProduct);
      configuration.isGroupMenuDisplayed();
      configuration.isConfigHeaderDisplayed();

      verifyTabbingOrder(
        containerSelectorConfigForm,
        tabConfig.productConfigurationPage
      );

      configuration.selectAttribute(
        CAMERA_MODE,
        RADIO_GROUP,
        CAMERA_MODE_PROFESSIONAL
      );

      configuration.clickAddToCartBtn();
      configurationOverview.isConfigOverviewPageDisplayed();

      cy.get('cx-global-message').should('not.be.visible');
      cy.get('cx-config-update-message').should('not.be.visible');
      cy.get('.cx-config-add-to-cart-btn').should('be.visible');
      cy.get('.cx-config-group-attribute').should('be.visible');

      verifyTabbingOrder(
        containerSelectorOverviewForm,
        tabConfig.productConfigurationOverview
      );
    });
  });

  describe('Product Config Keep Focus', () => {
    it('should keep focus after selection', () => {
      configuration.goToConfigPage(configurator, testProduct);

      configuration.selectAttribute(
        CAMERA_COLOR,
        RADIO_GROUP,
        CAMERA_COLOR_METALLIC
      );

      cy.wait(2000);
      cy.get('cx-config-update-message').should('not.be.visible');

      configuration.checkFocus('cx-config--radioGroup--CAMERA_COLOR--METALLIC');

      configuration.clickOnNextBtn(SPECIFICATION);

      configuration.selectAttribute(
        CAMERA_SD_CARD,
        CHECKBOX_LIST,
        CAMERA_SD_CARD_SDXC
      );

      cy.wait(2000);
      cy.get('cx-config-update-message').should('not.be.visible');

      configuration.checkFocus('cx-config--checkBoxList--CAMERA_SD_CARD--SDXC');
    });
  });
});
