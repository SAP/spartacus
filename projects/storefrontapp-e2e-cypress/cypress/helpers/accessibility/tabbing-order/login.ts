import { verifyTabbingOrder } from '../tabbing-order';
import { fillLoginForm } from '../../auth-forms';
import { user } from '../../../sample-data/checkout-flow';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.LoginPageTemplate';

export function loginTabbingOrder(
  elements: TabElement[],
  prefillForm: boolean = false
) {
  cy.visit('/login');

  if (prefillForm) {
    const { email: username, password } = user;
    fillLoginForm({ username, password });
  }

  verifyTabbingOrder(containerSelector, elements);
}
