/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ImportEntriesDialogComponent } from './import-entries-dialog/import-entries-dialog.component';

export const defaultImportEntriesLayoutConfig: LayoutConfig = {
  launch: {
    IMPORT_TO_CART: {
      inlineRoot: true,
      component: ImportEntriesDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
