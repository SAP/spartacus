import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthActions,
  AuthState,
  AuthToken,
  AUTH_FEATURE,
  OCC_USER_ID_CURRENT,
  WindowRef,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CdcAuthActions } from '../store';
import { CdcAuthService } from './cdc-auth.service';

const mockToken = {
  userId: 'user@sap.com',
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as AuthToken;

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

describe('CdcAuthService', () => {
  let service: CdcAuthService;
  let store: Store<AuthState>;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(AUTH_FEATURE, (() => ({}))()),
      ],
      providers: [
        CdcAuthService,
        { provide: WindowRef, useValue: mockedWindowRef },
      ],
    });

    service = TestBed.inject(CdcAuthService);
    winRef = TestBed.inject(WindowRef);
    store = TestBed.inject(Store);
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
    spyOn(store, 'dispatch').and.stub();
    const testToken = { ...mockToken, userId: OCC_USER_ID_CURRENT };
    spyOn(service, 'getUserToken').and.returnValue(of(testToken));
    spyOn(service, 'logoutFromCdc').and.stub();
    service.logout();
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.RevokeUserToken(testToken)
    );
    expect(service.logoutFromCdc).toHaveBeenCalled();
  });

  it('should logout user from CDC', () => {
    const cdcLogout = spyOn(
      winRef.nativeWindow['gigya'].accounts,
      'logout'
    ).and.stub();
    service.logoutFromCdc();

    expect(cdcLogout).toHaveBeenCalled();
  });
});
