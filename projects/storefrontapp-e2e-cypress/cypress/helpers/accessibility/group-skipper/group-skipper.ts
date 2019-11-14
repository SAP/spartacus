import {
  GroupSkipperPageConfig,
  GroupSkipperConfig,
} from './group-skipper.config';

export function testGroupSkipperFromConfig(config: GroupSkipperConfig) {
  Object.keys(config).forEach(page => {
    describe(page, () => {
      it('should tab through group skippers', () => {
        testGroupSkipperPagesFromConfig(config[page]);
      });
    });
  });
}

export function testGroupSkipperPagesFromConfig(
  config: GroupSkipperPageConfig
) {
  cy.visit(config.pageUrl);

  // Wait for group skippers to load
  checkGroupSkipperAnchorsHaveLoaded(config.expectedSkipperCount);

  cy.get('body').focus();

  // Should tab through anchor tags
  for (let i = 0; i < config.expectedSkipperCount; i++) {
    cy.tab();
    checkFocusIsWithinGroupSkipper();
  }

  // Should tab out of group skipper anchors
  cy.tab();
  checkFocusIsNotWithinGroupSkipper();
}

function checkGroupSkipperAnchorsHaveLoaded(noOfAnchors: number) {
  cy.get('cx-group-skipper')
    .find('a')
    .should('have.length', noOfAnchors);
}

function checkFocusIsWithinGroupSkipper() {
  cy.focused()
    .parent()
    .should('have.prop', 'tagName')
    .should('eq', 'CX-GROUP-SKIPPER');
  cy.focused()
    .should('have.prop', 'tagName')
    .should('eq', 'A');
}

function checkFocusIsNotWithinGroupSkipper() {
  cy.focused()
    .parent()
    .should('have.prop', 'tagName')
    .should('not.eq', 'CX-GROUP-SKIPPER');
}
