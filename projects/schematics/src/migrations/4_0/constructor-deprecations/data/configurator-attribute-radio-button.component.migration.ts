import {
  CONFIGURATOR_ATTRIBUTE_QUANTITY_SERVICE,
  CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/product-configurator/rulebased/components/attribute/types/radio-button/configurator-attribute-radio-button.component.ts
  class: CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  deprecatedParams: [],
  addParams: [
    {
      className: CONFIGURATOR_ATTRIBUTE_QUANTITY_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
  ],
};
