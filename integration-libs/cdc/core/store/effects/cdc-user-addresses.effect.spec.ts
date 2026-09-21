import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { CdcJsService } from '@spartacus/cdc/root';
import { Address, Country, UserActions, UserAddressAdapter, UserAddressConnector, UserAddressService, UserIdService } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';;
import { EMPTY, firstValueFrom, Observable, of, throwError } from 'rxjs';
import * as fromUserAddressesEffect from './cdc-user-addresses.effect';
import { CdcUserAddressesEffects } from './cdc-user-addresses.effect';

const mockUserId = 'user@sapcx.com';

class MockCdcJsService implements Partial<CdcJsService> {
  updateAddressWithoutScreenSet = () => of({ status: 'OK' });
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of({ uid: mockUserId }));
}

class MockUserAddressService {
  getDeliveryCountries(): Observable<Country[]> {
    return EMPTY;
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

    vi.spyOn(userAddressConnector, 'getAll').mockReturnValue(
      of(mockUserAddresses)
    );
    vi.spyOn(userAddressConnector, 'add').mockReturnValue(of({}));

    vi.spyOn(userAddressConnector, 'update').mockReturnValue(of({}));
    vi.spyOn(userAddressConnector, 'delete').mockReturnValue(of({}));

    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of(mockCountries)
    );
    vi.spyOn(userAddressService, 'loadDeliveryCountries').mockImplementation(() => {});

    vi.spyOn(userAddressService, 'getAddresses').mockReturnValue(
      of(mockUserAddresses)
    );
    vi.spyOn(globalMessageService, 'remove');
    vi.spyOn(globalMessageService, 'add');
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

      vi.spyOn(cdcJSService, 'updateAddressWithoutScreenSet').mockReturnValue(
        throwError(() => error)
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

      vi.spyOn(cdcJSService, 'updateAddressWithoutScreenSet').mockReturnValue(
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

      vi.spyOn(cdcJSService, 'updateAddressWithoutScreenSet').mockReturnValue(
        throwError(() => error)
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

      vi.spyOn(cdcJSService, 'updateAddressWithoutScreenSet').mockReturnValue(
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

      vi.spyOn(cdcJSService, 'updateAddressWithoutScreenSet').mockReturnValue(
        throwError(() => error)
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

      vi.spyOn(cdcJSService, 'updateAddressWithoutScreenSet').mockReturnValue(
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

      vi.spyOn(cdcJSService, 'updateAddressWithoutScreenSet').mockReturnValue(
        throwError(() => error)
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

      vi.spyOn(cdcJSService, 'updateAddressWithoutScreenSet').mockReturnValue(
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
    it('should get user id and invoke addresses', async () => {
      const addresses = await firstValueFrom(cdcUserAddressesEffect.getAddresses());
      expect(addresses).toBeTruthy();
      expect(addresses.length).toEqual(1);
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
    it('should invoke CDC JS service', async () => {
      cdcJSService.updateAddressWithoutScreenSet = vi.fn().mockReturnValue(
        of({
          status: 'OK',
        })
      );
      await firstValueFrom(cdcUserAddressesEffect.updateDefaultAddressInCDC());
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalledWith(
        mockUserAddress.formattedAddress,
        mockUserAddress.postalCode,
        mockUserAddress.town,
        mockCountry.name
      );
    });
  });

  describe('sendAddressToCDC', () => {
    it('should invoke CDC JS service', async () => {
      cdcJSService.updateAddressWithoutScreenSet = vi.fn().mockReturnValue(
        of({
          status: 'OK',
        })
      );
      await firstValueFrom(cdcUserAddressesEffect.sendAddressToCDC(mockUserAddress));
      expect(userAddressService.getDeliveryCountries).toHaveBeenCalled();
      expect(cdcJSService.updateAddressWithoutScreenSet).toHaveBeenCalledWith(
        mockUserAddress.formattedAddress,
        mockUserAddress.postalCode,
        mockUserAddress.town,
        mockCountry.name
      );
    });
  });
});
