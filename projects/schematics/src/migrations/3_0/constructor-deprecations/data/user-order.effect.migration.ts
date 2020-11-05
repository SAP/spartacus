import {
  REPLENISHMENT_ORDER_CONNECTOR,
  SPARTACUS_CORE,
  USER_ORDER_EFFECT,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_ORDER_EFFECT_MIGRATION: ConstructorDeprecation = {
  class: USER_ORDER_EFFECT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [],
  addParams: [
    {
      className: REPLENISHMENT_ORDER_CONNECTOR,
      importPath: SPARTACUS_CORE,
    },
  ],
};
