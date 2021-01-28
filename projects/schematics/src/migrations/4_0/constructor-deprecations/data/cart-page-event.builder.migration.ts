import {
  ACTION_SUBJECT,
  CART_PAGE_EVENT_BUILDER,
  EVENT_SERVICE,
  RXJS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/events/cart/cart-page-event.builder.ts
  class: CART_PAGE_EVENT_BUILDER,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    { className: ACTION_SUBJECT, importPath: RXJS },
    { className: EVENT_SERVICE, importPath: SPARTACUS_CORE },
  ],
  removeParams: [{ className: ACTION_SUBJECT, importPath: RXJS }],
};
