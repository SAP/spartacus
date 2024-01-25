/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { PickupOptionDialogComponent } from './pickup-option-dialog.component';

export const defaultPickupOptionsDialogLayoutConfig: LayoutConfig = {
  launch: {
    PICKUP_IN_STORE: {
      inlineRoot: true,
      component: PickupOptionDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
