import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActiveCartService,
  AuthService,
  Cart,
  CartVoucherService,
  CustomerCoupon,
  CustomerCouponSearchResult,
  CustomerCouponService,
  FeatureConfigService,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit, OnDestroy {
  MAX_CUSTOMER_COUPON_PAGE = 100;
  form: FormGroup;
  cartIsLoading$: Observable<boolean>;
  cart$: Observable<Cart>;
  cartId: string;
  applicableCoupons: CustomerCoupon[];

  private ignoreCloseEvent = false;

  private subscription = new Subscription();

  couponBoxIsActive = false;

  constructor(
    protected authService: AuthService,
    protected cartVoucherService: CartVoucherService,
    protected formBuilder: FormBuilder,
    protected customerCouponService: CustomerCouponService,
    protected featureConfig: FeatureConfigService,
    protected activeCartService: ActiveCartService
  ) {}

  ngOnInit() {
    if (this.customerCouponService) {
      this.customerCouponService.loadCustomerCoupons(
        this.MAX_CUSTOMER_COUPON_PAGE
      );
    }
    if (this.featureConfig && this.featureConfig.isLevel('1.5')) {
      this.cart$ = combineLatest([
        this.activeCartService.getActive(),
        this.authService.getOccUserId(),
        this.customerCouponService.getCustomerCoupons(
          this.MAX_CUSTOMER_COUPON_PAGE
        ),
      ]).pipe(
        tap(
          ([cart, userId, customerCoupons]: [
            Cart,
            string,
            CustomerCouponSearchResult
          ]) => {
            this.cartId =
              userId === OCC_USER_ID_ANONYMOUS ? cart.guid : cart.code;
            this.getApplicableCustomerCoupons(cart, customerCoupons.coupons);
          }
        ),
        map(([cart]: [Cart, string, CustomerCouponSearchResult]) => cart)
      );
    }
    //TODO(issue:#5971) Deprecated since 1.5
    else {
      this.cart$ = combineLatest([
        this.activeCartService.getActive(),
        this.authService.getOccUserId(),
      ]).pipe(
        tap(
          ([cart, userId]: [Cart, string]) =>
            (this.cartId =
              userId === OCC_USER_ID_ANONYMOUS ? cart.guid : cart.code)
        ),
        map(([cart]: [Cart, string]) => cart)
      );
    }
    //TODO(issue:#5971) Deprecated since 1.5

    this.cartIsLoading$ = this.activeCartService
      .isStable()
      .pipe(map((loaded) => !loaded));

    this.cartVoucherService.resetAddVoucherProcessingState();

    this.form = this.formBuilder.group({
      couponCode: ['', [Validators.required]],
    });

    this.subscription.add(
      this.cartVoucherService
        .getAddVoucherResultSuccess()
        .subscribe((success) => {
          this.onSuccess(success);
        })
    );

    this.subscription.add(
      this.cartVoucherService.getAddVoucherResultError().subscribe((error) => {
        this.onError(error);
      })
    );
  }

  protected onError(error: boolean) {
    if (error) {
      this.customerCouponService.loadCustomerCoupons(
        this.MAX_CUSTOMER_COUPON_PAGE
      );
      this.cartVoucherService.resetAddVoucherProcessingState();
    }
  }

  onSuccess(success: boolean) {
    if (success) {
      this.form.reset();
      this.cartVoucherService.resetAddVoucherProcessingState();
    }
  }

  protected getApplicableCustomerCoupons(
    cart: Cart,
    coupons: CustomerCoupon[]
  ): void {
    this.applicableCoupons = coupons || [];
    if (cart.appliedVouchers) {
      cart.appliedVouchers.forEach((appliedVoucher) => {
        this.applicableCoupons = this.applicableCoupons.filter(
          (coupon) => coupon.couponId !== appliedVoucher.code
        );
      });
    }
  }

  applyVoucher(): void {
    if (!this.form.valid) {
      this.form.markAsTouched();
      return;
    }
    this.cartVoucherService.addVoucher(this.form.value.couponCode, this.cartId);
  }
  applyCustomerCoupon(couponId: string): void {
    this.cartVoucherService.addVoucher(couponId, this.cartId);
    this.couponBoxIsActive = false;
  }

  close(event: UIEvent): void {
    if (!this.ignoreCloseEvent) {
      this.couponBoxIsActive = false;
      if (event && event.target) {
        (<HTMLElement>event.target).blur();
      }
    }
    this.ignoreCloseEvent = false;
  }

  disableClose(): void {
    this.ignoreCloseEvent = true;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cartVoucherService.resetAddVoucherProcessingState();
  }
}
