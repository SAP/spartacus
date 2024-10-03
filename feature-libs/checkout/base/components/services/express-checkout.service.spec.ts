import { TestBed } from '@angular/core/testing';
import { DeliveryMode } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  PaymentDetails,
  QueryState,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { ExpressCheckoutService } from './express-checkout.service';
import createSpy = jasmine.createSpy;

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
  getAddresses = createSpy().and.returnValue(mockAddresses.asObservable());
  loadAddresses = createSpy();
  getAddressesLoadedSuccess = createSpy().and.returnValue(
    mockGetAddressesLoadedSuccess.asObservable()
  );
}

const mockGetPaymentMethods = new BehaviorSubject<PaymentDetails[]>([
  mockCheckoutPaymentInfo,
]);
const mockGetPaymentMethodsLoadedSuccess = new BehaviorSubject<boolean>(true);
class MockUserPaymentService implements Partial<UserPaymentService> {
  getPaymentMethods = createSpy().and.returnValue(
    mockGetPaymentMethods.asObservable()
  );
  getPaymentMethodsLoadedSuccess = createSpy().and.returnValue(
    mockGetPaymentMethodsLoadedSuccess.asObservable()
  );
  loadPaymentMethods = createSpy();
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
  setDeliveryAddress = createSpy().and.returnValue(of(undefined));
  getDeliveryAddressState = createSpy().and.returnValue(
    mockGetDeliveryAddressState.asObservable()
  );
}
class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  getSelectedDeliveryModeState = createSpy().and.returnValue(
    of({
      loading: false,
      error: false,
      data: mockCheckoutDeliveryMode,
    })
  );
  getSupportedDeliveryModesState = createSpy().and.returnValue(
    of({
      loading: false,
      error: false,
      data: [mockCheckoutDeliveryMode],
    })
  );
  setDeliveryMode = createSpy().and.returnValue(of('setDeliveryMode'));
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  getPaymentDetailsState = createSpy().and.returnValue(
    of({
      loading: false,
      error: false,
      data: mockCheckoutPaymentInfo,
    })
  );
  setPaymentDetails = createSpy().and.returnValue(of('setPaymentDetails'));
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  getPreferredDeliveryMode = createSpy().and.returnValue(
    mockCheckoutDeliveryMode?.code
  );
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

    describe('deliveryAddressSet$', () => {
      it('should load addresses if they are not loaded', (done) => {
        mockGetAddressesLoadedSuccess.next(false);

        userAddressService.loadAddresses = createSpy().and.callFake(() =>
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
        checkoutDeliveryAddressFacade.setDeliveryAddress =
          createSpy().and.returnValue(throwError(() => 'err'));

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
        userPaymentService.loadPaymentMethods = createSpy().and.callFake(() =>
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
        checkoutPaymentService.setPaymentDetails = createSpy().and.returnValue(
          throwError(() => 'err')
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
        checkoutDeliveryModesFacade.setDeliveryMode =
          createSpy().and.returnValue(throwError(() => 'err'));

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
