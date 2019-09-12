import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../../tabbing-order';
import { fillShippingAddress } from '../../../checkout-forms';
import { user } from '../../../../sample-data/checkout-flow';

export function shippingAddressTabbingOrder(config: TabElement[]) {
  const { firstName, lastName, phone, address } = user;
  fillShippingAddress({ firstName, lastName, phone, address }, false);

  getFormFieldByValue(config[0].value).within(() => {
    cy.get('input')
      .first()
      .focus();
  });

  checkAllElements(config);
}
