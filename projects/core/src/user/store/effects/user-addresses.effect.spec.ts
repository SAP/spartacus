import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccUserService } from '../../occ/index';
import * as fromUserAddressesAction from '../actions/user-addresses.action';
import * as fromUserAddressesEffect from './user-addresses.effect';
import { AddressList } from '../../../occ-models/index';

class MockOccUserService {
  loadUserAddresses(_userId: string): Observable<any> {
    return;
  }
}

const mockUserAddresses: AddressList = { addresses: [{ id: 'address123' }] };

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
});
