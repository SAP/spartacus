import * as configuration from '../../helpers/product-configuration';
import * as productSearch from '../../helpers/product-search';

const email = 'cpq03@sap.com';
const password = 'welcome';
const cpqUser = 'cpq03';
const testProduct = 'CONF_CAMERA_BUNDLE';
const testProductCoffeeMachine = 'CONF_COFFEEMACHINE_3000';

// UI types
const radioGroup = 'radioGroup';
const checkBoxList = 'checkBoxList';

// Attributes
const ATTR_COFFEE_MACHINE_CUPS_DAY = '2931'; // COFFEE_MACHINE_CUPS_DAY
const ATTR_COFFEE_MACHINE_STARB_MODE = '2933'; // COFFEE_MACHINE_STARB_MODE

// Attribute values
const COFFEE_MACHINE_CUPS_DAY_300_500 = '8841'; // 300-500 CUPS
const COFFEE_MACHINE_CUPS_DAY_500_1000 = '8842'; //  500-1000 CUPS

const STARB_MODE = '8845'; // STARB_MODE

function goToPDPage(product) {
  const location = `powertools-spa/en/USD/product/${product}/${product}`;
  cy.visit(location).then(() => {
    cy.location('pathname').should('contain', location);
    cy.get('.ProductDetailsPageTemplate').should('be.visible');
  });
}

context('CPQ Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
    configuration.login(email, password, cpqUser);
  });

  describe('Navigate to Product Configuration Page', () => {
    it('should be able to navigate from the product search result', () => {
      cy.server();
      cy.route(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/products/suggestions?term=${testProduct}*`
      );
      productSearch.searchForProduct(testProduct);
      configuration.clickOnConfigureBtnInCatalog();
    });

    it('should be able to navigate from the product details page', () => {
      goToPDPage(testProduct);
      configuration.clickOnConfigureBtnInCatalog();
    });
  });

  describe('Update attribute values', () => {
    it('should support update values for radio button attribute type', () => {
      goToPDPage(testProductCoffeeMachine);
      configuration.clickOnConfigureBtnInCatalog();
      configuration.isAttributeDisplayed(
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        radioGroup
      );
      configuration.selectAttribute(
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        radioGroup,
        COFFEE_MACHINE_CUPS_DAY_300_500
      );
      configuration.verifyRadioButtonSelected(
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        COFFEE_MACHINE_CUPS_DAY_300_500
      );
      configuration.selectAttribute(
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        radioGroup,
        COFFEE_MACHINE_CUPS_DAY_500_1000
      );
      configuration.verifyRadioButtonSelected(
        ATTR_COFFEE_MACHINE_CUPS_DAY,
        COFFEE_MACHINE_CUPS_DAY_500_1000
      );
    });

    it('should support update values for checkbox list attribute type', () => {
      goToPDPage(testProductCoffeeMachine);
      configuration.clickOnConfigureBtnInCatalog();
      configuration.isAttributeDisplayed(
        ATTR_COFFEE_MACHINE_STARB_MODE,
        checkBoxList
      );

      configuration.verifyCheckboxNotSelected(
        ATTR_COFFEE_MACHINE_STARB_MODE,
        STARB_MODE
      );

      configuration.selectAttribute(
        ATTR_COFFEE_MACHINE_STARB_MODE,
        checkBoxList,
        STARB_MODE
      );
      configuration.isCheckboxSelected(
        ATTR_COFFEE_MACHINE_STARB_MODE,
        STARB_MODE
      );

      configuration.selectAttribute(
        ATTR_COFFEE_MACHINE_STARB_MODE,
        checkBoxList,
        STARB_MODE
      );
      configuration.verifyCheckboxNotSelected(
        ATTR_COFFEE_MACHINE_STARB_MODE,
        STARB_MODE
      );
    });
  });
});
