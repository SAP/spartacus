import { TestBed } from '@angular/core/testing';
import { EventService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
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
  SavedCartEvent,
} from '../events/saved-cart.events';
import { SavedCartEventsService } from './saved-cart-events.service';

const mockUserId = 'uid';
const mockSavedCartCode = '007';
const mockSavedCartTime = '2017-12-21T18:15:15+0000';
const mockSavedCartDescription = 'description';
const mockSavedCartName = 'name';

class MockEventService {
  get(): Observable<SavedCartEvent> {
    return of();
  }
}

describe('SavedCartEventsService', () => {
  let savedCartEventsService: SavedCartEventsService;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: EventService, useClass: MockEventService }],
    });

    eventService = TestBed.inject(EventService);
    savedCartEventsService = TestBed.inject(SavedCartEventsService);
  });

  it('should be created', () => {
    expect(savedCartEventsService).toBeTruthy();
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

        spyOn(eventService, 'get').and.returnValue(of(eventData));

        let result: DeleteSavedCartEvent | undefined;

        savedCartEventsService
          .getDeleteSavedCartEvent()
          .subscribe((value) => (result = value))
          .unsubscribe();

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

        spyOn(eventService, 'get').and.returnValue(of(eventData));

        let result: DeleteSavedCartSuccessEvent | undefined;
        savedCartEventsService
          .getDeleteSavedCartSuccessEvent()
          .subscribe((value) => (result = value))
          .unsubscribe();

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

        spyOn(eventService, 'get').and.returnValue(of(eventData));

        let result: DeleteSavedCartFailEvent | undefined;
        savedCartEventsService
          .getDeleteSavedCartFailEvent()
          .subscribe((value) => (result = value))
          .unsubscribe();

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });
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

        spyOn(eventService, 'get').and.returnValue(of(eventData));

        let result: SaveCartEvent | undefined;

        savedCartEventsService
          .getSaveCartEvent()
          .subscribe((value) => (result = value))
          .unsubscribe();

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('SaveCartSuccessEvent', () => {
      it('should emit the event when the action is fired', () => {
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

        spyOn(eventService, 'get').and.returnValue(of(eventData));

        let result: SaveCartSuccessEvent | undefined;
        savedCartEventsService
          .getSaveCartSuccessEvent()
          .subscribe((value) => (result = value))
          .unsubscribe();

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

        spyOn(eventService, 'get').and.returnValue(of(eventData));

        let result: SaveCartFailEvent | undefined;
        savedCartEventsService
          .getSaveCartFailEvent()
          .subscribe((value) => (result = value))
          .unsubscribe();

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });
  });

  describe('Restore Save Cart Events', () => {
    describe('RestoreSavedCartEvent', () => {
      it('should emit the event when the action is fired', () => {
        const payload = {
          cartId: mockSavedCartCode,
          userId: mockUserId,
        };

        const eventData: RestoreSavedCartEvent = {
          cartCode: mockSavedCartCode,
          saveTime: mockSavedCartTime,
          ...payload,
        };

        spyOn(eventService, 'get').and.returnValue(of(eventData));

        let result: RestoreSavedCartEvent | undefined;
        savedCartEventsService
          .getRestoreSavedCartEvent()
          .subscribe((value) => (result = value))
          .unsubscribe();

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

        spyOn(eventService, 'get').and.returnValue(of(eventData));

        let result: RestoreSavedCartSuccessEvent | undefined;
        savedCartEventsService
          .getRestoreSavedCartSuccessEvent()
          .subscribe((value) => (result = value));

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });

    describe('RestoreSavedCartFailEvent', () => {
      it('should emit the event when the action is fired', () => {
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

        spyOn(eventService, 'get').and.returnValue(of(eventData));

        let result: RestoreSavedCartFailEvent | undefined;
        savedCartEventsService
          .getRestoreSavedCartFailEvent()
          .subscribe((value) => (result = value))
          .unsubscribe();

        expect(result).toEqual(jasmine.objectContaining(eventData));
      });
    });
  });
});
