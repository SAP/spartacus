/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DIALOG_TYPE,
  LAUNCH_CALLER,
  LayoutConfig,
} from '@spartacus/storefront';
import { AsmCustomer360Component } from './asm-customer-360/asm-customer-360.component';

export const defaultAsmCustomer360LayoutConfig: LayoutConfig = {
  launch: {
    [LAUNCH_CALLER.ASM_CUSTOMER_360]: {
      inlineRoot: true,
      component: AsmCustomer360Component,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
