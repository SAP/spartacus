import {

  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  MODAL_SERVICE,
  CURRENT_PRODUCT_SERVICE,
  CHANGE_DETECTOR_REF,
  ACTIVE_CART_SERVICE,
  ANGULAR_CORE,
  ADD_TO_CART_COMPONENT
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ADDED_TO_CART_COMPONENT_MIGRATION: ConstructorDeprecation = {
  //projects/storefrontlib/src/cms-components/cart/add-to-cart/add-to-cart.component.ts
  class: ADD_TO_CART_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    { className: MODAL_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
    { className: CURRENT_PRODUCT_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
    { className: CHANGE_DETECTOR_REF, importPath: ANGULAR_CORE },
    { className: ACTIVE_CART_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    //{ className: PROMOTION_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
  ],
};
