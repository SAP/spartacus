import { TestBed } from '@angular/core/testing';
import { RestoreSavedCartSuccessEvent, SaveCartSuccessEvent } from '@spartacus/cart/saved-cart/root';
import { ClearCheckoutFacade } from '@spartacus/checkout/root';
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

class MockClearCheckoutFacade implements Partial<ClearCheckoutFacade> {
  resetCheckoutProcesses(): void {}
}
fdescribe('CheckoutEventListener', () => {
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
