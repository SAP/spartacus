import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  DeleteUserAddressEvent,
  EventService,
  UpdateUserAddressEvent,
} from '@spartacus/core';
import { CheckoutDeliveryFacade } from 'feature-libs/checkout/root/facade/checkout-delivery.facade';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutEventListener } from './checkout-event.listener';

class MockCheckoutDeliveryFacade implements Partial<CheckoutDeliveryFacade> {
  clearCheckoutDeliveryDetails(): void {}
}

const mockEventStream$ = new BehaviorSubject<CxEvent>({});

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
}

describe('CheckoutEventListener', () => {
  let checkoutDeliveryFacade: CheckoutDeliveryFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: CheckoutDeliveryFacade,
          useClass: MockCheckoutDeliveryFacade,
        },
      ],
    });

    TestBed.inject(CheckoutEventListener);
    checkoutDeliveryFacade = TestBed.inject(CheckoutDeliveryFacade);
  });

  it('Should UpdateUserAddressEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryFacade, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new UpdateUserAddressEvent());
    expect(
      checkoutDeliveryFacade.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });

  it('Should DeleteUserAddressEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryFacade, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new DeleteUserAddressEvent());
    expect(
      checkoutDeliveryFacade.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });
});
