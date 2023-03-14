import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { CdcJsService } from '@spartacus/cdc/root';
import { Address, Country, UserIdService } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import {
  GlobalMessageService,
  GlobalMessageType,
} from 'projects/core/src/global-message';
import {
  UserActions,
  UserAddressAdapter,
  UserAddressConnector,
  UserAddressService,
} from 'projects/core/src/user';
import { Observable, of } from 'rxjs';
import * as fromUserAddressesEffect from './cdc-user-addresses.effect';

const mockUserId = 'user@sapcx.com';

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

class MockCdcJsService implements Partial<CdcJsService> {
  updateAddressWithoutScreenSet = jasmine
    .createSpy()
    .and.returnValue(of({ status: 'OK' }));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = jasmine.createSpy().and.returnValue(of({ uid: mockUserId }));
}

class MockUserAddressService {
  getDeliveryCountries(): Observable<Country[]> {
    return of();
  }

  loadDeliveryCountries(): void {}

  getAddresses(): Observable<Address[]> {
    return of([]);
  }
}

const mockUserAddress: Address = {
  id: 'address123',
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
  defaultAddress: true,
  formattedAddress: 'Toyosaki 2 create on cart, line2, town, zip',
};
const mockUserAddresses: Address[] = [mockUserAddress];

const mockCountry: Country = {
  isocode: 'de',
  name: 'Germany',
};

const mockCountries: Country[] = [mockCountry];

xdescribe('CDC User Addresses effect', () => {
  let cdcUserAddressesEffect: fromUserAddressesEffect.CdcUserAddressesEffects;
  let userAddressConnector: UserAddressConnector;
  let actions$: Observable<any>;
  let globalMessageService: GlobalMessageService;
  let userAddressService: UserAddressService;
  let cdcJSService: CdcJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserAddressesEffect.CdcUserAddressesEffects,
        { provide: UserAddressAdapter, useValue: {} },
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: CdcJsService, useClass: MockCdcJsService },
        { provide: UserIdService, useClass: MockUserIdService },
        provideMockActions(() => actions$),
      ],
    });

    cdcUserAddressesEffect = TestBed.inject(
      fromUserAddressesEffect.CdcUserAddressesEffects
    );
    globalMessageService = TestBed.inject(GlobalMessageService);
    userAddressConnector = TestBed.inject(UserAddressConnector);
    userAddressService = TestBed.inject(UserAddressService);
    cdcJSService = TestBed.inject(CdcJsService);

    spyOn(userAddressConnector, 'getAll').and.returnValue(
      of(mockUserAddresses)
    );
    spyOn(userAddressConnector, 'add').and.returnValue(of({}));

    spyOn(userAddressConnector, 'update').and.returnValue(of({}));
    spyOn(userAddressConnector, 'delete').and.returnValue(of({}));

    spyOn(userAddressService, 'getDeliveryCountries').and.returnValue(
      of(mockCountries)
    );
    spyOn(userAddressService, 'loadDeliveryCountries').and.stub();

    spyOn(userAddressService, 'getAddresses').and.returnValue(
      of(mockUserAddresses)
    );
  });

  describe('cdcAddUserAddress$', () => {
    it('should send default address to CDC on load addresses success', () => {
      const action = new UserActions.AddUserAddressSuccess(mockUserAddresses);

      actions$ = hot('-a', { a: action });
      const expected = cold('');

      expect(cdcUserAddressesEffect.cdcAddUserAddress$).toBeObservable(
        expected
      );
    });
  });

  describe('cdcUpdateUserAddress$', () => {
    it('should send default address to CDC on load addresses success', () => {
      const action = new UserActions.LoadUserAddressesSuccess(
        mockUserAddresses
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('');

      expect(cdcUserAddressesEffect.cdcUpdateUserAddress$).toBeObservable(
        expected
      );
    });

    it('should send default address to CDC on update user addresses success', () => {
      const action = new UserActions.UpdateUserAddressSuccess({});

      actions$ = hot('-a', { a: action });
      const expected = cold('');

      expect(cdcUserAddressesEffect.cdcUpdateUserAddress$).toBeObservable(
        expected
      );
    });
  });

  describe('cdcDeleteUserAddress$', () => {
    it('should delete user address', () => {
      const action = new UserActions.DeleteUserAddressSuccess({});

      actions$ = hot('a', { a: action });
      const expected = cold('');
      expect(cdcUserAddressesEffect.cdcDeleteUserAddress$).toBeObservable(
        expected
      );
    });
  });

  describe('getAddresses', () => {
    it('should get user id and invoke addresses', (done) => {
      cdcUserAddressesEffect.getAddresses().subscribe((addresses) => {
        expect(addresses).toBeTruthy();
        expect(addresses.length).toEqual(1);
        done();
      });
    });
  });

  describe('getDefaultAddress', () => {
    it('should obtain the default address', () => {
      expect(
        cdcUserAddressesEffect.getDefaultAddress(mockUserAddresses)
      ).toBeTruthy();
      expect(
        cdcUserAddressesEffect.getDefaultAddress(mockUserAddresses)
      ).toEqual(mockUserAddress);
    });
  });

  describe('getCountryName', () => {
    it('should obtain the country Name from countries', () => {
      expect(
        cdcUserAddressesEffect.getCountryName(
          mockCountries,
          mockCountry?.isocode + ''
        )
      ).toEqual(mockCountry.name);
    });
  });

  describe('showErrorMessage', () => {
    it('should show error message', () => {
      const message = ' Error has occurred ';
      cdcUserAddressesEffect.showErrorMessage({ errorMessage: message });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        message,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should show empty error message ', () => {
      const message = ' ';
      cdcUserAddressesEffect.showErrorMessage({ errorMessage: message });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        message,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('updateDefaultAddressInCDC', () => {
    it('should invoke CDC JS service', () => {
      cdcUserAddressesEffect.updateDefaultAddressInCDC();
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalledWith(
        mockUserAddress.formattedAddress,
        mockUserAddress.postalCode,
        mockUserAddress.town,
        mockCountry.name
      );
    });
  });

  describe('sendAddressToCDC', () => {
    it('should invoke CDC JS service', (done) => {
      cdcUserAddressesEffect.sendAddressToCDC(mockUserAddress);
      expect(userAddressService.getDeliveryCountries).toHaveBeenCalled();
      userAddressService.getDeliveryCountries().subscribe((countries) => {
        expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalledWith(
          mockUserAddress.formattedAddress,
          mockUserAddress.postalCode,
          mockUserAddress.town,
          countries[0].name
        );
        done();
      });
    });
  });
});
