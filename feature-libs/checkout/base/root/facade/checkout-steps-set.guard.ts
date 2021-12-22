import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutStepsSetGuard,
      // TODO:#checkout - create CHECKOUT_COMPONENT_FEATURE?
      feature: CHECKOUT_CORE_FEATURE,
      methods: ['canActivate'],
    }),
})
export abstract class CheckoutStepsSetGuard implements CanActivate {
  abstract canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree>;
}
