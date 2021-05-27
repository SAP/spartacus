import {
  CHECKOUT_EVENT_BUILDER,
  CHECKOUT_EVENT_LISTENER,
  CHECKOUT_EVENT_MODULE,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_EVENT_MODULE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/checkout/events/checkout-event.module.ts
  class: CHECKOUT_EVENT_MODULE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: CHECKOUT_EVENT_BUILDER, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    { className: CHECKOUT_EVENT_LISTENER, importPath: SPARTACUS_CORE },
  ],
};
