import { TestBed } from '@angular/core/testing';
import {
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
} from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { NEVER, Observable, Subscription, of } from 'rxjs';
import { QuoteCartEventListener } from './quote-cart-event.listener';
import { QuoteDetailsReloadQueryEvent } from './quote.events';
import createSpy = jasmine.createSpy;

const cartRemoveEntrySuccessEvent = new CartRemoveEntrySuccessEvent();
cartRemoveEntrySuccessEvent.entry = {};

const cartAddEntrySuccessEvent = new CartAddEntrySuccessEvent();
cartAddEntrySuccessEvent.productCode = 'test';
cartAddEntrySuccessEvent.quantity = 3;

const cartUpdateEntrySuccessEvent = new CartUpdateEntrySuccessEvent();
cartUpdateEntrySuccessEvent.quantity = 1;
cartUpdateEntrySuccessEvent.entry = {};

const cartAddEntryFailEvent = new CartAddEntryFailEvent();
cartAddEntryFailEvent.error = {};

let removeEntrySuccess = false;
let addEntryFail = false;
let addEntrySuccess = false;
let updateEntrySuccess = false;

class MockEventService implements Partial<EventService> {
  get(eventType: any): Observable<any> {
    if (eventType === CartRemoveEntrySuccessEvent) {
      return removeEntrySuccess ? of(cartRemoveEntrySuccessEvent) : NEVER;
    } else if (eventType === CartAddEntrySuccessEvent) {
      return addEntrySuccess ? of(cartAddEntrySuccessEvent) : NEVER;
    } else if (eventType === CartUpdateEntrySuccessEvent) {
      return updateEntrySuccess ? of(cartAddEntrySuccessEvent) : NEVER;
    } else {
      return addEntryFail ? of(cartAddEntryFailEvent) : NEVER;
    }
  }
  dispatch = createSpy();
}

describe('QuoteCartEventListener', () => {
  let classUnderTest: QuoteCartEventListener;
  let eventService: EventService;

  function createListenerAndExpectPropagation() {
    classUnderTest = TestBed.inject(QuoteCartEventListener);
    expect(eventService.dispatch).toHaveBeenCalledWith(
      {},
      QuoteDetailsReloadQueryEvent
    );
  }

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
    removeEntrySuccess = false;
    addEntryFail = false;
    addEntrySuccess = false;
    updateEntrySuccess = false;

    eventService = TestBed.inject(EventService);
  });

  it('should create listener ', () => {
    classUnderTest = TestBed.inject(QuoteCartEventListener);
    expect(classUnderTest).toBeDefined();
  });

  it('should dispatch QuoteDetailsReloadQueryEvent on CartAddEntrySuccessEvent event ', () => {
    addEntrySuccess = true;
    createListenerAndExpectPropagation();
  });

  it('should dispatch QuoteDetailsReloadQueryEvent on CartUpdateEntrySuccessEvent event ', () => {
    updateEntrySuccess = true;
    createListenerAndExpectPropagation();
  });

  it('should dispatch QuoteDetailsReloadQueryEvent on CartRemoveEntrySuccessEvent event ', () => {
    removeEntrySuccess = true;
    createListenerAndExpectPropagation();
  });

  it('should not dispatch QuoteDetailsReloadQueryEvent on CartAddEntryFailEvent event ', () => {
    addEntryFail = true;
    classUnderTest = TestBed.inject(QuoteCartEventListener);
    expect(eventService.dispatch).not.toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spyUnsubscribe = spyOn(Subscription.prototype, 'unsubscribe');
    classUnderTest.ngOnDestroy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });
});
