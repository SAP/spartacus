/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import {
  OpfGlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
  OpfRegisterGlobalFunctionsInput,
} from '@spartacus/opf/global-functions/root';
import { OpfPaymentGlobalMethods } from '@spartacus/opf/payment/root';
import { OpfGlobalFunctionsCheckoutDomainRegistrationsService } from '../services/domains/checkout/opf-global-functions-checkout-domain-registrations.service';
import { OpfGlobalFunctionsGlobalDomainRegistrationsService } from '../services/domains/global/opf-global-functions-global-domain-registrations.service';
import { OpfGlobalFunctionsRedirectDomainRegistrationsService } from '../services/domains/redirect/opf-global-functions-redirect-domain-registrations.service';

@Injectable()
export class OpfGlobalFunctionsService implements OpfGlobalFunctionsFacade {
  protected winRef = inject(WindowRef);
  protected checkoutDomain = inject(
    OpfGlobalFunctionsCheckoutDomainRegistrationsService
  );
  protected redirectDomain = inject(
    OpfGlobalFunctionsRedirectDomainRegistrationsService
  );
  protected globalDomain = inject(
    OpfGlobalFunctionsGlobalDomainRegistrationsService
  );

  registerGlobalFunctions({
    domain,
    paymentSessionId,
    vcr,
    paramsMap,
  }: OpfRegisterGlobalFunctionsInput): void {
    // SSR not supported
    if (!this.winRef.isBrowser()) {
      return;
    }
    const container = this.getContainer(domain);
    switch (domain) {
      case OpfGlobalFunctionsDomain.CHECKOUT:
        this.checkoutDomain.registerAll(container, {
          domain,
          paymentSessionId,
          vcr,
          paramsMap,
        });
        break;
      case OpfGlobalFunctionsDomain.REDIRECT:
        this.redirectDomain.registerAll(container, {
          domain,
          paymentSessionId,
          vcr,
          paramsMap,
        });
        break;
      case OpfGlobalFunctionsDomain.GLOBAL:
        this.globalDomain.registerAll(container, {
          domain,
          paymentSessionId,
          vcr,
          paramsMap,
        });
        break;
      default:
        break;
    }
  }

  protected getContainer(
    domain: OpfGlobalFunctionsDomain
  ): OpfPaymentGlobalMethods {
    const window = this.winRef.nativeWindow as any;
    if (!window) {
      return {};
    }

    if (!window.Opf?.payments?.[domain]) {
      window.Opf = window?.Opf ?? {};
      window.Opf.payments = window.Opf.payments ?? {};
      window.Opf.payments[domain] = {};
    }

    return window.Opf.payments[domain];
  }

  unregisterGlobalFunctions(domain: OpfGlobalFunctionsDomain): void {
    // SSR not supported
    if (!this.winRef.isBrowser()) {
      return;
    }
    const window = this.winRef.nativeWindow as any;
    if (!window?.Opf?.payments) {
      return;
    }
    if (window.Opf.payments[domain]) {
      window.Opf.payments[domain] = undefined;
    }
  }
}
