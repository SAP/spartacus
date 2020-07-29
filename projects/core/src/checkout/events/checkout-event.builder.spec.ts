import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { Order } from '../../model/order.model';
import { CheckoutActions } from '../store/index';
import { CheckoutEventBuilder } from './checkout-event.builder';
import { OrderPlacedEvent } from './checkout.events';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('CheckoutEventBuilder', () => {
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

  it('OrderPlacedEvent', () => {
    const payload: Order = {
      code: '1234',
    };

    let result: OrderPlacedEvent;
    eventService
      .get(OrderPlacedEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    actions$.next({ type: CheckoutActions.PLACE_ORDER_SUCCESS, payload });
    expect(result).toEqual(jasmine.objectContaining(payload));
  });
});
