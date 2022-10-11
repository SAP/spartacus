import {
  ACTIVE_CART_FACADE,
  ADDED_TO_CART_DIALOG_COMPONENT,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
  ROUTING_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CART_BASE_ROOT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
import { SPARTACUS_CART_BASE } from './../../../../shared/libs-constants';

export const ADDED_TO_CART_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/cart/base/components/added-to-cart-dialog/added-to-cart-dialog.component.ts
    class: ADDED_TO_CART_DIALOG_COMPONENT,
    importPath: SPARTACUS_CART_BASE,
    deprecatedParams: [
      { className: MODAL_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
      { className: ACTIVE_CART_FACADE, importPath: SPARTACUS_CART_BASE_ROOT },
    ],
    removeParams: [
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
