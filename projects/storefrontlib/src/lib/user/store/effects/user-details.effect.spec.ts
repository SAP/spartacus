import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable ,  EMPTY ,  of } from 'rxjs';

import { OccUserService } from '../../../occ/user/user.service';
import * as fromUserDetailsAction from '../actions/user-details.action';
import * as fromUserDetailsEffect from './user-details.effect';

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

class MockOccUserService {
  loadUser(username: string): Observable<any> {
    return;
  }
}

const mockUserDetails: any = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  type: 'Mock Type',
  uid: 'UID'
};

describe('User Details effect', () => {
  let userDetailsEffect: fromUserDetailsEffect.UserDetailsEffects;
  let userService: OccUserService;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromUserDetailsEffect.UserDetailsEffects,
        { provide: OccUserService, useClass: MockOccUserService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    userDetailsEffect = TestBed.get(fromUserDetailsEffect.UserDetailsEffects);
    userService = TestBed.get(OccUserService);
    actions$ = TestBed.get(Actions);

    spyOn(userService, 'loadUser').and.returnValue(of(mockUserDetails));
  });

  describe('loadUserDetails$', () => {
    it('should load user details', () => {
      const action = new fromUserDetailsAction.LoadUserDetails('mockName');
      const completion = new fromUserDetailsAction.LoadUserDetailsSuccess(
        mockUserDetails
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userDetailsEffect.loadUserDetails$).toBeObservable(expected);
    });
  });
});
