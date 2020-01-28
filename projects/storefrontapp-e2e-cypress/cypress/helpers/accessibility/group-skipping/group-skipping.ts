import {
  GroupSkippingConfig,
  GroupSkippingPageConfig,
} from './group-skipping.config';

export function verifyGroupSkippingFromConfig(config: GroupSkippingConfig) {
  Object.keys(config).forEach(page => {
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

  // Wait for group skippers to load
  checkGroupSkipperAnchorsHaveLoaded(config.expectedSkipperCount);

  cy.get('body').focus();

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
  cy.get('cx-skip-link')
    .find('button')
    .should('have.length', noOfAnchors);
}

function checkFocusIsWithinGroupSkipper() {
  cy.focused()
    .parent()
    .should('have.prop', 'tagName')
    .should('eq', 'CX-SKIP-LINK');
  cy.focused()
    .should('have.prop', 'tagName')
    .should('eq', 'BUTTON');
}

function checkFocusIsNotWithinGroupSkipper() {
  cy.focused()
    .parent()
    .should('have.prop', 'tagName')
    .should('not.eq', 'CX-SKIP-LINK');
}
