const continueToCartButtonSelector =
  'cx-configurator-add-to-cart-button button';

const resolveIssuesText = ' must be resolved before checkout.  Resolve Issues';
<<<<<<< HEAD

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
    this.checkConfigOverviewPageDisplayed();
  });
}
=======
>>>>>>> develop

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
<<<<<<< HEAD
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
 * Verifies whether the issues banner is displayed.
 *
 * @param element - HTML element
 * @param {number} numberOfIssues - Expected number of conflicts
 */
export function checkNotificationBannerOnOP(
  element,
  numberOfIssues?: number
): void {
  element
    .get('.cx-error-msg')
    .first()
    .invoke('text')
    .then((text) => {
      expect(text).contains(resolveIssuesText);
      if (numberOfIssues > 1) {
        const issues = text.replace(' issues' + resolveIssuesText, '').trim();
        expect(issues).match(/^[0-9]/);
        expect(issues).eq(numberOfIssues.toString());
      }
    });
}

/**
 * Verifies whether the issues banner is displayed and the number of issues are accurate.
 *
 * @param {number} numberOfIssues - Expected number of issues
 */
export function verifyNotificationBannerOnOP(numberOfIssues?: number): void {
  const element = cy.get('cx-configurator-overview-notification-banner');
  if (numberOfIssues) {
    this.checkNotificationBannerOnOP(element, numberOfIssues);
  } else {
    element.get('.cx-error-msg').should('not.be.visible');
=======
 * Waits for the notitication banner to display the correct number of issues
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
>>>>>>> develop
  }

  element.get(`.cx-error-msg:contains(${numberOfIssueText})`);
}

<<<<<<< HEAD
/**
 * Waits for the notitication banner to display the correct number of issues
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

=======
>>>>>>> develop
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
 * Verifies whether the attribute name and value are displayed at the given position.
 */
export function checkAttrDisplayed(
  attributeName: string,
  valueName: string,
  attributeIdx: number
): void {
  cy.get(
    'cx-configurator-cpq-overview-attribute, cx-configurator-overview-attribute'
  )
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
 * Verifies whether the attribute price is displayed at the given position.
 */
export function checkAttrPriceDisplayed(
  priceString: string,
  attributeIdx: number
): void {
  cy.get(
    'cx-configurator-cpq-overview-attribute, cx-configurator-overview-attribute'
  )
    .eq(attributeIdx)
    .within(() => {
      if (priceString) {
        cy.get('cx-configurator-price').should('contain.text', priceString);
      } else {
        cy.get('cx-configurator-price').should('not.exist');
      }
    });
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
