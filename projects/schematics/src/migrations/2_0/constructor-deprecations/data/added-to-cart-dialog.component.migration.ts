import {
  ACTIVE_CART_SERVICE,
  ADDED_TO_CART_DIALOG_COMPONENT,
  CART_SERVICE,
  MODAL_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
// projects/storefrontlib/src/cms-components/cart/add-to-cart/added-to-cart-dialog/added-to-cart-dialog.component.ts
export const ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: ADDED_TO_CART_DIALOG_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: MODAL_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
