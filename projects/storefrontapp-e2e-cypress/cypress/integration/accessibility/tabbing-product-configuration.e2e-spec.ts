import * as configuration from '../../helpers/product-configuration';
import * as configurationOverview from '../../helpers/product-configuration-overview';
import { tabbingOrderConfig as tabConfig } from '../../helpers/accessibility/tabbing-order.config';
import { verifyTabbingOrder } from '../../helpers/accessibility/tabbing-order';

const testProduct = 'CONF_CAMERA_SL';

const configurator = 'CPQCONFIGURATOR';

const containerSelectorConfigForm = '.VariantConfigurationTemplate';

function goToConfigPage(configuratorType, product) {
  cy.visit(
    `/electronics-spa/en/USD/configure${configuratorType}/product/entityKey/${product}`
  ).then(() => {
    configuration.isConfigPageDisplayed();
  });
}

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Product Config Tabbing', () => {
    it('should allow to navigate with tab key', () => {
      goToConfigPage(configurator, testProduct);
      configuration.isGroupMenuDisplayed();
      configuration.isConfigHeaderDisplayed();

      verifyTabbingOrder(
        containerSelectorConfigForm,
        tabConfig.productConfigurationPage1
      );

      configuration.selectAttribute('CAMERA_MODE', 'radioGroup', 'P');

      configuration.clickAddToCartBtn();
      configurationOverview.isConfigOverviewPageDisplayed();

      cy.get('cx-global-message').should('not.be.visible');
      cy.get('cx-config-update-message').should('not.be.visible');
      cy.get('.cx-config-add-to-cart-btn').should('be.visible');
      cy.get('.cx-config-group-attribute').should('be.visible');

      verifyTabbingOrder(
        '[class*=VariantConfig]',
        tabConfig.productConfigurationOverview
      );
    });
  });

  describe('Product Config Keep Focus', () => {
    it('should keep focus after selection', () => {
      goToConfigPage(configurator, testProduct);

      configuration.selectAttribute('CAMERA_COLOR', 'radioGroup', 'METALLIC');

      cy.wait(3000);

      cy.focused().should(
        'have.attr',
        'id',
        'cx-config--radioGroup--CAMERA_COLOR--METALLIC'
      );

      configuration.clickOnNextBtn('Specification');

      configuration.selectAttribute('CAMERA_SD_CARD', 'checkBoxList', 'SDXC');

      cy.wait(3000);

      cy.focused().should(
        'have.attr',
        'id',
        'cx-config--checkBoxList--CAMERA_SD_CARD--SDXC'
      );
    });
  });
});
