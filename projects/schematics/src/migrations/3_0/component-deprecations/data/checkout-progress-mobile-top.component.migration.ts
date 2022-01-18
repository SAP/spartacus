import { CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/checkout/components/checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.component.ts
  selector: 'cx-checkout-progress-mobile-top',
  componentClassName: CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT,
  removedProperties: [
    {
      name: 'routerState$',
      comment: `'routerState$' property has been removed.`,
    },
    {
      name: 'activeStepUrl',
      comment: `'activeStepUrl' property has been removed.`,
    },
    {
      name: 'steps',
      comment: `'steps' property has been removed. Use '$steps' observable instead`,
    },
  ],
};
