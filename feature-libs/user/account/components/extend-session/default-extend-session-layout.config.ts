/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ExtendSessionDialogComponent } from './extend-session-dialog.component';

export const defaultExtendSessionLayoutConfig: LayoutConfig = {
  launch: {
    EXTEND_SESSION: {
      inlineRoot: true,
      component: ExtendSessionDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
