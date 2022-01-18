import { LayoutConfig } from '../../../../layout/config/layout-config';
import { DIALOG_TYPE } from '../../../../layout/launch-dialog/index';
import { ReplenishmentOrderCancellationDialogComponent } from '../../../../shared/components/replenishment-order-cancellation-dialog/replenishment-order-cancellation-dialog.component';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const defaultReplenishmentOrderCancellationLayoutConfig: LayoutConfig = {
  launch: {
    REPLENISHMENT_ORDER: {
      inline: true,
      component: ReplenishmentOrderCancellationDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
