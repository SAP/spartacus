import {
  SHIPPING_ADDRESS_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const SHIPPING_ADDRESS_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/src/cms-components/checkout/components/shipping-address/shipping-address.component.ts
  selector: 'cx-shipping-address',
  componentClassName: SHIPPING_ADDRESS_COMPONENT,
  removedProperties: [
    {
      name: 'existingAddresses$',
      comment: `${TODO_SPARTACUS} 'existingAddresses$' property has been removed.`,
    },
    {
      name: 'newAddressFormManuallyOpened',
      comment: `${TODO_SPARTACUS} 'newAddressFormManuallyOpened' property has been renamed to 'addressFormOpened'`,
    },
    {
      name: 'goNext',
      comment: `${TODO_SPARTACUS} 'goNext' method has been renamed to 'next'`,
    },
    {
      name: 'goPrevious',
      comment: `${TODO_SPARTACUS} 'goPrevious' method has been renamed to 'back'`,
    },
  ],
};
