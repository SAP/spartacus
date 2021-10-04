import {
  ACTIVE_CART_SERVICE,
  ADD_TO_CART_COMPONENT,
  ANGULAR_CORE,
  CART_SERVICE,
  CHANGE_DETECTOR_REF,
  CURRENT_PRODUCT_SERVICE,
  MODAL_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ADD_TO_CART_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/cart/add-to-cart/add-to-cart.component.ts
  class: ADD_TO_CART_COMPONENT,
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
    {
      className: CURRENT_PRODUCT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHANGE_DETECTOR_REF,
      importPath: ANGULAR_CORE,
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
