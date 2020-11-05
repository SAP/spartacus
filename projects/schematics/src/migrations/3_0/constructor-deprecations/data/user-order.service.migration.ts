import {
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  USER_ORDER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_ORDER_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: USER_ORDER_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [],
  addParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
