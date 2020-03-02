import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  Address,
  CheckoutDeliveryService,
  FeatureConfigService,
  User,
  UserAddressService,
} from '@spartacus/core';
import { AddressBookComponentService } from './address-book.component.service';

const mockAddresses: Address[] = [
  {
    id: '111',
    line1: 'Street Name 111',
    country: { isocode: 'PL' },
  },
  {
    id: '222',
    line1: 'Street Name 222',
    country: { isocode: 'PL' },
  },
];

const mockUser: User = {
  uid: '1234',
};

class MockUserAddressService {
  loadAddresses = jasmine.createSpy();
  addUserAddress = jasmine.createSpy();
  updateUserAddress = jasmine.createSpy();

  getAddresses(): Observable<Address[]> {
    return of(mockAddresses);
  }
  getAddressesLoading(): Observable<boolean> {
    return of(false);
  }
  get(): Observable<User> {
    return of(mockUser);
  }
}

class MockCheckoutDeliveryService {
  clearCheckoutDeliveryDetails() {}
}

class MockFeatureConfigService {
  isLevel(_featureLevel: string): boolean {
    return true;
  }
}

describe('AddressBookComponentService', () => {
  let service: AddressBookComponentService;
  let userAddressService: UserAddressService;
  let checkoutDeliveryService: CheckoutDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddressBookComponentService,
        {
          provide: UserAddressService,
          useClass: MockUserAddressService,
        },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    service = TestBed.inject(AddressBookComponentService);
    userAddressService = TestBed.inject(UserAddressService);
    checkoutDeliveryService = TestBed.inject(CheckoutDeliveryService);
  });

  it('should service be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAddresses() return addresses', () => {
    service
      .getAddresses()
      .pipe(take(1))
      .subscribe((addresses: Address[]) => {
        expect(addresses).toEqual(mockAddresses);
      });
  });

  it('should getAddressesStateLoading() return loading state', () => {
    service
      .getAddressesStateLoading()
      .pipe(take(1))
      .subscribe((state: boolean) => {
        expect(state).toEqual(false);
      });
  });

  it('should loadAddresses() load addresses', () => {
    service.loadAddresses();
    expect(userAddressService.loadAddresses).toHaveBeenCalled();
  });

  it('should addUserAddress() add user address', () => {
    service.addUserAddress(mockAddresses[0]);
    expect(userAddressService.addUserAddress).toHaveBeenCalledWith(
      mockAddresses[0]
    );
  });

  describe('updateUserAddress', () => {
    it('should run update user address', () => {
      service.updateUserAddress('addressId', mockAddresses[0]);
      expect(userAddressService.updateUserAddress).toHaveBeenCalledWith(
        'addressId',
        mockAddresses[0]
      );
    });

    it('should clear checkout delivery details', () => {
      spyOn(checkoutDeliveryService, 'clearCheckoutDeliveryDetails');
      service.updateUserAddress('addressId', mockAddresses[0]);
      expect(
        checkoutDeliveryService.clearCheckoutDeliveryDetails
      ).toHaveBeenCalled();
    });
  });
});
