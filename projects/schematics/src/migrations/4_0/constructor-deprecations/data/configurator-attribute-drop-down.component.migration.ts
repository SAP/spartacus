import {
  CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT,
  CONFIGURATOR_ATTRIBUTE_QUANTITY_SERVICE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/product-configurator/rulebased/components/attribute/types/drop-down/configurator-attribute-drop-down.component.ts
  class: CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  deprecatedParams: [],
  addParams: [
    {
      className: CONFIGURATOR_ATTRIBUTE_QUANTITY_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
  ],
};
