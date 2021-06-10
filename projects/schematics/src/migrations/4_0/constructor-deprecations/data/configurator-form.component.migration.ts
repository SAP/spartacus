import {
  CONFIGURATOR_COMMONS_SERVICE,
  CONFIGURATOR_FORM_COMPONENT,
  CONFIGURATOR_GROUPS_SERVICE,
  CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
  CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
  LANGUAGE_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_FORM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  //feature-libs/product-configurator/rulebased/components/form/configurator-form.component.ts
  class: CONFIGURATOR_FORM_COMPONENT,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  deprecatedParams: [
    {
      className: CONFIGURATOR_COMMONS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
    {
      className: CONFIGURATOR_GROUPS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
    {
      className: CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
    {
      className: LANGUAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
  ],
};
