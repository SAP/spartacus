import { TestBed } from '@angular/core/testing';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  DeliveryMode,
  PaymentDetails,
  QueryState,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { ExpressCheckoutService } from './express-checkout.service';

const mockCheckoutDeliveryAddress: Address = {
  firstName: 'firstName',
};
const mockCheckoutDeliveryMode: DeliveryMode = {
  code: 'testCode',
  name: 'testMode',
};
const mockCheckoutPaymentInfo: PaymentDetails = {
  accountHolderName: 'name',
};

const mockAddresses = new BehaviorSubject<Address[]>([
  mockCheckoutDeliveryAddress,
]);
const mockGetAddressesLoadedSuccess = new BehaviorSubject<boolean>(true);

class MockUserAddressService implements Partial<UserAddressService> {
  getAddresses(): Observable<Address[]> {
    return mockAddresses.asObservable();
  }
  loadAddresses() {}
  getAddressesLoadedSuccess(): Observable<boolean> {
    return mockGetAddressesLoadedSuccess.asObservable();
  }
}

const mockGetPaymentMethods = new BehaviorSubject<PaymentDetails[]>([
  mockCheckoutPaymentInfo,
]);
const mockGetPaymentMethodsLoadedSuccess = new BehaviorSubject<boolean>(true);
class MockUserPaymentService implements Partial<UserPaymentService> {
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return mockGetPaymentMethods.asObservable();
  }
  getPaymentMethodsLoadedSuccess(): Observable<boolean> {
    return mockGetPaymentMethodsLoadedSuccess.asObservable();
  }
  loadPaymentMethods() {}
}

const mockGetDeliveryAddressState = new BehaviorSubject<
  QueryState<Address | undefined>
>({
  loading: false,
  error: false,
  data: mockCheckoutDeliveryAddress,
});
class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  setDeliveryAddress(_address: Address): Observable<unknown> {
    return of(undefined);
  }
  getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
    return mockGetDeliveryAddressState.asObservable();
  }
}

class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  getSelectedDeliveryModeState(): Observable<
    QueryState<DeliveryMode | undefined>
  > {
    return of({ loading: false, error: false, data: mockCheckoutDeliveryMode });
  }
  getSupportedDeliveryModesState(): Observable<QueryState<DeliveryMode[]>> {
    return of({
      loading: false,
      error: false,
      data: [mockCheckoutDeliveryMode],
    });
  }
  setDeliveryMode(_mode: string): Observable<unknown> {
    return of('setDeliveryMode');
  }
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
    return of({ loading: false, error: false, data: mockCheckoutPaymentInfo });
  }
  setPaymentDetails(): Observable<unknown> {
    return of('setPaymentDetails');
  }
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  getPreferredDeliveryMode(): string | undefined {
    return mockCheckoutDeliveryMode?.code;
  }
}

describe('ExpressCheckoutService', () => {
  let service: ExpressCheckoutService;
  let userAddressService: UserAddressService;
  let userPaymentService: UserPaymentService;
  let checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
  let checkoutPaymentService: CheckoutPaymentFacade;

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
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryAddressFacade,
        },
        {
          provide: CheckoutDeliveryModesFacade,
          useClass: MockCheckoutDeliveryModesFacade,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
        {
          provide: CheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
      ],
    });
    mockAddresses.next([mockCheckoutDeliveryAddress]);
    mockGetAddressesLoadedSuccess.next(true);
    mockGetPaymentMethods.next([mockCheckoutPaymentInfo]);
    mockGetPaymentMethodsLoadedSuccess.next(true);
    mockGetDeliveryAddressState.next({
      loading: false,
      error: false,
      data: mockCheckoutDeliveryAddress,
    });

    service = TestBed.inject(ExpressCheckoutService);
    userAddressService = TestBed.inject(UserAddressService);
    userPaymentService = TestBed.inject(UserPaymentService);
    checkoutDeliveryAddressFacade = TestBed.inject(
      CheckoutDeliveryAddressFacade
    );
    checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
    checkoutPaymentService = TestBed.inject(CheckoutPaymentFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('trySetDefaultCheckoutDetails', () => {
    it('should return true if express checkout is possible', (done) => {
      service
        .trySetDefaultCheckoutDetails()
        .pipe(take(1))
        .subscribe((data) => {
          expect(data).toBeTruthy();
          done();
        });
    });

    describe('shippingAddressSet$', () => {
      it('should load addresses if they are not loaded', (done) => {
        mockGetAddressesLoadedSuccess.next(false);
        spyOn(userAddressService, 'loadAddresses').and.callFake(() =>
          mockGetAddressesLoadedSuccess.next(true)
        );

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(userAddressService.loadAddresses).toHaveBeenCalled();
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should set delivery address if it has been not loaded yet', (done) => {
        spyOn(
          checkoutDeliveryAddressFacade,
          'setDeliveryAddress'
        ).and.callThrough();

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(
              checkoutDeliveryAddressFacade.setDeliveryAddress
            ).toHaveBeenCalledWith(mockCheckoutDeliveryAddress);
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should return false if set delivery address error', (done) => {
        spyOn(
          checkoutDeliveryAddressFacade,
          'setDeliveryAddress'
        ).and.returnValue(throwError('err'));

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(data).toBeFalsy();
            done();
          });
      });

      it('should return false if there are no addresses', (done) => {
        mockAddresses.next([]);

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(data).toBeFalsy();
            done();
          });
      });
    });

    describe('paymentMethodSet$', () => {
      it('should load payment methods if they are not loaded', (done) => {
        mockGetPaymentMethodsLoadedSuccess.next(false);
        spyOn(userPaymentService, 'loadPaymentMethods').and.callFake(() =>
          mockGetPaymentMethodsLoadedSuccess.next(true)
        );

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(userPaymentService.loadPaymentMethods).toHaveBeenCalled();
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should set payment method if it has been not loaded yet', (done) => {
        spyOn(checkoutPaymentService, 'setPaymentDetails').and.callThrough();

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(
              checkoutPaymentService.setPaymentDetails
            ).toHaveBeenCalledWith(mockCheckoutPaymentInfo);
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should return false if set payment method error', (done) => {
        spyOn(checkoutPaymentService, 'setPaymentDetails').and.returnValue(
          throwError('err')
        );

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(data).toBeFalsy();
            done();
          });
      });

      it('should return false if there are no payment methods', (done) => {
        mockGetPaymentMethods.next([]);

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(data).toBeFalsy();
            done();
          });
      });
    });

    describe('deliveryModeSet$', () => {
      it('should set delivery mode if it has been not loaded yet', (done) => {
        spyOn(checkoutDeliveryModesFacade, 'setDeliveryMode').and.callThrough();

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(
              checkoutDeliveryModesFacade.setDeliveryMode
            ).toHaveBeenCalledWith(mockCheckoutDeliveryMode.code);
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should return false if set delivery mode error', (done) => {
        spyOn(checkoutDeliveryModesFacade, 'setDeliveryMode').and.returnValue(
          throwError('err')
        );

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(data).toBeFalsy();
            done();
          });
      });

      it('should return false if there are no delivery modes', (done) => {
        mockGetDeliveryAddressState.next({
          loading: false,
          error: false,
          data: {},
        });

        service
          .trySetDefaultCheckoutDetails()
          .pipe(take(1))
          .subscribe((data) => {
            expect(data).toBeFalsy();
            done();
          });
      });
    });
  });
});
