import { TestBed } from '@angular/core/testing';
import { Address, User, UserAddressService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
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
  setAddressAsDefault = jasmine.createSpy();
  deleteUserAddress = jasmine.createSpy();

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

describe('AddressBookComponentService', () => {
  let service: AddressBookComponentService;
  let userAddressService: UserAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddressBookComponentService,
        {
          provide: UserAddressService,
          useClass: MockUserAddressService,
        },
      ],
    });

    service = TestBed.inject(AddressBookComponentService);
    userAddressService = TestBed.inject(UserAddressService);
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

  it('should updateUserAddress() update the user address', () => {
    service.updateUserAddress('addressId', mockAddresses[0]);
    expect(userAddressService.updateUserAddress).toHaveBeenCalledWith(
      'addressId',
      mockAddresses[0]
    );
  });

  it('should setAddressAsDefault() set address as default', () => {
    service.setAddressAsDefault('addressId');
    expect(userAddressService.setAddressAsDefault).toHaveBeenCalledWith(
      'addressId'
    );
  });

  it('should deleteUserAddress() delete address', () => {
    service.deleteUserAddress('addressId');
    expect(userAddressService.deleteUserAddress).toHaveBeenCalledWith(
      'addressId'
    );
  });
});
