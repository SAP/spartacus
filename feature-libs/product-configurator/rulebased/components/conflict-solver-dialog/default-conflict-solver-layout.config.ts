import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';

export const defaultConflictSolverLayoutConfig: LayoutConfig = {
  launch: {
    CONFLICT_SOLVER: {
      inlineRoot: true,
      component: ConfiguratorConflictSolverDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
