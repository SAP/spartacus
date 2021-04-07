import {
  DYNAMIC_ATTRIBUTE_SERVICE,
  SMART_EDIT_SERVICE,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/cms/services/dynamic-attribute.service.ts
  class: DYNAMIC_ATTRIBUTE_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [],
  addParams: [
    {
      className: SMART_EDIT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
