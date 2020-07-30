import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { StatePersistenceService } from '../../../state/services/state-persistence.service';
import { CLIENT_AUTH_FEATURE } from '../../client-auth/store';
import * as fromAuthReducers from '../../client-auth/store/reducers/index';
import { AuthStorageService } from '../facade/auth-storage.service';
import { UserIdService } from '../facade/user-id.service';
import { UserToken } from '../models/user-token.model';
import { AuthStatePersistenceService } from './auth-state-persistence.service';

class MockUserIdService {
  setUserId(_id: string) {}
  getUserId() {
    return of('userId');
  }
}

class MockAuthStorageService {
  getUserToken() {
    return of({});
  }
  setUserToken() {}
}

describe('AuthStatePersistenceService', () => {
  let service: AuthStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let userIdService: UserIdService;
  let authStorageService: AuthStorageService;

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
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(AuthStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    userIdService = TestBed.inject(UserIdService);
    authStorageService = TestBed.inject(AuthStorageService);
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('state should be updated after read from storage', () => {
    spyOn(userIdService, 'setUserId').and.stub();
    spyOn(authStorageService, 'setUserToken').and.callThrough();

    service['onRead']({
      userId: 'userId',
      access_token: 'access_token',
      expires_at: '1000',
      access_token_stored_at: '900',
      granted_scopes: [],
      token_type: 'bearer',
      refresh_token: 'refresh',
    });

    expect(authStorageService.setUserToken).toHaveBeenCalledWith({
      refresh_token: 'refresh',
      access_token: 'access_token',
      expires_at: '1000',
      access_token_stored_at: '900',
      granted_scopes: [],
      token_type: 'bearer',
    });
    expect(userIdService.setUserId).toHaveBeenCalledWith('userId');
  });

  it('should call persistenceService with correct attributes', () => {
    const state$ = of('');
    spyOn(service as any, 'getAuthState').and.returnValue(state$);

    service.sync();

    expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
      jasmine.objectContaining({
        key: 'auth',
        state$,
      })
    );
    expect(service['getAuthState']).toHaveBeenCalled();
  });

  it('should return state from auth state and userId service', () => {
    spyOn(authStorageService, 'getUserToken').and.returnValue(
      of({ access_token: 'token', refresh_token: 'refresh_token' } as UserToken)
    );

    service['getAuthState']()
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toEqual({
          userId: 'userId',
          access_token: 'token',
          refresh_token: 'refresh_token',
        } as any);
      });
  });
});
