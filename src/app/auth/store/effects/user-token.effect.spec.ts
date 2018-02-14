import { TestBed } from '@angular/core/testing';
import { UserTokenEffects } from '.';
import { Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { UserToken } from '../../models/token-types.model';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { UserLoaderService } from '../../../data/user-loader.service';

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
  login(username: string, password: string): Observable<any> {
    return;
  }
}

fdescribe('UserToken effect', () => {
  let userLoaderService: UserLoaderService;
  let userTokenEffect: UserTokenEffects;
  let actions$: TestActions;
  let testToken: UserToken;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserTokenEffects,
        { provide: UserLoaderService, useClass: MockUserTokenService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    userTokenEffect = TestBed.get(UserTokenEffects);
    userLoaderService = TestBed.get(UserLoaderService);
    actions$ = TestBed.get(Actions);

    testToken = {
      access_token: 'xxx',
      token_type: 'bearer',
      refresh_token: 'xxx',
      expires_in: 1000,
      scope: ['xxx'],
      username: 'xxx'
    };

    spyOn(userLoaderService, 'login').and.returnValue(of(testToken));
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
