import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { AuthToken, GlobalMessageService } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CdcAuthService } from '../../facade/cdc-auth.service';
import { CdcUserAuthenticationTokenService } from '../../services/user-authentication/cdc-user-authentication-token.service';
import { CdcAuthActions } from '../actions';
import { CdcUserTokenEffects } from './cdc-user-token.effect';

const testToken: AuthToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_at: '1000',
  granted_scopes: [],
  access_token_stored_at: '230',
};

class CdcUserAuthenticationTokenServiceMock
  implements Partial<CdcUserAuthenticationTokenService>
{
  loadTokenUsingCustomFlow(
    _UID: string,
    _UIDSignature: string,
    _signatureTimestamp: string,
    _idToken: string,
    _baseSite: string
  ): Observable<AuthToken> {
    return;
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(): void {}
}

class MockCdcAuthService implements Partial<CdcAuthService> {
  loginWithToken() {}
}

describe('UserToken effect', () => {
  let userTokenService: CdcUserAuthenticationTokenService;
  let userTokenEffect: CdcUserTokenEffects;
  let actions$: Observable<CdcAuthActions.CdcUserTokenAction>;
  let globalMessageService: GlobalMessageService;
  let cdcAuthService: CdcAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CdcUserTokenEffects,
        {
          provide: CdcUserAuthenticationTokenService,
          useClass: CdcUserAuthenticationTokenServiceMock,
        },
        {
          provide: CdcAuthService,
          useClass: MockCdcAuthService,
        },
        provideMockActions(() => actions$),
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });

    userTokenEffect = TestBed.inject(CdcUserTokenEffects);
    userTokenService = TestBed.inject(CdcUserAuthenticationTokenService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    cdcAuthService = TestBed.inject(CdcAuthService);

    spyOn(globalMessageService, 'add').and.stub();
  });

  describe('loadCdcUserToken$', () => {
    it('should load a user token', () => {
      spyOn(userTokenService, 'loadTokenUsingCustomFlow').and.returnValue(
        of(testToken)
      );
      spyOn(cdcAuthService, 'loginWithToken').and.callThrough();
      const action = new CdcAuthActions.LoadCdcUserToken({
        UID: 'xxx',
        UIDSignature: 'xxx',
        signatureTimestamp: 'xxx',
        idToken: 'xxx',
        baseSite: 'xxx',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('');

      expect(userTokenEffect.loadCdcUserToken$).toBeObservable(expected);
      expect(cdcAuthService.loginWithToken).toHaveBeenCalledWith(testToken);
    });
  });
});
