/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ResellDialogComponent } from './resell-dialog.component';

export const defaultResellDialogLayoutConfig: LayoutConfig = {
  launch: {
    RESELL: {
      inlineRoot: true,
      component: ResellDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
