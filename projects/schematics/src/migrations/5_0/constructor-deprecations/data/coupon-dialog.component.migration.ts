/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  COUPON_DIALOG_COMPONENT,
  ELEMENT_REF,
  LAUNCH_DIALOG_SERVICE,
  MODAL_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const COUPON_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/myaccount/my-coupons/coupon-card/coupon-dialog/coupon-dialog.component.ts
    class: COUPON_DIALOG_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    removeParams: [
      {
        className: MODAL_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ELEMENT_REF,
        importPath: ANGULAR_CORE,
      },
    ],
  };
