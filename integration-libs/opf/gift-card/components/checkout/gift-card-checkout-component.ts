/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  LAUNCH_CALLER,
  LaunchDialogService,
  OutletModule,
} from '@spartacus/storefront';
import { RoutingService, TranslatePipe } from '@spartacus/core';

import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { OrderFacade } from '@spartacus/order/root';

@Component({
  selector: 'cx-gift-card-checkout-payment',
  templateUrl: './gift-card-checkout-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, OutletModule, CommonModule],
})
export class GiftCardCheckoutComponent implements OnInit {
  cart$: Observable<Cart>;
  protected activeCartFacade = inject(ActiveCartFacade);
  constructor(
    protected orderFacade: OrderFacade,
    protected routingService: RoutingService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.cart$ = this.activeCartFacade.getActive();
    console.log('GiftCardCheckoutComponent initialized');
  }

  termsAndConditionsChecked = true;
  placedOrder: void | Observable<ComponentRef<any> | undefined>;

  placeOrderWithGiftCard() {
    if (this.termsAndConditionsChecked) {
      console.log('Placing order with gift card...');
      this.placedOrder = this.launchDialogService.launch(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        this.vcr
      );
      // this.orderFacade.placeOrder(this.termsAndConditionsChecked).subscribe({

      this.orderFacade
        .placePaymentAuthorizedOrder(this.termsAndConditionsChecked)
        .subscribe({
          error: () => {
            if (!this.placedOrder) {
              return;
            }
            this.placedOrder
              .subscribe((component) => {
                this.launchDialogService.clear(
                  LAUNCH_CALLER.PLACE_ORDER_SPINNER
                );
                if (component) {
                  component.destroy();
                }
              })
              .unsubscribe();
          },
          next: () => this.onSuccess(),
        });
    }
  }
  onSuccess(): void {
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }
}
