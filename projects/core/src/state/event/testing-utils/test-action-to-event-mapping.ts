import { Type } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { EventService } from '../../../event/event.service';
import { take } from 'rxjs/operators';

export function testActionToEventMapping<A, E>({
  action,
  event,
  eventService,
  actions$,
}: {
  action: A;
  event: E;
  eventService: EventService;
  actions$: ActionsSubject;
}) {
  let result;
  eventService
    .get(event.constructor as Type<any>)
    .pipe(take(1))
    .subscribe((e) => (result = e));
  actions$.next(action as any);

  expect(result).toEqual(event);
}
