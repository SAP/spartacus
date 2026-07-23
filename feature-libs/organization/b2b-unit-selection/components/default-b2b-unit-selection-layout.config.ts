/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DIALOG_TYPE,
  LAUNCH_CALLER,
  LayoutConfig,
} from '@spartacus/storefront';
import { B2bUnitSelectionDialogComponent } from './b2b-unit-selection-dialog/b2b-unit-selection-dialog.component';
// Side-effect import: ensures LAUNCH_CALLER.B2B_UNIT_SELECTION is assigned
// before this config constant is evaluated.
// Imported via the root entry point to avoid cross-entry-point relative imports
// (which break ng-packagr's secondary entry point compilation).
import '@spartacus/organization/b2b-unit-selection/root';

export const defaultB2bUnitSelectionLayoutConfig: LayoutConfig = {
  launch: {
    [LAUNCH_CALLER.B2B_UNIT_SELECTION]: {
      inlineRoot: true,
      component: B2bUnitSelectionDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
