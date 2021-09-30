import { TestBed } from '@angular/core/testing';

import { Query, QueryService, QueryState } from './query.service';
import { defer, of, Subject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { CxEvent, EventService } from '@spartacus/core';

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
    let loadingStreamAccessed: boolean;
    let loaderFactoryCalls: number;

    beforeEach(() => {
      loadingStreamAccessed = false;
      resetTrigger$ = new Subject<boolean>();
      loaderFactoryCalls = 0;
      query = service.create(
        () =>
          defer(() => {
            loadingStreamAccessed = true;
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

    it('should not load if not accessed', () => {
      const data = query.get();
      expect(data).toBeDefined();
      expect(loadingStreamAccessed).toBeFalsy();
    });

    it('should load if first accessed', () => {
      const data = query.get();
      data.pipe(take(1)).subscribe();
      expect(data).toBeDefined();
      expect(loadingStreamAccessed).toBeTruthy();
    });

    describe('getState', () => {
      it('should emit loading state on first emission', (done) => {
        const data = query.getState();
        data.pipe(take(1)).subscribe((state) => {
          expect(state).toEqual(
            jasmine.objectContaining({
              loading: true,
              error: false,
              data: undefined,
            })
          );
          done();
        });
      });

      it('should emit value returned by the loaderFactory', (done) => {
        const data = query.getState();
        data.pipe(take(2), skip(1)).subscribe((state) => {
          expect(state).toEqual(
            jasmine.objectContaining({
              loading: false,
              error: false,
              data: 'test-value',
            })
          );
          done();
        });
        loadingStream$.next('test-value');
      });

      it('should emit error state thrown by the loaderFactory', (done) => {
        const data = query.getState();
        data.pipe(take(2), skip(1)).subscribe((state) => {
          expect(state).toEqual(
            jasmine.objectContaining({
              loading: false,
              data: undefined,
            })
          );
          expect((state.error as Error).message).toEqual('test-error');
          done();
        });
        loadingStream$.error(new Error('test-error'));
      });

      it('should emit new value after reload trigger', (done) => {
        const data = query.getState();
        const states: QueryState<string>[] = [];
        data.pipe(take(4), skip(2)).subscribe((state) => {
          states.push(state);
          if (states.length === 2) {
            expect(states[0]).toEqual(
              jasmine.objectContaining({
                loading: true,
                error: false,
                data: 'test-value',
              })
            );
            expect(states[1]).toEqual(
              jasmine.objectContaining({
                loading: false,
                error: false,
                data: 'test-value-2',
              })
            );
            done();
          }
        });
        loadingStream$.next('test-value');
        eventService.dispatch(new ReloadEvent());
        loadingStream$.next('test-value-2');
      });

      it('should emit undefined on reset trigger', (done) => {
        const data = query.getState();
        const states: QueryState<string>[] = [];
        data.pipe(take(4), skip(2)).subscribe((state) => {
          states.push(state);
          if (states.length === 2) {
            expect(states[0]).toEqual(
              jasmine.objectContaining({
                loading: true,
                error: false,
                data: undefined,
              })
            );
            expect(states[1]).toEqual(
              jasmine.objectContaining({
                loading: false,
                error: false,
                data: 'test-value-2',
              })
            );
            done();
          }
        });
        loadingStream$.next('test-value');
        resetTrigger$.next(true);
        loadingStream$.next('test-value-2');
      });

      it('should not call multiple times loaderFactory on multiple subscriptions', () => {
        const data = query.getState();
        data.pipe(take(2)).subscribe();
        data.pipe(take(2)).subscribe();
        loadingStream$.next('test-value');
        expect(loaderFactoryCalls).toEqual(1);
      });
      it('should call loaderFactory when the query was unsubscribed during previous loading', () => {
        const data = query.getState();
        data.pipe(take(1)).subscribe();
        data.pipe(take(1)).subscribe();
        expect(loaderFactoryCalls).toEqual(2);
      });
    });

    describe('get', () => {
      it('should return value property from getState', (done) => {
        const data = query.get();
        const states: (string | undefined)[] = [];
        data.pipe(take(2)).subscribe((state) => {
          states.push(state);
          if (states.length === 2) {
            expect(states[0]).toEqual(undefined);
            expect(states[1]).toEqual('test-value');
            done();
          }
        });
        loadingStream$.next('test-value');
      });
    });
  });
});
