/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { Order, OrderFacade, ReplenishmentOrder } from '@spartacus/order/root';
import { AddToHomeScreenBannerComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, take, tap, withLatestFrom } from 'rxjs/operators';
import { OrderGuestRegisterFormComponent } from '../order-guest-register-form/order-guest-register-form.component';

@Component({
  selector: 'cx-order-confirmation-thank-you-message',
  templateUrl: './order-confirmation-thank-you-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    OrderGuestRegisterFormComponent,
    AddToHomeScreenBannerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class OrderConfirmationThankYouMessageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  order$: Observable<Order | undefined>;

  isGuestCustomer = false;
  orderGuid: string | undefined;

  constructor(
    protected orderFacade: OrderFacade,
    protected globalMessageService: GlobalMessageService,
    protected translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.order$ = this.orderFacade.getOrderDetails().pipe(
      tap((order) => {
        this.isGuestCustomer =
          order && 'guestCustomer' in order
            ? (order.guestCustomer ?? false)
            : false;
        this.orderGuid = order?.guid;
      })
    );
  }

  ngAfterViewInit(): void {
    this.addThankYouMessage();
  }

  ngOnDestroy(): void {
    this.orderFacade.clearPlacedOrder();
  }

  protected addThankYouMessage(): void {
    this.getThankYouAssistiveMessage()
      .pipe(take(1))
      .subscribe(
        ([
          order,
          confirmationOfOrderMessage,
          thankYouMessage,
          invoiceHasBeenSentByEmailMessage,
        ]) => {
          const code =
            (order as ReplenishmentOrder).replenishmentOrderCode ??
            (order as Order).code;
          const message = `${confirmationOfOrderMessage} ${code}. ${thankYouMessage} ${invoiceHasBeenSentByEmailMessage}`;
          this.globalMessageService.add(
            message,
            GlobalMessageType.MSG_TYPE_ASSISTIVE
          );
        }
      );
  }

  protected getThankYouAssistiveMessage(): Observable<
    [Order | undefined, string, string, string]
  > {
    const confirmationOfOrderMessage$ = this.translationService.translate(
      'checkoutOrderConfirmation.confirmationOfOrder'
    );
    const thankYouMessage$ = this.translationService.translate(
      'checkoutOrderConfirmation.thankYou'
    );
    const invoiceHasBeenSentByEmailMessage$ = this.translationService.translate(
      'checkoutOrderConfirmation.invoiceHasBeenSentByEmail'
    );

    return this.order$.pipe(
      filter((order) => !!order),
      withLatestFrom(
        confirmationOfOrderMessage$,
        thankYouMessage$,
        invoiceHasBeenSentByEmailMessage$
      )
    );
  }
}
