import {
  DELIVERY_MODE_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const DELIVERY_MODE_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/src/cms-components/checkout/components/delivery-mode/delivery-mode.component.ts
  selector: 'cx-delivery-mode',
  componentClassName: DELIVERY_MODE_COMPONENT,
  removedProperties: [
    {
      name: 'checkoutStepUrlNext',
      comment: `${TODO_SPARTACUS} 'checkoutStepUrlNext' property has been removed.`,
    },
    {
      name: 'checkoutStepUrlPrevious',
      comment: `${TODO_SPARTACUS} 'checkoutStepUrlPrevious' property has been removed.`,
    },
  ],
};
