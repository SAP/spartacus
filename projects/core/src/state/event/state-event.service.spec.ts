import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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

  beforeEach(() => {
    mockActionsSubject$ = of(...mockActions);

    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: mockActionsSubject$ }],
    });

    service = TestBed.inject(StateEventService);
  });

  describe('getFromAction', () => {
    describe('should return stream of events', () => {
      it('mapped implicitly from action payload', () => {
        const result$ = service.getFromAction({
          action: 'A',
          event: EventA,
        });

        const results = [];
        result$.subscribe(e => results.push(e));
        expect(results).toEqual([new EventA(1), new EventA(4)]);
      });
    });

    it('mapped explicity with factory function', () => {
      const result$ = service.getFromAction({
        action: 'A',
        event: EventA,
        factory: (action: ActionWithPayload) =>
          new EventA(100 + action.payload),
      });

      const results = [];
      result$.subscribe(e => results.push(e));
      expect(results).toEqual([new EventA(101), new EventA(104)]);
    });
  });
});
