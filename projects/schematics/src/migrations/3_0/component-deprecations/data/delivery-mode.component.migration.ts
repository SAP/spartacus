import { DELIVERY_MODE_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const DELIVERY_MODE_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/checkout/components/delivery-mode/delivery-mode.component.ts
  selector: 'cx-delivery-mode',
  componentClassName: DELIVERY_MODE_COMPONENT,
  removedProperties: [
    {
      name: 'checkoutStepUrlNext',
      comment: `'checkoutStepUrlNext' property has been removed.`,
    },
    {
      name: 'checkoutStepUrlPrevious',
      comment: `'checkoutStepUrlPrevious' property has been removed.`,
    },
    {
      name: 'currentDeliveryModeId',
      comment: `'currentDeliveryModeId' property has been removed. The current delivery mode selection is stored in the form called "mode" in the "deliveryModeId" input field.`,
    },
  ],
};
