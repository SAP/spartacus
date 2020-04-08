import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { EventService } from '../../event/event.service';
import { createFrom } from '../../util/create-from';
import { StateEventService } from './state-event.service';

class TestEvent {
  value: number;
}

interface ActionWithPayload extends Action {
  payload: any;
}

describe('StateEventService', () => {
  let mockActionsSubject$: Subject<ActionWithPayload>;
  let service: StateEventService;
  let eventService: EventService;
  const mockTearDown = () => {};

  beforeEach(() => {
    mockActionsSubject$ = new Subject();
    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: mockActionsSubject$ },
        {
          provide: EventService,
          useValue: {
            register: jasmine
              .createSpy('register')
              .and.returnValue(mockTearDown),
          },
        },
      ],
    });

    service = TestBed.inject(StateEventService);
    eventService = TestBed.inject(EventService);
  });

  describe('register', () => {
    describe('should register a stream of events', () => {
      it('mapped implicitly from action payload', () => {
        service.register({
          action: 'A',
          event: TestEvent,
        });
        const registeredSource$ = eventService.register['calls'].argsFor(0)[1];
        const results = [];
        registeredSource$.subscribe((e) => results.push(e));

        mockActionsSubject$.next({ type: 'A', payload: { value: 1 } });
        mockActionsSubject$.next({ type: 'B', payload: { value: 2 } });
        mockActionsSubject$.next({ type: 'A', payload: { value: 3 } });

        expect(results).toEqual([
          createFrom(TestEvent, { value: 1 }),
          createFrom(TestEvent, { value: 3 }),
        ]);
        expect(eventService.register).toHaveBeenCalledWith(
          TestEvent,
          jasmine.any(Object)
        );
      });

      it('mapped explicity with factory function', () => {
        service.register({
          action: 'A',
          event: TestEvent,
          factory: (action: ActionWithPayload) =>
            createFrom(TestEvent, { value: 100 + action.payload.value }),
        });
        const registeredSource$ = eventService.register['calls'].argsFor(0)[1];
        const results = [];
        registeredSource$.subscribe((e) => results.push(e));

        mockActionsSubject$.next({ type: 'A', payload: { value: 1 } });
        mockActionsSubject$.next({ type: 'B', payload: { value: 2 } });
        mockActionsSubject$.next({ type: 'A', payload: { value: 3 } });

        expect(results).toEqual([
          createFrom(TestEvent, { value: 101 }),
          createFrom(TestEvent, { value: 103 }),
        ]);
        expect(eventService.register).toHaveBeenCalledWith(
          TestEvent,
          jasmine.any(Object)
        );
      });

      it('mapped from many action types to a single event', () => {
        service.register({
          action: ['A', 'B'],
          event: TestEvent,
        });
        const registeredSource$ = eventService.register['calls'].argsFor(0)[1];
        const results = [];
        registeredSource$.subscribe((e) => results.push(e));

        mockActionsSubject$.next({ type: 'A', payload: { value: 1 } });
        mockActionsSubject$.next({ type: 'B', payload: { value: 2 } });
        mockActionsSubject$.next({ type: 'A', payload: { value: 3 } });

        expect(results).toEqual([
          createFrom(TestEvent, { value: 1 }),
          createFrom(TestEvent, { value: 2 }),
          createFrom(TestEvent, { value: 3 }),
        ]);
        expect(eventService.register).toHaveBeenCalledWith(
          TestEvent,
          jasmine.any(Object)
        );
      });
    });

    it('should return a teardown function to unregister the event source', () => {
      expect(service.register({ action: 'A', event: TestEvent })).toBe(
        mockTearDown
      );
    });
  });
});
