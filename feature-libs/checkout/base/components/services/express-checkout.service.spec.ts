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
import { BehaviorSubject, firstValueFrom, of, throwError } from 'rxjs';
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
  getAddresses = vi.fn().mockReturnValue(mockAddresses.asObservable());
  loadAddresses = vi.fn();
  getAddressesLoadedSuccess = vi.fn().mockReturnValue(
    mockGetAddressesLoadedSuccess.asObservable()
  );
}

const mockGetPaymentMethods = new BehaviorSubject<PaymentDetails[]>([
  mockCheckoutPaymentInfo,
]);
const mockGetPaymentMethodsLoadedSuccess = new BehaviorSubject<boolean>(true);
class MockUserPaymentService implements Partial<UserPaymentService> {
  getPaymentMethods = vi.fn().mockReturnValue(
    mockGetPaymentMethods.asObservable()
  );
  getPaymentMethodsLoadedSuccess = vi.fn().mockReturnValue(
    mockGetPaymentMethodsLoadedSuccess.asObservable()
  );
  loadPaymentMethods = vi.fn();
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
  setDeliveryAddress = vi.fn().mockReturnValue(of(undefined));
  getDeliveryAddressState = vi.fn().mockReturnValue(
    mockGetDeliveryAddressState.asObservable()
  );
}
class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  getSelectedDeliveryModeState = vi.fn().mockReturnValue(
    of({
      loading: false,
      error: false,
      data: mockCheckoutDeliveryMode,
    })
  );
  getSupportedDeliveryModesState = vi.fn().mockReturnValue(
    of({
      loading: false,
      error: false,
      data: [mockCheckoutDeliveryMode],
    })
  );
  setDeliveryMode = vi.fn().mockReturnValue(of('setDeliveryMode'));
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  getPaymentDetailsState = vi.fn().mockReturnValue(
    of({
      loading: false,
      error: false,
      data: mockCheckoutPaymentInfo,
    })
  );
  setPaymentDetails = vi.fn().mockReturnValue(of('setPaymentDetails'));
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  getPreferredDeliveryMode = vi.fn().mockReturnValue(
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
    it('should return true if express checkout is possible', async () => {
      const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
      expect(data).toBeTruthy();
    });

    describe('deliveryAddressSet$', () => {
      it('should load addresses if they are not loaded', async () => {
        mockGetAddressesLoadedSuccess.next(false);

        userAddressService.loadAddresses = vi.fn().mockImplementation(() =>
          mockGetAddressesLoadedSuccess.next(true)
        );

        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(userAddressService.loadAddresses).toHaveBeenCalled();
        expect(data).toBeTruthy();
      });

      it('should set delivery address if it has been not loaded yet', async () => {
        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(
          checkoutDeliveryAddressFacade.setDeliveryAddress
        ).toHaveBeenCalledWith(mockCheckoutDeliveryAddress);
        expect(data).toBeTruthy();
      });

      it('should return false if set delivery address error', async () => {
        checkoutDeliveryAddressFacade.setDeliveryAddress =
          vi.fn().mockReturnValue(throwError(() => 'err'));

        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(data).toBeFalsy();
      });

      it('should return false if there are no addresses', async () => {
        mockAddresses.next([]);

        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(data).toBeFalsy();
      });
    });

    describe('paymentMethodSet$', () => {
      it('should load payment methods if they are not loaded', async () => {
        mockGetPaymentMethodsLoadedSuccess.next(false);
        userPaymentService.loadPaymentMethods = vi.fn().mockImplementation(() =>
          mockGetPaymentMethodsLoadedSuccess.next(true)
        );

        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(userPaymentService.loadPaymentMethods).toHaveBeenCalled();
        expect(data).toBeTruthy();
      });

      it('should set payment method if it has been not loaded yet', async () => {
        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(
          checkoutPaymentService.setPaymentDetails
        ).toHaveBeenCalledWith(mockCheckoutPaymentInfo);
        expect(data).toBeTruthy();
      });

      it('should return false if set payment method error', async () => {
        checkoutPaymentService.setPaymentDetails = vi.fn().mockReturnValue(
          throwError(() => 'err')
        );

        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(data).toBeFalsy();
      });

      it('should return false if there are no payment methods', async () => {
        mockGetPaymentMethods.next([]);

        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(data).toBeFalsy();
      });
    });

    describe('deliveryModeSet$', () => {
      it('should set delivery mode if it has been not loaded yet', async () => {
        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(
          checkoutDeliveryModesFacade.setDeliveryMode
        ).toHaveBeenCalledWith(mockCheckoutDeliveryMode.code);
        expect(data).toBeTruthy();
      });

      it('should return false if set delivery mode error', async () => {
        checkoutDeliveryModesFacade.setDeliveryMode =
          vi.fn().mockReturnValue(throwError(() => 'err'));

        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(data).toBeFalsy();
      });

      it('should return false if there are no delivery modes', async () => {
        mockGetDeliveryAddressState.next({
          loading: false,
          error: false,
          data: {},
        });

        const data = await firstValueFrom(service.trySetDefaultCheckoutDetails());
        expect(data).toBeFalsy();
      });
    });
  });
});
