import {
  CHECKOUT_SERVICE,
  ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    class: ORDER_CONFIRMATION_OVERVIEW_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CHECKOUT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: TRANSLATION_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
