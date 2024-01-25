/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingService, WindowRef } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { AsmEnablerService } from './asm-enabler.service';
import { AsmDeepLinkParameters } from '../model/asm.models';

@Injectable({
  providedIn: 'root',
})
export class AsmDeepLinkService {
  protected searchParams: URLSearchParams;

  constructor(
    protected routingService: RoutingService,
    protected winRef: WindowRef,
    protected asmEnablerService: AsmEnablerService
  ) {
    this.searchParams = new URLSearchParams(this.winRef?.location?.search);
  }

  /**
   * check whether try to emulate customer from deeplink
   */
  isEmulateInURL(): boolean {
    return this.asmEnablerService?.isEmulateInURL() || false;
  }

  /**
   * Returns a deep link parameter value if it is in the url.
   */
  getSearchParameter(key: string): string | undefined {
    return this.searchParams.get(key) ?? undefined;
  }

  /**
   * Handles the navigation based on deep link parameters in the URL
   * or passed parameters.
   */
  handleNavigation(parameters = this.getParamsInUrl()): void {
    if (parameters.cartType === 'active') {
      // Navigate to active cart
      this.routingService.go({ cxRoute: 'cart' });
    } else if (parameters.cartType === 'saved' && parameters.cartId) {
      // Navigate to saved cart
      this.routingService.go('my-account/saved-cart/' + parameters.cartId);
    } else if (parameters.orderId) {
      // Navigate to order details
      this.routingService.go({
        cxRoute: 'orderDetails',
        params: { code: parameters.orderId },
      });
    } else if (parameters.ticketId) {
      // Navigate to support ticket details
      this.routingService.go({
        cxRoute: 'supportTicketDetails',
        params: { ticketCode: parameters.ticketId },
      });
    }
  }

  /**
   * Returns valid deep link parameters in the url.
   */
  getParamsInUrl(): AsmDeepLinkParameters {
    const params: AsmDeepLinkParameters = {
      customerId: this.getSearchParameter('customerId'),
      orderId: this.getSearchParameter('orderId'),
      ticketId: this.getSearchParameter('ticketId'),
      cartId: this.getSearchParameter('cartId'),
      cartType: this.getSearchParameter('cartType'),
    };
    // Filter undefined properties
    return Object.fromEntries(Object.entries(params).filter(([_, v]) => !!v));
  }
}
