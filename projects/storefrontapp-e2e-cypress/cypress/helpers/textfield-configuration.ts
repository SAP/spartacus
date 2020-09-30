import * as cart from './cart';
import Chainable = Cypress.Chainable;

const addToCartButtonSelector =
  '.cx-configurator-textfield-add-to-cart-btn div button';

/**
 * Navigates to the product configuration page.
 *
 * @param {string} productId - Product ID
 * @return {Chainable<Window>} - New configuration window
 */
export function goToConfigurationPage(productId: string): Chainable<Window> {
  const location = `/electronics-spa/en/USD/configure/textfield/product/entityKey/${productId}`;
  return cy.visit(location).then(() => {
    cy.log("Path name should contain: '" + location + "'");
    cy.location('pathname').should('contain', location);
  });
}

/**
 * Navigates to the product configuration page.
 *
 * @param {string} productId - Product ID
 * @return {Chainable<Window>} - New configuration window
 */
export function goToProductDetailsPage(productId: string): Chainable<Window> {
  const location = `electronics-spa/en/USD/product/${productId}/${productId}`;
  return cy.visit(location).then(() => {
    cy.log("Path name should contain: '" + location + "'");
    cy.location('pathname').should('contain', location);
  });
}

/**
 * Clicks on 'Configure' button.
 */
export function clickOnConfigureButton(): void {
  cy.log("Click on 'Configure' button");
  cy.get('cx-configure-product a').click({ force: true });
}

/**
 * Clicks on the 'Edit Configuration' link in cart for a certain cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickOnEditConfigurationLink(cartItemIndex: number): void {
  cy.log("Click on 'Edit Configuration' link");
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configure-cart-entry')
    .within(() => {
      cy.get('button:contains("Edit")')
        .click()
        .then(() => {
          cy.log("Path name should contain: '/cartEntry/entityKey/'");
          cy.location('pathname').should('contain', '/cartEntry/entityKey/');
        });
    });
}

/**
 * Verifies whether the configuration page is visible.
 *
 * @return - 'True' if the configuration page is visible, otherwise 'false'
 */
export function isConfigurationPageIsDisplayed() {
  cy.log('Verify whether the textfield configuration page is displayed');
  cy.get('cx-configurator-textfield-form').should('be.visible');
}

/**
 * Verifies whether the attribute is displayed.
 *
 * @param {string} attributeName - Attribute name
 * @return - 'True' if the attribute is displayed, otherwise 'false'
 */
export function isAttributeDisplayed(attributeName: string) {
  const attributeId = getAttributeId(attributeName);
  cy.log("Verify whether attribute ID '" + attributeId + "' is visible");
  cy.get(`#${attributeId}`).should('be.visible');
}

/**
 * Retrieves attribute ID.
 *
 * @param {string} attributeName - Attribute name
 * @return {string} - Attribute ID
 */
export function getAttributeId(attributeName: string): string {
  const trimmedName = attributeName.replace(/\s/g, '');
  return `cx-configurator-textfield${trimmedName}`;
}

/**
 * Selects value of the corresponding attribute.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} value - Value name
 */
export function selectAttribute(attributeName: string, value?: string): void {
  const attributeId = getAttributeId(attributeName);
  const selector = '#' + attributeId + ' input';
  //cy.get(selector).clear().type(value);
  cy.get(selector).then(($element) => {
    cy.log('Empty out the input field');
    $element.empty();
    cy.log("Enter new value: '" + value + "' into the input field");
    $element.val(value);
  });
}

/**
 * Clicks 'Add to Cart' button.
 */
export function clickAddToCartButton(): void {
  cy.log("Clicks 'Add to Cart' button");
  cy.get(addToCartButtonSelector).click({
    force: true,
  });
}

/**
 * Clicks 'Add to Cart' button on the product details page.
 */
export function clickOnAddToCartBtnOnPD(): void {
  cy.log("Clicks 'Add to Cart' button on the product details page");
  cy.get('cx-add-to-cart button.btn-primary')
    .contains('Add to cart')
    .click()
    .then(() => {
      cy.get('cx-added-to-cart-dialog').should('be.visible');
      cy.get('div.cx-dialog-body').should('be.visible');
      cy.get('div.cx-dialog-buttons a.btn-primary')
        .contains('view cart')
        .should('be.visible');
      cy.get('div.cx-dialog-buttons a.btn-secondary')
        .contains('proceed to checkout')
        .should('be.visible');
    });
}

/**
 * Clicks on 'View Cart' on the product details page.
 */
export function clickOnViewCartBtnOnPD(): void {
  cy.log("Clicks on 'View Cart' on the product details page");
  cy.get('div.cx-dialog-buttons a.btn-primary')
    .contains('view cart')
    .click()
    .then(() => {
      cy.log("Verify whether 'Your Shopping Cart' is visible");
      cy.get('h1').contains('Your Shopping Cart').should('be.visible');
      cy.log("Verify whether 'cx-cart-details' is visible");
      cy.get('cx-cart-details').should('be.visible');
    });
}

/**
 * Verifies whether the cart contains the product.
 *
 * @param {string} productId - ProductID
 * @return 'True' if the corresponding product is in the cart, otherwise 'false'
 */
export function isTextfieldProductInCart(productId: string) {
  cy.log('Verifies whether the cart contains the product');
  cy.get('cx-cart-item-list').contains(productId).should('be.visible');
}

/**
 * Add a product to the cart. Verifies whether the cart is not empty and
 * contains the product.
 *
 * @param {string} productId - Product ID
 */
export function addToCartAndVerify(productId: string): void {
  this.clickAddToCartButton();
  cart.verifyCartNotEmpty();
  this.isTextfieldProductInCart(productId);
}
