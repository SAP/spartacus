/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configurationOverview from './product-configurator-overview';
import * as configurationCpq from './product-configurator-cpq';
import * as configurationVc from './product-configurator-vc';

/**
 * Verifies that the overview menu container is visible (unified sidebar).
 */
export function checkOverviewMenuContainerDisplayed(): void {
  cy.get(configurationOverview.OVERVIEW_MENU_CONTAINER_SELECTOR).should(
    'be.visible'
  );
}

const resolveIssuesLinkSelector =
  'cx-configurator-overview-notification-banner #cx-configurator-overview-error-msg button.cx-action-link';

/**
 * Verifies that the CPQ overview page is fully loaded (form visible, no ghost UI).
 */
export function checkOverviewPageReady(): void {
  configurationVc.checkGhostAnimationNotDisplayed();
  configurationOverview.checkConfigOverviewPageDisplayed();
  //configurationOverview.checkContinueToCartBtnDisplayed();
}

/**
 * Verifies that the read-only overview of a cart entry is displayed, as reached
 * via the bundle overview link in the cart: only 'Back to Cart' is offered.
 */
export function checkDisplayOnlyOverviewFromCartDisplayed(): void {
  cy.location('pathname')
    .should('contain', '/configure-overview/cpq/cartEntry/entityKey/')
    .and('contain', '/displayOnly/true');
  cy.location('search').should(
    'contain',
    'navigateToCartFromBundleOverview=true'
  );
  configurationOverview.checkConfigOverviewPageDisplayed();
  cy.get('cx-configurator-add-to-cart-button .cx-display-only-btn')
    .should('be.visible')
    .and('contain', 'Back to Cart');
  cy.get('cx-configurator-add-to-cart-button .cx-add-to-cart-btn').should(
    'not.exist'
  );
}

/**
 * Clicks 'Back to Cart' on the read-only overview and navigates to the cart page.
 */
export function clickBackToCartBtnOnOP(): void {
  cy.get('cx-configurator-add-to-cart-button .cx-display-only-btn')
    .contains('Back to Cart')
    .click()
    .then(() => {
      cy.get('cx-cart-details').should('be.visible');
    });
}

/**
 * Verifies whether the group header displayed.
 */
export function checkGroupHeaderDisplayed(
  groupName: string,
  groupIdx: number
): void {
  configurationOverview.checkGroupHeaderDisplayed(groupName, groupIdx);
}

/**
 * Verifies whether the group header is not displayed.
 */
export function checkGroupHeaderNotDisplayed(groupName: string): void {
  configurationOverview.checkGroupHeaderNotDisplayed(groupName);
}

/**
 * Verifies whether the attribute name and value are displayed at the given position.
 */
export function checkAttrDisplayed(
  attributeName: string,
  valueName: string,
  attributeIdx: number
): void {
  configurationOverview.checkAttrDisplayed(
    attributeName,
    valueName,
    attributeIdx
  );
}

/**
 * Verifies whether the attribute price is displayed at the given position.
 */
export function checkAttrPriceDisplayed(
  priceString: string,
  attributeIdx: number
): void {
  configurationOverview.checkAttrPriceDisplayed(priceString, attributeIdx);
}

/**
 * Verifies whether the attribute name and value are displayed at the given position.
 */
export function checkAttrType(
  attributeType: 'product' | 'simple',
  attributeIdx: number
): void {
  const expected =
    attributeType === 'product' ? 'have.class' : 'not.have.class';
  cy.get('.cx-attribute-value-pair')
    .eq(attributeIdx)
    .should(expected, 'bundle');
}

/**
 * Verifies that the overview issues banner contains the expected issue count.
 *
 * @param {number} numberOfIssues - Expected number of issues
 */
export function verifyNotificationBannerOnOP(numberOfIssues: number): void {
  const issueText =
    numberOfIssues === 1
      ? '1 issue must be resolved before checkout.'
      : `${numberOfIssues} issues must be resolved before checkout.`;
  cy.get('cx-configurator-overview-notification-banner')
    .find('.cx-error-msg')
    .should('contain.text', issueText)
    .and('contain.text', 'Resolve Issues');
}

/**
 * Verifies that no issues banner is displayed on the overview page.
 */
export function checkNoIssuesBannerOnOP(): void {
  cy.get('cx-configurator-overview-notification-banner .cx-error-msg').should(
    'not.exist'
  );
}

/**
 * Clicks on 'Resolve Issues' on the product-bound overview page.
 */
export function clickOnResolveIssuesLinkOnOP(): void {
  cy.get(resolveIssuesLinkSelector)
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/product/entityKey/');
      configurationCpq.checkConfigPageDisplayed();
    });
}
