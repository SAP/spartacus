import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import {
  Address,
  CheckoutDeliveryService,
  CheckoutDetails,
  CheckoutPaymentService,
  DeliveryMode,
  LoaderState,
  PaymentDetails,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import {
  CheckoutConfigService,
  CheckoutDetailsService,
} from '@spartacus/storefront';
import { ExpressCheckoutService } from './express-checkout.service';

const mockDetails: CheckoutDetails = {
  deliveryAddress: {
    firstName: 'firstName',
  },
  deliveryMode: { code: 'testMode' },
  paymentInfo: { accountHolderName: 'name' },
};

const mockAddresses = new BehaviorSubject([mockDetails.deliveryAddress]);
const mockGetAddressesLoadedSuccess = new BehaviorSubject(true);

class MockUserAddressService implements Partial<UserAddressService> {
  getAddresses(): Observable<Address[]> {
    return mockAddresses.asObservable();
  }
  loadAddresses() {}
  getAddressesLoadedSuccess(): Observable<boolean> {
    return mockGetAddressesLoadedSuccess.asObservable();
  }
}

const mockPaymentMethods = new BehaviorSubject([mockDetails.paymentInfo]);
const mockGetPaymentMethodsLoadedSuccess = new BehaviorSubject(true);

class MockUserPaymentService implements Partial<UserPaymentService> {
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return mockPaymentMethods.asObservable();
  }
  getPaymentMethodsLoadedSuccess(): Observable<boolean> {
    return mockGetPaymentMethodsLoadedSuccess.asObservable();
  }
  loadPaymentMethods() {}
}

const mockDeliveryAddress = new BehaviorSubject(mockDetails.deliveryAddress);
const mockSelectedDeliveryModeCode = new BehaviorSubject(
  mockDetails.deliveryMode.code
);
const mockPaymentDetails = new BehaviorSubject(mockDetails.paymentInfo);

class MockCheckoutDetailsService implements Partial<CheckoutDetailsService> {
  getDeliveryAddress(): Observable<Address> {
    return mockDeliveryAddress.asObservable();
  }
  getSelectedDeliveryModeCode(): Observable<string> {
    return mockSelectedDeliveryModeCode.asObservable();
  }
  getPaymentDetails(): Observable<PaymentDetails> {
    return mockPaymentDetails.asObservable();
  }
}

const mockSupportedDeliveryModes = new BehaviorSubject([
  mockDetails.deliveryMode,
]);
const mockSetDeliveryAddressResult = new BehaviorSubject({
  success: true,
  error: false,
  loading: false,
});
const mockSetDeliveryModeResult = new BehaviorSubject({
  success: true,
  error: false,
  loading: false,
});
const mockLoadSupportedDeliveryModesResult = new BehaviorSubject({
  success: true,
  error: false,
  loading: false,
});

class MockCheckoutDeliveryService implements Partial<CheckoutDeliveryService> {
  setDeliveryAddress() {}
  setDeliveryMode() {}
  resetSetDeliveryAddressProcess() {}
  resetSetDeliveryModeProcess() {}
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return mockSupportedDeliveryModes.asObservable();
  }

  getSetDeliveryAddressProcess(): Observable<LoaderState<void>> {
    return mockSetDeliveryAddressResult.asObservable();
  }
  getSetDeliveryModeProcess(): Observable<LoaderState<void>> {
    return mockSetDeliveryModeResult.asObservable();
  }
  getLoadSupportedDeliveryModeProcess(): Observable<LoaderState<void>> {
    return mockLoadSupportedDeliveryModesResult.asObservable();
  }
}

const mockSetPaymentDetailsResult = new BehaviorSubject({
  success: true,
  error: false,
  loading: false,
});

class MockCheckoutPaymentService implements Partial<CheckoutPaymentService> {
  resetSetPaymentDetailsProcess() {}
  getSetPaymentDetailsResultProcess(): Observable<LoaderState<void>> {
    return mockSetPaymentDetailsResult.asObservable();
  }
  setPaymentDetails() {}
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  getPreferredDeliveryMode(): string {
    return mockDetails.deliveryMode.code;
  }
}

