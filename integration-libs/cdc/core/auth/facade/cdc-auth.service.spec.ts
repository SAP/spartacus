import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AsmAuthStorageService, TokenTarget } from '@spartacus/asm/root';
import {
  AuthActions,
  AuthRedirectService,
  AuthStorageService,
  AuthToken,
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CdcAuthActions } from '../store';
import { CdcAuthService } from './cdc-auth.service';

class MockAuthStorageService implements Partial<AuthStorageService> {
  setItem() {}
}

class MockUserIdService implements Partial<UserIdService> {
  setUserId() {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
  remove() {}
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  redirect() {}
}

describe('CdcAuthService', () => {
  let service: CdcAuthService;
  let store: Store;
  let authStorageService: AuthStorageService;
  let userIdService: UserIdService;
  let globalMessageService: GlobalMessageService;
  let authRedirectService: AuthRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        CdcAuthService,
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
      ],
    });

    service = TestBed.inject(CdcAuthService);
    store = TestBed.inject(Store);
    authStorageService = TestBed.inject(AuthStorageService);
    userIdService = TestBed.inject(UserIdService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    authRedirectService = TestBed.inject(AuthRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch proper action for loginWithCustomCdcFlow', () => {
    spyOn(store, 'dispatch').and.stub();

    service.loginWithCustomCdcFlow(
      'UID',
      'UIDSignature',
      'signatureTimestamp',
      'idToken',
      'baseSite'
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new CdcAuthActions.LoadCdcUserToken({
        UID: 'UID',
        UIDSignature: 'UIDSignature',
        signatureTimestamp: 'signatureTimestamp',
        idToken: 'idToken',
        baseSite: 'baseSite',
      })
    );
  });

  it('should allow to login with token data', () => {
    const setItemSpy = spyOn(authStorageService, 'setItem').and.callThrough();
    spyOn(store, 'dispatch').and.stub();
    spyOn(userIdService, 'setUserId').and.callThrough();
    spyOn(globalMessageService, 'remove').and.stub();
    spyOn(authRedirectService, 'redirect').and.stub();

    service.loginWithToken({
      access_token: 'acc_token',
      granted_scopes: ['scope-a'],
      expires_in: 20,
      refresh_token: 'ref_token',
    });

    expect(setItemSpy.calls.argsFor(0)).toEqual(['access_token', 'acc_token']);
    expect(setItemSpy.calls.argsFor(1)).toEqual([
      'granted_scopes',
      '["scope-a"]',
    ]);
    expect(setItemSpy.calls.argsFor(2)).toEqual([
      'access_token_stored_at',
      jasmine.any(String),
    ]);
    expect(setItemSpy.calls.argsFor(3)).toEqual([
      'expires_at',
      jasmine.any(String),
    ]);
    expect(setItemSpy.calls.argsFor(4)).toEqual(['refresh_token', 'ref_token']);
    expect(userIdService.setUserId).toHaveBeenCalledWith(OCC_USER_ID_CURRENT);
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Login());

    expect(globalMessageService.remove).toHaveBeenCalledWith(
      GlobalMessageType.MSG_TYPE_ERROR
    );
    expect(authRedirectService.redirect).toHaveBeenCalled();
  });

  it('should show warning when CS agent is logged in', () => {
    (<AsmAuthStorageService>authStorageService)['getTokenTarget'] = () =>
      of(TokenTarget.CSAgent);
    authStorageService['getToken'] = () =>
      of({ access_token: 'token' } as AuthToken);
    spyOn(userIdService, 'setUserId').and.callThrough();
    spyOn(globalMessageService, 'add').and.callThrough();

    service.loginWithToken({
      access_token: 'acc_token',
      granted_scopes: ['scope-a'],
      expires_in: 20,
      refresh_token: 'ref_token',
    });

    expect(userIdService.setUserId).not.toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'asm.auth.agentLoggedInError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
