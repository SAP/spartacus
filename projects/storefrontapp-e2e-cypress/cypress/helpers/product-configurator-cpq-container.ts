/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configuration from './product-configurator';

// ---------------------------------------------------------------------------
// Sections — match createAttributeUiKey() in the container component
// ---------------------------------------------------------------------------

/** Accordion of rows already added to the configuration. */
export const SELECTED_PRODUCTS = 'selected-products' as const;

/** Accordion of rows the user can still add. */
export const AVAILABLE_PRODUCTS = 'available-products' as const;

export type containerSection =
  | typeof SELECTED_PRODUCTS
  | typeof AVAILABLE_PRODUCTS;

/**
 * Overflow-menu actions on a selected product card.
 * Labels must match the visible button text.
 */
export type containerRowAction = 'Add' | 'Remove' | 'Edit' | 'Duplicate';

/**
 * Expected state of the Available Products section.
 * Set `dropdown` to true when the product count is above
 * `cpqContainerDropDownListThreshold`.
 */
export type availableProductsExpectation = {
  count: number;
  products: string[];
  dropdown: boolean;
};

const CONTAINER_SECTION_TITLES: Record<containerSection, string> = {
  [SELECTED_PRODUCTS]: 'Selected Products',
  [AVAILABLE_PRODUCTS]: 'Available Products',
};

// ---------------------------------------------------------------------------
// DOM — container attribute, product cards, drop-down, overflow menu
// ---------------------------------------------------------------------------

const CONTAINER_UI_TYPE: configuration.uiType = 'container';
const CONTAINER_ATTRIBUTE_SELECTOR = 'cx-configurator-attribute-container';
const ACCORDION_TITLE_SELECTOR = '.cx-title';
const ACCORDION_HEADER_BUTTON_SELECTOR = '.cx-header button';

const PRODUCT_TITLE_SELECTOR = '#cxConfigProductName';
const PRODUCT_CARD_SELECTOR = '.cx-product-card:not(.message)';
const PRODUCT_CARD_HOST_SELECTOR = 'cx-configurator-attribute-product-card';
const PRODUCT_CARD_NAME_SELECTOR = '.cx-product-card-name';
const PRODUCT_CARD_ADD_BUTTON_SELECTOR = '.cx-product-card-action button';
const PRODUCT_CARD_ACTIONS_MENU_TOGGLE_SELECTOR =
  '.cx-product-card-actions-menu-toggle';
const PRODUCT_CARD_ACTIONS_MENU_LIST_SELECTOR =
  '.cx-product-card-actions-menu-list';
const ADD_BUTTON_TEXT = 'Add';

const DROPDOWN_SELECTOR = '.cx-drop-down';
const DROPDOWN_TRIGGER_SELECTOR = '.cx-drop-down .cx-trigger';
const DROPDOWN_LIST_SELECTOR = '.cx-drop-down .cx-list';
const DROPDOWN_SEARCH_INPUT_SELECTOR = '.cx-drop-down .cx-search-input';

const GROUP_MENU_ITEM_SELECTOR =
  'cx-configurator-group-menu:visible .cx-menu-item';
const GROUP_MENU_CONFLICT_ITEM_SELECTOR = '.cx-menu-conflict';

// ---------------------------------------------------------------------------
// OCC intercept aliases — registered by defineContainerAliases()
// ---------------------------------------------------------------------------

const ADD_CONTAINER_ROW_ALIAS = 'addContainerRow';
const COPY_CONTAINER_ROW_ALIAS = 'copyContainerRow';
const REMOVE_CONTAINER_ROW_ALIAS = 'removeContainerRow';

/**
 * Registers Cypress intercepts for CPQ container row create, copy and delete.
 *
 * Matchers use regex so OCC query params (`?lang=en&curr=USD`) are included.
 * Cypress `path` is pathname + search, so a glob that ends at `copyRow`
 * would miss those requests.
 *
 * Pair this with `configuration.defineAliases()`, which already excludes
 * `/rows` URLs so the two sets of intercepts do not overlap.
 *
 * @param {string} backendUrl - OCC configurator URL glob, e.g. `/occ/v2/powertools-spa/cpqconfigurator/**`
 */
