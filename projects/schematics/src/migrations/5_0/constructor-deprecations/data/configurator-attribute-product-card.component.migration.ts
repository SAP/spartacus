import {
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  TRANSLATION_SERVICE,
  CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT,
  SPARTACUS_CORE,
  PRODUCT_SERVICE,
  KEYBOARD_FOCUS_SERVICE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    //feature-libs/product-configurator/rulebased/components/attribute/product-card/configurator-attribute-product-card.component.ts
    class: CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
      {
        className: PRODUCT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: KEYBOARD_FOCUS_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
