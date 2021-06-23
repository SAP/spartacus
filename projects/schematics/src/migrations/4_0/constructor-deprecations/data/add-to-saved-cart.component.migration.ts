import {
  ACTIVE_CART_SERVICE,
  ADD_TO_SAVED_CART_COMPONENT,
  ANGULAR_CORE,
  AUTH_SERVICE,
  LAUNCH_DIALOG_SERVICE,
  ROUTING_SERVICE,
  SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
  SPARTACUS_CART_SAVED_CART_COMPONENTS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ADD_TO_SAVED_CART_COMPONENT_MIGRATION_V1: ConstructorDeprecation =
  {
    // feature-libs/cart/saved-cart/components/add-to-saved-cart/add-to-saved-cart.component.ts
    class: ADD_TO_SAVED_CART_COMPONENT,
    importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    deprecatedParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
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
    ],
    removeParams: [
      {
        className: SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      },
    ],
    addParams: [
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };

export const ADD_TO_SAVED_CART_COMPONENT_MIGRATION_V2: ConstructorDeprecation =
  {
    // feature-libs/cart/saved-cart/components/add-to-saved-cart/add-to-saved-cart.component.ts
    class: ADD_TO_SAVED_CART_COMPONENT,
    importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    deprecatedParams: [
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_SERVICE,
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
