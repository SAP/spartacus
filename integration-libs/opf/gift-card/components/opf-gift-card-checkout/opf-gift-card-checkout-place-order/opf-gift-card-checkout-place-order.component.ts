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
import { OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE } from '@spartacus/opf/checkout/root';
import { OpfPaymentEventsService } from '@spartacus/opf/payment/root';
import { OrderFacade } from '@spartacus/order/root';

@Component({
  selector: 'cx-opf-gift-card-checkout-place-order',
  templateUrl: './opf-gift-card-checkout-place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, OutletModule, CommonModule],
})
export class OpfGiftCardCheckoutPlaceOrderComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  protected activeCartFacade = inject(ActiveCartFacade);
  protected globalMessageService = inject(GlobalMessageService);
  protected opfPaymentEventsService = inject(OpfPaymentEventsService);
  protected orderFacade = inject(OrderFacade);
  protected routingService = inject(RoutingService);
  protected launchDialogService = inject(LaunchDialogService);
  protected vcr = inject(ViewContainerRef);

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
          if (!order?.code) {
            this.onPlaceOrderError();
            return;
          }

          this.stopPlaceOrderSpinner();
          this.onSuccess();
        },
        error: (error) => this.onPlaceOrderError(error),
      });
  }

  protected onPlaceOrderError(error?: unknown): void {
    this.stopPlaceOrderSpinner();

    // User-visible message (uses existing i18n key).
    this.globalMessageService.add(
      { key: 'giftCard.errors.placeOrderFailed' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
        this.routingService.go({ cxRoute: OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE });


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