export function defineContainerAliases(backendUrl: string) {
  const base = backendUrl
    .replace(/\/\*\*$/, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rowCollection = `${base}/[^/?]+/rows`;

  cy.intercept({
    method: 'POST',
    path: new RegExp(`^${rowCollection}(\\?|$)`),
  }).as(ADD_CONTAINER_ROW_ALIAS);
  cy.intercept({
    method: 'POST',
    path: new RegExp(`^${rowCollection}/[^/?]+/copyRow(\\?|$)`),
  }).as(COPY_CONTAINER_ROW_ALIAS);
  cy.intercept({
    method: 'DELETE',
    path: new RegExp(`^${rowCollection}/[^/?]+(\\?|$)`),
  }).as(REMOVE_CONTAINER_ROW_ALIAS);
}

/**
 * Waits for a container-row OCC call, then for the updating banner to vanish.
 *
 * @param {string} alias - Alias registered by `defineContainerAliases`
 */
function waitForContainerRow(alias: string): void {
  cy.wait(`@${alias}`);
  configuration.checkUpdatingMessageNotDisplayed();
}

/**
 * Returns the DOM id of a container accordion section.
 * Format: `cx-configurator--{selected-products|available-products}--{attributeName}`.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 * @return {string} - Section id
 */
export function getContainerSectionId(
  section: containerSection,
  attributeName: string
): string {
  return `cx-configurator--${section}--${attributeName}`;
}

/**
 * Returns the accordion section element for a container attribute.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 * @return {Cypress.Chainable<JQuery<HTMLElement>>} - Section element
 */
function getContainerSection(
  section: containerSection,
  attributeName: string
): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get(`#${getContainerSectionId(section, attributeName)}`);
}

/**
 * Visible title of a section, including the count in parentheses when given.
 * Example: `Selected Products (2)`.
 *
 * @param {containerSection} section - Selected or available products
 * @param {number} expectedCount - Count shown in the title
 * @return {string} - Title text
 */
function getSectionTitle(
  section: containerSection,
  expectedCount?: number
): string {
  const prefix = CONTAINER_SECTION_TITLES[section];
  return expectedCount === undefined ? prefix : `${prefix} (${expectedCount})`;
}

/**
 * Verifies that the container attribute (not a radio/checkbox bundle) is shown.
 *
 * @param {string} attributeName - Container attribute name
 */
export function checkContainerAttributeDisplayed(attributeName: string): void {
  configuration.checkAttributeDisplayed(attributeName, CONTAINER_UI_TYPE);
  cy.get(CONTAINER_ATTRIBUTE_SELECTOR).should('be.visible');
}

/**
 * Verifies that a section is visible and that its title shows the expected count.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 * @param {number} expectedCount - Product count shown in the title, e.g. `(3)`
 */
export function checkContainerSectionDisplayed(
  section: containerSection,
  attributeName: string,
  expectedCount?: number
): void {
  getContainerSection(section, attributeName).scrollIntoView();
  getContainerSection(section, attributeName).should('be.visible');
  getContainerSection(section, attributeName)
    .find(ACCORDION_TITLE_SELECTOR)
    .should('contain.text', getSectionTitle(section, expectedCount));
}

/**
 * Returns the product cards currently rendered in a section.
 * Collapsed sections and a closed drop-down have no cards.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 * @return {Cypress.Chainable<JQuery<HTMLElement>>} - Product cards
 */
export function getContainerSectionCards(
  section: containerSection,
  attributeName: string
): Cypress.Chainable<JQuery<HTMLElement>> {
  return getContainerSection(section, attributeName).find(
    PRODUCT_CARD_SELECTOR
  );
}

/**
 * Verifies whether the available-products searchable drop-down is shown.
 * The drop-down replaces the card list when the product count exceeds
 * `cpqContainerDropDownListThreshold`.
 *
 * @param {string} attributeName - Container attribute name
 * @param {boolean} displayed - Whether the drop-down should be visible
 */
export function checkAvailableProductsDropdownDisplayed(
  attributeName: string,
  displayed: boolean
): void {
  getContainerSection(AVAILABLE_PRODUCTS, attributeName).scrollIntoView();
  if (displayed) {
    getContainerSection(AVAILABLE_PRODUCTS, attributeName)
      .find(DROPDOWN_SELECTOR)
      .should('be.visible');
    getContainerSection(AVAILABLE_PRODUCTS, attributeName)
      .find(DROPDOWN_SEARCH_INPUT_SELECTOR)
      .should('be.visible');
  } else {
    getContainerSection(AVAILABLE_PRODUCTS, attributeName)
      .find(DROPDOWN_SELECTOR)
      .should('not.exist');
  }
}

/**
 * Opens the available-products drop-down when it is present and closed.
 * No-op when products are shown as a card list, or when the panel is already open.
 *
 * @param {string} attributeName - Container attribute name
 */
