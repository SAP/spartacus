/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
// TODO: check the place order spinner part here weather do we need to stopplaceorderSpinner method or not after the backend is deployed
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import {
  LAUNCH_CALLER,
  LaunchDialogService,
  OutletModule,
} from '@spartacus/storefront';
import { Observable, isObservable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { OpfPaymentEventsService } from '@spartacus/opf/payment/root';
import { OrderFacade } from '@spartacus/order/root';

@Component({
  selector: 'cx-gift-card-checkout-payment',
  templateUrl: './gift-card-checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, OutletModule, CommonModule],
})
export class GiftCardCheckoutComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  protected activeCartFacade = inject(ActiveCartFacade);
  protected globalMessageService = inject(GlobalMessageService);
  protected opfPaymentEventsService = inject(OpfPaymentEventsService);
  constructor(
    protected orderFacade: OrderFacade,
    protected routingService: RoutingService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  opfDefaultPaymentError: HttpErrorModel = {
    statusText: 'Payment Verification Error',
    message: 'opfPayment.errors.proceedPayment',
    status: -1,
  };
  ngOnInit() {
    console.log('GiftCardCheckoutComponent initialized');
    this.cart$ = this.activeCartFacade.getActive();
  }

  termsAndConditionsChecked = true;
  placedOrder: void | Observable<ComponentRef<any> | undefined>;

  protected isPlacingOrder = false;

  placeOrderWithGiftCard() {
    if (!this.termsAndConditionsChecked || this.isPlacingOrder) {
      return;
    }

    this.isPlacingOrder = true;

    this.placedOrder = this.launchDialogService.launch(
      LAUNCH_CALLER.PLACE_ORDER_SPINNER,
      this.vcr
    ) as Observable<ComponentRef<any> | undefined> | void;

    this.orderFacade
      .placePaymentAuthorizedOrder(this.termsAndConditionsChecked)
      .pipe(
        take(1),
        finalize(() => (this.isPlacingOrder = false))
      )
      .subscribe({
        next: (order) => {
          // Protect against “successful” emissions that don't contain a placed order.
          if (!order?.code) {
            this.handlePlaceOrderError();
            return;
          }

          this.stopPlaceOrderSpinner();
          this.onSuccess();
        },
        error: (error) => this.handlePlaceOrderError(error),
      });
  }

  protected handlePlaceOrderError(error?: unknown): void {
    this.stopPlaceOrderSpinner();

    // User-visible message (uses existing i18n key).
    this.globalMessageService.add(
      { key: this.opfDefaultPaymentError.message },
      GlobalMessageType.MSG_TYPE_ERROR
    );

    // Helpful for debugging without breaking UX.
    // eslint-disable-next-line no-console
    console.error('Gift card place order failed', error);
  }

  protected stopPlaceOrderSpinner(): void {
    const placedOrder = this.placedOrder;
    if (!placedOrder) {
      this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
      return;
    }

    if (!isObservable(placedOrder)) {
      this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
      return;
    }

    placedOrder
      .pipe(take(1))
      .subscribe((component) => {
        this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
        if (component) {
          component.destroy();
        }
      })
      .unsubscribe();
  }

  onSuccess(): void {
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }

  ngOnDestroy(): void {
    this.stopPlaceOrderSpinner();
  }
}
