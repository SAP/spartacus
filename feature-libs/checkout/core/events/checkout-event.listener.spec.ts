import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  EventService,
  UserAddressDeleteEvent,
  UserAddressSetAsDefaultEvent,
  UserAddressUpdateEvent,
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

  it('Should UserAddressUpdateEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryFacade, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new UserAddressUpdateEvent());
    expect(
      checkoutDeliveryFacade.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });

  it('Should UserAddressDeleteEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryFacade, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new UserAddressDeleteEvent());
    expect(
      checkoutDeliveryFacade.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });

  it('Should UserAddressSetAsDefaultEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryFacade, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new UserAddressSetAsDefaultEvent());
    expect(
      checkoutDeliveryFacade.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });

  it('Should other events not trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryFacade, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next({} as CxEvent);
    expect(
      checkoutDeliveryFacade.clearCheckoutDeliveryDetails
    ).not.toHaveBeenCalled();
  });
});
