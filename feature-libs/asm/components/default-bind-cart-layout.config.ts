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
import { AsmBindCartDialogComponent } from './asm-bind-cart-dialog/asm-bind-cart-dialog.component';

export const defaultBindCartLayoutConfig: LayoutConfig = {
  launch: {
    [LAUNCH_CALLER.ASM_BIND_CART]: {
      inlineRoot: true,
      component: AsmBindCartDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
