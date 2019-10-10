import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, CartService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartCouponAnchorService } from './cart-coupon-anchor/cart-coupon-anchor.service';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit, OnDestroy {
  form: FormGroup;
  btnEnabled: boolean;
  cartIsLoading: boolean;
  addVoucherIsLoading$: Observable<boolean>;
  cart$: Observable<Cart>;

  private subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private element: ElementRef,
    private cartCouponAnchorService: CartCouponAnchorService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();

    this.cartIsLoading = !this.cartService.getLoaded();

    this.cartService.resetAddVoucherProcessingState();

    this.form = this.formBuilder.group({
      couponCode: ['', [Validators.required]],
    });

    this.addVoucherIsLoading$ = this.cartService.getAddVoucherResultLoading();

    this.subscription.add(
      this.cartService.getAddVoucherResultSuccess().subscribe(success => {
        this.onSuccess(success);
      })
    );

    this.subscription
      .add(
        this.cartCouponAnchorService.getEventEmit().subscribe(() => {
          this.scrollToView();
        })
      )
      .add(
        this.form.valueChanges.subscribe(
          () => (this.btnEnabled = this.form.valid)
        )
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
      this.cartService.resetAddVoucherProcessingState();
    }
  }

  applyVoucher(): void {
    this.cartService.addVoucher(this.form.value.couponCode);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cartService.resetAddVoucherProcessingState();
  }
}
