/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ClearCartDialogComponent } from './clear-cart-dialog.component';

export const defaultClearCartLayoutConfig: LayoutConfig = {
  launch: {
    CLEAR_CART: {
      inline: true,
      component: ClearCartDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
