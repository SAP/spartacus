import {
  SPARTACUS_CORE,
  WINDOW_REF,
  SPARTACUS_STOREFINDER,
  STORE_DATA_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STORE_DATA_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/storefinder/core/facade/store-data.service.ts
  class: STORE_DATA_SERVICE,
  importPath: SPARTACUS_STOREFINDER,
  deprecatedParams: [],
  addParams: [
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
};
