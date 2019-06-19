import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  Cart,
  CartService,
  GlobalMessageService,
  GlobalMessageType,
  OccEndpointsService,
  Order,
} from '@spartacus/core';
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
    private http: HttpClient,
    private authService: AuthService,
    private occEndpoints: OccEndpointsService,
    private cartService: CartService,
    private globalMessageService: GlobalMessageService
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
    const params = new HttpParams().set(
      'voucherId',
      this.form.value.couponCode
    );
    this.http
      .post(this.getEndpoint(this.userId, this.cart.code), {}, { params })
      .subscribe(() => this.cartService.loadDetails());

    this.globalMessageService.add(
      { key: 'You have applied a coupon. need to confirm with shuan.' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );

    //check if the apply action success, then we reset the form.
    this.form.reset();
  }

  removeVoucher(voucherId: string) {
    this.http
      .delete(this.getEndpoint(this.userId, this.cart.code, voucherId))
      .subscribe(() => this.cartService.loadDetails());
  }

  getEndpoint(userId: string, cartId: string, voucherId?: string): string {
    const endpoint = voucherId
      ? `/users/${userId}/carts/${cartId}/vouchers/${voucherId}`
      : `/users/${userId}/carts/${cartId}/vouchers`;
    return this.occEndpoints.getEndpoint(endpoint);
  }
}
