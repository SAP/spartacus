import {
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  TRANSLATION_SERVICE,
  CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    //feature-libs/product-configurator/rulebased/components/attribute/product-card/configurator-attribute-product-card.component.ts
    class: CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [],
    addParams: [
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
