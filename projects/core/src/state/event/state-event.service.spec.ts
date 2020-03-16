import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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

describe('StateEventService', () => {
  let mockActionsSubject$: Observable<ActionWithPayload>;
  const mockActions: ActionWithPayload[] = [
    { type: 'A', payload: 1 },
    { type: 'B', payload: 2 },
    { type: 'C', payload: 3 },
    { type: 'A', payload: 4 },
  ];

  let service: StateEventService;
  let eventService: EventService;

  beforeEach(() => {
    mockActionsSubject$ = of(...mockActions);

    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: mockActionsSubject$ },
        {
          provide: EventService,
          useValue: { register: jasmine.createSpy('register') },
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
        expect(results).toEqual([new EventA(1), new EventA(4)]);
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
      expect(results).toEqual([new EventA(101), new EventA(104)]);
      expect(eventService.register).toHaveBeenCalledWith(
        EventA,
        jasmine.any(Object)
      );
    });
  });
});
