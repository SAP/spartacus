import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { SavedCartActions } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  CartActions,
  EventService,
  MultiCartService,
} from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SavedCartEventBuilder } from './saved-cart-event.builder';
import {
  DeleteSavedCartEvent,
  DeleteSavedCartFailEvent,
  DeleteSavedCartSuccessEvent,
  RestoreSavedCartEvent,
  RestoreSavedCartFailEvent,
  RestoreSavedCartSuccessEvent,
  SaveCartEvent,
  SaveCartFailEvent,
  SaveCartSuccessEvent,
} from './saved-cart.events';

interface ActionWithPayload extends Action {
  payload: any;
}

const mockUserId = 'uid';
const mockSavedCartCode = '007';
const mockSavedCartTime = '2017-12-21T18:15:15+0000';
const mockSavedCartDescription = 'description';
const mockSavedCartName = 'name';
const mockCartData: Cart = {
  code: mockSavedCartCode,
  description: mockSavedCartDescription,
  name: mockSavedCartName,
};

const mockSavedCartData: Cart = {
  code: mockSavedCartCode,
  saveTime: mockSavedCartTime as any,
  description: mockSavedCartDescription,
  name: mockSavedCartName,
};

class MockMultiCartService implements Partial<MultiCartService> {
  getCart = () => of(mockCartData);
}

fdescribe('SavedCartEventBuilder', () => {
  let actions$: Subject<ActionWithPayload>;
  let eventService: EventService;
  let multiCartService: MultiCartService;

  beforeEach(() => {
    actions$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        { provide: MultiCartService, useClass: MockMultiCartService },
      ],
    });

    TestBed.inject(SavedCartEventBuilder); // register events

    eventService = TestBed.inject(EventService);
    multiCartService = TestBed.inject(MultiCartService);
  });

  describe('Save Cart Events', () => {
    describe('SaveCartEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
          saveCartDescription: mockSavedCartDescription,
          saveCartName: mockSavedCartName,
        };

        const eventData: SaveCartEvent = {
          cartCode: mockSavedCartCode,
          ...payload,
        };

        let result: SaveCartEvent | undefined;
        eventService
          .get(SaveCartEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.SAVE_CART,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('SaveCartSuccessEvent', () => {
      it('should emit the event when the action is fired', () => {
        spyOn(multiCartService, 'getCart').and.returnValue(
          of(mockSavedCartData)
        );

        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
          saveCartDescription: mockSavedCartDescription,
          saveCartName: mockSavedCartName,
        };

        const eventData: SaveCartSuccessEvent = {
          cartCode: mockSavedCartCode,
          saveTime: mockSavedCartTime,
          ...payload,
        };

        let result: SaveCartSuccessEvent | undefined;
        eventService
          .get(SaveCartSuccessEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.SAVE_CART_SUCCESS,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('SaveCartFailEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
          saveCartDescription: mockSavedCartDescription,
          saveCartName: mockSavedCartName,
          error: { error: 'error' },
        };

        const eventData: SaveCartFailEvent = {
          cartCode: mockSavedCartCode,
          ...payload,
        };

        let result: SaveCartFailEvent | undefined;
        eventService
          .get(SaveCartFailEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.SAVE_CART_FAIL,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });
  });

  describe('Restore Save Cart Events', () => {
    describe('RestoreSavedCartEvent', () => {
      it('should emit the event when the action is fired', () => {
        spyOn(multiCartService, 'getCart').and.returnValue(
          of(mockSavedCartData)
        );

        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
        };

        const eventData: RestoreSavedCartEvent = {
          cartCode: mockSavedCartCode,
          saveTime: mockSavedCartTime,
          ...payload,
        };

        let result: RestoreSavedCartEvent | undefined;
        eventService
          .get(RestoreSavedCartEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.RESTORE_SAVED_CART,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('RestoreSavedCartSuccessEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
        };

        const eventData: RestoreSavedCartSuccessEvent = {
          cartCode: mockSavedCartCode,
          ...payload,
        };

        let result: RestoreSavedCartSuccessEvent | undefined;
        eventService
          .get(RestoreSavedCartSuccessEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.RESTORE_SAVED_CART_SUCCESS,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('RestoreSavedCartFailEvent', () => {
      it('should emit the event when the action is fired', () => {
        spyOn(multiCartService, 'getCart').and.returnValue(
          of(mockSavedCartData)
        );

        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
          saveCartDescription: mockSavedCartDescription,
          saveCartName: mockSavedCartName,
          error: { error: 'error' },
        };

        const eventData: RestoreSavedCartFailEvent = {
          cartCode: mockSavedCartCode,
          saveTime: mockSavedCartTime,
          ...payload,
        };

        let result: RestoreSavedCartFailEvent | undefined;
        eventService
          .get(RestoreSavedCartFailEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.RESTORE_SAVED_CART_FAIL,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });
  });

  describe('Delete Save Cart Events', () => {
    describe('DeleteSavedCartEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
        };

        const eventData: DeleteSavedCartEvent = {
          cartCode: mockSavedCartCode,
          ...payload,
        };

        let result: DeleteSavedCartEvent | undefined;
        eventService
          .get(DeleteSavedCartEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: CartActions.DELETE_CART,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('DeleteSavedCartSuccessEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
        };

        const eventData: DeleteSavedCartSuccessEvent = {
          cartCode: mockSavedCartCode,
          ...payload,
        };

        let result: DeleteSavedCartSuccessEvent | undefined;
        eventService
          .get(DeleteSavedCartSuccessEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: CartActions.DELETE_CART_SUCCESS,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('DeleteSavedCartFailEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
          error: { error: 'error' },
        };

        const eventData: DeleteSavedCartFailEvent = {
          cartCode: mockSavedCartCode,
          ...payload,
        };

        let result: DeleteSavedCartFailEvent | undefined;
        eventService
          .get(DeleteSavedCartFailEvent)
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
