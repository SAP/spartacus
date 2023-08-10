/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  GlobalMessageService,
  UserPaymentService,
} from '@spartacus/core';
import { of, throwError } from 'rxjs';
import { OpfCheckoutPaymentWrapperService } from '../opf-checkout-payment-wrapper';
import { OpfCheckoutBillingAddressFormService } from './opf-checkout-billing-address-form.service';

describe('OpfCheckoutBillingAddressFormService', () => {
  let service: OpfCheckoutBillingAddressFormService;
  let mockDeliveryAddressFacade: Partial<CheckoutDeliveryAddressFacade>;
  let mockBillingAddressFacade: Partial<CheckoutBillingAddressFacade>;
  let mockUserPaymentService: Partial<UserPaymentService>;
  let mockActiveCartFacade: Partial<ActiveCartFacade>;
  let mockGlobalMessageService: Partial<GlobalMessageService>;
  let mockOpfCheckoutPaymentWrapperService: Partial<OpfCheckoutPaymentWrapperService>;

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
      getActive: () => of({ paymentAddress: mockPaymentAddress } as Cart),
    };

    mockGlobalMessageService = {
      add: () => {},
    };

    mockOpfCheckoutPaymentWrapperService = {
      reloadPaymentMode: () => {},
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
      ],
    });

    service = TestBed.inject(OpfCheckoutBillingAddressFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load countries', () => {
    spyOn(mockUserPaymentService, 'loadBillingCountries');

    service.getCountries().subscribe(() => {
      expect(mockUserPaymentService.loadBillingCountries).toHaveBeenCalled();
    });
  });

  it('should get addresses when only payment address is present', () => {
    spyOn(mockBillingAddressFacade, 'setBillingAddress').and.returnValue(
      of(true)
    );
    spyOn(mockActiveCartFacade, 'isStable').and.returnValue(of(true));

    service.getAddresses();

    expect(service['isLoadingAddressSub'].value).toBeFalsy();
    expect(service.billingAddressValue).toEqual(mockPaymentAddress);
    expect(service.isSameAsDeliveryValue).toBeFalsy();
  });

  it('should put delivery address as payment address', () => {
    spyOn(mockDeliveryAddressFacade, 'getDeliveryAddressState').and.returnValue(
      of({ loading: false, data: mockDeliveryAddress, error: false })
    );
    spyOn(mockBillingAddressFacade, 'setBillingAddress').and.returnValue(
      of(true)
    );

    service.putDeliveryAddressAsPaymentAddress();

    expect(service.isSameAsDeliveryValue).toBeTruthy();
  });

  it('should put delivery address as payment address and handle error', () => {
    spyOn(mockDeliveryAddressFacade, 'getDeliveryAddressState').and.returnValue(
      of({ loading: false, data: mockDeliveryAddress, error: false })
    );
    spyOn(mockBillingAddressFacade, 'setBillingAddress').and.returnValue(
      throwError({})
    );

    service.putDeliveryAddressAsPaymentAddress();

    expect(service.isSameAsDeliveryValue).toBeFalsy();
  });

  it('should get delivery address', (done) => {
    spyOn(mockDeliveryAddressFacade, 'getDeliveryAddressState').and.returnValue(
      of({ loading: false, data: mockDeliveryAddress, error: false })
    );

    service['getDeliveryAddress']().subscribe((result) => {
      expect(result).toEqual(mockDeliveryAddress);
      done();
    });
  });

  it('should not get delivery address when loading', fakeAsync(() => {
    spyOn(mockDeliveryAddressFacade, 'getDeliveryAddressState').and.returnValue(
      of({ loading: true, data: undefined, error: false })
    );

    let address;

    service['getDeliveryAddress']().subscribe((result) => {
      address = result;
      flush();
    });

    expect(address).toBeUndefined();
  }));

  it('should get payment address', () => {
    spyOn(mockActiveCartFacade, 'getActive').and.returnValue(
      of({ paymentAddress: mockPaymentAddress } as Cart)
    );

    service['getPaymentAddress']().subscribe((result) => {
      expect(result).toEqual(mockPaymentAddress);
    });
  });

  it('should not get payment address when not present', () => {
    spyOn(mockActiveCartFacade, 'getActive').and.returnValue(
      of({ paymentAddress: undefined } as Cart)
    );

    service['getPaymentAddress']().subscribe((result) => {
      expect(result).toBeUndefined();
    });
  });

  it('should set isSameAsDelivery value', () => {
    const newValue = false;
    spyOn(service['isSameAsDeliverySub'], 'next');

    service.setIsSameAsDeliveryValue(newValue);

    expect(service['isSameAsDeliverySub'].next).toHaveBeenCalledWith(newValue);
  });
});
