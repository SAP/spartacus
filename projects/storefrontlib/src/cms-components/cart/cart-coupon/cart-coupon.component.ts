import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, Cart, CartService, Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit {
  form: FormGroup;
  vouchers$: Observable<any>;
  disableBtn: boolean;

  @Input()
  cart: Cart | Order;
  @Input()
  guid: string;
  @Input()
  isReadOnly = false;
  @Input()
  cartIsLoading = false;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      couponCode: ['', [Validators.required]],
    });
    this.authService
      .getUserToken()
      .pipe(map(token => token.userId))
      .subscribe(userId => (this.userId = userId));

    this.form.valueChanges.subscribe(() => {
      this.disableBtn = this.form.valid;
    });
  }

  apply(): void {
    this.cartService.addVoucher(this.form.value.couponCode);

    //check if the apply action success, then we reset the form.
    this.form.reset();
  }

  removeVoucher(voucherId: string) {
    this.cartService.removeVoucher(voucherId);
  }
}
