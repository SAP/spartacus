import { TestBed } from '@angular/core/testing';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import { ClearCheckoutFacade } from '@spartacus/checkout/root';
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

class MockClearCheckoutFacade implements Partial<ClearCheckoutFacade> {
  resetCheckoutProcesses(): void {}
}
describe('CheckoutEventListener', () => {
  let checkoutDeliveryFacade: CheckoutDeliveryFacade;
  let clearCheckoutFacade: ClearCheckoutFacade;

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
        {
          provide: ClearCheckoutFacade,
          useClass: MockClearCheckoutFacade,
        },
      ],
    });

    TestBed.inject(CheckoutEventListener);
    checkoutDeliveryFacade = TestBed.inject(CheckoutDeliveryFacade);
    clearCheckoutFacade = TestBed.inject(ClearCheckoutFacade);
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

  it('Should SaveCartSuccessEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(clearCheckoutFacade, 'resetCheckoutProcesses').and.stub();
    mockEventStream$.next(new SaveCartSuccessEvent());
    expect(clearCheckoutFacade.resetCheckoutProcesses).toHaveBeenCalled();
  });

  it('Should RestoreSavedCartSuccessEvent trigger clearCheckoutDeliveryDetails', () => {
    spyOn(clearCheckoutFacade, 'resetCheckoutProcesses').and.stub();
    mockEventStream$.next(new RestoreSavedCartSuccessEvent());
    expect(clearCheckoutFacade.resetCheckoutProcesses).toHaveBeenCalled();
  });
});
