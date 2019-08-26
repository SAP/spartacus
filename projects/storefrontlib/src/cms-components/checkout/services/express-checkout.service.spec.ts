import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  // BehaviorSubject,
  Observable,
  of,
} from 'rxjs';
import {
  Address,
  CheckoutDeliveryService,
  CheckoutDetails,
  CheckoutPaymentService,
  DeliveryMode,
  PaymentDetails,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';

import { ExpressCheckoutService } from './express-checkout.service';

import {
  CheckoutConfigService,
  CheckoutDetailsService,
} from '@spartacus/storefront';

const mockDetails: CheckoutDetails = {
  deliveryAddress: {
    firstName: 'firstName',
  },
  deliveryMode: { code: 'testMode' },
  paymentInfo: { accountHolderName: 'name' },
};

// const mockAddresses = new BehaviorSubject([mockDetails.deliveryAddress]);
// const mockLoadAddresses = new BehaviorSubject(true);

class MockUserAddressService implements Partial<UserAddressService> {
  getAddresses(): Observable<Address[]> {
    // return mockAddresses;
    return of([mockDetails.deliveryAddress]);
  }
  loadAddresses() {}
  getAddressesLoadedSuccess(): Observable<boolean> {
    return of(true);
    // return mockLoadAddresses.asObservable();
  }
}

// const mockPaymentMethods = new BehaviorSubject([mockDetails.paymentInfo]);
// const mockGetPaymentMethodsLoadedSuccess = new BehaviorSubject(true);

class MockUserPaymentService implements Partial<UserPaymentService> {
  getPaymentMethods(): Observable<PaymentDetails[]> {
    // return mockPaymentMethods;
    return of([mockDetails.paymentInfo]);
  }
  getPaymentMethodsLoadedSuccess(): Observable<boolean> {
    return of(true);
    // return mockGetPaymentMethodsLoadedSuccess;
  }
  loadPaymentMethods() {}
}

// const mockDeliveryAddress = new BehaviorSubject(mockDetails.deliveryAddress);
// const mockSelectedDeliveryModeCode = new BehaviorSubject(
//   mockDetails.deliveryMode.code
// );
// const mockPaymentDetails = new BehaviorSubject(mockDetails.paymentInfo);

class MockCheckoutDetailsService implements Partial<CheckoutDetailsService> {
  getDeliveryAddress(): Observable<Address> {
    return of(mockDetails.deliveryAddress);
    // return mockDeliveryAddress;
  }
  getSelectedDeliveryModeCode(): Observable<string> {
    return of(mockDetails.deliveryMode.code);
    // return mockSelectedDeliveryModeCode;
  }
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockDetails.paymentInfo);
    // return mockPaymentDetails;
  }
}

// const mockSupportedDeliveryModes = new BehaviorSubject([
//   mockDetails.deliveryMode,
// ]);
// const mockSetDeliveryAddressResultSuccess = new BehaviorSubject(true);
// const mockSetDeliveryAddressResultError = new BehaviorSubject(false);
// const mockSetDeliveryAddressResultLoading = new BehaviorSubject(false);
// const mockSetDeliveryModeResultSuccess = new BehaviorSubject(true);
// const mockSetDeliveryModeResultError = new BehaviorSubject(false);
// const mockSetDeliveryModeResultLoading = new BehaviorSubject(false);

class MockCheckoutDeliveryService implements Partial<CheckoutDeliveryService> {
  resetSetDeliveryAddressProcess() {}
  resetSetDeliveryModeProcess() {}
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    // return mockSupportedDeliveryModes;
    return of([mockDetails.deliveryMode]);
  }

  getSetDeliveryAddressResultSuccess(): Observable<boolean> {
    return of(true);
    // return mockSetDeliveryAddressResultSuccess;
  }
  getSetDeliveryAddressResultError(): Observable<boolean> {
    return of(false);
    // return mockSetDeliveryAddressResultError;
  }
  getSetDeliveryAddressResultLoading(): Observable<boolean> {
    return of(false);
    // return mockSetDeliveryAddressResultLoading;
  }

  getSetDeliveryModeResultSuccess(): Observable<boolean> {
    return of(true);
    // return mockSetDeliveryModeResultSuccess;
  }
  getSetDeliveryModeResultError(): Observable<boolean> {
    return of(false);
    // return mockSetDeliveryModeResultError;
  }
  getSetDeliveryModeResultLoading(): Observable<boolean> {
    return of(false);
    // return mockSetDeliveryModeResultLoading;
  }
}

// const mockSetPaymentDetailsResultSuccess = new BehaviorSubject(true);
// const mockSetPaymentDetailsResultError = new BehaviorSubject(false);
// const mockSetPaymentDetailsResultLoading = new BehaviorSubject(false);
class MockCheckoutPaymentService implements Partial<CheckoutPaymentService> {
  resetSetPaymentDetailsProcess() {}
  getSetPaymentDetailsResultSuccess(): Observable<boolean> {
    return of(true);
    // return mockSetPaymentDetailsResultSuccess;
  }
  getSetPaymentDetailsResultError(): Observable<boolean> {
    return of(false);
    // return mockSetPaymentDetailsResultError;
  }
  getSetPaymentDetailsResultLoading(): Observable<boolean> {
    return of(false);
    // return mockSetPaymentDetailsResultLoading;
  }
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  getPreferredDeliveryMode(): string {
    return mockDetails.deliveryMode.code;
  }
}

describe('ExpressCheckoutService', () => {
  let service: ExpressCheckoutService;
  // let userAddressService;
  // let userPaymentService;
  // let checkoutDeliveryService;
  // let checkoutPaymentService;
  // let checkoutDetailsService;
  // let checkoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpressCheckoutService,
        {
          provide: UserAddressService,
          useClass: MockUserAddressService,
        },
        {
          provide: UserPaymentService,
          useClass: MockUserPaymentService,
        },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        {
          provide: CheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
      ],
    });

    service = TestBed.get(ExpressCheckoutService as Type<
      ExpressCheckoutService
    >);
    // userAddressService = TestBed.get(UserAddressService as Type<
    //   UserAddressService
    // >);
    // checkoutDeliveryService = TestBed.get(CheckoutDeliveryService as Type<
    //   CheckoutDeliveryService
    // >);
    // checkoutPaymentService = TestBed.get(CheckoutPaymentService as Type<
    //   CheckoutPaymentService
    // >);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('trySetDefaultCheckoutDetails', () => {
    it('should return true if express checkout is possible', done => {
      service
        .trySetDefaultCheckoutDetails()
        .subscribe(data => {
          expect(data).toBeTruthy();
          done();
        })
        .unsubscribe();
    });

    // it('should return false if express checkout is not possible', done => {
    //   mockLoadAddresses.next(false);
    //   spyOn(userAddressService, 'loadAddresses');
    //   service
    //     .trySetDefaultCheckoutDetails()
    //     .subscribe(() => {
    //       expect(userAddressService.loadAddresses).toHaveBeenCalled();
    //       // expect(data).toBeFalsy();
    //       done();
    //     })
    //     .unsubscribe();
    // });
  });
});
