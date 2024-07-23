import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';

import createSpy = jasmine.createSpy;
import { CheckoutQueryResetEvent } from '@spartacus/checkout/base/root';
import { CheckoutServiceDetailsEventListener } from './checkout-service-details-event.listener';
import { CheckoutServiceDetailsSetEvent } from './checkout-service-details.events';

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';
const mockData = 'test-schedule-detail';

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutServiceDetailsEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutServiceDetailsEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutServiceDetailsEventListener);
    eventService = TestBed.inject(EventService);
    TestBed.inject(ActiveCartFacade);
  });
  beforeEach(() => {
    mockEventStream$.next(
      createFrom(CheckoutServiceDetailsSetEvent, {
        userId: mockUserId,
        cartId: mockCartId,
        cartCode: mockCartId,
        scheduledAt: mockData,
      })
    );
  });

  it(`should dispatch CheckoutQueryResetEvent when service details is set`, () => {
    expect(eventService.dispatch).toHaveBeenCalledWith(
      {},
      CheckoutQueryResetEvent
    );
  });
});
