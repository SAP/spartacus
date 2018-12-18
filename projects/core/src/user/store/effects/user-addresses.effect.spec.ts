import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccUserService } from '../../occ/index';
import * as fromUserAddressesAction from '../actions/user-addresses.action';
import * as fromUserAddressesEffect from './user-addresses.effect';
import { AddressList, Address } from '@spartacus/core';

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
  let userService: OccUserService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserAddressesEffect.UserAddressesEffects,
        { provide: OccUserService, useClass: MockOccUserService },
        provideMockActions(() => actions$)
      ]
    });

    userAddressesEffect = TestBed.get(
      fromUserAddressesEffect.UserAddressesEffects
    );
    userService = TestBed.get(OccUserService);

    spyOn(userService, 'loadUserAddresses').and.returnValue(
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
