import { LayoutConfig } from '../../../../layout/config/layout-config';
import { DIALOG_TYPE } from '../../../../layout/launch-dialog/index';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation/index';

export const defaultReplenishmentOrderCancellationLayoutConfig: LayoutConfig = {
  launch: {
    REPLENISHMENT_ORDER: {
      inline: true,
      component: ReplenishmentOrderCancellationDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
