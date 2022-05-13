import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Inject,
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  Type,
} from '@angular/core';
import {
  makeStateKey,
  StateKey,
  TransferState,
} from '@angular/platform-browser';
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
  skip,
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

/** Loader factory for the query */
export type QueryLoaderFactory<T> = () => Observable<T>;

// TODO:#feature/CXSPA-403 - should be a separate key, to avoid stepping on the ngrx's store toes
export const CX_QUERY_STATE: StateKey<string> =
  makeStateKey<string>('cx-query-state');

// TODO:#feature/CXSPA-403 - copied from projects/storefrontapp-e2e-cypress/cypress/helpers/form.ts
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Query transfer state type.
 *
 * It uses the provided function to create
 * the slice of the state to be transferred.
 *
 * If just a boolean is provided, the whole
 * state will be transferred.
 *
 */
export type QueryTransferState<T> = ((state: T) => DeepPartial<T>) | boolean;

@Injectable({
  providedIn: 'root',
})
export class QueryService implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected transferState: TransferState
  ) {}

  create<T>(
    loaderFactory: QueryLoaderFactory<T>,
    options?: {
      /** Reloads the query, while preserving the `data` until the new data is loaded */
      reloadOn?: QueryNotifier[];
      /** Resets the query to the initial state */
      resetOn?: QueryNotifier[];
      /** When set, it will transfer the state from SSR to CSR. */
      transferState?: QueryTransferState<T>;
    }
  ): Query<T> {
    let data: T | undefined;
    if (options?.transferState) {
      const transferredState = this.getTransferredState<T>();
      if (transferredState) {
        data = transferredState;
      }
    }

    const initialState: QueryState<T> = {
      data,
      error: false,
      loading: true,
    };

    const state$ = new BehaviorSubject<QueryState<T>>(initialState);

    // if the query will be unsubscribed from while the data is being loaded, we will end up with the loading flag set to true
    // we want to retry this load on next subscription
    const onSubscribeLoad$ = iif(() => state$.value.loading, of(undefined));

    let loadTrigger$ = this.getTriggersStream([
      onSubscribeLoad$, // we need to evaluate onSubscribeLoad$ before other triggers in order to avoid other triggers changing state$ value
      ...(options?.reloadOn ?? []),
      ...(options?.resetOn ?? []),
    ]);
    if (
      data &&
      /**
       * Skipping the first emission in the browser
       * will avoid executing the given loaderFactory.
       */
      isPlatformBrowser(this.platformId)
    ) {
      loadTrigger$ = loadTrigger$.pipe(
        /**
         * We are actually skipping the onSubscribeLoad$ emission
         */
        skip(1)
      );
    }

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
        if (options?.transferState) {
          this.setTransferState(data, options.transferState);
        }
      }),
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

    const data$ = query$.pipe(pluck('data'), distinctUntilChanged());

    return { get: () => data$, getState: () => query$ };
  }

  // TODO:#feature/CXSPA-403 - add jsdoc
  protected setTransferState<T>(
    state: T,
    transferStateFn: QueryTransferState<T>
  ): void {
    if (!isPlatformServer(this.platformId)) {
      return;
    }

    const toSerialize =
      typeof transferStateFn === 'boolean' ? state : transferStateFn(state);

    // TODO:#feature/CXSPA-403 - error handling?
    // TODO:#feature/CXSPA-403 - get the previous state, and deep merge it with the new one
    this.transferState.set(CX_QUERY_STATE, JSON.stringify(toSerialize));
  }

  // TODO:#feature/CXSPA-403 - add jsdoc
  protected getTransferredState<T>(): T | undefined {
    const state = this.transferState.get(CX_QUERY_STATE, undefined);
    if (!state) {
      return undefined;
    }

    // TODO:#feature/CXSPA-403 - error handling?
    return JSON.parse(state);
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
