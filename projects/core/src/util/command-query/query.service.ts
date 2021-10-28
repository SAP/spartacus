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
  debounceTime,
  distinctUntilChanged,
  pluck,
  share,
  switchMapTo,
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

    // Use case
    // single step checkout
    // - set delivery address (loading)
    // - response for address (loading: false, data)
    // - set mode
    // - set payment (loading: false, data)
    // --
    // (loading: false, new-data)
    // 3 events causing reload
    // we actually only need to reload after all completes

    // state needs to be in case of reset cleared immediately!
    // we want to trigger the reload to happen after some "free" time

    const resetTrigger$ = this.getTriggersStream(options?.resetOn ?? []);
    const reloadTrigger$ = this.getTriggersStream(options?.reloadOn ?? []);

    // pass te first trigger, but debounce the triggers that happen right after it
    // response and in the previous tick we got new reload event
    /*
    - subscription
    {
      loading: true,
      data: undefined
    }
    - 1 tick happens
    - load (async call)
    - response
    {
      loading: false,
      data: value
    }


    - subscription
    {
      loading: true,
      data: undefined
    }
    - 1 tick happens
    - load (async call)
    - reload event
    {
      loading: true,
      data: value
    }
    - response
    {
      loading: false,
      data: value
    }
    - 1 tick happens
    {
      loading: true,
      data: value
    }
    - load (async call)
    - response
    {
      loading: false,
      data: new-value
    }

    setDeliveryAddress(), switchMap(query),filter(loading)


    */
    const load$ = loadTrigger$.pipe(
      tap(() => {
        if (!state$.value.loading) {
          state$.next({ ...state$.value, loading: true });
        }
      }),
      debounceTime(1), // 1,2,3,4  -> one emission
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
