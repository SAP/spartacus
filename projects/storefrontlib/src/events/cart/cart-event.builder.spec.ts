import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { createFrom, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageVisitedEvent } from '../page';
import { CartEventBuilder } from './cart-event.builder';
import { CartPageEvent } from './cart.events';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('CartEventBuilder', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: actions$ }],
    });

    TestBed.inject(CartEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('CartPageEvent', () => {
    let result: CartPageEvent;
    eventService
      .get(CartPageEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const pageVisitedEvent = createFrom(PageVisitedEvent, {
      context: undefined,
      semanticRoute: 'cart',
      url: 'cart url',
      params: undefined,
    });
    eventService.dispatch(pageVisitedEvent);
    expect(result).toBeTruthy();
  });
});
