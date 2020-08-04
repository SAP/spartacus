import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthActions,
  AuthState,
  AUTH_FEATURE,
  OCC_USER_ID_CURRENT,
  UserToken,
  WindowRef,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CDCAuthActions } from '../store';
import { CDCAuthService } from './cdc-auth.service';

const mockToken = {
  userId: 'user@sap.com',
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as UserToken;

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

describe('CDCAuthService', () => {
  let service: CDCAuthService;
  let store: Store<AuthState>;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(AUTH_FEATURE, (() => ({}))()),
      ],
      providers: [
        CDCAuthService,
        { provide: WindowRef, useValue: mockedWindowRef },
      ],
    });

    service = TestBed.inject(CDCAuthService);
    winRef = TestBed.inject(WindowRef);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch proper action for authorize', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorizeWithCustomCDCFlow(
      'UID',
      'UIDSignature',
      'signatureTimestamp',
      'idToken',
      'baseSite'
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new CDCAuthActions.LoadCDCUserToken({
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
    spyOn(service, 'logoutFromCDC').and.stub();
    service.logout();
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.RevokeUserToken(testToken)
    );
    expect(service.logoutFromCDC).toHaveBeenCalled();
  });

  it('should logout user from CDC', () => {
    const cdcLogout = spyOn(
      winRef.nativeWindow['gigya'].accounts,
      'logout'
    ).and.stub();
    service.logoutFromCDC();

    expect(cdcLogout).toHaveBeenCalled();
  });
});