export function openAvailableProductsDropdownIfPresent(
  attributeName: string
): void {
  getContainerSection(AVAILABLE_PRODUCTS, attributeName).then(($section) => {
    if ($section.find(DROPDOWN_SELECTOR).length === 0) {
      return;
    }
    if ($section.find(`${DROPDOWN_LIST_SELECTOR}:visible`).length > 0) {
      return;
    }
    getContainerSection(AVAILABLE_PRODUCTS, attributeName)
      .find(DROPDOWN_TRIGGER_SELECTOR)
      .should('be.visible')
      .click();
    getContainerSection(AVAILABLE_PRODUCTS, attributeName)
      .find(DROPDOWN_LIST_SELECTOR)
      .should('be.visible');
  });
}

/**
 * Verifies the number of product cards in a section.
 * Opens the available-products drop-down first when it is displayed.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 * @param {number} expectedCount - Expected number of cards
 */
export function checkContainerSectionCardCount(
  section: containerSection,
  attributeName: string,
  expectedCount: number
): void {
  if (section === AVAILABLE_PRODUCTS && expectedCount > 0) {
    openAvailableProductsDropdownIfPresent(attributeName);
  }
  if (expectedCount === 0) {
    getContainerSectionCards(section, attributeName).should('not.exist');
    return;
  }
  getContainerSectionCards(section, attributeName).should(
    'have.length',
    expectedCount
  );
}

/**
 * Scrolls a product card into view. Cards in the available-products drop-down
 * sit in an overflow list, so `scrollIntoView()` on the window is not enough.
 *
 * @param {JQuery<HTMLElement>} $el - Product name or card element
 */
function scrollOverflowProductIntoView($el: JQuery<HTMLElement>): void {
  const element = $el[0];
  const list = $el.closest(DROPDOWN_LIST_SELECTOR).get(0);
  if (list) {
    const elRect = element.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    list.scrollTop += elRect.top - listRect.top;
    return;
  }
  element.scrollIntoView();
}

/**
 * Verifies that the given product names are visible in a section.
 * Pass an empty list when the section has no products.
 * Opens the available-products drop-down first when it is displayed.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 * @param {string[]} productNames - Product names that must be visible
 */
export function checkProductInSection(
  section: containerSection,
  attributeName: string,
  productNames: string[]
): void {
  getContainerSection(section, attributeName).scrollIntoView();
  getContainerSection(section, attributeName).should('be.visible');

  if (!productNames.length) {
    getContainerSectionCards(section, attributeName).should('not.exist');
    return;
  }

  if (section === AVAILABLE_PRODUCTS) {
    openAvailableProductsDropdownIfPresent(attributeName);
  }

  productNames.forEach((productName) => {
    getContainerSection(section, attributeName)
      .contains(PRODUCT_CARD_NAME_SELECTOR, productName)
      .then(($name) => scrollOverflowProductIntoView($name));
    getContainerSection(section, attributeName)
      .contains(PRODUCT_CARD_NAME_SELECTOR, productName)
      .should('be.visible');
  });
}

/**
 * Verifies the Selected Products section: title count, card count, and names.
 *
 * @param {string} attributeName - Container attribute name
 * @param {number} expectedCount - Product count shown in the title
 * @param {string[]} productNames - Names that must be visible; omit to skip
 */
export function checkSelectedProducts(
  attributeName: string,
  expectedCount: number,
  productNames: string[] = []
): void {
  checkContainerSectionDisplayed(
    SELECTED_PRODUCTS,
    attributeName,
    expectedCount
  );
  checkContainerSectionCardCount(
    SELECTED_PRODUCTS,
    attributeName,
    expectedCount
  );
  if (productNames.length) {
    checkProductInSection(SELECTED_PRODUCTS, attributeName, productNames);
  }
}

/**
 * Verifies the Available Products section: title count, drop-down vs cards,
 * and product names.
 *
 * @param {string} attributeName - Container attribute name
 * @param {availableProductsExpectation} expectation - Count, names and layout
 */
export function checkAvailableProducts(
  attributeName: string,
  expectation: availableProductsExpectation
): void {
  checkContainerSectionDisplayed(
    AVAILABLE_PRODUCTS,
    attributeName,
    expectation.count
  );
  checkAvailableProductsDropdownDisplayed(attributeName, expectation.dropdown);
  checkProductInSection(
    AVAILABLE_PRODUCTS,
    attributeName,
    expectation.products
  );
}

/**
 * Verifies that a product name is not shown in a section.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 */
export function checkProductNotInSection(
  section: containerSection,
  attributeName: string,
  productName: string
): void {
  getContainerSection(section, attributeName).should(
    'not.contain',
    productName
  );
}

