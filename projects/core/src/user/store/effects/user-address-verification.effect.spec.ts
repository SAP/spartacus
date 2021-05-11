import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Address, AddressValidation } from '../../../model/address.model';
import { UserAddressAdapter } from '../../connectors/address/user-address.adapter';
import { UserAddressConnector } from '../../connectors/address/user-address.connector';
import { UserActions } from '../actions/index';
import { UserAddressVerificationEffect } from './user-address-verification.effect';

const addressValidation: AddressValidation = {
  decision: 'test address validation',
  suggestedAddresses: [{ id: 'address1' }],
};

describe('Address Verification effect', () => {
  let effect: UserAddressVerificationEffect;
  let service: UserAddressConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAddressVerificationEffect,
        { provide: UserAddressAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(UserAddressVerificationEffect);
    service = TestBed.inject(UserAddressConnector);

    spyOn(service, 'verify').and.returnValue(of(addressValidation));
  });

  describe('verifyAddress$', () => {
    it('should load the address verification results', () => {
      const address: Address = {
        id: 'testAddress1',
      };
      const payload = {
        userId: 'userId',
        address,
      };
      const action = new UserActions.VerifyUserAddress(payload);
      const completion = new UserActions.VerifyUserAddressSuccess(
        addressValidation
      );

      actions$ = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effect.verifyAddress$).toBeObservable(expected);
    });
  });
});
