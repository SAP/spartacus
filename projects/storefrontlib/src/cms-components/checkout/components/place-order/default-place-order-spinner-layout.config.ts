import { LayoutConfig } from '../../../../layout/config/layout-config';
import { DIALOG_TYPE } from '../../../../layout/launch-dialog/index';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

export const defaultPlaceOrderSpinnerLayoutConfig: LayoutConfig = {
  launch: {
    PLACE_ORDER_SPINNER: {
      inline: true,
      component: SpinnerComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,
    },
  },
};
