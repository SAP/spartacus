import * as configuration from '../../helpers/product-configuration';
import * as productSearch from '../../helpers/product-search';

const email = 'cpq03@sap.com';
const password = 'welcome';
const cpqUser = 'cpq03';
const testProduct = 'CONF_CAMERA_BUNDLE';

// UI types
const radioGroup = 'radioGroup';
const checkBoxList = 'checkBoxList';

// Attributes
const ATTR_CAMERA_BODY = '2893'; // Camera Body
const ATTR_MEMORY_CARD = '2894'; // Memory Card

// Attribute values
const CAMERA_BODY_NIKD7500 = '8710'; // NIKD7500
const CAMERA_BODY_NIKD850 = '8711'; //  NIKD850

const MEMORY_CARD_SDEP128 = '8714'; // SDEP128
const MEMORY_CARD_SDULTRA64 = '8715'; // SDULTRA64
const MEMORY_CARD_PANAAU_XP = '8716'; // PANAAU-XP

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
      goToPDPage(testProduct);
      configuration.clickOnConfigureBtnInCatalog();
      configuration.isAttributeDisplayed(ATTR_CAMERA_BODY, radioGroup);
      configuration.selectAttribute(
        ATTR_CAMERA_BODY,
        radioGroup,
        CAMERA_BODY_NIKD7500
      );
      configuration.verifyRadioButtonSelected(
        ATTR_CAMERA_BODY,
        CAMERA_BODY_NIKD7500
      );
      configuration.selectAttribute(
        ATTR_CAMERA_BODY,
        radioGroup,
        CAMERA_BODY_NIKD850
      );
      configuration.verifyRadioButtonSelected(
        ATTR_CAMERA_BODY,
        CAMERA_BODY_NIKD850
      );
    });

    it('should support update values for checkbox list attribute type', () => {
      goToPDPage(testProduct);
      configuration.clickOnConfigureBtnInCatalog();
      configuration.isAttributeDisplayed(ATTR_MEMORY_CARD, checkBoxList);

      configuration.isCheckboxSelected(ATTR_MEMORY_CARD, MEMORY_CARD_SDEP128);
      configuration.verifyCheckboxNotSelected(
        ATTR_MEMORY_CARD,
        MEMORY_CARD_SDULTRA64
      );
      configuration.verifyCheckboxNotSelected(
        ATTR_MEMORY_CARD,
        MEMORY_CARD_PANAAU_XP
      );

      configuration.selectAttribute(
        ATTR_MEMORY_CARD,
        checkBoxList,
        MEMORY_CARD_SDULTRA64
      );
      configuration.isCheckboxSelected(ATTR_MEMORY_CARD, MEMORY_CARD_SDEP128);
      configuration.isCheckboxSelected(ATTR_MEMORY_CARD, MEMORY_CARD_SDULTRA64);
      configuration.verifyCheckboxNotSelected(
        ATTR_MEMORY_CARD,
        MEMORY_CARD_PANAAU_XP
      );

      configuration.selectAttribute(
        ATTR_MEMORY_CARD,
        checkBoxList,
        MEMORY_CARD_PANAAU_XP
      );
      configuration.isCheckboxSelected(ATTR_MEMORY_CARD, MEMORY_CARD_SDEP128);
      configuration.isCheckboxSelected(ATTR_MEMORY_CARD, MEMORY_CARD_SDULTRA64);
      configuration.isCheckboxSelected(ATTR_MEMORY_CARD, MEMORY_CARD_PANAAU_XP);

      configuration.selectAttribute(
        ATTR_MEMORY_CARD,
        checkBoxList,
        MEMORY_CARD_SDEP128
      );
      configuration.verifyCheckboxNotSelected(
        ATTR_MEMORY_CARD,
        MEMORY_CARD_SDEP128
      );
      configuration.isCheckboxSelected(ATTR_MEMORY_CARD, MEMORY_CARD_SDULTRA64);
      configuration.isCheckboxSelected(ATTR_MEMORY_CARD, MEMORY_CARD_PANAAU_XP);
    });
  });
});
