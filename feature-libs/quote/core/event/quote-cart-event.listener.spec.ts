import { TestBed } from '@angular/core/testing';
import {
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
} from '@spartacus/cart/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { BehaviorSubject, NEVER, Observable, Subscription } from 'rxjs';
import { QuoteCartEventListener } from './quote-cart-event.listener';
import createSpy = jasmine.createSpy;
import { QuoteDetailsReloadQueryEvent } from './quote.events';

let mockEventStream$: BehaviorSubject<CxEvent>;

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$ ? mockEventStream$.asObservable() : NEVER;
  }
  dispatch = createSpy();
}

const cartAddEntrySuccessEvent = new CartAddEntrySuccessEvent();
cartAddEntrySuccessEvent.productCode = 'test';
cartAddEntrySuccessEvent.quantity = 3;

const cartUpdateEntrySuccessEvent = new CartUpdateEntrySuccessEvent();
cartUpdateEntrySuccessEvent.quantity = 1;
cartUpdateEntrySuccessEvent.entry = {};

const cartRemoveEntrySuccessEvent = new CartRemoveEntrySuccessEvent();
cartRemoveEntrySuccessEvent.entry = {};

const cartAddEntryFailEvent = new CartAddEntryFailEvent();
cartAddEntryFailEvent.error = {};

describe('QuoteCartEventListener', () => {
  let listener: QuoteCartEventListener;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteCartEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    listener = TestBed.inject(QuoteCartEventListener);
    eventService = TestBed.inject(EventService);
  });

  // it('should dispatch QuoteDetailsReloadQueryEvent on CartAddEntrySuccessEvent event ', () => {
  //   expect(listener).toBeDefined();
  //   mockEventStream$.next(cartAddEntrySuccessEvent);
  //   expect(eventService.dispatch).toHaveBeenCalledWith(
  //     {},
  //     QuoteDetailsReloadQueryEvent
  //   );
  // });

  // it('should dispatch QuoteDetailsReloadQueryEvent on CartUpdateEntrySuccessEvent event ', () => {
  //   expect(listener).toBeDefined();
  //   mockEventStream$.next(cartUpdateEntrySuccessEvent);
  //   expect(eventService.dispatch).toHaveBeenCalledWith(
  //     {},
  //     QuoteDetailsReloadQueryEvent
  //   );
  // });

  it('should dispatch QuoteDetailsReloadQueryEvent on CartRemoveEntrySuccessEvent event ', () => {
    expect(listener).toBeDefined();
    mockEventStream$ = new BehaviorSubject<CxEvent>(
      cartRemoveEntrySuccessEvent
    );

    expect(eventService.dispatch).toHaveBeenCalledWith(
      {},
      QuoteDetailsReloadQueryEvent
    );
  });

  it('should not dispatch QuoteDetailsReloadQueryEvent on CartAddEntryFailEvent event ', () => {
    expect(listener).toBeDefined();
    mockEventStream$ = new BehaviorSubject<CxEvent>(cartAddEntryFailEvent);
    expect(eventService.dispatch).not.toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spyUnsubscribe = spyOn(Subscription.prototype, 'unsubscribe');
    listener.ngOnDestroy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });
});