describe('ExpressCheckoutService', () => {
  let subscription: Subscription;
  let service: ExpressCheckoutService;
  let userAddressService;
  let userPaymentService;
  let checkoutDeliveryService;
  let checkoutPaymentService;

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
    if (subscription) {
      subscription.unsubscribe();
    }

    mockAddresses.next([mockDetails.deliveryAddress]);
    mockGetAddressesLoadedSuccess.next(true);
    mockPaymentMethods.next([mockDetails.paymentInfo]);
    mockGetPaymentMethodsLoadedSuccess.next(true);
    mockDeliveryAddress.next(mockDetails.deliveryAddress);
    mockSelectedDeliveryModeCode.next(mockDetails.deliveryMode.code);
    mockPaymentDetails.next(mockDetails.paymentInfo);
    mockSupportedDeliveryModes.next([mockDetails.deliveryMode]);
    mockSetDeliveryAddressResult.next({
      success: true,
      error: false,
      loading: false,
    });
    mockSetDeliveryModeResult.next({
      success: true,
      error: false,
      loading: false,
    });
    mockLoadSupportedDeliveryModesResult.next({
      success: true,
      error: false,
      loading: false,
    });
    mockSetPaymentDetailsResult.next({
      success: true,
      error: false,
      loading: false,
    });

    service = TestBed.get(ExpressCheckoutService as Type<
      ExpressCheckoutService
    >);
    userAddressService = TestBed.get(UserAddressService as Type<
      UserAddressService
    >);
    userPaymentService = TestBed.get(UserPaymentService as Type<
      UserPaymentService
    >);
    checkoutDeliveryService = TestBed.get(CheckoutDeliveryService as Type<
      CheckoutDeliveryService
    >);
    checkoutPaymentService = TestBed.get(CheckoutPaymentService as Type<
      CheckoutPaymentService
    >);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('trySetDefaultCheckoutDetails', () => {
    it('should return true if express checkout is possible', done => {
      subscription = service.trySetDefaultCheckoutDetails().subscribe(data => {
        expect(data).toBeTruthy();
        done();
      });
    });

    describe('shippingAddressSet$', () => {
      it('should load addresses if they are not loaded', done => {
        mockGetAddressesLoadedSuccess.next(false);
        spyOn(userAddressService, 'loadAddresses').and.callFake(() =>
          mockGetAddressesLoadedSuccess.next(true)
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(userAddressService.loadAddresses).toHaveBeenCalled();
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should set delivery address if it has been not loaded yet', done => {
        mockSetDeliveryAddressResult.next({
          success: false,
          error: false,
          loading: false,
        });
        spyOn(checkoutDeliveryService, 'setDeliveryAddress').and.callFake(() =>
          mockSetDeliveryAddressResult.next({
            success: true,
            error: false,
            loading: false,
          })
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(
              checkoutDeliveryService.setDeliveryAddress
            ).toHaveBeenCalledWith(mockDetails.deliveryAddress);
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should return false if set delivery address error', done => {
        mockSetDeliveryAddressResult.next({
          success: false,
          error: false,
          loading: false,
        });
        spyOn(checkoutDeliveryService, 'setDeliveryAddress').and.callFake(() =>
          mockSetDeliveryAddressResult.next({
            success: false,
            error: true,
            loading: false,
          })
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });

      it('should return false if there are no addresses', done => {
        mockAddresses.next([]);
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });
    });

    describe('paymentMethodSet$', () => {
      it('should load payment methods if they are not loaded', done => {
        mockGetPaymentMethodsLoadedSuccess.next(false);
        spyOn(userPaymentService, 'loadPaymentMethods').and.callFake(() =>
          mockGetPaymentMethodsLoadedSuccess.next(true)
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(userPaymentService.loadPaymentMethods).toHaveBeenCalled();
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should set payment method if it has been not loaded yet', done => {
        mockSetPaymentDetailsResult.next({
          success: false,
          error: false,
          loading: false,
        });
        spyOn(checkoutPaymentService, 'setPaymentDetails').and.callFake(() =>
          mockSetPaymentDetailsResult.next({
            success: true,
            error: false,
            loading: false,
          })
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(
              checkoutPaymentService.setPaymentDetails
            ).toHaveBeenCalledWith(mockDetails.paymentInfo);
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should return false if set payment method error', done => {
        mockSetPaymentDetailsResult.next({
          success: false,
          error: false,
          loading: false,
        });
        spyOn(checkoutPaymentService, 'setPaymentDetails').and.callFake(() =>
          mockSetPaymentDetailsResult.next({
            success: false,
            error: true,
            loading: false,
          })
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });

      it('should return false if there are no payment methods', done => {
        mockPaymentMethods.next([]);
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });
    });

    describe('deliveryModeSet$', () => {
      it('should set delivery mode if it has been not loaded yet', done => {
        mockSetDeliveryModeResult.next({
          success: false,
          error: false,
          loading: false,
        });
        spyOn(checkoutDeliveryService, 'setDeliveryMode').and.callFake(() =>
          mockSetDeliveryModeResult.next({
            success: true,
            error: false,
            loading: false,
          })
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(
              checkoutDeliveryService.setDeliveryMode
            ).toHaveBeenCalledWith(mockDetails.deliveryMode.code);
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should return false if set delivery mode error', done => {
        mockSetDeliveryModeResult.next({
          success: false,
          error: false,
          loading: false,
        });
        spyOn(checkoutDeliveryService, 'setDeliveryMode').and.callFake(() =>
          mockSetDeliveryModeResult.next({
            success: false,
            error: true,
            loading: false,
          })
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });

      it('should return false if there are no delivery modes', done => {
        mockSupportedDeliveryModes.next([]);
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });
    });
  });
});
