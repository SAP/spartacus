import {
  ACTIONS,
  NGRX_EFFECTS,
  REPLENISHMENT_ORDER_CONNECTOR,
  SPARTACUS_CORE,
  USER_ORDERS_EFFECT,
  USER_ORDER_CONNECTOR,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_ORDERS_EFFECT_MIGRATION: ConstructorDeprecation = {
  //projects/core/src/user/store/effects/user-orders.effect.ts
  class: USER_ORDERS_EFFECT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: ACTIONS,
      importPath: NGRX_EFFECTS,
    },
    {
      className: USER_ORDER_CONNECTOR,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: REPLENISHMENT_ORDER_CONNECTOR,
      importPath: SPARTACUS_CORE,
    },
  ],
};
