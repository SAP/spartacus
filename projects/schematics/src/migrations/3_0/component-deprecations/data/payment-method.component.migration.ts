import { PAYMENT_METHOD_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const PAYMENT_METHOD_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/checkout/components/payment-method/payment-method.component.ts
  selector: 'cx-payment-method',
  componentClassName: PAYMENT_METHOD_COMPONENT,
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
      name: 'goNext',
      comment: `'goNext' method has been renamed to 'next'`,
    },
    {
      name: 'goPrevious',
      comment: `'goPrevious' method has been renamed to 'back'`,
    },
  ],
};
