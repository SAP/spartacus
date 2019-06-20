import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, CartService, Order } from '@spartacus/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit {
  form: FormGroup;
  disableBtn: boolean;
  private subscription = new Subscription();

  @Input()
  cart: Cart | Order;
  @Input()
  cartIsLoading = false;
  userId: string;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      couponCode: ['', [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.disableBtn = !this.form.valid;
    });

    this.subscription.add(
      this.cartService
        .getAddVoucherResultSuccess()
        .subscribe(success => this.onSuccess(success))
    );
  }

  applyVoucher(): void {
    this.cartService.addVoucher(this.form.value.couponCode);
  }

  removeVoucher(voucherId: string) {
    this.cartService.removeVoucher(voucherId);
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.form.reset();
    }
  }
}
