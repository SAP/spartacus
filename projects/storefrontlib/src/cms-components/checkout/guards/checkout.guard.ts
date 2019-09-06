import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { RoutingConfigService } from '@spartacus/core';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutConfig } from '../config/checkout-config';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  private readonly firstStep$: Observable<UrlTree>;

  constructor(
    router: Router,
    config: CheckoutConfig,
    routingConfigService: RoutingConfigService,
    checkoutConfigService: CheckoutConfigService,
    expressCheckoutService: ExpressCheckoutService
  );
  /**
   * @deprecated since version 1.2
   *  Use constructor(router: Router,
   *  config: CheckoutConfig - @deprecated since 2.x,
   *  routingConfigService: RoutingConfigService,
   *  checkoutConfigService: CheckoutConfigService,
   *  expressCheckoutService: ExpressCheckoutService) instead
   *
   *  TODO(issue:#4309) Deprecated since 1.2.0
   */
  constructor(
    router: Router,
    config: CheckoutConfig,
    routingConfigService: RoutingConfigService
  );
  constructor(
    private router: Router,
    private config: CheckoutConfig,
    private routingConfigService: RoutingConfigService,
    protected checkoutConfigService?: CheckoutConfigService,
    protected expressCheckoutService?: ExpressCheckoutService
  ) {
    /**
     * TODO(issue:#4309) Deprecated since 1.2.0
     */
    if (this.checkoutConfigService) {
      this.firstStep$ = of(
        this.router.parseUrl(
          this.routingConfigService.getRouteConfig(
            this.checkoutConfigService.getFirstCheckoutStepRoute()
          ).paths[0]
        )
      );
    } else {
      this.firstStep$ = of(
        this.router.parseUrl(
          this.routingConfigService.getRouteConfig(
            this.config.checkout.steps[0].routeName
          ).paths[0]
        )
      );
    }
  }

  canActivate(): Observable<boolean | UrlTree> {
    /**
     * TODO(issue:#4309) Deprecated since 1.2.0
     */
    if (this.checkoutConfigService && this.expressCheckoutService) {
      if (this.checkoutConfigService.isExpressCheckout()) {
        return this.expressCheckoutService.trySetDefaultCheckoutDetails().pipe(
          switchMap((expressCheckoutPossible: boolean) => {
            return expressCheckoutPossible
              ? of(
                  this.router.parseUrl(
                    this.routingConfigService.getRouteConfig(
                      this.checkoutConfigService.getCheckoutStepRoute(
                        CheckoutStepType.REVIEW_ORDER
                      )
                    ).paths[0]
                  )
                )
              : this.firstStep$;
          })
        );
      }
    }
    return this.firstStep$;
  }
}
