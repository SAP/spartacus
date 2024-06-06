/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { DpConfirmationDialogComponent } from './dp-confirmation-dialog.component';

export const defaultDpConfirmationDialogConfig: LayoutConfig = {
  launch: {
    DP_SHOW_CONFIRMATION_DIALOG: {
      inlineRoot: true,
      component: DpConfirmationDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
