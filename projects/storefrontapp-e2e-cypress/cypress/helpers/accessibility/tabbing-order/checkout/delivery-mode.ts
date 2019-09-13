import { TabElement, checkAllElements } from '../../tabbing-order';

export function deliveryModeTabbingOrder(config: TabElement[]) {
  cy.visit('/checkout/delivery-mode');
  cy.get('input[type=radio][formcontrolname=deliveryModeId]')
    .first()
    .focus()
    .click();

  checkAllElements(config);
}
