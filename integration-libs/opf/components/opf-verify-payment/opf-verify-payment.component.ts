/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import {
  defaultOpfConfig,
  KeyValuePair,
  OpfCheckoutFacade,
  OpfConfig,
  OpfVerifyPaymentPayload,
  OpfVerifyPaymentResponse,
} from '@spartacus/opf/root';
import { OrderFacade } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, throwError } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-verify-payment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfVerifyPaymentComponent implements OnInit {
  verifyPaymentPayload?: OpfVerifyPaymentPayload;
  paymentSessionId?: string;
  isAuthorized?: string;
  placedOrder: void | Observable<ComponentRef<any> | undefined>;
  paymentObs$: Observable<OpfVerifyPaymentResponse | undefined>;
  path?: string;

  constructor(
    protected route: ActivatedRoute,
    protected routingService: RoutingService,
    protected orderFacade: OrderFacade,
    protected opfCheckoutService: OpfCheckoutFacade,
    protected launchDialogService: LaunchDialogService,
    protected config: OpfConfig,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');

    this.route.url
      .pipe(
        take(1),
        map((segments) => segments.join('/')),
        switchMap((url: string) => {
          console.log(
            'defaultOpfConfig.opf?.successUrl',
            defaultOpfConfig.opf?.successUrl
          );
          console.log('url', url);
          this.path = url.includes(defaultOpfConfig.opf?.successUrl as string)
            ? 'SuccessPath'
            : 'CancelPath';
          return this.route.queryParams;
        }),
        switchMap((params) => {
          if (!params) return throwError('No params');

          const list: KeyValuePair[] = Object.entries(params).map((pair) => {
            return { key: pair[0], value: pair[1] as string };
          });

          this.paymentSessionId = this.getPaymentSessionId(list);
          if (!this.paymentSessionId)
            return throwError('No paymentSessionId found');

          return this.opfCheckoutService.getVerifyPaymentState(
            this.paymentSessionId,
            { responseMap: [...list] }
          );
        }),
        filter((state) => !state.loading),
        map((state) => state.data),
        switchMap((response: OpfVerifyPaymentResponse) => {
          if (response?.result === 'AUTHORIZED') {
            return this.orderFacade.placeOrder(true);
          } else {
            return throwError('PSP returned UNAUTHORIZED');
          }
        })
      )
      .subscribe({
        error: (error) => {
          console.log('getVerifyPaymentState ERROR', error);
          this.displayErrorMessage(error);
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

  displayErrorMessage(message: string) {
    this.globalMessageService.add(message, GlobalMessageType.MSG_TYPE_ERROR);
  }

  placeOrder() {
    // true as user already checked T&C from last Checkout step
    this.orderFacade.placeOrder(true).subscribe({
      error: () => {
        if (!this.placedOrder) {
          return;
        }

        this.placedOrder
          .subscribe((component) => {
            this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
            if (component) {
              component.destroy();
            }
          })
          .unsubscribe();
      },
      next: () => this.onSuccess(),
    });
  }

  onSuccess(): void {
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }
}
