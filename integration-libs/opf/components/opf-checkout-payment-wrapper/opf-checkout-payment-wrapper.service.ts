/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { RoutingService, ScriptLoader, UserIdService } from '@spartacus/core';
import {
  OpfCheckoutFacade,
  OpfOtpFacade,
  PaymentDynamicScriptResource,
  PaymentSessionData,
} from '@spartacus/opf/root';
import { Observable, combineLatest, throwError } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { OpfCheckoutPaymentLinkComponent } from './payment-link/opf-checkout-payment-link.component';

@Injectable()
export class OpfCheckoutPaymentWrapperService {
  constructor(
    protected opfCheckoutService: OpfCheckoutFacade,
    protected opfOtpService: OpfOtpFacade,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService,
    protected routingService: RoutingService,
    protected scriptLoader: ScriptLoader
  ) {}

  protected activeCartId: string;

  protected executeScriptFromHtml(html: string) {
    const element = new DOMParser().parseFromString(html, 'text/html');
    const script = element.getElementsByTagName('script');
    Function(script[0].innerText)();
  }

  protected loadProviderScripts(
    scripts: PaymentDynamicScriptResource[] | undefined
  ): Promise<void> {
    return new Promise((resolve) => {
      let loaded = 0;

      scripts?.forEach((script: PaymentDynamicScriptResource) => {
        if (script.url) {
          this.scriptLoader.embedScript({
            src: script.url,
            attributes: { type: 'text/javascript' },
            callback: () => {
              loaded++;
              if (loaded === scripts?.length) {
                resolve();
              }
            },
            errorCallback: () =>
              throwError(`Error while loading external ${script.url} script.`),
          });
        }
      });
    });
  }

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

    const component: ComponentRef<OpfCheckoutPaymentLinkComponent> =
      container.createComponent(OpfCheckoutPaymentLinkComponent);

    // case for destination url
    if (config?.destination) {
      component.instance.link = config.destination.url;
    }

    // case for dynamic script
    if (config?.dynamicScript) {
      const html = config.dynamicScript.html || '';

      this.loadProviderScripts(config.dynamicScript.jsUrls).then(() => {
        this.executeScriptFromHtml(html);
      });
      component.instance.html = html;
    }

    component.instance.ngOnInit();
  }
}
