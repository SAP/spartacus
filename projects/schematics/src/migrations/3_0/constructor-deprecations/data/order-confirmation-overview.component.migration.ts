import {
  ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [],
  removeParams: [
    {
      className: TRANSLATION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
