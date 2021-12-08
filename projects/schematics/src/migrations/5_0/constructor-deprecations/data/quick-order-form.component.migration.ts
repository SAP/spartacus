import {
  ANGULAR_CORE,
  CHANGE_DETECTOR_REF,
  CONFIG,
  GLOBAL_MESSAGE_SERVICE,
  QUICK_ORDER_FACADE,
  QUICK_ORDER_FORM_COMPONENT,
  SPARTACUS_CART_QUICK_ORDER_COMPONENTS,
  SPARTACUS_CART_QUICK_ORDER_ROOT,
  SPARTACUS_CORE,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const QUICK_ORDER_FORM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/cart/quick-order/components/quick-order/form/quick-order-form.component.ts
  class: QUICK_ORDER_FORM_COMPONENT,
  importPath: SPARTACUS_CART_QUICK_ORDER_COMPONENTS,
  deprecatedParams: [
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: QUICK_ORDER_FACADE,
      importPath: SPARTACUS_CART_QUICK_ORDER_ROOT,
    },
  ],
  removeParams: [
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CONFIG,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHANGE_DETECTOR_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
};
