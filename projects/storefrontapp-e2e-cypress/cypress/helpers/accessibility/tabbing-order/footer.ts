import { checkAllElements } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function footerTabbingOrder(config: TabElement[]) {
  cy.visit('/login');
  cy.get('cx-footer-navigation > cx-navigation-ui a')
    .first()
    .focus();

  checkAllElements(config);
}
