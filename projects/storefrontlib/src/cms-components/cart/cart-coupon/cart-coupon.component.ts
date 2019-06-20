import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, CartService, Order } from '@spartacus/core';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit {
  form: FormGroup;
  disableBtn: boolean;

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
      this.disableBtn = this.form.valid;
    });
  }

  applyVoucher(): void {
    this.cartService.addVoucher(this.form.value.couponCode);

    //check if the apply action success, then we reset the form.
    this.form.reset();
  }

  removeVoucher(voucherId: string) {
    this.cartService.removeVoucher(voucherId);
  }
}
