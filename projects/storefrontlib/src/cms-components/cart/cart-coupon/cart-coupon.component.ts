import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  Cart,
  CartService,
  CartVoucherService,
  CustomerCoupon,
  CustomerCouponSearchResult,
  CustomerCouponService,
  FeatureConfigService,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit, OnDestroy {
  MAX_CUSTOMER_COUPON_PAGE = 100;
  form: FormGroup;
  cartIsLoading$: Observable<boolean>;
  submitDisabled$: Observable<boolean>;
  cart$: Observable<Cart>;
  cartId: string;
  applicableCoupons: CustomerCoupon[];
  filteredCoupons: CustomerCoupon[];

  private ignoreCloseEvent = false;

  private subscription = new Subscription();

  couponBoxIsActive = false;

  constructor(
    cartService: CartService,
    authService: AuthService,
    cartVoucherService: CartVoucherService,
    formBuilder: FormBuilder,
    customerCouponService: CustomerCouponService,
    featureConfig: FeatureConfigService
  );
  /**
   * @deprecated Since 1.5
   * Add customerCouponService,featureConfig for customer coupon feature.
   * Remove issue: #5971
   */
  constructor(
    cartService: CartService,
    authService: AuthService,
    cartVoucherService: CartVoucherService,
    formBuilder: FormBuilder
  );

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private cartVoucherService: CartVoucherService,
    private formBuilder: FormBuilder,
    protected customerCouponService?: CustomerCouponService,
    protected featureConfig?: FeatureConfigService
  ) {}

  ngOnInit() {
    if (this.customerCouponService) {
      this.customerCouponService.loadCustomerCoupons(
        this.MAX_CUSTOMER_COUPON_PAGE
      );
    }
    if (this.featureConfig && this.featureConfig.isLevel('1.5')) {
      this.cart$ = combineLatest([
        this.cartService.getActive(),
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
    }
    //TODO(issue:#5971) Deprecated since 1.5

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

    this.subscription.add(
      this.cartVoucherService.getAddVoucherResultError().subscribe(error => {
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
      cart.appliedVouchers.forEach(appliedVoucher => {
        this.applicableCoupons = this.applicableCoupons.filter(
          coupon => coupon.couponId !== appliedVoucher.code
        );
      });
    }
    this.filteredCoupons = this.applicableCoupons;
  }

  applyVoucher(): void {
    this.cartVoucherService.addVoucher(this.form.value.couponCode, this.cartId);
  }
  applyCustomerCoupon(couponId: string): void {
    this.cartVoucherService.addVoucher(couponId, this.cartId);
    this.couponBoxIsActive = false;
  }

  filter(query: string): void {
    const filterValue = query.toLowerCase();

    this.filteredCoupons = this.applicableCoupons.filter(
      coupon => coupon.couponId.toLowerCase().indexOf(filterValue) > -1
    );
  }

  open(): void {
    this.filteredCoupons = this.applicableCoupons;
    if (this.applicableCoupons.length > 0) {
      this.couponBoxIsActive = true;
    }
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
