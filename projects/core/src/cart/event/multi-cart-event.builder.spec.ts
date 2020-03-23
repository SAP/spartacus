import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { BaseEvent } from '../../event/base-event.model';
import { EventService } from '../../event/event.service';
import { CartActions } from '../store/actions';
import { MultiCartEventBuilder } from './multi-cart-event.builder';
import { MultiCartEvents } from './multi-cart.events';

const MOCK_CART_EVENT = {
  cartId: 'cartId',
  userId: 'userId',
};

describe('MultiCartEventBuilder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: new Subject() }],
    });

    TestBed.inject(MultiCartEventBuilder); // register events
  });

  function test<A, E extends BaseEvent<any>>({
    action,
    event,
  }: {
    action: A;
    event: E;
  }) {
    it(`should register event '${event.constructor.name}' based on action '${action.constructor.name}'`, () => {
      const eventService = TestBed.inject(EventService);
      const actions$ = TestBed.inject(ActionsSubject);

      let result;
      eventService
        .get(event.constructor as Type<any>)
        .pipe(take(1))
        .subscribe(e => (result = e));
      actions$.next(action as any);

      expect(result).toEqual(event);
    });
  }

  (() => {
    const data: MultiCartEvents.MultiCartAddEntry = {
      ...MOCK_CART_EVENT,
      productCode: 'productCode',
      quantity: 123,
    };
    test({
      action: new CartActions.CartAddEntry(data),
      event: new MultiCartEvents.MultiCartAddEntry(data),
    });
  })();
});
