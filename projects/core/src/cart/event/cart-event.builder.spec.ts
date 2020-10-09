import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { EventService } from '../../event/event.service';
import { Cart } from '../../model';
import { createFrom } from '../../util/create-from';
import { ActiveCartService } from '../facade/active-cart.service';
import { CartActions } from '../store/actions';
import { CartEventBuilder } from './cart-event.builder';
import {
  CartAddEntryEvent,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
} from './cart.events';

interface ActionWithPayload extends Action {
  payload: any;
}

const MOCK_ACTIVE_CART_ID = 'activeCartId';
const MOCK_NOT_ACTIVE_CART_ID = 'notActiveCartId';
const MOCK_ACTIVE_CART: Cart = {
  entries: [
    { quantity: 2, product: { code: '123' } },
    { quantity: 3, product: { code: '234' } },
  ],
  guid: MOCK_ACTIVE_CART_ID,
};
class MockActiveCartService implements Partial<ActiveCartService> {
  getActive = () => of(MOCK_ACTIVE_CART);
}

const MOCK_NOT_ACTIVE_CART_EVENT = Object.freeze({
  cartId: MOCK_NOT_ACTIVE_CART_ID,
  userId: 'userId',
});

const MOCK_ACTIVE_CART_EVENT = Object.freeze({
  cartId: MOCK_ACTIVE_CART_ID,
  userId: 'userId',
});

describe('CartEventBuilder', () => {
  let actions$: Subject<ActionWithPayload>;
  let eventService: EventService;

  beforeEach(() => {
    actions$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
      ],
    });

    TestBed.inject(CartEventBuilder); // register events

    eventService = TestBed.inject(EventService);
  });

  function testActionToEventMapping<A, E>({
    actionActive,
    actionNotActive,
    event,
  }: {
    actionActive: A;
    actionNotActive: A;
    event: E;
  }) {
    const result = [];
    eventService
      .get(event.constructor as Type<any>)
      .subscribe((e) => result.push(e));

    actions$.next(actionActive as any);
    actions$.next(actionNotActive as any);

    expect(result.length).toBe(1);
    expect(result[0].constructor === event.constructor).toBe(true);
    expect(result[0]).toEqual(jasmine.objectContaining(event));
  }

  describe('should register event', () => {
    it('CartAddEntryEvent', () => {
      const eventData: CartAddEntryEvent = {
        productCode: 'productCode',
        quantity: 123,
        ...MOCK_ACTIVE_CART_EVENT,
      };

      testActionToEventMapping({
        event: createFrom(CartAddEntryEvent, eventData),
        actionActive: new CartActions.CartAddEntry(eventData),
        actionNotActive: new CartActions.CartAddEntry({
          ...eventData,
          ...MOCK_NOT_ACTIVE_CART_EVENT,
        }),
      });
    });

    it('CartAddEntrySuccessEvent', () => {
      const eventData: CartAddEntrySuccessEvent = {
        productCode: 'productCode',
        quantity: 123,
        deliveryModeChanged: true,
        entry: {},
        quantityAdded: 1,
        ...MOCK_ACTIVE_CART_EVENT,
      };

      testActionToEventMapping({
        event: createFrom(CartAddEntrySuccessEvent, eventData),
        actionActive: new CartActions.CartAddEntrySuccess({
          ...eventData,
          statusCode: null,
          statusMessage: null,
        }),
        actionNotActive: new CartActions.CartAddEntrySuccess({
          ...eventData,
          statusCode: null,
          statusMessage: null,
          ...MOCK_NOT_ACTIVE_CART_EVENT,
        }),
      });
    });

    it('CartAddEntryFailEvent', () => {
      const eventData: CartAddEntryFailEvent = {
        productCode: 'productCode',
        quantity: 123,
        ...MOCK_ACTIVE_CART_EVENT,
      };

      testActionToEventMapping({
        event: createFrom(CartAddEntryFailEvent, eventData),
        actionActive: new CartActions.CartAddEntryFail({
          ...eventData,
          error: 'error',
        }),
        actionNotActive: new CartActions.CartAddEntryFail({
          ...eventData,
          error: 'error',
          ...MOCK_NOT_ACTIVE_CART_EVENT,
        }),
      });
    });

    it('CartRemoveEntrySuccessEvent', () => {
      const firstEventData: CartRemoveEntrySuccessEvent = {
        entry: MOCK_ACTIVE_CART.entries[0],
        ...MOCK_ACTIVE_CART_EVENT,
      };

      const secondEventData: CartRemoveEntrySuccessEvent = {
        entry: MOCK_ACTIVE_CART.entries[1],
        ...MOCK_ACTIVE_CART_EVENT,
      };

      const result = [];
      const subscription = eventService
        .get(CartRemoveEntrySuccessEvent)
        .subscribe((e) => result.push(e));

      actions$.next(
        new CartActions.CartRemoveEntrySuccess({
          entryNumber: '0',
          ...MOCK_ACTIVE_CART_EVENT,
        })
      );
      actions$.next(
        new CartActions.CartRemoveEntrySuccess({
          entryNumber: '0',
          ...MOCK_NOT_ACTIVE_CART_EVENT,
        })
      );

      actions$.next(
        new CartActions.CartRemoveEntrySuccess({
          entryNumber: '1',
          ...MOCK_ACTIVE_CART_EVENT,
        })
      );

      expect(result.length).toBe(2);
      expect(result[0].constructor).toEqual(CartRemoveEntrySuccessEvent);
      expect(result[0]).toEqual(jasmine.objectContaining(firstEventData));
      expect(result[1]).toEqual(jasmine.objectContaining(secondEventData));

      subscription.unsubscribe();
    });

    it('CartModifiedEntrySuccessEvent', () => {
      const firstEventData: CartUpdateEntrySuccessEvent = {
        entry: MOCK_ACTIVE_CART.entries[0],
        quantity: 2,
        ...MOCK_ACTIVE_CART_EVENT,
      };

      const result = [];
      const subscription = eventService
        .get(CartUpdateEntrySuccessEvent)
        .subscribe((e) => result.push(e));

      actions$.next(
        new CartActions.CartUpdateEntrySuccess({
          entryNumber: '0',
          quantity: 2,
          ...MOCK_ACTIVE_CART_EVENT,
        })
      );
      expect(result.length).toBe(1);
      expect(result[0].constructor).toEqual(CartUpdateEntrySuccessEvent);
      expect(result[0]).toEqual(jasmine.objectContaining(firstEventData));

      subscription.unsubscribe();
    });
  });
});
