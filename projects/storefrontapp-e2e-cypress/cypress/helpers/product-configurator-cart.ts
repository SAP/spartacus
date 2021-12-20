/**
 * Clicks on the 'Edit Configuration' link in cart for a certain cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickOnEditConfigurationLink(cartItemIndex: number): void {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configure-cart-entry')
    .within(() => {
      cy.get('a:contains("Edit")')
        .click()
        .then(() => {
          cy.location('pathname').should('contain', '/cartEntry/entityKey/');
        });
    });
}

/**
 * Clicks on the 'Remove' link in cart for a certain cart item to remove a cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickOnRemoveLink(cartItemIndex: number): void {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .not('disabled')
    .find('.cx-remove-btn')
    .within(() => {
      cy.log('One cart item will be removed under index: ' + cartItemIndex);
      cy.get('button:contains("Remove")').click();
    });
}

/**
 * Verifies whether the mini-cart displays zero cart items.
 */
export function checkCartEmpty() {
  cy.get('cx-paragraph h2').contains('Your shopping cart is empty');
  cy.get('cx-mini-cart .count').contains('0');
}

/**
 * Navigates to the order details page.
 */
export function navigateToOrderDetails(): void {
  cy.log('Navigate to order detail page');
  // Verify whether the ordered product is displayed in the order list
  cy.get('cx-cart-item-list cx-configure-cart-entry a')
    .first()
    .click()
    .then(() => {
      cy.get('cx-configurator-overview-form').should('be.visible');
    });
}

/**
 * Defines the order number alias.
 */
export function defineOrderNumberAlias(): void {
  const orderConfirmationText = 'Confirmation of Order:';

  cy.get('cx-order-confirmation-thank-you-message .cx-page-title')
    .first()
    .invoke('text')
    .then((text) => {
      expect(text).contains(orderConfirmationText);
      const orderNumber = text.replace(orderConfirmationText, '').trim();
      expect(orderNumber).match(/^[0-9]+$/);
      cy.wrap(orderNumber).as('orderNumber');
    });
}
