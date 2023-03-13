import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { CdcJsService } from '@spartacus/cdc/root';
import { Address } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { GlobalMessageService } from 'projects/core/src/global-message';
import {
  UserActions,
  UserAddressAdapter,
  UserAddressConnector,
  UserAddressService,
} from 'projects/core/src/user';
import { Observable, of } from 'rxjs';
import * as fromUserAddressesEffect from './cdc-user-addresses.effect';

class MockUserAddressService {
  loadAddresses = jasmine.createSpy();
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

class MockCdcJsService implements Partial<CdcJsService> {
  updateAddressWithoutScreenSet = jasmine.createSpy();
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
};
const mockUserAddresses: Address[] = [mockUserAddress];

describe('CDC User Addresses effect', () => {
  let cdcUserAddressesEffect: fromUserAddressesEffect.CdcUserAddressesEffects;
  let userAddressConnector: UserAddressConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserAddressesEffect.CdcUserAddressesEffects,
        { provide: UserAddressAdapter, useValue: {} },
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: CdcJsService, useClass: MockCdcJsService },
        provideMockActions(() => actions$),
      ],
    });

    cdcUserAddressesEffect = TestBed.inject(
      fromUserAddressesEffect.CdcUserAddressesEffects
    );
    userAddressConnector = TestBed.inject(UserAddressConnector);

    spyOn(userAddressConnector, 'getAll').and.returnValue(
      of(mockUserAddresses)
    );
    spyOn(userAddressConnector, 'add').and.returnValue(of({}));

    spyOn(userAddressConnector, 'update').and.returnValue(of({}));
    spyOn(userAddressConnector, 'delete').and.returnValue(of({}));
  });

  describe('cdcAddUserAddress$', () => {
    it('should send default address to CDC on load addresses success', () => {
      const action = new UserActions.LoadUserAddressesSuccess(
        mockUserAddresses
      );

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
      const action = new UserActions.UpdateUserAddressSuccess(
        mockUserAddresses
      );

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

      actions$ = hot('-a', { a: action });
      const expected = cold('');
      expect(cdcUserAddressesEffect.cdcDeleteUserAddress$).toBeObservable(
        expected
      );
    });
  });
});
