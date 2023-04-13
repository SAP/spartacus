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
import { Observable, of, throwError } from 'rxjs';
import * as fromUserAddressesEffect from './cdc-user-addresses.effect';
import { CdcUserAddressesEffects } from './cdc-user-addresses.effect';
import createSpy = jasmine.createSpy;

const mockUserId = 'user@sapcx.com';

class MockCdcJsService implements Partial<CdcJsService> {
  updateAddressWithoutScreenSet = () => of({ status: 'OK' });
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

const mockedGlobalMessageService = {
  add: () => {},
  remove: () => {},
};

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
  isocode: 'JP',
  name: 'Japan',
};

const mockCountries: Country[] = [mockCountry];

describe('CDC User Addresses effect', () => {
  let cdcUserAddressesEffect: CdcUserAddressesEffects;
  let userAddressConnector: UserAddressConnector;
  let actions$: Observable<any>;
  let globalMessageService: GlobalMessageService;
  let userAddressService: UserAddressService;
  let cdcJSService: CdcJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CdcUserAddressesEffects,
        { provide: UserAddressAdapter, useValue: {} },
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: GlobalMessageService, useValue: mockedGlobalMessageService },
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
    spyOn(globalMessageService, 'remove');
    spyOn(globalMessageService, 'add');
    TestBed.compileComponents();
  });

  describe('cdcAddUserAddress$', () => {
    it('should not update default address in CDC and show error message if add address fails', () => {
      actions$ = hot('-a', {
        a: new UserActions.AddUserAddressSuccess(mockUserAddress),
      });

      const error = {
        status: 'ERROR',
        errorMessage: 'Error adding default address in CDC',
      };

      spyOn(cdcJSService, 'updateAddressWithoutScreenSet').and.returnValue(
        throwError(error)
      );

      const expected = cold('-#', null, error);

      expect(cdcUserAddressesEffect.cdcAddUserAddress$).toBeObservable(
        expected
      );
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        error.errorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should send default address to CDC on add user addresses success', () => {
      actions$ = hot('-a', {
        a: new UserActions.AddUserAddressSuccess(mockUserAddress),
      });

      const ok = { status: 'OK' };

      spyOn(cdcJSService, 'updateAddressWithoutScreenSet').and.returnValue(
        of(ok)
      );

      const expected = cold('-b', { b: ok });

      expect(cdcUserAddressesEffect.cdcAddUserAddress$).toBeObservable(
        expected
      );
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });

  describe('cdcUpdateUserAddress$', () => {
    it('should update default address in CDC and show error message if update fails', () => {
      actions$ = hot('-a', {
        a: new UserActions.UpdateUserAddressSuccess(mockUserAddress),
      });
      const error = {
        status: 'ERROR',
        errorMessage: 'Error updating default address in CDC',
      };
      const expected = cold('-#', null, error);

      spyOn(cdcJSService, 'updateAddressWithoutScreenSet').and.returnValue(
        throwError(error)
      );

      expect(cdcUserAddressesEffect.cdcUpdateUserAddress$).toBeObservable(
        expected
      );
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        error.errorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should send default address to CDC on update user addresses success', () => {
      actions$ = hot('-a', {
        a: new UserActions.UpdateUserAddressSuccess(mockUserAddress),
      });
      const ok = {
        status: 'OK',
      };
      const expected = cold('-b', {
        b: ok,
      });

      spyOn(cdcJSService, 'updateAddressWithoutScreenSet').and.returnValue(
        of(ok)
      );

      expect(cdcUserAddressesEffect.cdcUpdateUserAddress$).toBeObservable(
        expected
      );
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should not update default address in CDC and show error message if setting default address fails', () => {
      actions$ = hot('-a', {
        a: new UserActions.UpdateUserAddressSuccess(mockUserId),
      });
      const error = {
        status: 'ERROR',
        errorMessage: 'Error updating default address in CDC',
      };
      const expected = cold('-#', null, error);

      spyOn(cdcJSService, 'updateAddressWithoutScreenSet').and.returnValue(
        throwError(error)
      );

      expect(cdcUserAddressesEffect.cdcUpdateUserAddress$).toBeObservable(
        expected
      );
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        error.errorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should send default address to CDC on update setting default addresses success', () => {
      actions$ = hot('-a', {
        a: new UserActions.UpdateUserAddressSuccess(mockUserId),
      });
      const ok = {
        status: 'OK',
      };
      const expected = cold('-b', {
        b: {
          status: 'OK',
        },
      });

      spyOn(cdcJSService, 'updateAddressWithoutScreenSet').and.returnValue(
        of(ok)
      );

      expect(cdcUserAddressesEffect.cdcUpdateUserAddress$).toBeObservable(
        expected
      );
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });

  describe('cdcDeleteUserAddress$', () => {
    it('should delete default address in CDC and show error message if delete fails', () => {
      actions$ = hot('-a', {
        a: new UserActions.DeleteUserAddressSuccess({}),
      });
      const error = {
        status: 'ERROR',
        errorMessage: 'Error deleting default address in CDC',
      };
      const expected = cold('-#', null, error);

      spyOn(cdcJSService, 'updateAddressWithoutScreenSet').and.returnValue(
        throwError(error)
      );

      expect(cdcUserAddressesEffect.cdcDeleteUserAddress$).toBeObservable(
        expected
      );
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        error.errorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should send default address to CDC on delete user addresses success', () => {
      actions$ = hot('-a', {
        a: new UserActions.DeleteUserAddressSuccess({}),
      });
      const ok = {
        status: 'OK',
      };
      const expected = cold('-b', {
        b: ok,
      });

      spyOn(cdcJSService, 'updateAddressWithoutScreenSet').and.returnValue(
        of(ok)
      );

      expect(cdcUserAddressesEffect.cdcDeleteUserAddress$).toBeObservable(
        expected
      );
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
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
    it('should invoke CDC JS service', (done) => {
      cdcJSService.updateAddressWithoutScreenSet = createSpy().and.returnValue(
        of({
          status: 'OK',
        })
      );
      cdcUserAddressesEffect.updateDefaultAddressInCDC().subscribe(() => {
        expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalledWith(
          mockUserAddress.formattedAddress,
          mockUserAddress.postalCode,
          mockUserAddress.town,
          mockCountry.name
        );
        done();
      });
    });
  });

  describe('sendAddressToCDC', () => {
    it('should invoke CDC JS service', (done) => {
      cdcJSService.updateAddressWithoutScreenSet = createSpy().and.returnValue(
        of({
          status: 'OK',
        })
      );
      cdcUserAddressesEffect.sendAddressToCDC(mockUserAddress).subscribe(() => {
        expect(userAddressService.getDeliveryCountries).toHaveBeenCalled();
        expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalledWith(
          mockUserAddress.formattedAddress,
          mockUserAddress.postalCode,
          mockUserAddress.town,
          mockCountry.name
        );
        done();
      });
    });
  });
});
