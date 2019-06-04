import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { CheckoutConfig } from '../config/checkout-config';
import { Observable, of } from 'rxjs';
import { RoutingConfigService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  constructor(
    private router: Router,
    private config: CheckoutConfig,
    private routingConfigService: RoutingConfigService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return of(
      this.router.parseUrl(
        this.routingConfigService.getRouteConfig(
          this.config.checkout.steps[0].routeName
        ).paths[0]
      )
    );
  }
}
