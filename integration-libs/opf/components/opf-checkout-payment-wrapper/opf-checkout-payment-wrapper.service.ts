/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import {
  OpfCheckoutFacade,
  OpfOtpFacade,
  PaymentSessionData,
} from '@spartacus/opf/root';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { OpfCheckoutPaymentLinkComponent } from './payment-link/opf-checkout-payment-link.component';

@Injectable()
export class OpfCheckoutPaymentWrapperService {
  constructor(
    protected opfCheckoutService: OpfCheckoutFacade,
    protected opfOtpService: OpfOtpFacade,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService,
    protected routingService: RoutingService
  ) {}

  protected activeCartId: string;

  initiatePayment(paymentOptionId: number): Observable<PaymentSessionData> {
    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartService.getActiveCartId(),
    ]).pipe(
      switchMap(([userId, cartId]) => {
        this.activeCartId = cartId;
        return this.opfOtpService.generateOtpKey(userId, cartId);
      }),
      filter((response) => Boolean(response?.value)),
      map(({ value: otpKey }) => {
        return {
          otpKey,
          config: {
            configurationId: String(paymentOptionId),
            cartId: this.activeCartId,
            resultURL: this.routingService.getFullUrl({
              cxRoute: 'paymentVerificationResult',
            }),
            cancelURL: this.routingService.getFullUrl({
              cxRoute: 'paymentVerificationCancel',
            }),
          },
        };
      }),
      switchMap((params) => this.opfCheckoutService.initiatePayment(params))
    );
  }

  renderPaymentGateway(
    config: PaymentSessionData,
    container: ViewContainerRef
  ) {
    container.clear();

    // case for destination url
    if (config?.destination) {
      const component: ComponentRef<OpfCheckoutPaymentLinkComponent> =
        container.createComponent(OpfCheckoutPaymentLinkComponent);
      component.instance.link = config.destination.url;
      component.instance.ngOnInit();
    }

    // case for dynamic script
    if (config?.dynamicScript) {
      // container.insert(config.dynamicScript.html);
    }
  }
}
