import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { createFrom } from '../../util/create-from';
import { ActiveCartService } from '../facade/active-cart.service';
import { CartActions } from '../store/actions';
import { CartEventBuilder } from './cart-event.builder';
import {
  CartAddEntryEvent,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
} from './cart.events';

interface ActionWithPayload extends Action {
  payload: any;
}

const MOCK_ACTIVE_CART_ID = 'activeCartId';
const MOCK_NOT_ACTIVE_CART_ID = 'notActiveCartId';

class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId = () => of(MOCK_ACTIVE_CART_ID);
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
      .pipe(take(1))
      .subscribe(e => result.push(e));

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
        entry: null,
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
  });
});
