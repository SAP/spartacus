import {
  AUTH_SERVICE,
  CURRENT_PRODUCT_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  MODAL_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  STOCK_NOTIFICATION_COMPONENT,
  TRANSLATION_SERVICE,
  USER_ID_SERVICE,
  USER_INTERESTS_SERVICE,
  USER_NOTIFICATION_PREFERENCE_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STOCK_NOTIFICATION_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\product\stock-notification\stock-notification.component.ts
  class: STOCK_NOTIFICATION_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CURRENT_PRODUCT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: TRANSLATION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_INTERESTS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: MODAL_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: USER_NOTIFICATION_PREFERENCE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: USER_ID_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
