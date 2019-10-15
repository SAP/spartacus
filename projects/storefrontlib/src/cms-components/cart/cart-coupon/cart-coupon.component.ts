import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, CartService, CartVoucherService } from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartCouponAnchorService } from './cart-coupon-anchor/cart-coupon-anchor.service';
import { map, tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit, OnDestroy {
  form: FormGroup;
  cartIsLoading$: Observable<boolean>;
  submitDisabled$: Observable<boolean>;
  cart$: Observable<Cart>;

  private subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private cartVoucherService: CartVoucherService,
    private formBuilder: FormBuilder,
    private element: ElementRef,
    private cartCouponAnchorService: CartCouponAnchorService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();

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
      this.cartCouponAnchorService.getEventEmit().subscribe(() => {
        this.scrollToView();
      })
    );
  }

  scrollToView() {
    const inputEl = this.element.nativeElement.querySelector('input');
    if (inputEl) {
      inputEl.focus();
    }
  }

  onSuccess(success: boolean) {
    if (success) {
      this.form.reset();
      this.cartVoucherService.resetAddVoucherProcessingState();
    }
  }

  applyVoucher(): void {
    this.cartVoucherService.addVoucher(this.form.value.couponCode);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cartVoucherService.resetAddVoucherProcessingState();
  }
}
