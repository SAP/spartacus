import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartCouponComponent } from './cart-coupon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppliedCouponsComponent } from './applied-coupons/applied-coupons.component';

@NgModule({
  declarations: [CartCouponComponent, AppliedCouponsComponent],
  exports: [CartCouponComponent, AppliedCouponsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CartCouponModule {}