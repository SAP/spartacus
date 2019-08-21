import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { CheckoutConfig } from '../config/checkout-config';
import { Observable, of } from 'rxjs';
import { RoutingConfigService } from '@spartacus/core';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { switchMap } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepType } from '../model/checkout-step.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  firstStep$: Observable<UrlTree>;

  constructor(
    private router: Router,
    private config: CheckoutConfig,
    private routingConfigService: RoutingConfigService,
    private expressCheckoutService: ExpressCheckoutService,
    private checkoutConfigService: CheckoutConfigService
  ) {
    this.firstStep$ = of(
      this.router.parseUrl(
        this.routingConfigService.getRouteConfig(
          this.config.checkout.steps[0].routeName
        ).paths[0]
      )
    );
  }

  canActivate(): Observable<boolean | UrlTree> {
    // TODO create method in checkout config service `isExpressCheckout`
    if (this.config.checkout.express) {
      return this.expressCheckoutService.trySetDefaultCheckoutDetails().pipe(
        switchMap((expressCheckoutPossible: boolean) => {
          return expressCheckoutPossible
            ? of(
                this.router.parseUrl(
                  this.routingConfigService.getRouteConfig(
                    this.checkoutConfigService.getCheckoutStep(
                      CheckoutStepType.REVIEW_ORDER
                    ).routeName
                  ).paths[0]
                )
              )
            : this.firstStep$;
        })
      );
    } else {
      return this.firstStep$;
    }
  }
}
