import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccUserService } from '../../../occ/user/user.service';
import { AddressVerificationEffect } from './address-verification.effect';

class MockUserService {
  verifyAddress(userId, address) {}
}

const result = 'mockResult';

describe('Address Verification effect', () => {
  let service: OccUserService;
  let effect: AddressVerificationEffect;
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

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.verifyAddress$).toBeObservable(expected);
    });
  });
});
