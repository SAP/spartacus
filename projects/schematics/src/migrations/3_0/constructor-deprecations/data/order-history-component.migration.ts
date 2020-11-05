import {
  ORDER_HISTORY_COMPONENT,
  SPARTACUS_CORE,
  USER_REPLENISHMENT_ORDER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_HISTORY_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: ORDER_HISTORY_COMPONENT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [],
  addParams: [
    {
      className: USER_REPLENISHMENT_ORDER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
