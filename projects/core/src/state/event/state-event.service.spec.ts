import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { EventService } from '../../event/event.service';
import { StateEventService } from './state-event.service';

class EventA {
  a: number;
  constructor(a: number) {
    this.a = a;
  }
}

interface ActionWithPayload extends Action {
  payload: any;
}

fdescribe('StateEventService', () => {
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
          event: EventA,
        });
        const registeredSource$ = eventService.register['calls'].argsFor(0)[1];
        const results = [];
        registeredSource$.subscribe(e => results.push(e));

        mockActionsSubject$.next({ type: 'A', payload: 1 });
        mockActionsSubject$.next({ type: 'B', payload: 2 });
        mockActionsSubject$.next({ type: 'A', payload: 3 });

        expect(results).toEqual([new EventA(1), new EventA(3)]);
        expect(eventService.register).toHaveBeenCalledWith(
          EventA,
          jasmine.any(Object)
        );
      });
    });

    it('mapped explicity with factory function', () => {
      service.register({
        action: 'A',
        event: EventA,
        factory: (action: ActionWithPayload) =>
          new EventA(100 + action.payload),
      });
      const registeredSource$ = eventService.register['calls'].argsFor(0)[1];
      const results = [];
      registeredSource$.subscribe(e => results.push(e));

      mockActionsSubject$.next({ type: 'A', payload: 1 });
      mockActionsSubject$.next({ type: 'B', payload: 2 });
      mockActionsSubject$.next({ type: 'A', payload: 3 });

      expect(results).toEqual([new EventA(101), new EventA(103)]);
      expect(eventService.register).toHaveBeenCalledWith(
        EventA,
        jasmine.any(Object)
      );
    });

    it('that can be unregistered with a returned teardown function mapped implicitly from action payload', () => {
      expect(service.register({ action: 'A', event: EventA })).toBe(
        mockTearDown
      );
    });
  });
});
