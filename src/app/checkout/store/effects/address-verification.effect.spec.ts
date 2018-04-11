import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccUserService } from '../../../occ/user/user.service';
import { AddressVerificationEffect } from './address-verification.effect';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

class MockUserService {
  loadAddressVerificationResults(userId, address) {}
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

    spyOn(service, 'loadAddressVerificationResults').and.returnValue(
      of(result)
    );
  });

  describe('loadAddressVerificationResults$', () => {
    it('should load the address verification results', () => {
      const payload = {
        userId: 'userId',
        address: 'address'
      };
      const action = new fromActions.LoadAddressVerificationResults(payload);
      const completion = new fromActions.LoadAddressVerificationResultsSuccess(
        result
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadAddressVerificationResults$).toBeObservable(expected);
    });
  });
});
