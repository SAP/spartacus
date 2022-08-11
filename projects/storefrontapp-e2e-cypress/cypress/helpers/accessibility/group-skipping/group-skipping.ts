import {
  GroupSkippingConfig,
  GroupSkippingPageConfig,
} from './group-skipping.config';

export function verifyGroupSkippingFromConfig(config: GroupSkippingConfig) {
  Object.keys(config).forEach((page) => {
    describe(page, () => {
      it('should tab through group skippers', () => {
        verifyGroupSkippingOnPageFromConfig(config[page]);
      });
    });
  });
}

export function verifyGroupSkippingOnPageFromConfig(
  config: GroupSkippingPageConfig
) {
  cy.visit(config.pageUrl);

  // Wait for group skippers and page content to load
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/components`,
  }).as('getComponents');

  checkGroupSkipperAnchorsHaveLoaded(config.expectedSkipperCount);
  cy.wait('@getComponents');

  cy.get('cx-storefront').focus();

  // Should tab through anchor tags
  for (let i = 0; i < config.expectedSkipperCount; i++) {
    cy.pressTab();
    checkFocusIsWithinGroupSkipper();
  }

  // Should tab out of group skipper anchors
  cy.pressTab();
  checkFocusIsNotWithinGroupSkipper();
}

function checkGroupSkipperAnchorsHaveLoaded(noOfAnchors: number) {
  cy.get('cx-skip-link').find('button').should('have.length', noOfAnchors);
}

function checkFocusIsWithinGroupSkipper() {
  cy.focused()
    .parentsUntil('cx-skip-link')
    .parent()
    .should('have.prop', 'tagName')
    .should('eq', 'CX-SKIP-LINK');
  cy.focused().should('have.prop', 'tagName').should('eq', 'BUTTON');
}

function checkFocusIsNotWithinGroupSkipper() {
  cy.focused()
    .parent()
    .parent()
    .should('have.prop', 'tagName')
    .should('not.eq', 'CX-SKIP-LINK');
}
