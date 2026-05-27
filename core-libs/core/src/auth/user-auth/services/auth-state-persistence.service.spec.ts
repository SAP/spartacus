import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { StatePersistenceService } from '../../../state/services/state-persistence.service';
import { CLIENT_AUTH_FEATURE } from '../../client-auth/store';
import * as fromAuthReducers from '../../client-auth/store/reducers/index';
import { UserIdService } from '../facade/user-id.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';
import { AuthStatePersistenceService } from './auth-state-persistence.service';
import { AuthStorageService } from './auth-storage.service';

class MockUserIdService implements Partial<UserIdService> {
  setUserId(_id: string) {}
  getUserId() {
    return of('userId');
  }
  clearUserId() {}
}

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken() {
    return of({} as AuthToken);
  }
  setToken() {}
}

class MockAuthRedirectStorageService
  implements Partial<AuthRedirectStorageService>
{
  getRedirectUrl() {
    return of(undefined);
  }
  setRedirectUrl() {}
}

describe('AuthStatePersistenceService', () => {
  let service: AuthStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let userIdService: UserIdService;
  let authStorageService: AuthStorageService;
  let authRedirectStorageService: AuthRedirectStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CLIENT_AUTH_FEATURE,
          fromAuthReducers.getReducers()
        ),
      ],
      providers: [
        AuthStatePersistenceService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: AuthStorageService, useClass: MockAuthStorageService },
        {
          provide: AuthRedirectStorageService,
          useClass: MockAuthRedirectStorageService,
        },
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(AuthStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    userIdService = TestBed.inject(UserIdService);
    authStorageService = TestBed.inject(AuthStorageService);
    authRedirectStorageService = TestBed.inject(AuthRedirectStorageService);
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('state should be updated after read from storage', () => {
    spyOn(userIdService, 'setUserId').and.stub();
    spyOn(authStorageService, 'setToken').and.callThrough();
    spyOn(authRedirectStorageService, 'setRedirectUrl').and.callThrough();

    service['onRead']({
      userId: 'userId',
      token: {
        access_token: 'access_token',
        expires_at: '1000',
        access_token_stored_at: '900',
        granted_scopes: [],
        token_type: 'bearer',
        refresh_token: 'refresh',
      },
      redirectUrl: 'some_url',
    });

    expect(authStorageService.setToken).toHaveBeenCalledWith({
      refresh_token: 'refresh',
      access_token: 'access_token',
      expires_at: '1000',
      access_token_stored_at: '900',
      granted_scopes: [],
      token_type: 'bearer',
    });
    expect(userIdService.setUserId).toHaveBeenCalledWith('userId');
    expect(authRedirectStorageService.setRedirectUrl).toHaveBeenCalledWith(
      'some_url'
    );
  });

  it('user id should be initialized even when read from storage was empty', () => {
    spyOn(userIdService, 'clearUserId').and.stub();

    service['onRead']({});

    expect(userIdService.clearUserId).toHaveBeenCalled();
  });

  it('should call persistenceService with correct attributes', () => {
    const state$ = of('');
    spyOn(service as any, 'getAuthState').and.returnValue(state$);

    service.initSync();

    expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
      jasmine.objectContaining({
        key: 'auth',
        state$,
      })
    );
    expect(service['getAuthState']).toHaveBeenCalled();
  });

  it('should return state from auth state and userId service', (done) => {
    spyOn(authStorageService, 'getToken').and.returnValue(
      of({ access_token: 'token', refresh_token: 'refresh_token' } as AuthToken)
    );
    spyOn(authRedirectStorageService, 'getRedirectUrl').and.returnValue(
      of('redirect_url')
    );

    service['getAuthState']()
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toEqual({
          userId: 'userId',
          token: { access_token: 'token' },
          redirectUrl: 'redirect_url',
        } as any);
        done();
      });
  });

  it('isUserLoggedIn should check state of user login in localStorage', () => {
    spyOn(persistenceService, 'readStateFromStorage').and.returnValue({
      token: { access_token: 'token' },
      userId: 'userId',
      redirectUrl: 'redirect_url',
    });

    expect(service.isUserLoggedIn()).toBeTrue();

    expect(persistenceService.readStateFromStorage).toHaveBeenCalledWith(
      jasmine.objectContaining({
        key: 'auth',
      })
    );
  });
});
