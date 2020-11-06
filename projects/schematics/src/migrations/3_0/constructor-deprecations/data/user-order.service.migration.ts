import {
  NGRX_STORE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  STORE,
  USER_ID_SERVICE,
  USER_ORDER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const USER_ORDER_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: USER_ORDER_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
    },
    {
      className: USER_ID_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
