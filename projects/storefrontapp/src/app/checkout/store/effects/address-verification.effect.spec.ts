import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { EMPTY } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccUserService } from '../../../occ/user/user.service';
import { AddressVerificationEffect } from './address-verification.effect';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

class MockUserService {
  verifyAddress(userId, address) {}
}

const result = 'mockResult';

describe('Address Verification effect', () => {
  let service: OccUserService;
  let effect: AddressVerificationEffect;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddressVerificationEffect,
        { provide: OccUserService, useClass: MockUserService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    effect = TestBed.get(AddressVerificationEffect);
    service = TestBed.get(OccUserService);
    actions$ = TestBed.get(Actions);

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

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.verifyAddress$).toBeObservable(expected);
    });
  });
});
