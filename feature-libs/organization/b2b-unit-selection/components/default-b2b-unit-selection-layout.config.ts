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
import '../root/model/augmented-core.model';

export const defaultB2bUnitSelectionLayoutConfig: LayoutConfig = {
  launch: {
    [LAUNCH_CALLER.B2B_UNIT_SELECTION]: {
      inlineRoot: true,
      component: B2bUnitSelectionDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
