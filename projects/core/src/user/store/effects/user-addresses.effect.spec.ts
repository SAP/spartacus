import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import * as fromUserAddressesAction from '../actions/user-addresses.action';
import { AddressList, Address, User } from '../../../occ/index';
import { OccUserService as UserOccService } from '../../occ/index';

import * as fromUserAddressesEffect from './user-addresses.effect';
import { UserService } from '../../facade/user.service';
import { GlobalMessageService } from 'projects/core/src/global-message';

class MockOccUserService {
  loadUserAddresses(_userId: string): Observable<any> {
    return;
  }
  addUserAddress(): Observable<any> {
    return of({});
  }
  updateUserAddress(): Observable<any> {
    return of({});
  }
  deleteUserAddress(): Observable<any> {
    return of({});
  }
}

class MockUserService {
  loadAddresses = jasmine.createSpy();

  get(): Observable<User> {
    return of({});
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

const mockUserAddresses: AddressList = { addresses: [{ id: 'address123' }] };
const mockUserAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' }
};

describe('User Addresses effect', () => {
  let userAddressesEffect: fromUserAddressesEffect.UserAddressesEffects;
  let userOccService: UserOccService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserAddressesEffect.UserAddressesEffects,
        { provide: UserOccService, useClass: MockOccUserService },
        { provide: UserService, useClass: MockUserService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockActions(() => actions$)
      ]
    });

    userAddressesEffect = TestBed.get(
      fromUserAddressesEffect.UserAddressesEffects
    );
    userOccService = TestBed.get(UserOccService);

    spyOn(userOccService, 'loadUserAddresses').and.returnValue(
      of(mockUserAddresses)
    );
  });

  describe('loadUserAddresses$', () => {
    it('should load user addresses', () => {
      const action = new fromUserAddressesAction.LoadUserAddresses(
        'address123'
      );
      const completion = new fromUserAddressesAction.LoadUserAddressesSuccess(
        mockUserAddresses.addresses
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userAddressesEffect.loadUserAddresses$).toBeObservable(expected);
    });
  });

  describe('addUserAddress$', () => {
    it('should add user address', () => {
      const action = new fromUserAddressesAction.AddUserAddress({
        userId: '123',
        address: mockUserAddress
      });
      const completion = new fromUserAddressesAction.AddUserAddressSuccess({});

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(userAddressesEffect.addUserAddress$).toBeObservable(expected);
    });
  });

  describe('updateUserAddress$', () => {
    it('should update user address', () => {
      const action = new fromUserAddressesAction.UpdateUserAddress({
        userId: '123',
        addressId: '123',
        address: {
          firstName: 'test'
        }
      });
      const completion = new fromUserAddressesAction.UpdateUserAddressSuccess(
        {}
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(userAddressesEffect.updateUserAddress$).toBeObservable(expected);
    });
  });

  describe('deleteUserAddress$', () => {
    it('should delete user address', () => {
      const action = new fromUserAddressesAction.DeleteUserAddress({
        userId: '123',
        addressId: 'address123'
      });
      const completion = new fromUserAddressesAction.DeleteUserAddressSuccess(
        {}
      );
      actions$ = hot('-a', { a: action });

      const expected = cold('-b', { b: completion });
      expect(userAddressesEffect.deleteUserAddress$).toBeObservable(expected);
    });
  });
});
