import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { createFrom, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageEvent } from '../page';
import { CartPageEventBuilder } from './cart-page-event.builder';
import { CartPageEvent } from './cart-page.events';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('CartPageEventBuilder', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: actions$ }],
    });

    TestBed.inject(CartPageEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('CartPageEvent', () => {
    let result: CartPageEvent;
    eventService
      .get(CartPageEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const pageEvent = createFrom(PageEvent, {
      context: undefined,
      semanticRoute: 'cart',
      url: 'cart url',
      params: undefined,
    });
    eventService.dispatch(pageEvent);
    expect(result).toBeTruthy();
  });
});
