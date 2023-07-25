import { TestBed } from '@angular/core/testing';
import {
  CartAddEntryFailEvent,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuoteAddedToCartEventListener } from './quote-added-to-cart-event.listener';

const mockEventStream$ = new BehaviorSubject<CxEvent>({});

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
  dispatch() {}
}

const mockEvent = new CartUiEventAddToCart();
mockEvent.productCode = 'test';
mockEvent.quantity = 3;
mockEvent.numberOfEntriesBeforeAdd = 1;
mockEvent.pickupStoreName = 'testStore';

const mockFailEvent = new CartAddEntryFailEvent();
mockFailEvent.error = {};

describe('AddToCartDialogEventListener', () => {
  let listener: QuoteAddedToCartEventListener;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteAddedToCartEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    listener = TestBed.inject(QuoteAddedToCartEventListener);
  });

  describe('onAddToCart', () => {
    it('Should ', () => {
      expect(listener).toBeDefined();
      mockEventStream$.next(mockEvent);
    });
  });
});
