import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { GigyaAuthService } from './gigya-auth.service';
import { GigyaAuthActions } from '../store';
import {
  AuthState,
  UserToken,
  OCC_USER_ID_CURRENT,
  AuthActions,
} from '@spartacus/core';

const mockToken = {
  userId: 'user@sap.com',
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as UserToken;

describe('GigyaAuthService', () => {
  let service: GigyaAuthService;
  let store: Store<AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [GigyaAuthService],
    });

    service = TestBed.inject(GigyaAuthService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch proper action for authorize', () => {
    spyOn(store, 'dispatch').and.stub();

    service.authorizeWithCustomGigyaFlow(
      'UID',
      'UIDSignature',
      'signatureTimestamp',
      'idToken',
      'baseSite'
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new GigyaAuthActions.LoadGigyaUserToken({
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
    spyOn(service,'logoutFromGigya').and.stub();
    service.logout();
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout());
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.RevokeUserToken(testToken)
    );
    expect(service.logoutFromGigya).toHaveBeenCalled();
  });
});
