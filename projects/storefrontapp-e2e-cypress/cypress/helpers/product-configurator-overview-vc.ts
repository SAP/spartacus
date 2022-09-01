/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
  cy.wait('@configure_overview');
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
 * Registers OCC call for OV page in order to wait for it
 */
export function registerConfigurationOvOCC() {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/ccpconfigurator/*/configurationOverview?lang=en&curr=USD`
  ).as('configure_overview');
}
