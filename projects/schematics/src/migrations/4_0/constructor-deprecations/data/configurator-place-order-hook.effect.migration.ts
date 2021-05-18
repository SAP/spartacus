import {
  ACTIONS,
  ACTIVE_CART_SERVICE,
  COMMON_CONFIGURATOR_UTILS_SERVICE,
  CONFIGURATOR_PLACE_ORDER_HOOK_EFFECTS,
  EVENT_SERVICE,
  NGRX_EFFECTS,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_PLACE_ORDER_HOOK_EFFECTS_MIGRATION: ConstructorDeprecation = {
  // feature-libs/product-configurator/rulebased/core/state/effects/configurator-place-order-hook.effect.ts
  class: CONFIGURATOR_PLACE_ORDER_HOOK_EFFECTS,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR,
  deprecatedParams: [
    { className: ACTIONS, importPath: NGRX_EFFECTS },
    { className: ACTIVE_CART_SERVICE, importPath: SPARTACUS_CORE },
    {
      className: COMMON_CONFIGURATOR_UTILS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR,
    },
  ],
  addParams: [{ className: EVENT_SERVICE, importPath: SPARTACUS_CORE }],
};
