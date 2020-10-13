import * as configuration from '../../helpers/product-configuration';
import * as configurationOverview from '../../helpers/product-configuration-overview';
import { tabbingOrderConfig as tabConfig } from '../../helpers/accessibility/tabbing-order.config';
import { verifyTabbingOrder } from '../../helpers/accessibility/tabbing-order';

const testProduct = 'CONF_CAMERA_SL';

const containerSelectorConfigForm = 'main';
const containerSelectorOverviewForm = 'main';

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
      configuration.goToConfigurationPage(testProduct);

      verifyTabbingOrder(
        containerSelectorConfigForm,
        tabConfig.productConfigurationPage
      );

      configuration.selectAttribute(
        CAMERA_MODE,
        RADIO_GROUP,
        CAMERA_MODE_PROFESSIONAL
      );
      configuration.navigateToOverviewPage();

      configuration.isGlobalMessageNotDisplayed();
      configuration.isUpdatingMessageNotDisplayed();
      configurationOverview.isConfigOverviewPageDisplayed();
      verifyTabbingOrder(
        containerSelectorOverviewForm,
        tabConfig.productConfigurationOverview
      );
    });
  });

  describe('Product Config Keep Focus', () => {
    it('should keep focus after selection', () => {
      cy.server();

      cy.route(
        'PATCH',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/ccpconfigurator/*`
      ).as('updateConfig');

      cy.route(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/ccpconfigurator/*/pricing*`
      ).as('priceUpdate');

      configuration.goToConfigurationPage(testProduct);

      cy.wait('@priceUpdate');

      configuration.selectAttribute(
        CAMERA_COLOR,
        RADIO_GROUP,
        CAMERA_COLOR_METALLIC
      );

      cy.wait('@updateConfig');
      cy.wait('@priceUpdate');

      configuration.checkFocus(
        CAMERA_COLOR,
        RADIO_GROUP,
        CAMERA_COLOR_METALLIC
      );

      configuration.clickOnNextBtn(SPECIFICATION);
      configuration.selectAttribute(
        CAMERA_SD_CARD,
        CHECKBOX_LIST,
        CAMERA_SD_CARD_SDXC
      );

      cy.wait('@updateConfig');
      cy.wait('@priceUpdate');

      configuration.checkFocus(
        CAMERA_SD_CARD,
        CHECKBOX_LIST,
        CAMERA_SD_CARD_SDXC
      );
    });
  });
});
