import { PickupDeliveryOptionDialogComponent } from '@spartacus/pickup-in-store/components';
import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';

export const defaultPickupOptionsDialogLayoutConfig: LayoutConfig = {
  launch: {
    PICKUP_IN_STORE: {
      inline: true,
      component: PickupDeliveryOptionDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
