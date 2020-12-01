import {
  PAYMENT_METHOD_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const PAYMENT_METHOD_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/src/cms-components/checkout/components/payment-method/payment-method.component.ts
  selector: 'cx-payment-method',
  componentClassName: PAYMENT_METHOD_COMPONENT,
  removedProperties: [
    {
      name: 'checkoutStepUrlNext',
      comment: `${TODO_SPARTACUS} 'checkoutStepUrlNext' property has been removed.`,
    },
    {
      name: 'checkoutStepUrlPrevious',
      comment: `${TODO_SPARTACUS} 'checkoutStepUrlPrevious' property has been removed.`,
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
