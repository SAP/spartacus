import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Cart,
  CartService,
  CartVoucherService,
  AuthService,
  OCC_USER_ID_ANONYMOUS,
  CustomerCouponService,
  WindowRef,
  CustomerCoupon,
  CustomerCouponSearchResult,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, startWith, tap } from 'rxjs/operators';

const MAX_CUSTOMER_COUPON_PAGE = 100;
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
  applicableCoupons: CustomerCoupon[];
  filteredCoupons: CustomerCoupon[];

  private ignoreCloseEvent = false;

  private subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private cartVoucherService: CartVoucherService,
    private formBuilder: FormBuilder,
    private customerCouponService: CustomerCouponService,
    protected winRef: WindowRef
  ) {}

  ngOnInit() {
    this.customerCouponService.loadCustomerCoupons(MAX_CUSTOMER_COUPON_PAGE);
    this.cart$ = combineLatest([
      this.cartService.getActive(),
      this.authService.getOccUserId(),
      this.customerCouponService.getCustomerCoupons(MAX_CUSTOMER_COUPON_PAGE),
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

  onError(error: boolean) {
    if (error) {
      this.customerCouponService.loadCustomerCoupons(MAX_CUSTOMER_COUPON_PAGE);
      this.cartVoucherService.resetAddVoucherProcessingState();
    }
  }

  onSuccess(success: boolean) {
    if (success) {
      this.form.reset();
      this.cartVoucherService.resetAddVoucherProcessingState();
    }
  }

  private getApplicableCustomerCoupons(
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
    this.toggleBodyClass('couponbox-is-active', false);
  }

  filter(query: string): void {
    const filterValue = query.toLowerCase();

    this.filteredCoupons = this.applicableCoupons.filter(
      coupon => coupon.couponId.toLowerCase().indexOf(filterValue) > -1
    );
  }

  open(): void {
    this.filteredCoupons = this.applicableCoupons;
    this.toggleBodyClass(
      'couponbox-is-active',
      this.applicableCoupons.length > 0
    );
  }

  close(event: UIEvent): void {
    if (!this.ignoreCloseEvent) {
      this.toggleBodyClass('couponbox-is-active', false);
      if (event && event.target) {
        (<HTMLElement>event.target).blur();
      }
    }
    this.ignoreCloseEvent = false;
  }

  disableClose(): void {
    this.ignoreCloseEvent = true;
  }

  toggleBodyClass(className: string, add?: boolean) {
    if (add === undefined) {
      this.winRef.document.body.classList.toggle(className);
    } else {
      add
        ? this.winRef.document.body.classList.add(className)
        : this.winRef.document.body.classList.remove(className);
    }
  }

  hasBodyClass(className: string): boolean {
    return this.winRef.document.body.classList.contains(className);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cartVoucherService.resetAddVoucherProcessingState();
  }
}
