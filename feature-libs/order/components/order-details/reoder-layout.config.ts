import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ReorderDialogComponent } from './order-detail-reorder/reorder-dialog/reorder-dialog.component';

export const defaultReorderLayoutConfig: LayoutConfig = {
  launch: {
    REORDER: {
      inline: true,
      component: ReorderDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