/**
 * Clicks a section header to expand or collapse it, then checks `aria-expanded`.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 * @param {boolean} expanded - Expected `aria-expanded` value after the click
 */
export function toggleContainerSection(
  section: containerSection,
  attributeName: string,
  expanded: boolean
): void {
  getContainerSection(section, attributeName)
    .find(ACCORDION_HEADER_BUTTON_SELECTOR)
    .should('be.visible')
    .click()
    .should('have.attr', 'aria-expanded', String(expanded));
}

/**
 * Collapses a container accordion section. Product cards are then unmounted.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 */
export function collapseContainerSection(
  section: containerSection,
  attributeName: string
): void {
  toggleContainerSection(section, attributeName, false);
}

/**
 * Expands a container accordion section.
 *
 * @param {containerSection} section - Selected or available products
 * @param {string} attributeName - Container attribute name
 */
export function expandContainerSection(
  section: containerSection,
  attributeName: string
): void {
  toggleContainerSection(section, attributeName, true);
}

/**
 * Leaves a nested product configuration and returns to the parent container.
 *
 * Adding or editing a row opens that product's groups. The group menu then
 * shows the nested structure. This helper clicks Back until `parentGroupName`
 * is listed, selects it, and asserts the container is visible again.
 *
 * @param {string} containerName - Container attribute name
 * @param {string} parentGroupName - Parent group name shown in the group menu
 */
export function navigateToParent(
  containerName: string,
  parentGroupName: string
): void {
  configuration.clickGroupMenuBack();
  cy.get(GROUP_MENU_ITEM_SELECTOR)
    .not(GROUP_MENU_CONFLICT_ITEM_SELECTOR)
    .should('be.visible')
    .then(($items) => {
      const parentVisible = $items
        .toArray()
        .some((el) => (el.textContent ?? '').includes(parentGroupName));
      if (!parentVisible) {
        configuration.checkGroupMenuBackDisplayed();
        configuration.clickGroupMenuBack();
      }
    });
  configuration.clickGroupMenuItem(parentGroupName);
  checkContainerAttributeDisplayed(containerName);
}

/**
 * Clicks Add on an available product and waits for the OCC create-row call.
 * Opens the drop-down first when available products are shown that way.
 *
 * After this call the UI is on the nested product configuration — use
 * `navigateToParent` (or `addProductAndReturnToParent`) to come back.
 *
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 */
export function addAvailableProductAndWait(
  attributeName: string,
  productName: string
): void {
  openAvailableProductsDropdownIfPresent(attributeName);
  getContainerSection(AVAILABLE_PRODUCTS, attributeName)
    .contains(PRODUCT_CARD_SELECTOR, productName)
    .then(($card) => scrollOverflowProductIntoView($card));
  getContainerSection(AVAILABLE_PRODUCTS, attributeName)
    .contains(PRODUCT_CARD_SELECTOR, productName)
    .find(PRODUCT_CARD_ADD_BUTTON_SELECTOR)
    .contains(ADD_BUTTON_TEXT)
    .should('be.visible')
    .click();
  waitForContainerRow(ADD_CONTAINER_ROW_ALIAS);
}

/**
 * Adds an available product, returns to the parent container, and checks
 * that the product appears under Selected Products.
 *
 * @param {string} containerName - Container attribute name
 * @param {string} productName - Product name
 * @param {string} parentGroupName - Parent group name shown in the group menu
 * @param {number} times - How many times to add this product; default is 1
 */
export function addProductAndReturnToParent(
  containerName: string,
  productName: string,
  parentGroupName: string,
  times: number = 1
): void {
  for (let i = 0; i < times; i++) {
    addAvailableProductAndWait(containerName, productName);
    navigateToParent(containerName, parentGroupName);
    checkProductInSection(SELECTED_PRODUCTS, containerName, [productName]);
  }
}

/**
 * Returns the selected product card with the given name and index.
 * Several cards can share the same name (for example after Copy);
 * `index` picks among those matches.
 *
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 * @return {Cypress.Chainable<JQuery<HTMLElement>>} - Matching product card
 */
export function getSelectedProductCard(
  attributeName: string,
  productName: string,
  index: number
): Cypress.Chainable<JQuery<HTMLElement>> {
  return getSelectedProductCardRow(attributeName, productName, index).find(
    PRODUCT_CARD_SELECTOR
  );
}

/**
 * Returns the selected product card host element (includes row messages).
 *
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 * @return {Cypress.Chainable<JQuery<HTMLElement>>} - Matching product card row
 */
