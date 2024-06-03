import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Cart, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  CloneSavedCartEvent,
  CloneSavedCartFailEvent,
  CloneSavedCartSuccessEvent,
  EditSavedCartEvent,
  EditSavedCartFailEvent,
  EditSavedCartSuccessEvent,
  RestoreSavedCartEvent,
  RestoreSavedCartFailEvent,
  RestoreSavedCartSuccessEvent,
  SaveCartEvent,
  SaveCartFailEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import { EventService } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SavedCartActions } from '../store/actions/index';
import { SavedCartEventBuilder } from './saved-cart-event.builder';

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

class MockMultiCartService implements Partial<MultiCartFacade> {
  getCart = () => of(mockCartData);
}

describe('SavedCartEventBuilder', () => {
  let actions$: Subject<ActionWithPayload>;
  let eventService: EventService;
  let multiCartService: MultiCartFacade;

  beforeEach(() => {
    actions$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        { provide: MultiCartFacade, useClass: MockMultiCartService },
      ],
    });

    TestBed.inject(SavedCartEventBuilder); // register events

    eventService = TestBed.inject(EventService);
    multiCartService = TestBed.inject(MultiCartFacade);
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

  describe('Edit Saved Cart Events', () => {
    describe('EditSavedCartEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
          saveCartDescription: mockSavedCartDescription,
          saveCartName: mockSavedCartName,
        };

        const eventData: EditSavedCartEvent = {
          cartCode: mockSavedCartCode,
          ...payload,
        };

        let result: EditSavedCartEvent | undefined;
        eventService
          .get(EditSavedCartEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.EDIT_SAVED_CART,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('EditSavedCartSuccessEvent', () => {
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

        const eventData: EditSavedCartSuccessEvent = {
          cartCode: mockSavedCartCode,
          saveTime: mockSavedCartTime,
          ...payload,
        };

        let result: EditSavedCartSuccessEvent | undefined;
        eventService
          .get(EditSavedCartSuccessEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.EDIT_SAVED_CART_SUCCESS,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('EditSavedCartFailEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
          saveCartDescription: mockSavedCartDescription,
          saveCartName: mockSavedCartName,
          error: { error: 'error' },
        };

        const eventData: EditSavedCartFailEvent = {
          cartCode: mockSavedCartCode,
          ...payload,
        };

        let result: EditSavedCartFailEvent | undefined;
        eventService
          .get(EditSavedCartFailEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.EDIT_SAVED_CART_FAIL,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });
  });

  describe('Clone Save Cart Events', () => {
    describe('CloneSavedCartEvent', () => {
      it('should emit the event when the action is fired', () => {
        spyOn(multiCartService, 'getCart').and.returnValue(
          of(mockSavedCartData)
        );

        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
        };

        const eventData: CloneSavedCartEvent = {
          cartCode: mockSavedCartCode,
          saveTime: mockSavedCartTime,
          ...payload,
        };

        let result: CloneSavedCartEvent | undefined;
        eventService
          .get(CloneSavedCartEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.CLONE_SAVED_CART,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('CloneSavedCartSuccessEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
        };

        const eventData: CloneSavedCartSuccessEvent = {
          cartCode: mockSavedCartCode,
          ...payload,
        };

        let result: CloneSavedCartSuccessEvent | undefined;
        eventService
          .get(CloneSavedCartSuccessEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.CLONE_SAVED_CART_SUCCESS,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('CloneSavedCartFailEvent', () => {
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

        const eventData: CloneSavedCartFailEvent = {
          cartCode: mockSavedCartCode,
          saveTime: mockSavedCartTime,
          ...payload,
        };

        let result: CloneSavedCartFailEvent | undefined;
        eventService
          .get(CloneSavedCartFailEvent)
          .pipe(take(1))
          .subscribe((value) => (result = value));

        actions$.next({
          type: SavedCartActions.CLONE_SAVED_CART_FAIL,
          payload,
        });

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });
  });
});
