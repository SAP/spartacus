import {
  ACTIVE_CART_SERVICE,
  ADDED_TO_CART_DIALOG_COMPONENT,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
} from '../../../../shared/constants';
import {
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
      { className: ACTIVE_CART_SERVICE, importPath: SPARTACUS_CORE },
      { className: MODAL_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
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
    ],
  };