export function getSelectedProductCardRow(
  attributeName: string,
  productName: string,
  index: number
): Cypress.Chainable<JQuery<HTMLElement>> {
  return getContainerSection(SELECTED_PRODUCTS, attributeName)
    .find(PRODUCT_CARD_HOST_SELECTOR)
    .filter((_, el) =>
      Cypress.$(el)
        .find(PRODUCT_CARD_NAME_SELECTOR)
        .text()
        .includes(productName)
    )
    .eq(index);
}

/**
 * Verifies that a validation message is shown on a selected product card row.
 *
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 * @param {string} message - Expected message text
 */
export function checkSelectedProductMessage(
  attributeName: string,
  productName: string,
  index: number,
  message: string
): void {
  getSelectedProductCardRow(attributeName, productName, index)
    .find('.cx-error-msg, .cx-warning-message')
    .contains(message.trim())
    .should('be.visible');
}

/**
 * Opens the overflow menu (⋯) of a selected product card.
 *
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 */
export function openSelectedProductActionsMenu(
  attributeName: string,
  productName: string,
  index: number
): void {
  getSelectedProductCard(attributeName, productName, index)
    .find(PRODUCT_CARD_ACTIONS_MENU_TOGGLE_SELECTOR)
    .should('be.visible')
    .click();
  cy.get(PRODUCT_CARD_ACTIONS_MENU_LIST_SELECTOR).should('be.visible');
}

/**
 * Chooses Edit, Copy or Remove from a selected product's overflow menu.
 *
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 * @param {containerRowAction} action - Menu action
 */
export function selectSelectedProductAction(
  attributeName: string,
  productName: string,
  index: number,
  action: containerRowAction
): void {
  openSelectedProductActionsMenu(attributeName, productName, index);
  cy.get(`${PRODUCT_CARD_ACTIONS_MENU_LIST_SELECTOR} button`)
    .contains(action)
    .should('be.visible')
    .click();
}

/**
 * Opens the nested configuration of a selected product via Edit.
 *
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 */
export function editSelectedProduct(
  attributeName: string,
  productName: string,
  index: number
): void {
  selectSelectedProductAction(attributeName, productName, index, 'Edit');
  configuration.checkUpdatingMessageNotDisplayed();
  checkProductTitleContains(productName);
}

/**
 * Copies a selected product and waits for the OCC copy-row call.
 * After this call the UI is on the nested copy — use
 * `copySelectedProductAndReturnToParent` to come back.
 *
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 */
export function copySelectedProductAndWait(
  attributeName: string,
  productName: string,
  index: number
): void {
  selectSelectedProductAction(attributeName, productName, index, 'Duplicate');
  waitForContainerRow(COPY_CONTAINER_ROW_ALIAS);
}

/**
 * Edits a selected product and returns to the parent container.
 *
 * @param {string} containerName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 * @param {string} parentGroupName - Parent group name shown in the group menu
 */
export function editSelectedProductAndReturnToParent(
  containerName: string,
  productName: string,
  index: number,
  parentGroupName: string
): void {
  editSelectedProduct(containerName, productName, index);
  navigateToParent(containerName, parentGroupName);
}

/**
 * Copies a selected product and returns to the parent container.
 *
 * @param {string} containerName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 */
export function copySelectedProductAndReturnToParent(
  containerName: string,
  productName: string,
  index: number
): void {
  copySelectedProductAndWait(containerName, productName, index);
}

/**
 * Removes a selected product and waits for the OCC delete-row call.
 * The UI stays on the parent container.
 *
 * @param {string} attributeName - Container attribute name
 * @param {string} productName - Product name
 * @param {number} index - Zero-based index among cards with this name
 */
export function removeSelectedProductAndWait(
  attributeName: string,
  productName: string,
  index: number
): void {
  selectSelectedProductAction(attributeName, productName, index, 'Remove');
  waitForContainerRow(REMOVE_CONTAINER_ROW_ALIAS);
}

/**
 * Verifies that the configurator product title contains the given text.
 * Used after Edit/Add to confirm the nested product is open.
 *
 * @param {string} text - Expected title fragment
 */
export function checkProductTitleContains(text: string): void {
  cy.get(PRODUCT_TITLE_SELECTOR).should('contain.text', text);
}

/**
 * Verifies that the configurator product title does not contain the given text.
 *
 * @param {string} text - Title fragment that must not be present
 */
export function checkProductTitleDoesNotContain(text: string): void {
  cy.get(PRODUCT_TITLE_SELECTOR).should('not.contain.text', text);
}
