import {
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  TRANSLATION_SERVICE,
  SPARTACUS_CORE,
  PRODUCT_SERVICE,
  CONFIGURATOR_OVERVIEW_BUNDLE_ATTRIBUTE_COMPONENT,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_OVERVIEW_BUNDLE_ATTRIBUTE_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    //feature-libs/product-configurator/rulebased/components/overview-bundle-attribute/configurator-overview-bundle-attribute.component.ts
    class: CONFIGURATOR_OVERVIEW_BUNDLE_ATTRIBUTE_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
      {
        className: PRODUCT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
