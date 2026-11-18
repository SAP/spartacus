/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { flush, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  GlobalMessageService,
  HttpErrorModel,
  UserAddressAdapter,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { OpfCheckoutPaymentWrapperService } from '../opf-checkout-payment-wrapper';
import { OpfCheckoutBillingAddressFormService } from './opf-checkout-billing-address-form.service';
import { Store } from '@ngrx/store';

describe('OpfCheckoutBillingAddressFormService', () => {
  let service: OpfCheckoutBillingAddressFormService;
  let mockDeliveryAddressFacade: Partial<CheckoutDeliveryAddressFacade>;
  let mockBillingAddressFacade: Partial<CheckoutBillingAddressFacade>;
  let mockUserPaymentService: Partial<UserPaymentService>;
  let mockActiveCartFacade: Partial<ActiveCartFacade>;
  let mockGlobalMessageService: Partial<GlobalMessageService>;
  let mockOpfCheckoutPaymentWrapperService: Partial<OpfCheckoutPaymentWrapperService>;
  let mockPickupNoDefaultAddress$: BehaviorSubject<void>;
  let mockUserAddressService: Partial<UserAddressService>;

  const mockDeliveryAddress: Address = {
    id: '123',
  };
  const mockPaymentAddress: Address = {
    id: '321',
  };

  beforeEach(() => {
    mockDeliveryAddressFacade = {
      getDeliveryAddressState: () =>
        of({ loading: false, data: mockDeliveryAddress, error: false }),
    };

    mockBillingAddressFacade = {
      setBillingAddress: (address: Address) => of(address),
    };

    mockUserPaymentService = {
      getAllBillingCountries: () => of([]),
      loadBillingCountries: () => {},
    };

    mockActiveCartFacade = {
      reloadActiveCart: () => of(true),
      isStable: () => of(true),
      getActive: () => of({ sapBillingAddress: mockPaymentAddress } as Cart),
      hasDeliveryItems: () => of(false),
    };

    mockGlobalMessageService = {
      add: () => {},
    };

    mockOpfCheckoutPaymentWrapperService = {
      reloadPaymentMode: () => {},
    };
    mockPickupNoDefaultAddress$ = new BehaviorSubject<void>(undefined);

    mockUserAddressService = {
      getDefaultAddress: () => of(undefined),
    };

    TestBed.configureTestingModule({
      providers: [
        OpfCheckoutBillingAddressFormService,
        {
          provide: CheckoutDeliveryAddressFacade,
          useValue: mockDeliveryAddressFacade,
        },
        {
          provide: CheckoutBillingAddressFacade,
          useValue: mockBillingAddressFacade,
        },
        { provide: UserPaymentService, useValue: mockUserPaymentService },
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        {
          provide: OpfCheckoutPaymentWrapperService,
          useValue: mockOpfCheckoutPaymentWrapperService,
        },
        { provide: Store, useValue: { pipe: () => of(undefined) } },
        { provide: UserAddressAdapter, useValue: {} },
        {
          provide: '_noDefaultAddressFoundForPickupMode$',
          useValue: mockPickupNoDefaultAddress$,
        },
        { provide: UserAddressService, useValue: mockUserAddressService },
      ],
    });

    service = TestBed.inject(OpfCheckoutBillingAddressFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load countries', () => {
    vi.spyOn(mockUserPaymentService, 'loadBillingCountries');

    service.getCountries().subscribe(() => {
      expect(mockUserPaymentService.loadBillingCountries).toHaveBeenCalled();
    });
  });

  it('should show custom billing and uncheck same as delivery when sapBillingAddress exists', () => {
    service.getAddresses();

    expect(service['_$isLoadingAddress'].value).toBeFalsy();
    expect(service['_$billingAddressSub'].value).toEqual(mockPaymentAddress);
    expect(service.isSameAsDeliveryValue).toBeFalsy();
  });

  it('should put delivery address as payment address', () => {
    vi.spyOn(
      mockDeliveryAddressFacade,
      'getDeliveryAddressState'
    ).mockReturnValue(
      of({ loading: false, data: mockDeliveryAddress, error: false })
    );
    vi.spyOn(mockBillingAddressFacade, 'setBillingAddress').mockReturnValue(
      of(true)
    );

    service.setDeliveryAddressAsPaymentAddress();

    expect(service.isSameAsDeliveryValue).toBeTruthy();
  });

  it('should put delivery address as payment address and handle error', () => {
    vi.spyOn(
      mockDeliveryAddressFacade,
      'getDeliveryAddressState'
    ).mockReturnValue(
      of({ loading: false, data: mockDeliveryAddress, error: false })
    );
    vi.spyOn(mockBillingAddressFacade, 'setBillingAddress').mockReturnValue(
      throwError({})
    );

    service.setDeliveryAddressAsPaymentAddress();

    expect(service.isSameAsDeliveryValue).toBeFalsy();
  });

  it('should get delivery address', async () => {
    vi.spyOn(
      mockDeliveryAddressFacade,
      'getDeliveryAddressState'
    ).mockReturnValue(
      of({ loading: false, data: mockDeliveryAddress, error: false })
    );

    service['getDeliveryAddress']().subscribe((result) => {
      expect(result).toEqual(mockDeliveryAddress);
    });
  });

  it('should not get delivery address when loading', async () => {
    vi.spyOn(
      mockDeliveryAddressFacade,
      'getDeliveryAddressState'
    ).mockReturnValue(of({ loading: true, data: undefined, error: false }));

    let address;

    service['getDeliveryAddress']().subscribe((result) => {
      address = result;
    });

    expect(address).toBeUndefined();
  });

  it('should get payment address', () => {
    vi.spyOn(mockActiveCartFacade, 'getActive').mockReturnValue(
      of({ sapBillingAddress: mockPaymentAddress } as Cart)
    );

    service['getPaymentAddress']().subscribe((result) => {
      expect(result).toEqual(mockPaymentAddress);
    });
  });

  it('should not get payment address when not present', () => {
    vi.spyOn(mockActiveCartFacade, 'getActive').mockReturnValue(
      of({ sapBillingAddress: undefined } as Cart)
    );

    service['getPaymentAddress']().subscribe((result) => {
      expect(result).toBeUndefined();
    });
  });

  it('should set isSameAsDelivery value', () => {
    const newValue = false;
    vi.spyOn(service['_$isSameAsDelivery'], 'next');

    service.setIsSameAsDeliveryValue(newValue);

    expect(service['_$isSameAsDelivery'].next).toHaveBeenCalledWith(newValue);
  });

  it('should not get payment address when it is not present', async () => {
    vi.spyOn(mockActiveCartFacade, 'getActive').mockReturnValue(
      of({ sapBillingAddress: undefined } as Cart)
    );

    service['getPaymentAddress']().subscribe((result) => {
      expect(result).toBeUndefined();
    });
  });

  it('should set isSameAsDelivery value to false', () => {
    const newValue = false;
    vi.spyOn(service['_$isSameAsDelivery'], 'next');

    service.setIsSameAsDeliveryValue(newValue);

    expect(service['_$isSameAsDelivery'].next).toHaveBeenCalledWith(newValue);
  });

  it('should handle error when setting billing address fails', () => {
    const mockError: HttpErrorModel = {
      message: 'Error setting billing address',
    };
    vi.spyOn(mockBillingAddressFacade, 'setBillingAddress').mockReturnValue(
      throwError(mockError)
    );

    service.setBillingAddress(mockDeliveryAddress).subscribe({
      error: (error) => {
        expect(error).toEqual(mockError);
      },
    });
  });

  it('should set billing address to delivery and check same as delivery when sapBillingAddress is missing', () => {
    vi.spyOn(service as any, 'getDeliveryAddress').mockReturnValue(
      of(mockDeliveryAddress)
    );
    vi.spyOn(service as any, 'getPaymentAddress').mockReturnValue(
      of(undefined)
    );
    vi.spyOn(service, 'setBillingAddress');

    service.getAddresses();

    expect(service.setBillingAddress).toHaveBeenCalledWith(mockDeliveryAddress);
    expect(service['_$billingAddressSub'].value).toEqual(mockDeliveryAddress);
    expect(service.isSameAsDeliveryValue).toBeTruthy();
  });

  it('should use submitted address when cart does not return sapBillingAddress', async () => {
    const submittedAddress: Address = {
      firstName: 'Custom',
      lastName: 'Billing',
      line1: '999 Billing Rd',
    };
    const expectedAddress = service['getAddressWithId'](submittedAddress);

    vi.spyOn(mockActiveCartFacade, 'getActive').mockReturnValue(
      of({ sapBillingAddress: undefined } as Cart)
    );

    service.setBillingAddress(submittedAddress).subscribe((result) => {
      expect(result).toEqual(expectedAddress);
      expect(service['_$billingAddressSub'].value).toEqual(expectedAddress);
    });
  });

  it('should return EMPTY when address is undefined', () => {
    vi.spyOn(service as any, 'getDeliveryAddress').mockReturnValue(
      of(undefined)
    );
    vi.spyOn(service, 'setBillingAddress');

    service.setDeliveryAddressAsPaymentAddress();

    expect(service.setBillingAddress).not.toHaveBeenCalled();
  });

  it('should return an observable from pickupNoDefaultAddress$', () => {
    vi.spyOn(mockPickupNoDefaultAddress$, 'asObservable');

    (service as any)._noDefaultAddressFoundForPickupMode$ =
      mockPickupNoDefaultAddress$;

    const result: Observable<void> = service.pickupNoDefaultAddress$;

    expect(mockPickupNoDefaultAddress$.asObservable).toHaveBeenCalled();
    expect(result).toEqual(mockPickupNoDefaultAddress$.asObservable());
  });

  it('should handle no default address by setting isSameAsDelivery=false and emitting pickupNoDefaultAddress$', async () => {
    vi.spyOn(service, 'setIsSameAsDeliveryValue');
    service.pickupNoDefaultAddress$.subscribe(() => {
      expect(service.setIsSameAsDeliveryValue).toHaveBeenCalledWith(false);
    });
    (service as any).handleNoDefaultAddress();
  });

  it('should handle error when setting default billing address fails', async () => {
    vi.spyOn(mockActiveCartFacade, 'hasDeliveryItems').mockReturnValue(
      of(false)
    );
    vi.spyOn(mockUserAddressService, 'getDefaultAddress').mockReturnValue(
      of(mockDeliveryAddress)
    );
    vi.spyOn(service, 'setBillingAddress').mockReturnValue(
      throwError(() => new Error('Error'))
    );

    service.setDefaultBillingAddress();

    expect(service['_$isLoadingAddress'].value).toBeFalsy();
  });

  it('should handle the absence of a default address by invoking handleNoDefaultAddress', async () => {
    vi.spyOn(mockActiveCartFacade, 'hasDeliveryItems').mockReturnValue(
      of(false)
    );
    vi.spyOn(mockUserAddressService, 'getDefaultAddress').mockReturnValue(
      of(undefined)
    );
    const handleNoDefaultAddressSpy = vi.spyOn(
      service as any,
      'handleNoDefaultAddress'
    );

    service.setDefaultBillingAddress();

    expect(handleNoDefaultAddressSpy).toHaveBeenCalled();
  });
  it('should handle errors when loading the default address', async () => {
    vi.spyOn(mockActiveCartFacade, 'hasDeliveryItems').mockReturnValue(
      of(false)
    );
    vi.spyOn(mockUserAddressService, 'getDefaultAddress').mockReturnValue(
      throwError(() => new Error('Error loading default address'))
    );

    service.setDefaultBillingAddress();

    expect(service['_$isLoadingAddress'].value).toBeFalsy();
  });
});
