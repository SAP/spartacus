/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const continueToCartButtonSelector =
  'cx-configurator-add-to-cart-button button';

const resolveIssuesText = ' must be resolved before checkout.  Resolve Issues';

/**
 * Verifies whether the product overview page is displayed.
 */
export function checkConfigOverviewPageDisplayed(): void {
  cy.get('cx-configurator-overview-form').should('be.visible');
}

/**
 * Verifies whether 'Continue to Cart' button is displayed.
 */
export function checkContinueToCartBtnDisplayed(): void {
  cy.get('.cx-configurator-add-to-cart-btn button.btn-primary')
    .contains('Continue to Cart')
    .should('be.visible');
}

/**
 * Clicks on 'Continue to cart' on the product overview page.
 */
export function clickContinueToCartBtnOnOP(): void {
  cy.get(continueToCartButtonSelector)
    .click()
    .then(() => {
      cy.get('h1').contains('Your Shopping Cart').should('be.visible');
      cy.get('cx-cart-details').should('be.visible');
    });
}

/**
 * Waits for the notification banner to display the correct number of issues
 *
 * @param {number} numberOfIssues - Expected number of issues
 */
export function waitForNotificationBanner(numberOfIssues?: number): void {
  const element = cy.get('cx-configurator-overview-notification-banner');
  let numberOfIssueText;

  if (numberOfIssues > 1) {
    numberOfIssueText = numberOfIssues + ' issues' + resolveIssuesText;
  } else {
    numberOfIssueText = numberOfIssues + ' issue' + resolveIssuesText;
  }

  element.get(`.cx-error-msg:contains(${numberOfIssueText})`);
}

/**
 * Verifies whether the group header displayed.
 */
export function checkGroupHeaderDisplayed(
  groupName: string,
  groupIdx: number
): void {
  cy.get('cx-configurator-overview-form .cx-group h2')
    .eq(groupIdx)
    .should('contain.text', groupName);
}

/**
 * Verifies whether the group header is not displayed.
 */
export function checkGroupHeaderNotDisplayed(groupName: string): void {
  cy.get('cx-configurator-overview-form .cx-group').should(
    'not.contain.text',
    groupName
  );
}

/**
 * Verifies the whether the current number of group headers is displayed
 */
export function checkNumberOfGroupHeadersDisplayed(num: number): void {
  cy.get('cx-configurator-overview-form .cx-group').should('have.length', num);
}

/**
 * Verifies whether the attribute name and value are displayed at the given position.
 */
export function checkAttrDisplayed(
  attributeName: string,
  valueName: string,
  attributeIdx: number
): void {
  cy.get('.cx-attribute-value-pair')
    .eq(attributeIdx)
    .within(() => {
      cy.log('Attribute name: ' + attributeName);
      if (attributeName) {
        cy.get('.cx-attribute-label').should('contain.text', attributeName);
      } else {
        cy.get('.cx-attribute-label').should('not.be.visible');
      }
      cy.log('Value name: ' + valueName);
      cy.get('.cx-value-info, .cx-attribute-value').should(
        'contain.text',
        valueName
      );
    });
}

/**
 * Verifies the whether the current number of group headers is displayed
 */
export function checkNumberOfAttributesDisplayed(num: number): void {
  cy.get('.cx-attribute-value-pair').should('have.length', num);
}

/**
 * Verifies whether the attribute price is displayed at the given position.
 */
export function checkAttrPriceDisplayed(
  priceString: string,
  attributeIdx: number
): void {
  cy.get('.cx-attribute-value-pair')
    .eq(attributeIdx)
    .within(() => {
      if (priceString) {
        cy.get('cx-configurator-price').should('contain.text', priceString);
      } else {
        cy.get('cx-configurator-price').should('not.be.visible');
      }
    });
}

/**
 * Verifies the whether the current number of group headers is displayed
 */
export function checkNumberOfAttributePricesDisplayed(num: number): void {
  cy.get(
    '.cx-attribute-value-pair cx-configurator-price:visible'
  ).should('have.length', num);
}
