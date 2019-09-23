import { checkAllElements, TabElement } from '../tabbing-order';

export function headerDesktopTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  cy.get('header cx-site-context-selector select')
    .first()
    .focus();

  checkAllElements(config);
}
