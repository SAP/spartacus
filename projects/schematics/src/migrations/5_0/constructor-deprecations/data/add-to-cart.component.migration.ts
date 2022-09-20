import {
  ACTIVE_CART_SERVICE,
  ADD_TO_CART_COMPONENT,
  CMS_COMPONENT_DATA_CLASS,
  EVENT_SERVICE,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
import {
  CURRENT_PRODUCT_SERVICE,
  CHANGE_DETECTOR_REF,
  ANGULAR_CORE,
} from './../../../../shared/constants';
import { SPARTACUS_CART_BASE } from '../../../../shared/libs-constants';

export const ADD_TO_CART_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/cart/base/components/add-to-cart/add-to-cart.component.ts
    class: ADD_TO_CART_COMPONENT,
    importPath: SPARTACUS_CART_BASE,
    deprecatedParams: [
      {
        className: EVENT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CURRENT_PRODUCT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: CHANGE_DETECTOR_REF,
        importPath: ANGULAR_CORE,
      },
      {
        className: ACTIVE_CART_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CMS_COMPONENT_DATA_CLASS,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
    ],
  };
