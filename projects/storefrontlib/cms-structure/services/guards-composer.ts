/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot, wrapIntoObservable } from '@spartacus/core';
import { Observable, concat, endWith, first, of, skipWhile } from 'rxjs';

/**
 * Replacement for the Angular's deprecated type `CanActivate`.
 */
export type CanActivate = { canActivate: CanActivateFn };

/**
 * Observable that emits a boolean or an UrlTree.
 */
export type CanActivateObservable = Observable<boolean | UrlTree>;

/**
 * Utility service for running multiple guards and composing their results
 * into a single result observable.
 */
@Injectable({ providedIn: 'root' })
export class GuardsComposer {
  /**
   * Executes guards, returning an Observable that:
   * - emits `true` if all those guards pass (emit `true`)
   * - emits `false` or `UrlTree` immediately if any those guards fails (returns `false` or `UrlTree`)
   *
   * This is in line with the default Angular behavior.
   */
  canActivate(
    guards: CanActivate[],
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    if (guards.length) {
      const canActivateObservables = guards.map((guard) =>
        this.canActivateGuard(guard, route, state)
      );
      return this.composeCanActivateObservables(canActivateObservables);
    }
    return of(true);
  }

  /**
   * Executes a guard's `canActivate` method with `route` and `state`,
   * returning its result as an Observable.
   *
   * Converts non-Observable results (Promise or static value) into Observable.
   */
  protected canActivateGuard(
    guard: CanActivate,
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    if (this.isCanActivate(guard)) {
      return wrapIntoObservable(guard.canActivate(route, state)).pipe(first());
    } else {
      throw new Error('Invalid CanActivate guard');
    }
  }

  /**
   * Composes the given observables into a single observable that emits a boolean or an UrlTree.
   *
   * The returned composed observable:
   * - emits `true` after all the given observables emit `true`.
   * - emits `false` or `UrlTree` as soon as any of the given observables emit such a value (`false` or `UrlTree`).
   */
  protected composeCanActivateObservables(
    canActivateObservables: CanActivateObservable[]
  ): CanActivateObservable {
    return concat(...canActivateObservables).pipe(
      skipWhile((canActivate: boolean | UrlTree) => canActivate === true),
      endWith(true),
      first()
    );
  }

  /**
   * Tells whether the given object has a `canActivate` method.
   */
  protected isCanActivate(guard: any): guard is CanActivate {
    return guard && typeof guard.canActivate === 'function';
  }
}
