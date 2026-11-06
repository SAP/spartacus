/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DIALOG_TYPE,
  LayoutConfig,
  SpinnerComponent,
} from '@spartacus/storefront';
import { OpfErrorModalComponent } from '@spartacus/opf/base/components';

export const defaultGlobalSpinnerLayoutConfig: LayoutConfig = {
  launch: {
    PLACE_ORDER_SPINNER: {
      inlineRoot: true,
      component: SpinnerComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,
    },
    OPF_ERROR: {
      inlineRoot: true,
      component: OpfErrorModalComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,
    },
  },
};
