/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import Chainable = Cypress.Chainable;
import * as configurationOverview from './product-configurator-overview';
import * as configurationVc from './product-configurator-vc';
const resolveIssuesLinkSelector =
  'cx-configurator-overview-notification-banner #cx-configurator-overview-error-msg button.cx-action-link';
const resolveConflictsLinkSelector =
  'cx-configurator-overview-notification-banner #cx-configurator-overview-conflict-msg button.cx-action-link';

const addToCartQuantitySelector =
  '.cx-add-to-cart-btn-container .cx-quantity-value';

/**
 * Navigates to the configured product overview page.
 *
 * @param {string} shopName - shop name
 * @param {string} productId - Product ID
 * @return {Chainable<Window>} - New configuration overview window
 */
export function goToConfigOverviewPage(
  shopName: string,
  productId: string
): Chainable<Window> {
  const location = `/${shopName}/en/USD/configure-overview/vc/product/entityKey/${productId}`;
  return cy.visit(location).then(() => {
    cy.location('pathname').should('contain', location);
    cy.get('.VariantConfigurationOverviewTemplate').should('be.visible');
    configurationOverview.checkConfigOverviewPageDisplayed();
    configurationVc.checkGhostAnimationNotDisplayed();
    cy.wait(READ_CONFIG_OV_ALIAS);
  });
}

/**
 * Navigates to the configuration page via configuration tab.
 */
export function navigateToConfigurationPage(): void {
  cy.get('cx-configurator-tab-bar a:contains("Configuration")').click({
    force: true,
  });
}

/**
 * Clicks on 'Resolve Issues' link on the product overview page.
 */
export function clickOnResolveIssuesLinkOnOP(): void {
  cy.get(resolveIssuesLinkSelector)
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/cartEntry/entityKey/');
    });
}

/**
 * Clicks on 'Resolve Issues' link on the product overview page in case overview still refers to product bound configuration
 */
export function clickOnResolveIssuesLinkOnOPProductBound(): void {
  cy.get(resolveIssuesLinkSelector)
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/product/entityKey/');
    });
}

/**
 * Clicks on 'Resolve Conflicts' link on the product overview page.
 */
export function clickOnResolveConflictsLinkOnOP(): void {
  cy.get(resolveConflictsLinkSelector)
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/cartEntry/entityKey/');
    });
}

/**
 * Verifies whether the issues banner is displayed.
 *
 * @param element - HTML element
 * @param {'ISSUE' | 'CONFLICT'} kind - check for issues or conflicts
 * @param {number} numberOfIssues - Expected number of conflicts
 */
export function checkNotificationBannerOnOP(
  element,
  kind: 'ISSUE' | 'CONFLICT',
  numberOfIssues?: number
): void {
  const regExString =
    kind === 'ISSUE'
      ? `\\s*${numberOfIssues} issues? must be resolved before checkout.\\s+Resolve Issues\\s*`
      : `\\s*${numberOfIssues} conflicts? must be resolved before checkout.\\s+Resolve Conflicts\\s*`;
  const styleClass = kind === 'ISSUE' ? '.cx-error-msg' : '.cx-conflict-msg';
  element
    .get(styleClass)
    .first()
    .invoke('text')
    .then((text) => {
      expect(text).match(new RegExp(regExString));
    });
}

/**
 * Verifies whether the issues banner is displayed and the number of issues are accurate.
 *
 * @param {number} numberOfIssues - Expected number of issues
 * @param {number} numberOfConflicts - Expected number of conflicts
 */
export function verifyNotificationBannerOnOP(
  numberOfIssues?: number,
  numberOfConflicts?: number
): void {
  cy.wait(READ_CONFIG_OV_ALIAS);
  let element = cy.get('cx-configurator-overview-notification-banner', {
    timeout: 10000,
  });
  if (numberOfIssues) {
    this.checkNotificationBannerOnOP(element, 'ISSUE', numberOfIssues);
  } else {
    element.get('.cx-error-msg').should('not.exist');
  }
  if (numberOfConflicts) {
    this.checkNotificationBannerOnOP(element, 'CONFLICT', numberOfConflicts);
  } else {
    element.get('.cx-conflict-msg').should('not.exist');
  }
}

/**
 * Cypress alias for Config OV update OCC call.
 */
