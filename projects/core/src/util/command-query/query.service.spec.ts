import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  CxEvent,
  EventService,
  HttpErrorModel,
  isJaloError,
} from '@spartacus/core';
import { defer, of, Subject, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { Query, QueryService, QueryState } from './query.service';

class ReloadEvent extends CxEvent {
  static readonly type = 'TestingEvent';
}
const mockJaloError: Partial<HttpErrorModel> = {
  details: [{ type: 'JaloObjectNoLongerValidError' }],
};

describe('QueryService', () => {
  let service: QueryService;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService],
    });
    service = TestBed.inject(QueryService);
    eventService = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should return query', () => {
    const query = service.create(() => of('value'));
    expect(query.get).toBeDefined();
    expect(query.getState).toBeDefined();
  });

  describe('query', () => {
    let query: Query<string>;
    let loadingStream$: Subject<string>;
    let resetTrigger$: Subject<boolean>;
    let loaderFactoryCalls: number;

    beforeEach(() => {
      resetTrigger$ = new Subject<boolean>();
      loaderFactoryCalls = 0;
      query = service.create(
        () =>
          defer(() => {
            loaderFactoryCalls++;
            return loadingStream$.pipe(take(1));
          }),
        {
          reloadOn: [ReloadEvent],
          resetOn: [resetTrigger$.asObservable()],
        }
      );
      loadingStream$ = new Subject<string>();
    });

    it('should not load if not subscribed', () => {
      const data = query.get();
      expect(data).toBeDefined();
      expect(loaderFactoryCalls).toBe(0);
    });

    it('should load on subscription', (done) => {
      const state$ = query.getState();
      const emissions: QueryState<string>[] = [];
      state$.pipe(take(2)).subscribe((state) => {
        emissions.push(state);

        if (emissions.length === 2) {
          expect(loaderFactoryCalls).toBe(1);
          expect(emissions).toEqual([
            // first emission should already present loading state
            {
              loading: true,
              error: false,
              data: undefined,
            },
            {
              loading: false,
              error: false,
              data: 'value',
            },
          ]);
          done();
        }
      });

      loadingStream$.next('value');
    });

    it('should return state from previous subscription after resubscription', (done) => {
      const state$ = query.getState();
      const emissions: QueryState<string>[] = [];
      state$.pipe(take(2)).subscribe((state) => {
        emissions.push(state);
      });

      loadingStream$.next('value');

      state$.pipe(take(1)).subscribe((state) => {
        emissions.push(state);

        if (emissions.length === 3) {
          expect(emissions).toEqual([
            {
              loading: true,
              error: false,
              data: undefined,
            },
            {
              loading: false,
              error: false,
              data: 'value',
            },
            // unsubscribe happened (0 subscribers)
            // subscribe happened once again
            {
              loading: false,
              error: false,
              data: 'value',
            },
          ]);
          done();
        }
      });
    });

    it('should load once again if it was cancelled by unsubscribe', (done) => {
      const state$ = query.getState();
      const emissions: QueryState<string>[] = [];
      state$.pipe(take(1)).subscribe((state) => {
        emissions.push(state);
      });

      loadingStream$.next('value');

      state$.pipe(take(2)).subscribe((state) => {
        emissions.push(state);

        if (emissions.length === 3) {
          expect(loaderFactoryCalls).toBe(2);
          expect(emissions).toEqual([
            {
              loading: true,
              error: false,
              data: undefined,
            },
            // unsubscribe happened (0 subscribers)
            // subscribe happened once again
            {
              loading: true,
              error: false,
              data: undefined,
            },
            {
              loading: false,
              error: false,
              data: 'new-value',
            },
          ]);
          done();
        }
      });

      loadingStream$.next('new-value');
    });

    it('should clear value on error', (done) => {
      const state$ = query.getState();
      const emissions: QueryState<string>[] = [];

      state$.pipe(take(4)).subscribe((state) => {
        emissions.push(state);

        if (emissions.length === 4) {
          expect(emissions).toEqual([
            {
              loading: true,
              error: false,
              data: undefined,
            },
            {
              loading: false,
              error: false,
              data: 'value',
            },
            // reload trigger happened
            {
              loading: true,
              error: false,
              data: 'value',
            },
            // loaderFactory throws error
            {
              loading: false,
              error: jasmine.any(Error),
              data: undefined,
            },
          ]);
          done();
        }
      });

      loadingStream$.next('value');
      eventService.dispatch(new ReloadEvent());
      loadingStream$.error(new Error('error'));
    });

    it('should clear error on successful emission', (done) => {
      const state$ = query.getState();
      const emissions: QueryState<string>[] = [];

      state$.pipe(take(4)).subscribe((state) => {
        emissions.push(state);

        if (emissions.length === 4) {
          expect(emissions).toEqual([
            {
              loading: true,
              error: false,
              data: undefined,
            },
            // loaderFactory throws error
            {
              loading: false,
              error: jasmine.any(Error),
              data: undefined,
            },
            // reload trigger happened
            {
              loading: true,
              error: jasmine.any(Error),
              data: undefined,
            },
            // loaderFactory returns value
            {
              loading: false,
              error: false,
              data: 'value',
            },
          ]);
          done();
        }
      });

      loadingStream$.error(new Error('error'));
      loadingStream$ = new Subject<string>();
      eventService.dispatch(new ReloadEvent());
      loadingStream$.next('value');
    });

    it('should not call multiple times loaderFactory on multiple subscriptions', () => {
      const state$ = query.getState();
      state$.pipe(take(2)).subscribe();
      state$.pipe(take(2)).subscribe();
      loadingStream$.next('test-value');
      expect(loaderFactoryCalls).toEqual(1);
    });

    describe('get', () => {
      it('should return value property from getState', (done) => {
        const data$ = query.get();
        const emissions: (string | undefined)[] = [];
        data$.pipe(take(3)).subscribe((state) => {
          emissions.push(state);
          if (emissions.length === 3) {
            // should not emit same values multiple times
            expect(emissions).toEqual([undefined, 'value', 'different-value']);
            done();
          }
        });
        loadingStream$.next('value');
        eventService.dispatch(new ReloadEvent());
        loadingStream$.next('value');
        eventService.dispatch(new ReloadEvent());
        loadingStream$.next('different-value');
      });
    });

    describe('reload trigger', () => {
      it('should reload data immediately when there are active query subscriptions', (done) => {
        const state$ = query.getState();
        const emissions: QueryState<string>[] = [];

        state$.pipe(take(4)).subscribe((state) => {
          emissions.push(state);

          if (emissions.length === 4) {
            expect(loaderFactoryCalls).toBe(2);
            expect(emissions).toEqual([
              {
                loading: true,
                error: false,
                data: undefined,
              },
              {
                loading: false,
                error: false,
                data: 'value',
              },
              // reload trigger happened
              {
                loading: true,
                error: false,
                data: 'value', // value is not cleared on reload!
              },
              {
                loading: false,
                error: false,
                data: 'new-value',
              },
            ]);
            done();
          }
        });

        loadingStream$.next('value');
        eventService.dispatch(new ReloadEvent());
        loadingStream$.next('new-value');
      });

      it('should reload data after resubscription when there was 0 subscribers during emission', (done) => {
        const state$ = query.getState();
        const emissions: QueryState<string>[] = [];

        state$.pipe(take(2)).subscribe((state) => {
          emissions.push(state);
        });

        loadingStream$.next('value');
        eventService.dispatch(new ReloadEvent());

        state$.pipe(take(2)).subscribe((state) => {
          emissions.push(state);

          if (emissions.length === 4) {
            expect(loaderFactoryCalls).toBe(2);
            expect(emissions).toEqual([
              {
                loading: true,
                error: false,
                data: undefined,
              },
              {
                loading: false,
                error: false,
                data: 'value',
              },
              // unsubscribe happened (0 subscribers)
              // reload trigger happened
              // subscribe happened once again
              {
                loading: true,
                error: false,
                data: 'value',
              },
              {
                loading: false,
                error: false,
                data: 'new-value',
              },
            ]);
            done();
          }
        });

        loadingStream$.next('new-value');
      });
    });

    describe('reset trigger', () => {
      it('should clear state and reload data immediately when there are active query subscriptions', (done) => {
        const state$ = query.getState();
        const emissions: QueryState<string>[] = [];

        state$.pipe(take(4)).subscribe((state) => {
          emissions.push(state);

          if (emissions.length === 4) {
            expect(loaderFactoryCalls).toBe(2);
            expect(emissions).toEqual([
              {
                loading: true,
                error: false,
                data: undefined,
              },
              {
                loading: false,
                error: false,
                data: 'value',
              },
              // reset trigger happened
              {
                loading: true,
                error: false,
                data: undefined, // value needs to be cleared on reset!
              },
              {
                loading: false,
                error: false,
                data: 'new-value',
              },
            ]);
            done();
          }
        });

        loadingStream$.next('value');
        resetTrigger$.next(true);
        loadingStream$.next('new-value');
      });

      it('should clear state instantly and reload data after resubscription when there was 0 subscribers during emission', (done) => {
        const state$ = query.getState();
        const emissions: QueryState<string>[] = [];

        state$.pipe(take(2)).subscribe((state) => {
          emissions.push(state);
        });

        loadingStream$.next('value');
        resetTrigger$.next(true);

        state$.pipe(take(2)).subscribe((state) => {
          emissions.push(state);

          if (emissions.length === 4) {
            expect(loaderFactoryCalls).toBe(2);
            expect(emissions).toEqual([
              {
                loading: true,
                error: false,
                data: undefined,
              },
              {
                loading: false,
                error: false,
                data: 'value',
              },
              // unsubscribe happened (0 subscribers)
              // reset trigger happened
              // subscribe happened once again
              {
                loading: true,
                error: false,
                data: undefined,
              },
              {
                loading: false,
                error: false,
                data: 'new-value',
              },
            ]);
            done();
          }
        });

        loadingStream$.next('new-value');
      });
    });

    describe('when the back-off option is NOT provided', () => {
      it('should not exponentially retry', (done) => {
        const state$ = query.getState();
        const emissions: QueryState<string>[] = [];
        state$.pipe(take(2)).subscribe((state) => {
          emissions.push(state);

          if (emissions.length === 2) {
            expect(loaderFactoryCalls).toBe(1);
            expect(emissions).toEqual([
              // first emission should already present loading state
              {
                loading: true,
                error: false,
                data: undefined,
              },
              {
                loading: false,
                error: <Error>mockJaloError,
                data: undefined,
              },
            ]);
            done();
          }
        });

        loadingStream$.error(mockJaloError);
      });
    });
  });

  describe('when the backOff option is provided', () => {
    const recoveredValue = 'xxx';
    let calledTimes = -1;
    let backOffQuery: Query<string>;

    describe('when it is able to recover', () => {
      beforeEach(() => {
        backOffQuery = service.create(
          () =>
            defer(() => {
              calledTimes++;
              if (calledTimes === 3) {
                return of(recoveredValue);
              }
              return throwError(mockJaloError);
            }),
          {
            retryOn: { shouldRetry: isJaloError },
          }
        );
      });

      it('should be able to exponentially retry', fakeAsync(() => {
        const emissions: QueryState<string>[] = [];
        const subscription = backOffQuery
          .getState()
          .pipe(take(2))
          .subscribe((state) => emissions.push(state));

        // 1*1*300 + 2*2*300 + 3*3*300 = 4200
        tick(4200);

        expect(emissions).toEqual([
          {
            loading: true,
            error: false,
            data: undefined,
          },
          {
            loading: false,
            error: false,
            data: recoveredValue,
          },
        ]);
        subscription.unsubscribe();
      }));
    });

    describe('when it is NOT able to recover', () => {
      beforeEach(() => {
        backOffQuery = service.create(
          () => defer(() => throwError(mockJaloError)),
          {
            retryOn: { shouldRetry: isJaloError },
          }
        );
      });

      it('should be able to exponentially retry but NOT recover', fakeAsync(() => {
        const emissions: QueryState<string>[] = [];
        const subscription = backOffQuery
          .getState()
          .pipe(take(2))
          .subscribe((state) => emissions.push(state));

        // 1*1*300 + 2*2*300 + 3*3*300 = 4200
        tick(4200);

        expect(emissions).toEqual([
          {
            loading: true,
            error: false,
            data: undefined,
          },
          {
            loading: false,
            error: <Error>mockJaloError,
            data: undefined,
          },
        ]);
        subscription.unsubscribe();
      }));
    });
  });
});
