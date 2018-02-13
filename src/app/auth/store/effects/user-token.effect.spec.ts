import { TestBed } from '@angular/core/testing';
import { UserTokenService } from '../../service/user-token.service';
import { UserTokenEffects } from '.';
import { Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { UserToken } from '../../models/token-types.model';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';

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

class MockUserTokenService {
  loadToken(username: string, password: string): Observable<any> {
    return;
  }
  storeToken(username: string, token: UserToken): UserToken {
    return;
  }
}

fdescribe('UserToken effect', () => {
  let userTokenService: UserTokenService;
  let userTokenEffect: UserTokenEffects;
  let actions$: TestActions;
  let testToken: UserToken;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserTokenEffects,
        { provide: UserTokenService, useClass: MockUserTokenService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    userTokenEffect = TestBed.get(UserTokenEffects);
    userTokenService = TestBed.get(UserTokenService);
    actions$ = TestBed.get(Actions);

    testToken = {
      accessToken: 'xxx',
      tokenType: 'bearer',
      refreshToken: 'xxx',
      expiresIn: 1000,
      scope: ['xxx'],
      username: 'xxx'
    };

    spyOn(userTokenService, 'loadToken').and.returnValue(of(testToken));
    spyOn(userTokenService, 'storeToken').and.returnValue(testToken);
  });

  describe('loadUserToken$', () => {
    it('should load a user token', () => {
      const action = new fromActions.LoadUserToken({
        username: 'xxx',
        password: 'xxx'
      });
      const completion = new fromActions.LoadUserTokenSuccess(testToken);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTokenEffect.loadUserToken$).toBeObservable(expected);
    });
  });
});
