import {
  CART_ITEM_CONTEXT,
  COMMON_CONFIGURATOR_UTILS_SERVICE,
  CONFIGURATOR_ISSUES_NOTIFICATION_COMPONENT,
  SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ISSUES_NOTIFICATION_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/product-configurator/common/components/configurator-issues-notification/configurator-issues-notification.component.ts
  class: CONFIGURATOR_ISSUES_NOTIFICATION_COMPONENT,
  importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
  deprecatedParams: [
    {
      className: COMMON_CONFIGURATOR_UTILS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    },
  ],
  addParams: [
    {
      className: CART_ITEM_CONTEXT,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
