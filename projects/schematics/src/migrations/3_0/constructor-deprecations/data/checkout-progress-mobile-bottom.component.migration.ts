/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CHECKOUT_CONFIG,
  CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT,
  CHECKOUT_STEP_SERVICE,
  ROUTING_CONFIG_SERVICE,
  ROUTING_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/checkout/components/checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.component.ts
    class: CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CHECKOUT_CONFIG,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: CHECKOUT_CONFIG,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: ROUTING_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: CHECKOUT_STEP_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
