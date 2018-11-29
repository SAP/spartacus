import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { OccUserService } from '@spartacus/core';
import * as fromActions from './../actions';
import { AddressVerificationEffect } from './address-verification.effect';

const result = 'mockResult';

class MockUserService {
  verifyAddress(_userId, _address) {}
}

describe('Address Verification effect', () => {
  let effect: AddressVerificationEffect;
  let service: OccUserService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddressVerificationEffect,
        { provide: OccUserService, useClass: MockUserService },
        provideMockActions(() => actions$)
      ]
    });

    effect = TestBed.get(AddressVerificationEffect);
    service = TestBed.get(OccUserService);

    spyOn(service, 'verifyAddress').and.returnValue(of(result));
  });

  describe('verifyAddress$', () => {
    it('should load the address verification results', () => {
      const payload = {
        userId: 'userId',
        address: 'address'
      };
      const action = new fromActions.VerifyAddress(payload);
      const completion = new fromActions.VerifyAddressSuccess(result);

      actions$ = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effect.verifyAddress$).toBeObservable(expected);
    });
  });
});
