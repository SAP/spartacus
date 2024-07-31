/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, SchedulerLike, defer, merge, of, using } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { deepMerge } from '../../config/utils/deep-merge';
import { EventService } from '../../event/event.service';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { StateUtils } from '../../state/utils';
import { EntityScopedLoaderActions } from '../../state/utils/scoped-loader/entity-scoped-loader.actions';
import { uniteLatest } from '../../util/rxjs/unite-latest';
import { withdrawOn } from '../../util/rxjs/withdraw-on';

// SPIKE - it's a copy of the old (Deprecated)ProductLoadingService
// but more generic, so can be re-used for other entities like ProductSearch

@Injectable({
  providedIn: 'root',
})
export abstract class ScopedItemLoadingService<Item, StateWithItem> {
  /// Template methods to be implemented in the concrete classes:

  abstract getItemName(): string;

  abstract getItemState(
    code: string,
    scope: string
  ): Observable<StateUtils.LoaderState<Item>>;

  abstract dispatchLoadAction(code: string, scope: string): void;

  abstract getLoadActionType(): string;

  abstract getLoadSuccessActionType(): string;

  abstract getLoadFailActionType(): string;

  /// Implementation details:

  protected items: {
    [code: string]: { [scope: string]: Observable<Item> };
  } = {};

  protected store = inject(Store<StateWithItem>);
  protected loadingScopes = inject(LoadingScopesService);
  protected actions$ = inject(Actions);
  protected platformId = inject(PLATFORM_ID);
  protected eventService = inject(EventService);

  get(code: string, scopes: string[]): Observable<Item> {
    scopes = this.loadingScopes.expand(this.getItemName(), scopes);

    this.initItemScopes(code, scopes);
    return this.items[code][this.getScopesIndex(scopes)];
  }

  protected initItemScopes(code: string, scopes: string[]): void {
    if (!this.items[code]) {
      this.items[code] = {};
    }

    for (const scope of scopes) {
      if (!this.items[code][scope]) {
        this.items[code][scope] = this.getItemForScope(code, scope);
      }
    }

    if (scopes.length > 1) {
      this.items[code][this.getScopesIndex(scopes)] = uniteLatest(
        scopes.map((scope) => this.items[code][scope])
      ).pipe(
        map((itemParts) =>
          itemParts.every(Boolean) ? deepMerge({}, ...itemParts) : undefined
        ),
        distinctUntilChanged()
      );
    }
  }

  protected getScopesIndex(scopes: string[]): string {
    return scopes.join('ɵ');
  }

  /**
   * Creates observable for providing specified item data for the scope
   *
   * @param code
   * @param scope
   */
  protected getItemForScope(
    code: string,
    scope: string
  ): Observable<Item | undefined> {
    const shouldLoad$ = this.getItemState(code, scope).pipe(
      map(
        (itemState) =>
          !itemState.loading && !itemState.success && !itemState.error
      ),
      distinctUntilChanged(),
      filter((x) => x)
    );

    const isLoading$ = this.getItemState(code, scope).pipe(
      map((state) => state.loading)
    );

    const itemLoadLogic$ = merge(
      shouldLoad$,
      ...this.getItemReloadTriggers(code, scope)
    ).pipe(
      debounceTime(0),
      withLatestFrom(isLoading$),
      tap(([, isLoading]) => {
        if (!isLoading) {
          this.dispatchLoadAction(code, scope);
        }
      })
    );

    const itemData$ = this.getItemState(code, scope).pipe(
      map((state) => state.value)
    );

    return using(
      () => itemLoadLogic$.subscribe(),
      () => itemData$
    ).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Returns reload triggers for item per scope
   *
   * @param code
   * @param scope
   */
  protected getItemReloadTriggers(
    code: string,
    scope: string
  ): Observable<unknown>[] {
    const triggers: Observable<unknown>[] = [];

    // max age trigger add
    const maxAge = this.loadingScopes.getMaxAge(this.getItemName(), scope);
    if (maxAge && isPlatformBrowser(this.platformId)) {
      // we want to grab load item success and load item fail for this item and scope
      const loadFinish$ = this.actions$.pipe(
        ofType<
          | EntityScopedLoaderActions.EntityScopedSuccessAction
          | EntityScopedLoaderActions.EntityScopedFailAction
        >(this.getLoadActionType(), this.getLoadFailActionType()),
        filter(
          (
            action:
              | EntityScopedLoaderActions.EntityScopedSuccessAction
              | EntityScopedLoaderActions.EntityScopedFailAction
          ) => action?.meta?.entityId === code && action?.meta?.scope === scope
        )
      );

      const loadStart$ = this.actions$.pipe(
        ofType<EntityScopedLoaderActions.EntityScopedLoadAction>(
          this.getLoadActionType()
        ),
        filter(
          (action: EntityScopedLoaderActions.EntityScopedLoadAction) =>
            action?.meta.entityId === code && action.meta.scope === scope
        )
      );

      triggers.push(this.getMaxAgeTrigger(loadStart$, loadFinish$, maxAge));
    }

    const reloadTriggers$ = this.loadingScopes
      .getReloadTriggers(this.getItemName(), scope)
      .map((e) => this.eventService.get(e));

    return triggers.concat(reloadTriggers$);
  }

  /**
   * Generic method that returns stream triggering reload by maxAge
   *
   * Could be refactored to separate service in future to use in other
   * max age reload implementations
   *
   * @param loadStart$ Stream that emits on load start
   * @param loadFinish$ Stream that emits on load finish
   * @param maxAge max age
   */
  private getMaxAgeTrigger(
    loadStart$: Observable<EntityScopedLoaderActions.EntityScopedLoadAction>,
    loadFinish$: Observable<
      | EntityScopedLoaderActions.EntityScopedSuccessAction
      | EntityScopedLoaderActions.EntityScopedFailAction
    >,
    maxAge: number,
    scheduler?: SchedulerLike
  ): Observable<boolean> {
    let timestamp = 0;

    const now = () => (scheduler ? scheduler.now() : Date.now());

    const timestamp$ = loadFinish$.pipe(tap(() => (timestamp = now())));

    const shouldReload$: Observable<boolean> = defer(() => {
      const age = now() - timestamp;

      const timestampRefresh$ = timestamp$.pipe(
        delay(maxAge, scheduler),
        map(() => true),
        withdrawOn(loadStart$)
      );

      if (age > maxAge) {
        // we should emit first value immediately
        return merge(of(true), timestampRefresh$);
      } else if (age === 0) {
        // edge case, we should emit max age timeout after next load success
        // could happen with artificial schedulers
        return timestampRefresh$;
      } else {
        // we should emit first value when age will expire
        return merge(
          of(true).pipe(delay(maxAge - age, scheduler)),
          timestampRefresh$
        );
      }
    });

    return shouldReload$;
  }
}
