/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import { RoutingConfigService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import { ExpressCheckoutService } from '../services/express-checkout.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard {
  private readonly firstStep$: Observable<UrlTree> =
    this.checkoutStepService.steps$.pipe(
      map((steps) => {
        return this.router.parseUrl(
          this.routingConfigService.getRouteConfig(steps[0].routeName)
            ?.paths?.[0] as string
        );
      })
    );

  constructor(
    protected router: Router,
    protected routingConfigService: RoutingConfigService,
    protected checkoutConfigService: CheckoutConfigService,
    protected expressCheckoutService: ExpressCheckoutService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const expressCheckout$ = this.expressCheckoutService
      .trySetDefaultCheckoutDetails()
      .pipe(
        switchMap((expressCheckoutPossible) => {
          const reviewOrderRoute =
            this.checkoutStepService.getCheckoutStepRoute(
              CheckoutStepType.REVIEW_ORDER
            );
          return expressCheckoutPossible && reviewOrderRoute
            ? of(
                this.router.parseUrl(
                  this.routingConfigService.getRouteConfig(reviewOrderRoute)
                    ?.paths?.[0] as string
                )
              )
            : this.firstStep$;
        })
      );

    return this.activeCartFacade
      .isGuestCart()
      .pipe(
        switchMap((isGuestCart) =>
          this.checkoutConfigService.isExpressCheckout() && !isGuestCart
            ? expressCheckout$
            : this.firstStep$
        )
      );
  }
}
