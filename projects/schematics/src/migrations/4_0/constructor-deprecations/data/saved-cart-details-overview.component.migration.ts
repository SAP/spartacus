import {
  ANGULAR_CORE,
  LAUNCH_DIALOG_SERVICE,
  SAVED_CART_DETAILS_OVERVIEW_COMPONENT,
  SAVED_CART_DETAILS_SERVICE,
  SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
  SPARTACUS_CART_SAVED_CART_COMPONENTS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SAVED_CART_DETAILS_OVERVIEW_COMPONENT_MIGRATION_V1: ConstructorDeprecation = {
  // feature-libs/cart/saved-cart/components/details/saved-cart-details-overview/saved-cart-details-overview.component.ts
  class: SAVED_CART_DETAILS_OVERVIEW_COMPONENT,
  importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
  deprecatedParams: [
    {
      className: SAVED_CART_DETAILS_SERVICE,
      importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    },
    {
      className: TRANSLATION_SERVICE,
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

export const SAVED_CART_DETAILS_OVERVIEW_COMPONENT_MIGRATION_V2: ConstructorDeprecation = {
  // feature-libs/cart/saved-cart/components/details/saved-cart-details-overview/saved-cart-details-overview.component.ts
  class: SAVED_CART_DETAILS_OVERVIEW_COMPONENT,
  importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
  deprecatedParams: [
    {
      className: SAVED_CART_DETAILS_SERVICE,
      importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    },
    {
      className: TRANSLATION_SERVICE,
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
