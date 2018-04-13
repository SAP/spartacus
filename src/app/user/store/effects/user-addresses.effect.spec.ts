import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccUserService } from '../../../occ/user/user.service';
import * as fromUserAddressesAction from '../actions/user-addresses.action';
import * as fromUserAddressesEffect from './user-addresses.effect';

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

class MockOccUserService {
  loadUserAddresses(userId: string): Observable<any> {
    return;
  }
}

const mockUserAddresses = { addresses: ['address1', 'address2'] };

describe('User Addresses effect', () => {
  let userAddressesEffect: fromUserAddressesEffect.UserAddressesEffects;
  let userService: OccUserService;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserAddressesEffect.UserAddressesEffects,
        { provide: OccUserService, useClass: MockOccUserService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    userAddressesEffect = TestBed.get(
      fromUserAddressesEffect.UserAddressesEffects
    );
    userService = TestBed.get(OccUserService);
    actions$ = TestBed.get(Actions);

    spyOn(userService, 'loadUserAddresses').and.returnValue(
      of(mockUserAddresses)
    );
  });

  describe('loadUserAddresses$', () => {
    it('should load user addresses', () => {
      const action = new fromUserAddressesAction.LoadUserAddresses({
        userId: '123'
      });
      const completion = new fromUserAddressesAction.LoadUserAddressesSuccess(
        mockUserAddresses
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userAddressesEffect.loadUserAddresses$).toBeObservable(expected);
    });
  });
});
