import { CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION: ComponentData =
  {
    // projects/storefrontlib/cms-components/checkout/components/checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.component.ts
    selector: 'cx-checkout-progress-mobile-bottom',
    componentClassName: CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT,
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
