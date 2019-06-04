import { NgModule } from '@angular/core';
import { CustomerCouponAdapter } from '../../../user/connectors/customer-coupon/customer-coupon.adapter';
import {OccCustomerCouponAdapter} from './occ-customer-coupon.adapter';

@NgModule({
  providers: [
    { provide: CustomerCouponAdapter, useClass: OccCustomerCouponAdapter },
  ],
})
export class CustomerCouponOccModule {}
