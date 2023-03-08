/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, Type } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  getLastValueSync,
  UnifiedInjector,
} from '@spartacus/core';
import { concat, from, isObservable, Observable, of } from 'rxjs';
import { endWith, first, skipWhile } from 'rxjs/operators';
import { CmsComponentsService } from './cms-components.service';

/**
 * Returns a wrapper function `CanActivateFn` (https://angular.io/api/router/CanActivateFn)
 * that injects the given guard instance and runs its method `.canActivate()`.
 *
 * This function uses the `CmsGuardsService` to inject and run the guard,
 * allowing the guard's instance to be injected even if it was provided
 * in a child injector (of some lazy-loaded module).
 */
export function resolveCmsGuard(guard: Type<any>): CanActivateFn {
  return (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> => {
    const cmsGuardsService = inject(CmsGuardsService);
    return cmsGuardsService.canActivateGuard(guard, route, state);
  };
}

@Injectable({
  providedIn: 'root',
})
export class CmsGuardsService {
  constructor(
    protected cmsComponentsService: CmsComponentsService,
    // TODO:#checkout - handle breaking changes in schematics
    protected unifiedInjector: UnifiedInjector
  ) {}

  cmsPageCanActivate(
    componentTypes: string[],
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const guards = this.cmsComponentsService.getGuards(componentTypes);

    if (guards.length) {
      const canActivateObservables = guards.map((guard) =>
        this.canActivateGuard(guard, route, state)
      );

      return concat(...canActivateObservables).pipe(
        skipWhile((canActivate: boolean | UrlTree) => canActivate === true),
        endWith(true),
        first()
      );
    } else {
      return of(true);
    }
  }

  canActivateGuard(
    guardClass: any,
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const guard = getLastValueSync(
      this.unifiedInjector.get<CanActivate>(guardClass)
    );
    if (isCanActivate(guard)) {
      return wrapIntoObservable(guard.canActivate(route, state)).pipe(first());
    } else {
      throw new Error('Invalid CanActivate guard in cmsMapping');
    }
  }
}

function wrapIntoObservable<T>(
  value: T | Promise<T> | Observable<T>
): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }

  return of(value);
}

function isPromise(obj: any): obj is Promise<any> {
  return !!obj && typeof obj.then === 'function';
}

function isCanActivate(guard: any): guard is CanActivate {
  return guard && isFunction<CanActivate>(guard.canActivate);
}

function isFunction<T>(v: any): v is T {
  return typeof v === 'function';
}
