import {
  CONFIGURATOR_ATTRIBUTE_CHECKBOX_LIST_COMPONENT,
  CONFIGURATOR_ATTRIBUTE_QUANTITY_SERVICE,
  CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ATTRIBUTE_CHECKBOX_LIST_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/product-configurator/rulebased/components/attribute/types/checkbox-list/configurator-attribute-checkbox-list.component.ts
    class: CONFIGURATOR_ATTRIBUTE_CHECKBOX_LIST_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
      {
        className: CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
    ],
    addParams: [
      {
        className: CONFIGURATOR_ATTRIBUTE_QUANTITY_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
    ],
  };
