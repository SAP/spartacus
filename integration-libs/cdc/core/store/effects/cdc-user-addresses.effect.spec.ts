import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/index';
import { Address } from '../../../model/address.model';
import { UserAddressAdapter } from '../../connectors/address/user-address.adapter';
import { UserAddressConnector } from '../../connectors/address/user-address.connector';
import { UserAddressService } from '../../facade/user-address.service';
import { UserActions } from '../actions/index';
import * as fromUserAddressesEffect from './cdc-user-addresses.effect';

class MockUserAddressService {
  loadAddresses = jasmine.createSpy();
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

const mockUserAddresses: Address[] = [{ id: 'address123' }];
const mockUserAddress: Address = {
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

describe('User Addresses effect', () => {
  let userAddressesEffect: fromUserAddressesEffect.CDCUserAddressesEffects;
  let userAddressConnector: UserAddressConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserAddressesEffect.CDCUserAddressesEffects,
        { provide: UserAddressAdapter, useValue: {} },
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockActions(() => actions$),
      ],
    });

    userAddressesEffect = TestBed.inject(
      fromUserAddressesEffect.CDCUserAddressesEffects
    );
    userAddressConnector = TestBed.inject(UserAddressConnector);

    spyOn(userAddressConnector, 'getAll').and.returnValue(
      of(mockUserAddresses)
    );
    spyOn(userAddressConnector, 'add').and.returnValue(of({}));

    spyOn(userAddressConnector, 'update').and.returnValue(of({}));
    spyOn(userAddressConnector, 'delete').and.returnValue(of({}));
  });

  describe('loadUserAddresses$', () => {
    xit('should load user addresses', () => {
      const action = new UserActions.LoadUserAddresses('address123');
      const completion = new UserActions.LoadUserAddressesSuccess(
        mockUserAddresses
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userAddressesEffect.loadUserAddresses$).toBeObservable(expected);
    });
  });
});
