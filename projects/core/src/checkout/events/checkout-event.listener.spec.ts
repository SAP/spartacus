import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { CxEvent } from '../../event/cx-event';
import { EventService } from '../../event/event.service';
import {
  DeleteUserAddressSuccessEvent,
  SetDefaultUserAddressSuccessEvent,
  UpdateUserAddressSuccessEvent,
} from '../../user/events';
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

  it('Should UpdateUserAddressSuccessEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryService, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new UpdateUserAddressSuccessEvent());
    expect(
      checkoutDeliveryService.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });

  it('Should DeleteUserAddressSuccessEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryService, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new DeleteUserAddressSuccessEvent());
    expect(
      checkoutDeliveryService.clearCheckoutDeliveryDetails
    ).toHaveBeenCalled();
  });

  it('Should SetDefaultUserAddressSuccessEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(checkoutDeliveryService, 'clearCheckoutDeliveryDetails');
    mockEventStream$.next(new SetDefaultUserAddressSuccessEvent());
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
