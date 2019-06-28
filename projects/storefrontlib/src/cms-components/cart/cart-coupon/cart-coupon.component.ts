import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, CartService, Order } from '@spartacus/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartCouponAnchorService } from './cart-coupon-anchor/cart-coupon-anchor.service';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit, OnDestroy {
  form: FormGroup;
  enableBtn: boolean;
  private subscription = new Subscription();

  @Input()
  cart: Cart | Order;
  @Input()
  cartIsLoading = false;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private element: ElementRef,
    private cartCouponAnchorService: CartCouponAnchorService
  ) {}

  ngOnInit() {
    this.cartService.resetAddVoucherProcessingState();

    this.form = this.formBuilder.group({
      couponCode: ['', [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.enableBtn = this.form.valid;
    });

    this.subscription
      .add(
        this.cartService.getAddVoucherResultSuccess().subscribe(success => {
          this.onSuccess(success);
        })
      )
      .add(
        this.cartService
          .getAddVoucherResultError()
          .subscribe(error => {
            if (error) {
              this.setEnabelbtn(true);
            }
          })
          .add(
            this.cartService.getAddVoucherResultLoading().subscribe(loading => {
              if (loading) {
                this.setEnabelbtn(false);
              }
            })
          )
      );

    this.subscription.add(
      this.cartCouponAnchorService
        .getEventEmit()
        .subscribe((anchor: string) => {
          this.scrollToView(anchor);
        })
    );
  }

  scrollToView(anchor: string) {
    const anchorElement = this.element.nativeElement.querySelector(anchor);
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setEnabelbtn(status: boolean) {
    this.enableBtn = status;
  }

  onSuccess(success: boolean) {
    if (success) {
      this.form.reset();
    }
  }

  applyVoucher(): void {
    this.cartService.addVoucher(this.form.value.couponCode);
    this.cartService.resetAddVoucherProcessingState();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cartService.resetAddVoucherProcessingState();
  }
}
