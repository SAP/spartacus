import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { RoutingConfigService, FeatureConfigService } from '@spartacus/core';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutConfig } from '../config/checkout-config';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  firstStep$: Observable<UrlTree>;
  isExpressCheckoutFeatureEnabled: boolean;

  constructor(
    private router: Router,
    private config: CheckoutConfig,
    private routingConfigService: RoutingConfigService,
    private checkoutConfigService?: CheckoutConfigService,
    private expressCheckoutService?: ExpressCheckoutService,
    private featureConfigService?: FeatureConfigService
  ) {
    this.isExpressCheckoutFeatureEnabled = this.featureConfigService.isLevel(
      '1.2'
    );
    /**
     * @deprecated since 1.2.0
     * NOTE: check issue:#4309 for more info
     *
     * TODO(issue:#4121) Deprecated since 1.2.0
     */
    if (this.isExpressCheckoutFeatureEnabled && this.checkoutConfigService) {
      this.firstStep$ = of(
        this.router.parseUrl(
          this.routingConfigService.getRouteConfig(
            this.checkoutConfigService.getFirstCheckoutStepRoute()
          ).paths[0]
        )
      );
    }
  }

  canActivate(): Observable<boolean | UrlTree> {
    /**
     * @deprecated since 1.2.0
     * NOTE: check issue:#4309 for more info
     *
     * TODO(issue:#4121) Deprecated since 1.2.0
     */
    if (
      this.isExpressCheckoutFeatureEnabled &&
      this.checkoutConfigService &&
      this.expressCheckoutService
    ) {
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
      } else {
        return this.firstStep$;
      }
    } else {
      return of(
        this.router.parseUrl(
          this.routingConfigService.getRouteConfig(
            this.config.checkout.steps[0].routeName
          ).paths[0]
        )
      );
    }
  }
}
