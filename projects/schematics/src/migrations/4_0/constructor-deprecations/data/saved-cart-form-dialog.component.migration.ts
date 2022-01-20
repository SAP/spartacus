import {
  ANGULAR_CORE,
  CLEAR_CHECKOUT_SERVICE,
  ELEMENT_REF,
  EVENT_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  LAUNCH_DIALOG_SERVICE,
  ROUTING_SERVICE,
  SAVED_CART_FORM_DIALOG_COMPONENT,
  SPARTACUS_CART,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SAVED_CART_FORM_DIALOG_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/cart/saved-cart/components/saved-cart-form-dialog/saved-cart-form-dialog.component.ts
    class: SAVED_CART_FORM_DIALOG_COMPONENT,
    importPath: SPARTACUS_CART,
    deprecatedParams: [
      { className: LAUNCH_DIALOG_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
      { className: ELEMENT_REF, importPath: ANGULAR_CORE },
      { className: EVENT_SERVICE, importPath: SPARTACUS_CORE },
      { className: ROUTING_SERVICE, importPath: SPARTACUS_CORE },
      { className: GLOBAL_MESSAGE_SERVICE, importPath: SPARTACUS_CORE },
      { className: CLEAR_CHECKOUT_SERVICE, importPath: SPARTACUS_CORE },
    ],
    removeParams: [
      { className: CLEAR_CHECKOUT_SERVICE, importPath: SPARTACUS_CORE },
    ],
  };
