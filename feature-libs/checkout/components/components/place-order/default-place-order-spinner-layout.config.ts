import {
  DIALOG_TYPE,
  LayoutConfig,
  SpinnerComponent,
} from '@spartacus/storefront';

export const defaultPlaceOrderSpinnerLayoutConfig: LayoutConfig = {
  launch: {
    PLACE_ORDER_SPINNER: {
      inline: true,
      component: SpinnerComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,
    },
  },
};
