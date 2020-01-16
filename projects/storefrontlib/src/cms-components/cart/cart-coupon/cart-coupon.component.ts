import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Cart,
  CartService,
  CartVoucherService,
  AuthService,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit, OnDestroy {
  form: FormGroup;
  cartIsLoading$: Observable<boolean>;
  submitDisabled$: Observable<boolean>;
  cart$: Observable<Cart>;
  cartId: string;

  private subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private cartVoucherService: CartVoucherService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.cart$ = combineLatest([
      this.cartService.getActive(),
      this.authService.getOccUserId(),
    ]).pipe(
      tap(
        ([cart, userId]: [Cart, string]) =>
          (this.cartId =
            userId === OCC_USER_ID_ANONYMOUS ? cart.guid : cart.code)
      ),
      map(([cart]: [Cart, string]) => cart)
    );

    this.cartIsLoading$ = this.cartService
      .getLoaded()
      .pipe(map(loaded => !loaded));

    this.cartVoucherService.resetAddVoucherProcessingState();

    this.form = this.formBuilder.group({
      couponCode: ['', [Validators.required]],
    });

    this.submitDisabled$ = combineLatest([
      this.cartIsLoading$,
      this.form.valueChanges.pipe(
        startWith(true),
        map(() => this.form.valid)
      ),
      this.cartVoucherService.getAddVoucherResultLoading(),
    ]).pipe(
      map(
        ([cartIsLoading, btnEnabled, addVoucherIsLoading]) =>
          cartIsLoading || !btnEnabled || addVoucherIsLoading
      )
    );

    this.subscription.add(
      this.cartVoucherService
        .getAddVoucherResultSuccess()
        .subscribe(success => {
          this.onSuccess(success);
        })
    );
  }

  onSuccess(success: boolean) {
    if (success) {
      this.form.reset();
      this.cartVoucherService.resetAddVoucherProcessingState();
    }
  }

  applyVoucher(): void {
    this.cartVoucherService.addVoucher(this.form.value.couponCode, this.cartId);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cartVoucherService.resetAddVoucherProcessingState();
  }
}
