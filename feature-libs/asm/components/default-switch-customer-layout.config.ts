/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DIALOG_TYPE,
  LAUNCH_CALLER,
  LayoutConfig,
} from '@spartacus/storefront';
import { AsmSwitchCustomerDialogComponent } from './asm-switch-customer-dialog/asm-switch-customer-dialog.component';

export const defaultSwitchCustomerLayoutConfig: LayoutConfig = {
  launch: {
    [LAUNCH_CALLER.ASM_SWITCH_CUSTOMER]: {
      inlineRoot: true,
      component: AsmSwitchCustomerDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
