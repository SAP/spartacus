import { TestBed } from '@angular/core/testing';
import { CxEvent, EventService } from '@spartacus/core';
import { defer, lastValueFrom, of, Subject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { Query, QueryService, QueryState } from './query.service';

class ReloadEvent extends CxEvent {
  static readonly type = 'TestingEvent';
}

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

    it('should load on subscription', async () => {
      const state$ = query.getState();
      const emissionsPromise = lastValueFrom(state$.pipe(take(2), toArray()));
      loadingStream$.next('value');
      const emissions = await emissionsPromise;
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
    });

    it('should return state from previous subscription after resubscription', async () => {
      const state$ = query.getState();
      const emissions: QueryState<string>[] = [];
      state$.pipe(take(2)).subscribe((state) => {
        emissions.push(state);
      });

      loadingStream$.next('value');

      const third = await lastValueFrom(state$.pipe(take(1)));
      emissions.push(third);

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
    });

    it('should load once again if it was cancelled by unsubscribe', async () => {
      const state$ = query.getState();
      const emissions: QueryState<string>[] = [];
      state$.pipe(take(1)).subscribe((state) => {
        emissions.push(state);
      });

      loadingStream$.next('value');

      const secondBatch = lastValueFrom(state$.pipe(take(2), toArray()));
      loadingStream$.next('new-value');
      const rest = await secondBatch;
      emissions.push(...rest);

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
    });

    it('should clear value on error', async () => {
      const state$ = query.getState();
      const emissionsPromise = lastValueFrom(state$.pipe(take(4), toArray()));

      loadingStream$.next('value');
      eventService.dispatch(new ReloadEvent());
      loadingStream$.error(new Error('error'));

      const emissions = await emissionsPromise;
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
          error: expect.any(Error),
          data: undefined,
        },
      ]);
    });

    it('should clear error on successful emission', async () => {
      const state$ = query.getState();
      const emissionsPromise = lastValueFrom(state$.pipe(take(4), toArray()));

      loadingStream$.error(new Error('error'));
      loadingStream$ = new Subject<string>();
      eventService.dispatch(new ReloadEvent());
      loadingStream$.next('value');

      const emissions = await emissionsPromise;
      expect(emissions).toEqual([
        {
          loading: true,
          error: false,
          data: undefined,
        },
        // loaderFactory throws error
        {
          loading: false,
          error: expect.any(Error),
          data: undefined,
        },
        // reload trigger happened
        {
          loading: true,
          error: expect.any(Error),
          data: undefined,
        },
        // loaderFactory returns value
        {
          loading: false,
          error: false,
          data: 'value',
        },
      ]);
    });

    it('should not call multiple times loaderFactory on multiple subscriptions', () => {
      const state$ = query.getState();
      state$.pipe(take(2)).subscribe();
      state$.pipe(take(2)).subscribe();
      loadingStream$.next('test-value');
      expect(loaderFactoryCalls).toEqual(1);
    });

    describe('get', () => {
      it('should return value property from getState', async () => {
        const data$ = query.get();
        const emissionsPromise = lastValueFrom(data$.pipe(take(3), toArray()));
        loadingStream$.next('value');
        eventService.dispatch(new ReloadEvent());
        loadingStream$.next('value');
        eventService.dispatch(new ReloadEvent());
        loadingStream$.next('different-value');
        const emissions = await emissionsPromise;
        // should not emit same values multiple times
        expect(emissions).toEqual([undefined, 'value', 'different-value']);
      });
    });

    describe('reload trigger', () => {
      it('should reload data immediately when there are active query subscriptions', async () => {
        const state$ = query.getState();
        const emissionsPromise = lastValueFrom(state$.pipe(take(4), toArray()));

        loadingStream$.next('value');
        eventService.dispatch(new ReloadEvent());
        loadingStream$.next('new-value');

        const emissions = await emissionsPromise;
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
      });

      it('should reload data after resubscription when there was 0 subscribers during emission', async () => {
        const state$ = query.getState();
        const emissions: QueryState<string>[] = [];

        state$.pipe(take(2)).subscribe((state) => {
          emissions.push(state);
        });

        loadingStream$.next('value');
        eventService.dispatch(new ReloadEvent());

        const secondBatch = lastValueFrom(state$.pipe(take(2), toArray()));
        loadingStream$.next('new-value');
        const rest = await secondBatch;
        emissions.push(...rest);

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
      });
    });

    describe('reset trigger', () => {
      it('should clear state and reload data immediately when there are active query subscriptions', async () => {
        const state$ = query.getState();
        const emissionsPromise = lastValueFrom(state$.pipe(take(4), toArray()));

        loadingStream$.next('value');
        resetTrigger$.next(true);
        loadingStream$.next('new-value');

        const emissions = await emissionsPromise;
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
      });

      it('should clear state instantly and reload data after resubscription when there was 0 subscribers during emission', async () => {
        const state$ = query.getState();
        const emissions: QueryState<string>[] = [];

        state$.pipe(take(2)).subscribe((state) => {
          emissions.push(state);
        });

        loadingStream$.next('value');
        resetTrigger$.next(true);

        const secondBatch = lastValueFrom(state$.pipe(take(2), toArray()));
        loadingStream$.next('new-value');
        const rest = await secondBatch;
        emissions.push(...rest);

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
      });
    });
  });
});
