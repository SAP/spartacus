import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { CheckoutActions, EventService, Order } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutEventBuilder } from './checkout-event.builder';
import { OrderPlaced } from './checkout.events';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('Checkout-Event Builder', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: actions$ }],
    });

    TestBed.inject(CheckoutEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('OrderPlaced', () => {
    const payload: Order = {
      code: '1234',
    };

    let result: OrderPlaced;
    eventService
      .get(OrderPlaced)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    actions$.next({ type: CheckoutActions.PLACE_ORDER_SUCCESS, payload });
    expect(result).toEqual(jasmine.objectContaining(payload));
  });
});
