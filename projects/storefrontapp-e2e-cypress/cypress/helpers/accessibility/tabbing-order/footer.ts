import { checkAllElements, TabElement } from '../tabbing-order';

export function footerTabbingOrder(config: TabElement[]) {
  cy.visit('/login');
  cy.get('cx-footer-navigation > cx-navigation-ui a')
    .first()
    .focus();

  checkAllElements(config);
}
