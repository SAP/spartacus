import { TestBed } from '@angular/core/testing';
import {
  CartAddEntryFailEvent,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { QuoteAddedToCartEventListener } from './quote-added-to-cart-event.listener';
import createSpy = jasmine.createSpy;
import { QuoteDetailsReloadQueryEvent } from '@spartacus/quote/root';

const mockEventStream$ = new BehaviorSubject<CxEvent>({});

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
  dispatch = createSpy();
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
  let eventService: EventService;

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
    eventService = TestBed.inject(EventService);
  });

  it('should dispatch QuoteDetailsReloadQueryEvent on CartUiEventAddToCart event ', () => {
    expect(listener).toBeDefined();
    mockEventStream$.next(mockEvent);
    expect(eventService.dispatch).toHaveBeenCalledWith(
      {},
      QuoteDetailsReloadQueryEvent
    );
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spyUnsubscribe = spyOn(Subscription.prototype, 'unsubscribe');
    listener.ngOnDestroy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });
});
