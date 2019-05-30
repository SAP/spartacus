import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import * as fromStore from '../';
import { OpenIdAuthenticationTokenService } from '../../services/open-id-token/open-id-token.service';
import { OpenIdTokenActions } from '../actions';
import { OpenIdToken } from './../../models/token-types.model';

const testToken = {
  access_token: 'xxx',
} as OpenIdToken;

class MockOpenIdAuthenticationTokenService {
  loadOpenIdAuthenticationToken(
    _userId: string,
    _password: string
  ): Observable<OpenIdToken> {
    return of();
  }
}

describe('Open ID Token Effect', () => {
  let openIdTokenEffect: fromStore.OpenIdTokenEffect;
  let openIdService: OpenIdAuthenticationTokenService;
  let actions$: Observable<OpenIdTokenActions>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromStore.OpenIdTokenEffect,
        {
          provide: OpenIdAuthenticationTokenService,
          useClass: MockOpenIdAuthenticationTokenService,
        },
        provideMockActions(() => actions$),
      ],
    });

    openIdTokenEffect = TestBed.get(fromStore.OpenIdTokenEffect);
    openIdService = TestBed.get(OpenIdAuthenticationTokenService);

    spyOn(openIdService, 'loadOpenIdAuthenticationToken').and.returnValue(
      of(testToken)
    );
  });

  describe('loadClientToken$', () => {
    it('should load a client token', () => {
      const action = new fromStore.LoadOpenIdToken({
        username: 'xxx@xxx.xxx',
        password: 'pwd',
      });
      const completition = new fromStore.LoadOpenIdTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completition });

      expect(openIdTokenEffect.loadOpenIdToken$).toBeObservable(expected);
    });
  });
});
