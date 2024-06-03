/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ACTIVE_CART_SERVICE,
  ADD_TO_CART_COMPONENT,
  ANGULAR_CORE,
  CART_SERVICE,
  CHANGE_DETECTOR_REF,
  CMS_COMPONENTS_SERVICE,
  CURRENT_PRODUCT_SERVICE,
  MODAL_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
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

// Use case: delete all old params and use the complete new signature
// in the "addParams" list.  Doing so should keep the correct param
// order when the modified params aree not at the end.
export const ADD_TO_CART_COMPONENT_MIGRATION_2: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/cart/add-to-cart/add-to-cart.component.ts
  class: ADD_TO_CART_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CMS_COMPONENTS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
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
      className: CMS_COMPONENTS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
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
  addParams: [
    {
      className: CMS_COMPONENTS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ACTIVE_CART_SERVICE,
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
};
