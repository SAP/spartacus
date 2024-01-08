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
import { AsmSaveCartDialogComponent } from './asm-save-cart-dialog/asm-save-cart-dialog.component';

export const defaultSaveCartLayoutConfig: LayoutConfig = {
  launch: {
    [LAUNCH_CALLER.ASM_SAVE_CART]: {
      inlineRoot: true,
      component: AsmSaveCartDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
