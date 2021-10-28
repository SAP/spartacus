import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CxEvent, EventService } from '@spartacus/core';
import { defer, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Query, QueryService, QueryState } from './query.service';

class ReloadEvent extends CxEvent {
  static readonly type = 'TestingEvent';
}

fdescribe('QueryService', () => {
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

  const loadDebounce = 100;

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

    it('should load on subscription', fakeAsync(() => {
      const data = query.getState();
      const emissions: QueryState<string>[] = [];
      data.pipe(take(2)).subscribe((state) => {
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
        }
        tick(loadDebounce);
      });

      loadingStream$.next('value');
    }));

    it('should return state from previous subscription after resubscription', fakeAsync(() => {
      const data = query.getState();
      const emissions: QueryState<string>[] = [];
      data.pipe(take(2)).subscribe((state) => {
        tick(loadDebounce);
        emissions.push(state);
      });

      loadingStream$.next('value');

      data.pipe(take(1)).subscribe((state) => {
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
        }
      });
    }));

    it('should load once again if it was cancelled by unsubscribe', fakeAsync(() => {
      const data = query.getState();
      const emissions: QueryState<string>[] = [];
      data.pipe(take(1)).subscribe((state) => {
        emissions.push(state);
      });

      loadingStream$.next('value');

      data.pipe(take(2)).subscribe((state) => {
        emissions.push(state);
        tick(loadDebounce);
        if (emissions.length === 3) {
          expect(loaderFactoryCalls).toBe(1);
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
        }
      });

      loadingStream$.next('new-value');
    }));

    it('should not load when it is instantly unsubscribed', fakeAsync(() => {
      const data = query.getState();
      const emissions: QueryState<string>[] = [];
      data.pipe(take(1)).subscribe((state) => {
        emissions.push(state);
        expect(emissions).toEqual([
          {
            loading: true,
            error: false,
            data: undefined,
          },
        ]);
      });
      tick(loadDebounce);
      expect(loaderFactoryCalls).toBe(0);
    }));

    fit('should clear value on error', fakeAsync(() => {
      const data = query.getState();
      const emissions: QueryState<string>[] = [];

      // subscribe
      // after 100ms i get `value`
      // reload
      // after 100ms I

      data.pipe(take(4)).subscribe((state) => {
        emissions.push(state);
        tick(loadDebounce);
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
        }
      });

      loadingStream$.next('value');
      tick(loadDebounce);
      eventService.dispatch(new ReloadEvent());
      loadingStream$.error(new Error('error'));
    }));

    it('should clear error on successful emission', (done) => {
      const data = query.getState();
      const emissions: QueryState<string>[] = [];

      data.pipe(take(4)).subscribe((state) => {
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
      const data = query.getState();
      data.pipe(take(2)).subscribe();
      data.pipe(take(2)).subscribe();
      loadingStream$.next('test-value');
      expect(loaderFactoryCalls).toEqual(1);
    });

    describe('get', () => {
      it('should return value property from getState', (done) => {
        const data = query.get();
        const emissions: (string | undefined)[] = [];
        data.pipe(take(3)).subscribe((state) => {
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
        const data = query.getState();
        const emissions: QueryState<string>[] = [];

        data.pipe(take(4)).subscribe((state) => {
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
        const data = query.getState();
        const emissions: QueryState<string>[] = [];

        data.pipe(take(2)).subscribe((state) => {
          emissions.push(state);
        });

        loadingStream$.next('value');
        eventService.dispatch(new ReloadEvent());

        data.pipe(take(2)).subscribe((state) => {
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
        const data = query.getState();
        const emissions: QueryState<string>[] = [];

        data.pipe(take(4)).subscribe((state) => {
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
        const data = query.getState();
        const emissions: QueryState<string>[] = [];

        data.pipe(take(2)).subscribe((state) => {
          emissions.push(state);
        });

        loadingStream$.next('value');
        resetTrigger$.next(true);

        data.pipe(take(2)).subscribe((state) => {
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
  });
});
