import { Injectable, OnDestroy, Type } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  isObservable,
  merge,
  Observable,
  Subscription,
  using,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  pluck,
  retry,
  share,
  switchMapTo,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { CxEvent } from '../../event/cx-event';

export type QueryNotifier = Observable<any> | Type<CxEvent>;

export interface QueryState<T> {
  loading: boolean;
  error: boolean | Error;
  data: T | undefined;
}

export interface Query<T, P extends any[] = []> {
  get(...params: P): Observable<T | undefined>;
  getState(...params: P): Observable<QueryState<T>>;
}

@Injectable({
  providedIn: 'root',
})
export class QueryService implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {}

  create<T>(
    loadFunc: () => Observable<T>,
    options?: {
      reloadOn?: QueryNotifier[];
      resetOn?: QueryNotifier[];
      transferState?: string | (() => string);
    }
  ): Query<T> {
    const state$ = new BehaviorSubject<QueryState<T>>({
      data: undefined,
      error: false,
      loading: false,
    });

    const loadTrigger$ = this.getTriggersStream([
      state$.pipe(
        filter(
          ({ data, loading, error }) => data === undefined && !loading && !error
        )
      ),
      ...(options?.reloadOn ?? []),
    ]);

    const resetTrigger$ = this.getTriggersStream(options?.resetOn ?? []);

    const load$ = loadTrigger$.pipe(
      tap(() => state$.next({ ...state$.value, loading: true })),
      switchMapTo(loadFunc().pipe(takeUntil(resetTrigger$))),
      tap((data) => {
        state$.next({ loading: false, error: false, data });
      }),
      catchError((error) => {
        state$.next({ loading: false, error, data: undefined });
        return EMPTY;
      }),
      retry(),
      share()
    );

    // reset logic
    if (options?.resetOn?.length) {
      this.subscriptions.add(
        resetTrigger$.subscribe(() => {
          if (
            state$.value.data !== undefined ||
            state$.value.error !== false ||
            state$.value.loading !== false
          ) {
            state$.next({
              data: undefined,
              error: false,
              loading: false,
            });
          }
        })
      );
    }

    const query$ = using(
      () => load$.subscribe(),
      () => state$
    );

    const data$ = query$.pipe(pluck('data'), distinctUntilChanged());

    return { get: () => data$, getState: () => query$ };
  }

  protected getTriggersStream(triggers: QueryNotifier[]): Observable<any> {
    if (!triggers.length) {
      return EMPTY;
    }
    const observables = triggers.map((trigger) => {
      if (isObservable(trigger)) {
        return trigger;
      }
      if (trigger.prototype instanceof CxEvent) {
        return this.eventService.get(trigger);
      }
    });
    return merge(...observables);
  }

  // protected defaultMapper = (...params) =>
  //   params
  //     .map((x) =>
  //       typeof x === 'object'
  //         ? Object.entries(x).sort(([a], [b]) => (a > b ? 1 : -1))
  //         : x
  //     )
  //     .join('-');
  //
  // createMulti<T, P extends any[]>(
  //   loadFunc: (...params: P) => Observable<T>,
  //   options?: {
  //     reloadOn?: QueryNotifier[];
  //     resetOn?: QueryNotifier[];
  //     transferState?: string | (() => string);
  //     keyMapper?: (...params: P) => string;
  //   }
  // ): Query<T, P> {
  //   const keyMapper = options?.keyMapper ?? this.defaultMapper;
  //
  //   const allPars = new Map<any, Query<T>>();
  //
  //   const initForParams = (key: string, ...params: P) => {
  //     if (!allPars.has(key)) {
  //       allPars.set(
  //         key,
  //         this.create<T>(() => loadFunc(...params), options)
  //       );
  //     }
  //   };
  //
  //   const getState = (...params: P) => {
  //     const key = keyMapper(...params);
  //     initForParams(key, ...params);
  //     return allPars.get(key).getState();
  //   };
  //
  //   const get = (...params: P) => {
  //     const key = keyMapper(...params);
  //     initForParams(key, ...params);
  //     return allPars.get(key).get();
  //   };
  //
  //   return {
  //     get,
  //     getState,
  //   };
  // }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
