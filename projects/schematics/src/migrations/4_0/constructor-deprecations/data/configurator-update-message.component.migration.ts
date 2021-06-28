import {
  CONFIGURATOR_COMMONS_SERVICE,
  CONFIGURATOR_MESSAGE_CONFIG,
  CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
  CONFIGURATOR_UPDATE_MESSAGE_COMPONENT,
  MESSAGE_CONFIG,
  SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_UPDATE_MESSAGE_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/product-configurator/rulebased/components/update-message/configurator-update-message.component.ts
  class: CONFIGURATOR_UPDATE_MESSAGE_COMPONENT,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  deprecatedParams: [
    {
      className: CONFIGURATOR_COMMONS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    },
    {
      className: CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    },
    {
      className: MESSAGE_CONFIG,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
  ],
  removeParams: [
    {
      className: MESSAGE_CONFIG,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
  ],
  addParams: [
    {
      className: CONFIGURATOR_MESSAGE_CONFIG,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    },
  ],
};
