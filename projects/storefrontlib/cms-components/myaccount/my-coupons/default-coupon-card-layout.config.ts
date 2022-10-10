import { DIALOG_TYPE, LayoutConfig } from '../../../layout/index';
import { CouponDialogComponent } from './coupon-card/coupon-dialog/coupon-dialog.component';

export const defaultCouponLayoutConfig: LayoutConfig = {
  launch: {
    COUPON: {
      inline: true,
      component: CouponDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
