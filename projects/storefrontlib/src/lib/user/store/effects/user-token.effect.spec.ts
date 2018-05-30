import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { UserTokenEffects } from '.';

import { Observable, of } from 'rxjs';
import { UserToken } from '../../models/token-types.model';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccUserService } from '../../../occ/user/user.service';

class MockUserService {
  loadToken(userId: string, password: string): Observable<any> {
    return;
  }
}

describe('UserToken effect', () => {
  let userService: OccUserService;
  let userTokenEffect: UserTokenEffects;
  let actions$: Observable<any>;
  let testToken: UserToken;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserTokenEffects,
        { provide: OccUserService, useClass: MockUserService },
        provideMockActions(() => actions$)
      ]
    });

    userTokenEffect = TestBed.get(UserTokenEffects);
    userService = TestBed.get(OccUserService);

    testToken = {
      access_token: 'xxx',
      token_type: 'bearer',
      refresh_token: 'xxx',
      expires_in: 1000,
      scope: ['xxx'],
      userId: 'xxx'
    };

    spyOn(userService, 'loadToken').and.returnValue(of(testToken));
  });

  describe('loadUserToken$', () => {
    it('should load a user token', () => {
      const action = new fromActions.LoadUserToken({
        userId: 'xxx',
        password: 'xxx'
      });
      const completion = new fromActions.LoadUserTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTokenEffect.loadUserToken$).toBeObservable(expected);
    });
  });
});
