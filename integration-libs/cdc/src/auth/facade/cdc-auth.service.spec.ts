import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthActions,
  AuthService,
  AuthStorageService,
  OCC_USER_ID_CURRENT,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CdcAuthActions } from '../store';
import { CdcAuthService } from './cdc-auth.service';

const gigya = {
  accounts: {
    logout: (): void => {},
  },
};

const mockedWindowRef = {
  nativeWindow: {
    gigya: gigya,
  },
};

class MockAuthService {
  logout() {}
  isUserLoggedIn() {
    of();
  }
}

class MockAuthStorageService {
  setItem() {}
}

class MockUserIdService {
  setUserId() {}
}

describe('CdcAuthService', () => {
  let service: CdcAuthService;
  let store: Store;
  let winRef: WindowRef;
  let authService: AuthService;
  let authStorageService: AuthStorageService;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        CdcAuthService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: WindowRef, useValue: mockedWindowRef },
      ],
    });

    service = TestBed.inject(CdcAuthService);
    winRef = TestBed.inject(WindowRef);
    store = TestBed.inject(Store);
    authService = TestBed.inject(AuthService);
    authStorageService = TestBed.inject(AuthStorageService);
    userIdService = TestBed.inject(UserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch proper action for authorize', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorizeWithCustomCdcFlow(
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

  it('should dispatch proper actions for logout standard customer', () => {
    spyOn(service as any, 'logoutFromCdc').and.stub();
    spyOn(authService, 'logout').and.callThrough();

    service.logout();
    expect(service['logoutFromCdc']).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should logout user from CDC', () => {
    const cdcLogout = spyOn(
      winRef.nativeWindow['gigya'].accounts,
      'logout'
    ).and.stub();
    service['logoutFromCdc']();

    expect(cdcLogout).toHaveBeenCalled();
  });

  it('isUserLoggedIn should pass the data from AuthService', () => {
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true, false));

    const results = [];
    service
      .isUserLoggedIn()
      .pipe(take(2))
      .subscribe((loggedIn) => results.push(loggedIn));

    expect(results).toEqual([true, false]);
  });

  it('should allow to login with token data', () => {
    const setItemSpy = spyOn(authStorageService, 'setItem').and.callThrough();
    spyOn(store, 'dispatch').and.stub();
    spyOn(userIdService, 'setUserId').and.callThrough();

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
  });
});
