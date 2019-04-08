import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { CheckoutConfig } from '../config/checkout-config';
import { Observable, of } from 'rxjs';

@Injectable()
export class CheckoutGuard implements CanActivate {
  constructor(private router: Router, private config: CheckoutConfig) {}

  canActivate(): Observable<boolean | UrlTree> {
    return of(this.router.parseUrl(this.config.checkout.steps[0]));
  }
}
