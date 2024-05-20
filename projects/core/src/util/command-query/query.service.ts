/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, Type } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subscription,
  iif,
  isObservable,
  merge,
  of,
  using,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  share,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { CxEvent } from '../../event/cx-event';
import { EventService } from '../../event/event.service';

export type QueryNotifier = Observable<unknown> | Type<CxEvent>;

export interface QueryState<T> {
  loading: boolean;
  error: false | Error;
  data: T | undefined;
}

export interface Query<RESULT, PARAMS extends unknown[] = []> {
  get(...params: PARAMS): Observable<RESULT | undefined>;
  getState(...params: PARAMS): Observable<QueryState<RESULT>>;
}

@Injectable({
  providedIn: 'root',
})
export class QueryService implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {}

  create<T>(
    loaderFactory: () => Observable<T>,
    options?: {
      /** Reloads the query, while preserving the `data` until the new data is loaded */
      reloadOn?: QueryNotifier[];
      /** Resets the query to the initial state */
      resetOn?: QueryNotifier[];
    }
  ): Query<T> {
    const initialState: QueryState<T> = {
      data: undefined,
      error: false,
      loading: true,
    };

    const state$ = new BehaviorSubject<QueryState<T>>(initialState);

    // if the query will be unsubscribed from while the data is being loaded, we will end up with the loading flag set to true
    // we want to retry this load on next subscription
    const onSubscribeLoad$ = iif(
      () => state$.value.loading,
      of(undefined),
      EMPTY
    );

    const loadTrigger$ = this.getTriggersStream([
      onSubscribeLoad$, // we need to evaluate onSubscribeLoad$ before other triggers in order to avoid other triggers changing state$ value
      ...(options?.reloadOn ?? []),
      ...(options?.resetOn ?? []),
    ]);

    const resetTrigger$ = this.getTriggersStream(options?.resetOn ?? []);
    const reloadTrigger$ = this.getTriggersStream(options?.reloadOn ?? []);

    const loader$ = loaderFactory().pipe(takeUntil(resetTrigger$));

    const load$ = loadTrigger$.pipe(
      tap(() => {
        if (!state$.value.loading) {
          state$.next({ ...state$.value, loading: true });
        }
      }),
      switchMap(() => loader$),
      tap((data) => {
        state$.next({ loading: false, error: false, data });
      }),
      catchError((error, sourceStream$) => {
        state$.next({ loading: false, error, data: undefined });
        return sourceStream$;
      }),
      share()
    );

    // reload logic
    if (options?.reloadOn?.length) {
      this.subscriptions.add(
        reloadTrigger$.subscribe(() => {
          if (!state$.value.loading) {
            state$.next({ ...state$.value, loading: true });
          }
        })
      );
    }

    // reset logic
    if (options?.resetOn?.length) {
      this.subscriptions.add(
        resetTrigger$.subscribe(() => {
          if (
            state$.value.data !== undefined ||
            state$.value.error !== false ||
            state$.value.loading !== false
          ) {
            state$.next(initialState);
          }
        })
      );
    }

    const query$ = using(
      () => load$.subscribe(),
      () => state$
    );

    const data$ = query$.pipe(
      map((queryState) => queryState.data),
      distinctUntilChanged()
    );

    return { get: () => data$, getState: () => query$ };
  }

  protected getTriggersStream(triggers: QueryNotifier[]): Observable<unknown> {
    if (!triggers.length) {
      return EMPTY;
    }
    const observables = triggers.map((trigger) => {
      if (isObservable(trigger)) {
        return trigger;
      }
      return this.eventService.get(trigger);
    });
    return merge(...observables);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
