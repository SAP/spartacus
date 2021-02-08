import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActionToEventMappingService } from './action-to-event-mapping.service';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('ActionToEventMappingService', () => {
  let mockActionsSubject$: Subject<ActionWithPayload>;
  let service: ActionToEventMappingService;

  beforeEach(() => {
    mockActionsSubject$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: mockActionsSubject$ }],
    });

    service = TestBed.inject(ActionToEventMappingService);
  });

  describe('getAction', () => {
    it('should return the correct action', () => {
      let result: ActionWithPayload;
      service
        .getAction('B')
        .pipe(take(1))
        .subscribe((value) => (result = value as ActionWithPayload));

      mockActionsSubject$.next({ type: 'A', payload: { value: 1 } });
      mockActionsSubject$.next({ type: 'B', payload: { value: 2 } });
      mockActionsSubject$.next({ type: 'A', payload: { value: 3 } });

      expect(result).toEqual({ type: 'B', payload: { value: 2 } });
    });

    it('should return multiple correct action', () => {
      const result: ActionWithPayload[] = [];
      service
        .getAction(['A', 'B'])
        .subscribe((value) => result.push(value as ActionWithPayload));

      mockActionsSubject$.next({ type: 'A', payload: { value: 1 } });
      mockActionsSubject$.next({ type: 'B', payload: { value: 2 } });
      mockActionsSubject$.next({ type: 'A', payload: { value: 3 } });
      mockActionsSubject$.next({ type: 'C', payload: { value: 2 } });
      mockActionsSubject$.next({ type: 'ACDC', payload: { value: 3 } });

      expect(result).toEqual([
        { type: 'A', payload: { value: 1 } },
        { type: 'B', payload: { value: 2 } },
        { type: 'A', payload: { value: 3 } },
      ]);
    });
  });
});
