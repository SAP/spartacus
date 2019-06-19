import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { AppliedCouponsComponent } from './applied-coupons/applied-coupons.component';
import { CartCouponComponent } from './cart-coupon.component';

@NgModule({
  declarations: [CartCouponComponent, AppliedCouponsComponent],
  exports: [CartCouponComponent, AppliedCouponsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, I18nModule],
})
export class CartCouponModule {}
