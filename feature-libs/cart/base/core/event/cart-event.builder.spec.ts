import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  ActiveCartFacade,
  Cart,
  CartAddEntryEvent,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartRemoveEntryFailEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntryFailEvent,
  CartUpdateEntrySuccessEvent,
  DeleteCartEvent,
  DeleteCartFailEvent,
  DeleteCartSuccessEvent,
} from '@spartacus/cart/base/root';
import { createFrom, EventService } from '@spartacus/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CartActions } from '../store/actions';
import { CartEventBuilder } from './cart-event.builder';

let getActiveCartIdSubject: BehaviorSubject<string>;

interface ActionWithPayload extends Action {
  payload: any;
}

const MOCK_ID = '00000123';
const MOCK_USER_ID = 'userId';
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
class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive = () => of(MOCK_ACTIVE_CART);
  getActiveCartId = () => getActiveCartIdSubject;
}

const MOCK_NOT_ACTIVE_CART_EVENT = Object.freeze({
  cartId: MOCK_NOT_ACTIVE_CART_ID,
  userId: MOCK_USER_ID,
});

const MOCK_ACTIVE_CART_EVENT = Object.freeze({
  cartId: MOCK_ACTIVE_CART_ID,
  userId: MOCK_USER_ID,
});

describe('CartEventBuilder', () => {
  let actions$: Subject<ActionWithPayload>;
  let eventService: EventService;
  let activeCartService: ActiveCartFacade;
  getActiveCartIdSubject = new BehaviorSubject<string>(MOCK_ACTIVE_CART_ID);

  beforeEach(() => {
    actions$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
      ],
    });

    TestBed.inject(CartEventBuilder); // register events

    eventService = TestBed.inject(EventService);
    activeCartService = TestBed.inject(ActiveCartFacade);
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

    describe('Cart Add Entry Events', () => {
      describe('CartAddEntryEvent', () => {
        it('should emit the event when the action is fired', () => {
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
      });

      describe('CartAddEntrySuccessEvent', () => {
        it('should emit the event when the action is fired', () => {
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
      });

      describe('CartAddEntryFailEvent', () => {
        it('should emit the event when the action is fired', () => {
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
      });
    });

    describe('Cart Remove Entry Events', () => {
      describe('CartRemoveEntrySuccessEvent', () => {
        it('should emit the event when the action is fired', () => {
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
      });

      describe('CartRemoveEntryFailEvent', () => {
        it('should emit the event when the action is fired', () => {
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
      });
    });

    describe('Cart Update Entry Events', () => {
      describe('CartUpdateEntrySuccessEvent', () => {
        it('should emit the event when the action is fired', () => {
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
      });

      describe('CartUpdateEntryFailEvent', () => {
        it('should emit the event when the action is fired', () => {
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
      });
    });

    describe('Delete Cart Events', () => {
      describe('DeleteCartEvent', () => {
        it('should emit the event when the action is fired', () => {
          const payload = {
            cartId: MOCK_ID,
            userId: MOCK_USER_ID,
          };

          const eventData: DeleteCartEvent = {
            cartCode: MOCK_ID,
            ...payload,
          };

          let result: DeleteCartEvent | undefined;
          eventService
            .get(DeleteCartEvent)
            .pipe(take(1))
            .subscribe((value) => (result = value));

          actions$.next({
            type: CartActions.DELETE_CART,
            payload,
          });

          expect(result).toEqual(jasmine.objectContaining(eventData));
        });
      });

      describe('DeleteCartSuccessEvent', () => {
        it('should emit the event when the action is fired', () => {
          const payload = {
            cartId: MOCK_ID,
            userId: MOCK_USER_ID,
          };

          const eventData: DeleteCartSuccessEvent = {
            cartCode: MOCK_ID,
            ...payload,
          };

          let result: DeleteCartSuccessEvent | undefined;
          eventService
            .get(DeleteCartSuccessEvent)
            .pipe(take(1))
            .subscribe((value) => (result = value));

          actions$.next({
            type: CartActions.DELETE_CART_SUCCESS,
            payload,
          });

          expect(result).toEqual(jasmine.objectContaining(eventData));
        });
      });

      describe('DeleteCartFailEvent', () => {
        it('should emit the event when the action is fired', () => {
          const payload = {
            cartId: MOCK_ID,
            userId: MOCK_USER_ID,
            error: { error: 'error' },
          };

          const eventData: DeleteCartFailEvent = {
            cartCode: MOCK_ID,
            ...payload,
          };

          let result: DeleteCartFailEvent | undefined;
          eventService
            .get(DeleteCartFailEvent)
            .pipe(take(1))
            .subscribe((value) => (result = value));

          actions$.next({
            type: CartActions.DELETE_CART_FAIL,
            payload,
          });

          expect(result).toEqual(jasmine.objectContaining(eventData));
        });
      });
    });
  });
});
