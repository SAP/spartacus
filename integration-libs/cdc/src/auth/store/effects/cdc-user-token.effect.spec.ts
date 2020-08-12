import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  AuthActions,
  ErrorModel,
  GlobalMessageService,
  UserToken,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { OCC_USER_ID_CURRENT } from 'projects/core/src/occ';
import { Observable, of } from 'rxjs';
import { CdcUserAuthenticationTokenService } from '../../services/user-authentication/cdc-user-authentication-token.service';
import { CdcAuthActions } from '../actions';
import { CdcUserTokenEffects } from './cdc-user-token.effect';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
};

class CdcUserAuthenticationTokenServiceMock {
  loadTokenUsingCustomFlow(
    _UID: string,
    _UIDSignature: string,
    _signatureTimestamp: string,
    _idToken: string,
    _baseSite: string
  ): Observable<UserToken> {
    return;
  }
}

class MockGlobalMessageService {
  add(): void {}
}

describe('UserToken effect', () => {
  let userTokenService: CdcUserAuthenticationTokenService;
  let userTokenEffect: CdcUserTokenEffects;
  let actions$: Observable<CdcAuthActions.CdcUserTokenAction>;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CdcUserTokenEffects,
        {
          provide: CdcUserAuthenticationTokenService,
          useClass: CdcUserAuthenticationTokenServiceMock,
        },
        provideMockActions(() => actions$),
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });

    userTokenEffect = TestBed.inject(CdcUserTokenEffects);
    userTokenService = TestBed.inject(CdcUserAuthenticationTokenService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(globalMessageService, 'add').and.stub();
  });

  describe('loadCdcUserToken$', () => {
    it('should load a user token', () => {
      spyOn(userTokenService, 'loadTokenUsingCustomFlow').and.returnValue(
        of(testToken)
      );
      const action = new CdcAuthActions.LoadCdcUserToken({
        UID: 'xxx',
        UIDSignature: 'xxx',
        signatureTimestamp: 'xxx',
        idToken: 'xxx',
        baseSite: 'xxx',
      });

      const completion = new AuthActions.LoadUserTokenSuccess(testToken);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userTokenEffect.loadCdcUserToken$).toBeObservable(expected);
      expect(testToken.expiration_time).toBeDefined();
      expect(testToken.userId).toEqual(OCC_USER_ID_CURRENT);
    });
  });

  describe('makeErrorSerializable', () => {
    it('should serialize string error before returning it', () => {
      const errorReturned = userTokenEffect.makeErrorSerializable('error');

      expect(errorReturned).toBeDefined();
    });

    it('should serialize Error before returning it', () => {
      const error = new Error('xxx');
      const errorReturned = userTokenEffect.makeErrorSerializable(error);

      expect(errorReturned).toBeDefined();
    });

    it('should serialize ErrorModel before returning it', () => {
      const error: ErrorModel = {
        message: 'error message',
      };

      const errorReturned = userTokenEffect.makeErrorSerializable(error);

      expect(errorReturned).toBeDefined();
    });

    it('should serialize HttpErrorResponse before returning it', () => {
      const mockError = new HttpErrorResponse({
        error: 'error',
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 500,
        statusText: 'Unknown error',
        url: '/xxx',
      });

      const errorReturned = userTokenEffect.makeErrorSerializable(mockError);

      expect(errorReturned).toBeDefined();
    });

    it('should serialize circular HttpErrorResponse before returning it', () => {
      const circular = {
        xxx: 'xxx',
      };
      circular['myself'] = circular;

      const mockError = new HttpErrorResponse({
        error: circular,
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 500,
        statusText: 'Unknown error',
        url: '/xxx',
      });

      const errorReturned = userTokenEffect.makeErrorSerializable(mockError);

      expect(errorReturned).toBeDefined();
    });
  });
});
