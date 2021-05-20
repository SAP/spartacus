import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { CxEvent } from '../../event/cx-event';
import { EventService } from '../../event/event.service';
import { UserAddressDeleteEvent, UserAddressSetAsDefaultEvent, UserAddressUpdateEvent } from '../../user/events';
import { CheckoutDeliveryService } from '../facade/checkout-delivery.service';
import { CheckoutEventListener } from './checkout-event.listener';

class MockCheckoutDeliveryService implements Partial<CheckoutDeliveryService> {
  clearCheckoutDeliveryDetails(): void {}
}

const mockEventStream$ = new BehaviorSubject<CxEvent>({});

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
}

describe('CheckoutEventListener', () => {
  let checkoutDeliveryService: CheckoutDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
      ],
    });

    TestBed.inject(CheckoutEventListener);
    checkoutDeliveryService = TestBed.inject(CheckoutDeliveryService);
  });

  it('Should UserAddressUpdateEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryService, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new UserAddressUpdateEvent());
    expect(
      checkoutDeliveryService.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });

  it('Should UserAddressDeleteEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryService, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new UserAddressDeleteEvent());
    expect(
      checkoutDeliveryService.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });

  it('Should UserAddressSetAsDefaultEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryService, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new UserAddressSetAsDefaultEvent());
    expect(
      checkoutDeliveryService.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });

  it('Should other events not trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryService, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next({} as CxEvent);
    expect(
      checkoutDeliveryService.clearCheckoutDeliveryDetails
    ).not.toHaveBeenCalled();
  });
});
