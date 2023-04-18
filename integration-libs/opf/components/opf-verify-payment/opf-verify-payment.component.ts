/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  KeyValuePair,
  OpfCheckoutFacade,
  OpfConfig,
  OpfVerifyPaymentResponse,
} from '@spartacus/opf/root';
import { OrderFacade } from '@spartacus/order/root';
import { of, Subscription, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-verify-payment.component.html',
})
export class OpfVerifyPaymentComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  constructor(
    protected routingService: RoutingService,
    protected orderFacade: OrderFacade,
    protected opfCheckoutService: OpfCheckoutFacade,
    protected config: OpfConfig,
    protected globalMessageService: GlobalMessageService,
    protected winRef: WindowRef,
    protected route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = of(this.getFullUrl())
      .pipe(
        map((fullUrl: string) => {
          if (fullUrl?.startsWith(this.config.opf?.successUrl as string)) {
            return this.getCurrentUrlParams();
          } else {
            throw Error('Cancel link returned by PSP');
          }
        }),
        switchMap((params: KeyValuePair[]) => {
          if (!params) return throwError('No parameters found in Url');

          const paymentSessionId = this.FindFromKeyValuePairs(
            'paymentSessionId',
            params
          );
          if (!paymentSessionId) return throwError('No paymentSessionId found');

          return this.opfCheckoutService.verifyPayment(paymentSessionId, {
            responseMap: [...params],
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
          this.globalMessageService.add(
            error,
            GlobalMessageType.MSG_TYPE_ERROR
          );
          this.routingService.go({ cxRoute: 'checkoutReviewOrder' });
        },

        next: () => {
          this.routingService.go({ cxRoute: 'orderConfirmation' });
        },
      });
  }
  convertParamsToKeyValuePairs(params: Params): KeyValuePair[] {
    if (!params) return [];
    return Object.entries(params).map((pair) => {
      return { key: pair[0], value: pair[1] as string };
    });
  }

  getFullUrl(): string {
    return this.winRef.document.location.origin;
  }

  FindFromKeyValuePairs(key: string, list: KeyValuePair[]): string | undefined {
    return list.find((pair) => pair.key === key)?.value ?? undefined;
  }

  getCurrentUrlParams(): KeyValuePair[] {
    return this.convertParamsToKeyValuePairs(this.route.snapshot.params);
  }
}
