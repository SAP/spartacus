import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { CheckoutConfig } from '../config/checkout-config';
import { Observable, of } from 'rxjs';
import { RoutingConfigService } from '@spartacus/core';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  firstStep$ = of(
    this.router.parseUrl(
      this.routingConfigService.getRouteConfig(
        this.config.checkout.steps[0].routeName
      ).paths[0]
    )
  );

  constructor(
    private router: Router,
    private config: CheckoutConfig,
    private routingConfigService: RoutingConfigService,
    private expressCheckoutService: ExpressCheckoutService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (this.config.checkout.express) {
      return this.expressCheckoutService.isExpressCheckoutPossible().pipe(
        map(expressCheckoutPossible => {
          if (expressCheckoutPossible) {
            return of(
              this.router.parseUrl(
                this.routingConfigService.getRouteConfig(
                  this.config.checkout.steps[3].routeName
                ).paths[0]
              )
            );
          } else {
            return this.firstStep$;
          }
        })
      );
    } else {
      return this.firstStep$;
    }
  }
}
