import {
  ANGULAR_CORE,
  CLEAR_CHECKOUT_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
  LAUNCH_DIALOG_SERVICE,
  ROUTING_SERVICE,
  SAVED_CART_DETAILS_ACTION_COMPONENT,
  SAVED_CART_DETAILS_SERVICE,
  SAVED_CART_FACADE,
  SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
  SPARTACUS_CART_SAVED_CART_COMPONENTS,
  SPARTACUS_CART_SAVED_CART_ROOT,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION_V1: ConstructorDeprecation =
  {
    // feature-libs/cart/saved-cart/components/details/saved-cart-details-action/saved-cart-details-action.component.ts
    class: SAVED_CART_DETAILS_ACTION_COMPONENT,
    importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    deprecatedParams: [
      {
        className: SAVED_CART_DETAILS_SERVICE,
        importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      },
      {
        className: SAVED_CART_FACADE,
        importPath: SPARTACUS_CART_SAVED_CART_ROOT,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      },
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
      {
        className: CLEAR_CHECKOUT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      },
      {
        className: CLEAR_CHECKOUT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };

export const SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION_V2: ConstructorDeprecation =
  {
    // feature-libs/cart/saved-cart/components/details/saved-cart-details-action/saved-cart-details-action.component.ts
    class: SAVED_CART_DETAILS_ACTION_COMPONENT,
    importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    deprecatedParams: [
      {
        className: SAVED_CART_DETAILS_SERVICE,
        importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      },
      {
        className: SAVED_CART_FACADE,
        importPath: SPARTACUS_CART_SAVED_CART_ROOT,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      },
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
      {
        className: CLEAR_CHECKOUT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    removeParams: [
      {
        className: SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      },
    ],
  };

export const SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION_V3: ConstructorDeprecation =
  {
    // feature-libs/cart/saved-cart/components/details/saved-cart-details-action/saved-cart-details-action.component.ts
    class: SAVED_CART_DETAILS_ACTION_COMPONENT,
    importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    deprecatedParams: [
      {
        className: SAVED_CART_DETAILS_SERVICE,
        importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      },
      {
        className: SAVED_CART_FACADE,
        importPath: SPARTACUS_CART_SAVED_CART_ROOT,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    removeParams: [
      {
        className: SAVED_CART_FACADE,
        importPath: SPARTACUS_CART_SAVED_CART_ROOT,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: GLOBAL_MESSAGE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