export const UPDATE_CONFIG_OV_ALIAS = '@updateConfigOverview';

/**
 * Cypress alias for Config OV read OCC call.
 */
export const READ_CONFIG_OV_ALIAS = '@readConfigOverview';

/**
 * Registers OCC call for OV page in order to wait for it sing alias @see READ_CONFIG_OV_ALIAS
 */
export function registerConfigurationOverviewRoute() {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/ccpconfigurator/*/configurationOverview?lang=en&curr=USD`
  ).as(READ_CONFIG_OV_ALIAS.substring(1)); // strip the '@'
}

/**
 * Registers OCC call for updating OV page in order to wait for it using alias @see UPDATE_CONFIG_OV_ALIAS
 */
export function registerConfigurationOverviewUpdateRoute() {
  cy.intercept({
    method: 'PATCH',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/ccpconfigurator/*`,
  }).as(UPDATE_CONFIG_OV_ALIAS.substring(1)); // strip the '@'
}

/**
 * Verifies whether the product overview side bar is displayed.
 */
export function checkSidebarDisplayed(): void {
  cy.get('cx-configurator-overview-sidebar').should('be.visible');
}

/**
 * Verifies whether the product overview menu is displayed.
 */
export function checkMenuDisplayed(): void {
  cy.get('cx-configurator-overview-menu').should('exist');
  cy.get('cx-configurator-overview-filter').should('not.exist');
}

/**
 * Verifies whether the product overview filter is displayed.
 */
export function checkFilterDisplayed(): void {
  cy.get('cx-configurator-overview-filter').should('exist');
  cy.get('cx-configurator-overview-menu').should('not.exist');
}

/**
 * Toggles configuration overview side bar from menu -> filter or from filter -> menu
 */
export function toggleSidebar(): void {
  cy.get(
    'cx-configurator-overview-sidebar .cx-menu-bar button:not(.active)'
  ).click();
}

/**
 * Toggles the given configuration overview group filter
 * @param {string} groupId - id of group filter to toggle
 */
export function toggleGroupFilterAndWait(groupId: string): void {
  cy.get(`#cx-configurator-overview-filter-option-group-${groupId}`).click();
  cy.wait(UPDATE_CONFIG_OV_ALIAS);
}

/**
 * Toggles the given configuration overview attribute filter
 * @param {'mySelections' | 'price'} filter - type of attribute filter to toggle
 */
export function toggleAttributeFilterAndWait(
  filter: 'mySelections' | 'price'
): void {
  cy.get(`#cx-configurator-overview-filter-option-${filter}`).click();
  cy.wait(UPDATE_CONFIG_OV_ALIAS);
}

/**
 * Removes given configuration overview filter by name
 * @param {'Remove All' | string} filterName - name of the overview filter or 'Remove All'
 */
export function removeFilterByNameAndWait(filterName: string) {
  cy.get('button.cx-overview-filter-applied').contains(filterName).click();
  cy.wait(UPDATE_CONFIG_OV_ALIAS);
}

/**
 * Verifies the the current number of displayed menu items.
 * @param {number} num expected number
 */
export function checkNumberOfMenuEntriesDisplayed(num: number) {
  cy.get('.cx-menu-item').should('have.length', num);
}

/**
 * Clicks on the menu item with the given index. Does not wait, but returns immediately.
 *
 * @param {number} index index of the menu item
 */
export function clickMenuItem(index: number) {
  cy.get('.cx-menu-item').eq(index).click();
}

/**
 * Checks that the ov group with given index is placed in the top area of the view port,
 * or in other words that the screen has ben scrolled to this group.
 * @param {number} groupIdx index of the ov group
 */
export function checkViewPortScrolledToGroup(groupIdx: number) {
  cy.get('cx-configurator-overview-form .cx-group h2')
    .eq(groupIdx)
    .then((elem) => {
      // due to rounding errors top will be between -1px..1px
      expect(elem[0].getBoundingClientRect().top)
        .to.be.greaterThan(-1)
        .and.to.be.below(1);
    });
}

/**
 * Verifies whether a quantity value that has been entered into the quantity stepper is equal to the expected value.
 *
 * @param expectedValue
 */
export function checkQuantity(expectedValue: number) {
  cy.get(addToCartQuantitySelector).then((elem) => {
    expect(elem.text().trim()).to.equal(expectedValue.toString());
  });
}
