import { SHIPPING_ADDRESS_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const SHIPPING_ADDRESS_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/checkout/components/shipping-address/shipping-address.component.ts
  selector: 'cx-shipping-address',
  componentClassName: SHIPPING_ADDRESS_COMPONENT,
  removedProperties: [
    {
      name: 'existingAddresses$',
      comment: `'existingAddresses$' property has been removed.`,
    },
    {
      name: 'newAddressFormManuallyOpened',
      comment: `'newAddressFormManuallyOpened' property has been renamed to 'addressFormOpened'`,
    },
    {
      name: 'goNext',
      comment: `'goNext' method has been renamed to 'next'`,
    },
    {
      name: 'goPrevious',
      comment: `'goPrevious' method has been renamed to 'back'`,
    },
  ],
};
