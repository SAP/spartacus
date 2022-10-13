import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
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
  CartRemoveEntryFailEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntryFailEvent,
  CartUpdateEntrySuccessEvent,
  MergeCartSuccessEvent,
} from './cart.events';

let getActiveCartIdSubject: BehaviorSubject<string>;

interface ActionWithPayload extends Action {
  payload: any;
}

const MOCK_ID = '00000123';
const MOCK_ACTIVE_CART_ID = 'activeCartId';
const MOCK_NOT_ACTIVE_CART_ID = 'notActiveCartId';
const MOCK_ACTIVE_CART: Cart = {
  entries: [
    { quantity: 2, product: { code: '123' } },
    { quantity: 3, product: { code: '234' } },
  ],
  guid: MOCK_ACTIVE_CART_ID,
  code: MOCK_ID,
};
class MockActiveCartService implements Partial<ActiveCartService> {
  getActive = () => of(MOCK_ACTIVE_CART);
  getActiveCartId = () => getActiveCartIdSubject;
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
  let activeCartService: ActiveCartService;
  getActiveCartIdSubject = new BehaviorSubject<string>(MOCK_ACTIVE_CART_ID);

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
    activeCartService = TestBed.inject(ActiveCartService);
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
    it('should subscribe to cart stream when actions are dispatched', () => {
      let activeCartSubscribed = false;
      let activeCartIdSubscribed = false;
      spyOn(activeCartService, 'getActive').and.callFake(() =>
        of(MOCK_ACTIVE_CART).pipe(tap(() => (activeCartSubscribed = true)))
      );
      spyOn(activeCartService, 'getActiveCartId').and.callFake(() =>
        of('1').pipe(tap(() => (activeCartIdSubscribed = true)))
      );

      const subscription = eventService
        .get(CartRemoveEntrySuccessEvent)
        .subscribe();

      expect(activeCartSubscribed).toBeFalsy();
      expect(activeCartIdSubscribed).toBeFalsy();

      actions$.next(
        new CartActions.CartRemoveEntrySuccess({
          entryNumber: '0',
          ...MOCK_ACTIVE_CART_EVENT,
        })
      );

      expect(activeCartSubscribed).toBeTruthy();
      expect(activeCartIdSubscribed).toBeTruthy();

      subscription.unsubscribe();
    });

    it('CartAddEntryEvent', () => {
      const eventData: CartAddEntryEvent = {
        cartCode: MOCK_ACTIVE_CART.code,
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
        cartCode: MOCK_ACTIVE_CART.code,
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
        cartCode: MOCK_ACTIVE_CART.code,
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
        cartCode: MOCK_ACTIVE_CART.code,
        entry: MOCK_ACTIVE_CART.entries[0],
        ...MOCK_ACTIVE_CART_EVENT,
      };

      const secondEventData: CartRemoveEntrySuccessEvent = {
        cartCode: MOCK_ACTIVE_CART.code,
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

    it('CartRemoveEntryFailEvent', () => {
      const firstEventData: CartRemoveEntryFailEvent = {
        cartCode: MOCK_ACTIVE_CART.code,
        entry: MOCK_ACTIVE_CART.entries[0],
        ...MOCK_ACTIVE_CART_EVENT,
      };

      const secondEventData: CartRemoveEntryFailEvent = {
        cartCode: MOCK_ACTIVE_CART.code,
        entry: MOCK_ACTIVE_CART.entries[1],
        ...MOCK_ACTIVE_CART_EVENT,
      };

      const results: CartRemoveEntryFailEvent[] = [];
      const subscription = eventService
        .get(CartRemoveEntryFailEvent)
        .subscribe((e) => results.push(e));

      actions$.next(
        new CartActions.CartRemoveEntryFail({
          error: 'remove failed',
          entryNumber: '0',
          ...MOCK_ACTIVE_CART_EVENT,
        })
      );
      actions$.next(
        new CartActions.CartRemoveEntryFail({
          error: 'remove failed',
          entryNumber: '0',
          ...MOCK_NOT_ACTIVE_CART_EVENT,
        })
      );

      actions$.next(
        new CartActions.CartRemoveEntryFail({
          error: 'remove failed',
          entryNumber: '1',
          ...MOCK_ACTIVE_CART_EVENT,
        })
      );

      expect(results.length).toBe(2);
      expect(results[0].constructor).toEqual(CartRemoveEntryFailEvent);
      expect(results[0]).toEqual(jasmine.objectContaining(firstEventData));
      expect(results[1]).toEqual(jasmine.objectContaining(secondEventData));

      subscription.unsubscribe();
    });

    it('CartUpdateEntrySuccessEvent', () => {
      const firstEventData: CartUpdateEntrySuccessEvent = {
        cartCode: MOCK_ACTIVE_CART.code,
        entry: MOCK_ACTIVE_CART.entries[0],
        quantity: 2,
        ...MOCK_ACTIVE_CART_EVENT,
      };

      const results: CartUpdateEntrySuccessEvent[] = [];
      const subscription = eventService
        .get(CartUpdateEntrySuccessEvent)
        .subscribe((e) => results.push(e));

      actions$.next(
        new CartActions.CartUpdateEntrySuccess({
          entryNumber: '0',
          quantity: 2,
          ...MOCK_ACTIVE_CART_EVENT,
        })
      );
      expect(results.length).toBe(1);
      expect(results[0].constructor).toEqual(CartUpdateEntrySuccessEvent);
      expect(results[0]).toEqual(jasmine.objectContaining(firstEventData));

      subscription.unsubscribe();
    });

    it('CartUpdateEntryFailEvent', () => {
      const firstEventData: CartUpdateEntryFailEvent = {
        cartCode: MOCK_ACTIVE_CART.code,
        entry: MOCK_ACTIVE_CART.entries[0],
        quantity: 2,
        ...MOCK_ACTIVE_CART_EVENT,
      };

      const results: CartUpdateEntryFailEvent[] = [];
      const subscription = eventService
        .get(CartUpdateEntryFailEvent)
        .subscribe((e) => results.push(e));

      actions$.next(
        new CartActions.CartUpdateEntryFail({
          error: 'update failed',
          entryNumber: '0',
          quantity: 2,
          ...MOCK_ACTIVE_CART_EVENT,
        })
      );
      expect(results.length).toBe(1);
      expect(results[0].constructor).toEqual(CartUpdateEntryFailEvent);
      expect(results[0]).toEqual(jasmine.objectContaining(firstEventData));

      subscription.unsubscribe();
    });

    describe('MergeCartSuccessEvent', () => {
      it('should emit the event when the action is fired', () => {
        const eventData: MergeCartSuccessEvent = {
          cartCode: MOCK_ID,
          tempCartId: 'abc',
          ...MOCK_ACTIVE_CART_EVENT,
        };

        let result: MergeCartSuccessEvent | undefined;
        const subscription = eventService
          .get(MergeCartSuccessEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next(
          new CartActions.MergeCartSuccess({
            oldCartId: 'old-cart-id',
            tempCartId: 'abc',
            ...MOCK_ACTIVE_CART_EVENT,
          })
        );

        expect(result).toEqual(jasmine.objectContaining(eventData));

        subscription.unsubscribe();
      });
    });
  });
});
