/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { B2bUnitSelectionDialogComponent } from './b2b-unit-selection-dialog/b2b-unit-selection-dialog.component';

export const defaultB2bUnitSelectionLayoutConfig: LayoutConfig = {
  launch: {
    B2B_UNIT_SELECTION: {
      inlineRoot: true,
      component: B2bUnitSelectionDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
