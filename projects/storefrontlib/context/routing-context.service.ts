/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ActivatedRoutesService, UnifiedInjector } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { ContextToken } from './context.model';

/**
 * Resolves the context for the specific route, based on the property `data.cxContext`
 * defined in the Angular Route.
 */
@Injectable({ providedIn: 'root' })
export class RoutingContextService {
  constructor(
    protected activatedRoutesService: ActivatedRoutesService,
    protected injector: UnifiedInjector
  ) {}

  /**
   * Combined context token mapping consisting of all mappings defined in currently
   * Activated Angular Routes.
   *
   * The context token mapping is read from each Route's property `data.cxContext`.
   */
  protected readonly contextTokenMapping$: Observable<
    Record<ContextToken, any>
  > = this.activatedRoutesService.routes$.pipe(
    map((routes) => this.getRoutesContextTokenMapping(routes)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  /**
   * Returns the merged context token mapping, consisting of mappings
   * defined in all Activated Angular Routes.
   */
  protected getRoutesContextTokenMapping(
    routes: ActivatedRouteSnapshot[]
  ): Record<ContextToken, any> {
    return Object.assign({}, ...routes.map((route) => route?.data?.cxContext));
  }

  /**
   * Resolves the specified `contextToken` from `cxContext` data parameter of the activated Angular Routes.
   * @param contextToken
   *
   * @returns instance from the root injector if defined, otherwise `undefined`.
   */
  get<T>(contextToken: ContextToken): Observable<T | undefined> {
    return this.contextTokenMapping$.pipe(
      switchMap((contextMapping) => {
        const providerToken = contextMapping?.[contextToken];
        return !!providerToken
          ? this.injector.get<T>(providerToken)
          : of(undefined);
      })
    );
  }
}
