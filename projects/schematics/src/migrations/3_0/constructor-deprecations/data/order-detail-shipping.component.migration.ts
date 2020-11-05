import {
  ORDER_DETAIL_SHIPPING_COMPONENT,
  SPARTACUS_CORE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: ORDER_DETAIL_SHIPPING_COMPONENT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [],
  removeParams: [
    {
      className: TRANSLATION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
