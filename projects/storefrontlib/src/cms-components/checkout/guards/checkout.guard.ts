import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { CheckoutConfig } from '../config/checkout-config';
import { Observable, of } from 'rxjs';
import { RoutingConfigService } from '@spartacus/core';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  firstStep$: Observable<UrlTree>;

  constructor(
    private router: Router,
    private config: CheckoutConfig,
    private routingConfigService: RoutingConfigService,
    private expressCheckoutService: ExpressCheckoutService
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
    if (this.config.checkout.express) {
      return this.expressCheckoutService.trySetDefaultCheckoutDetails().pipe(
        switchMap((expressCheckoutPossible: boolean) => {
          // return expressCheckoutPossible
          //   ? of(
          //       this.router.parseUrl(
          //         this.routingConfigService.getRouteConfig(
          //           this.config.checkout.steps[3].routeName
          //         ).paths[0]
          //       )
          //     )
          //   : this.firstStep$;
          if (expressCheckoutPossible) {
            console.log('express');
            return of(
              this.router.parseUrl(
                this.routingConfigService.getRouteConfig(
                  this.config.checkout.steps[3].routeName
                ).paths[0]
              )
            );
          } else {
            console.log('nope');
            return this.firstStep$;
          }
        })
      );
    } else {
      return this.firstStep$;
    }
  }
}
