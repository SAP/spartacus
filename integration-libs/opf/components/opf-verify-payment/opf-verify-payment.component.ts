/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import {
  KeyValuePair,
  OpfCheckoutFacade,
  OpfConfig,
  OpfVerifyPaymentPayload,
  OpfVerifyPaymentResponse,
} from '@spartacus/opf/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-verify-payment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfVerifyPaymentComponent implements OnInit, OnDestroy {
  verifyPaymentPayload?: OpfVerifyPaymentPayload;
  paymentSessionId?: string;
  isAuthorized?: string;
  placedOrder: void | Observable<ComponentRef<any> | undefined>;
  paymentObs$: Observable<OpfVerifyPaymentResponse | undefined>;
  path?: string;
  obs$?: Observable<Order>;
  subscription?: Subscription;
  loader?: boolean;

  constructor(
    protected route: ActivatedRoute,
    protected routingService: RoutingService,
    protected orderFacade: OrderFacade,
    protected opfCheckoutService: OpfCheckoutFacade,
    protected launchDialogService: LaunchDialogService,
    protected config: OpfConfig,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams
      .pipe(
        take(1),
        switchMap((params) => {
          if (!params) return throwError('No params');

          const list: KeyValuePair[] = Object.entries(params).map((pair) => {
            return { key: pair[0], value: pair[1] as string };
          });

          this.paymentSessionId = this.getPaymentSessionId(list);
          if (!this.paymentSessionId)
            return throwError('No paymentSessionId found');

          return this.opfCheckoutService.verifyPayment(this.paymentSessionId, {
            responseMap: [...list],
          });
        }),

        switchMap((response: OpfVerifyPaymentResponse) => {
          return response?.result === 'AUTHORIZED'
            ? this.orderFacade.placeOrder(true)
            : throwError('UNAUTHORIZED payment from OPF Adapter');
        })
      )
      .subscribe({
        error: (error) => {
          console.log('getVerifyPaymentState ERROR', error);
          this.globalMessageService.add(
            error,
            GlobalMessageType.MSG_TYPE_ERROR
          );
          this.routingService.go({ cxRoute: 'checkoutReviewOrder' });
        },

        next: (response) => {
          console.log('order response', response);
          this.routingService.go({ cxRoute: 'orderConfirmation' });
        },
      });
  }

  private getPaymentSessionId(list: KeyValuePair[]): string | undefined {
    return (
      list.find((pair) => pair.key === 'paymentSessionId')?.value ?? undefined
    );
  }
}
