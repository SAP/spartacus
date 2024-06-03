/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';

export const defaultConfiguratorConflictSolverLayoutConfig: LayoutConfig = {
  launch: {
    CONFLICT_SOLVER: {
      inlineRoot: true,
      component: ConfiguratorConflictSolverDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
