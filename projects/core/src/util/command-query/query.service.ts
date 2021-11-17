import { Injectable, OnDestroy, Type } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  iif,
  isObservable,
  merge,
  Observable,
  of,
  Subscription,
  using,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  pluck,
  share,
  switchMapTo,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { CxEvent } from '../../event/cx-event';

export type QueryNotifier = Observable<unknown> | Type<CxEvent>;

export interface QueryState<T> {
  loading: boolean;
  error: false | Error;
  data: T | undefined;
}

export interface Query<T, P extends unknown[] = []> {
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
    loaderFactory: () => Observable<T>,
    options?: {
      reloadOn?: QueryNotifier[];
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
    const onSubscribeLoad$ = iif(() => state$.value.loading, of(undefined));

    const loadTrigger$ = this.getTriggersStream([
      onSubscribeLoad$, // we need to evaluate onSubscribeLoad$ before other triggers in order to avoid other triggers changing state$ value
      ...(options?.reloadOn ?? []),
      ...(options?.resetOn ?? []),
    ]);

    const resetTrigger$ = this.getTriggersStream(options?.resetOn ?? []);
    const reloadTrigger$ = this.getTriggersStream(options?.reloadOn ?? []);

    const load$ = loadTrigger$.pipe(
      tap(() => {
        if (!state$.value.loading) {
          state$.next({ ...state$.value, loading: true });
        }
      }),
      switchMapTo(loaderFactory().pipe(takeUntil(resetTrigger$))),
      tap((data) => {
        state$.next({ loading: false, error: false, data });
      }),
      catchError((error, retryStream$) => {
        state$.next({ loading: false, error, data: undefined });
        return retryStream$;
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

    const data$ = query$.pipe(pluck('data'), distinctUntilChanged());

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
