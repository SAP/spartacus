import {
  ACTIVE_CART_SERVICE,
  ADDED_TO_CART_DIALOG_COMPONENT,
  MODAL_SERVICE,
  PROMOTION_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/cart/add-to-cart/added-to-cart-dialog/added-to-cart-dialog.component.ts
    class: ADDED_TO_CART_DIALOG_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      { className: ACTIVE_CART_SERVICE, importPath: SPARTACUS_CORE },
      { className: MODAL_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
      { className: PROMOTION_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
    ],
    removeParams: [
      { className: PROMOTION_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
    ],
  };
