import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { EventService } from '../../../event/event.service';
import { GlobalMessageService } from '../../../global-message/index';
import { Address } from '../../../model/address.model';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { UserAddressAdapter } from '../../connectors/address/user-address.adapter';
import { UserAddressConnector } from '../../connectors/address/user-address.connector';
import { UserAddressSetAsDefaultEvent } from '../../events/user.events';
import { UserAddressService } from '../../facade/user-address.service';
import { UserActions } from '../actions/index';
import * as fromUserAddressesEffect from './user-addresses.effect';

class MockUserAddressService {
  loadAddresses = jasmine.createSpy();
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

class MockEventService {
  dispatch = jasmine.createSpy();
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
  let userAddressesEffect: fromUserAddressesEffect.UserAddressesEffects;
  let userAddressConnector: UserAddressConnector;
  let actions$: Observable<any>;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserAddressesEffect.UserAddressesEffects,
        { provide: UserAddressAdapter, useValue: {} },
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockActions(() => actions$),
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    userAddressesEffect = TestBed.inject(
      fromUserAddressesEffect.UserAddressesEffects
    );
    userAddressConnector = TestBed.inject(UserAddressConnector);
    eventService = TestBed.inject(EventService);

    spyOn(userAddressConnector, 'getAll').and.returnValue(
      of(mockUserAddresses)
    );
    spyOn(userAddressConnector, 'add').and.returnValue(of({}));

    spyOn(userAddressConnector, 'update').and.returnValue(of({}));
    spyOn(userAddressConnector, 'delete').and.returnValue(of({}));
  });

  describe('loadUserAddresses$', () => {
    it('should load user addresses', () => {
      const action = new UserActions.LoadUserAddresses('address123');
      const completion = new UserActions.LoadUserAddressesSuccess(
        mockUserAddresses
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userAddressesEffect.loadUserAddresses$).toBeObservable(expected);
    });
  });

  describe('addUserAddress$', () => {
    it('should add user address', () => {
      const action = new UserActions.AddUserAddress({
        userId: OCC_USER_ID_CURRENT,
        address: mockUserAddress,
      });
      const completion = new UserActions.AddUserAddressSuccess({});

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(userAddressesEffect.addUserAddress$).toBeObservable(expected);
    });
  });

  describe('updateUserAddress$', () => {
    it('should update user address', () => {
      const action = new UserActions.UpdateUserAddress({
        userId: OCC_USER_ID_CURRENT,
        addressId: '123',
        address: {
          firstName: 'test',
        },
      });
      const completion = new UserActions.UpdateUserAddressSuccess({});

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(userAddressesEffect.updateUserAddress$).toBeObservable(expected);
    });

    it('should set address as default', () => {
      const action = new UserActions.UpdateUserAddress({
        userId: OCC_USER_ID_CURRENT,
        addressId: '123',
        address: {
          defaultAddress: true,
        },
      });
      const completion = new UserActions.LoadUserAddresses(OCC_USER_ID_CURRENT);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(userAddressesEffect.updateUserAddress$).toBeObservable(expected);
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          addressId: '123',
        },
        UserAddressSetAsDefaultEvent
      );
    });
  });

  describe('deleteUserAddress$', () => {
    it('should delete user address', () => {
      const action = new UserActions.DeleteUserAddress({
        userId: OCC_USER_ID_CURRENT,
        addressId: 'address123',
      });
      const completion = new UserActions.DeleteUserAddressSuccess({});
      actions$ = hot('-a', { a: action });

      const expected = cold('-b', { b: completion });
      expect(userAddressesEffect.deleteUserAddress$).toBeObservable(expected);
    });
  });
});
