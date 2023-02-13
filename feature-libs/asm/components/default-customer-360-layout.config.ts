/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DIALOG_TYPE,
  LAUNCH_CALLER,
  LayoutConfig,
} from '@spartacus/storefront';
import { AsmCustomer360DialogComponent } from './asm-customer-360-dialog/asm-customer-360-dialog.component';

export const defaultCustomer360LayoutConfig: LayoutConfig = {
  launch: {
    [LAUNCH_CALLER.ASM_CUSTOMER_360]: {
      inlineRoot: true,
      component: AsmCustomer360DialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
