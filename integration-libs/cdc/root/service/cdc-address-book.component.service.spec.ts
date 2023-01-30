import { TestBed } from '@angular/core/testing';
import { Address, GlobalMessageService, GlobalMessageType, User, UserAddressService } from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { CDCAddressBookComponentService } from './cdc-address-book.component.service';
import { CdcJsService } from './cdc-js.service';
import createSpy = jasmine.createSpy;

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
    defaultAddress: true,
    formattedAddress: "222, Street Name 222, PL",
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

class MockGlobalMessageService {
  add = createSpy().and.stub();
  remove = createSpy().and.stub();
}


class MockCDCJsService implements Partial<CdcJsService> {
  updateAddressWithoutScreenSet = createSpy().and.returnValue(of({status: 'OK'}));
}

describe('AddressBookComponentService', () => {
  let service: CDCAddressBookComponentService;
  let userAddressService: UserAddressService;
  let cdcJsService: CdcJsService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CDCAddressBookComponentService,
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: CdcJsService, useClass: MockCDCJsService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });

    service = TestBed.inject(CDCAddressBookComponentService);
    userAddressService = TestBed.inject(UserAddressService);
    cdcJsService = TestBed.inject(CdcJsService);
    globalMessageService = TestBed.inject(GlobalMessageService);
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

  it('should getAddresses() invoke CDC SDK and update default address', () => {
    service
      .getAddresses()
      .pipe(take(1))
      .subscribe((addresses: Address[]) => {
        expect(cdcJsService.updateAddressWithoutScreenSet).toHaveBeenCalledWith(mockAddresses[1].formattedAddress);
        expect(addresses).toEqual(mockAddresses);
      });
  });

  it('should throw error in getAddresses() if CDC SDK update fails', () => {
    cdcJsService.updateAddressWithoutScreenSet = createSpy().and.returnValue(throwError({status:'error', errorDetails: 'Error'}));
    service
      .getAddresses()
      .pipe(take(1))
      .subscribe((addresses: Address[]) => {
        expect(globalMessageService.add).toHaveBeenCalledWith('Error',  GlobalMessageType.MSG_TYPE_ERROR);
        expect(cdcJsService.updateAddressWithoutScreenSet).toHaveBeenCalledWith(mockAddresses[1].formattedAddress);
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
