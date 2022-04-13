import {
  CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ATTRIBUTE_INPUT_FIELD_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/product-configurator/rulebased/components/attribute/types/input-field/configurator-attribute-numeric-input-field.component.ts
    class: CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [],
    addParams: [
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
