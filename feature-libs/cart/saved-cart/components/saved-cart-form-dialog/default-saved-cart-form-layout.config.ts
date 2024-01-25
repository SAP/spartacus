/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SavedCartFormDialogComponent } from './saved-cart-form-dialog.component';

export const defaultSavedCartFormLayoutConfig: LayoutConfig = {
  launch: {
    SAVED_CART: {
      inline: true,
      component: SavedCartFormDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
