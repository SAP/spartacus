import {
  CONFIGURATOR_FORM_COMPONENT,
  CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_FORM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  //feature-libs/product-configurator/rulebased/components/form/configurator-form.component.ts
  class: CONFIGURATOR_FORM_COMPONENT,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  deprecatedParams: [],
  addParams: [
    {
      className: CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
  ],
};
