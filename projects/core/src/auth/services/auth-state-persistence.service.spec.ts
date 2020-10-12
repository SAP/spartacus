import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { UserIdService } from '../facade/user-id.service';
import { AuthActions, AUTH_FEATURE, StateWithAuth } from '../store';
import * as fromAuthReducers from '../store/reducers/index';
import { AuthStatePersistenceService } from './auth-state-persistence.service';

class MockUserIdService {
  clearUserId(): void {}
  setUserId(_id: string) {}
  getUserId() {
    return of('userId');
  }
}

describe('AuthStatePersistenceService', () => {
  let service: AuthStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let store: Store<StateWithAuth>;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(AUTH_FEATURE, fromAuthReducers.getReducers()),
      ],
      providers: [
        AuthStatePersistenceService,
        { provide: UserIdService, useClass: MockUserIdService },
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(AuthStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    userIdService = TestBed.inject(UserIdService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.stub();
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('state should be cleared on empty state', () => {
    spyOn(userIdService, 'clearUserId').and.stub();

    service['onRead'](null);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.ClearUserToken()
    );
    expect(userIdService.clearUserId).toHaveBeenCalled();
  });

  it('state should be updated after read from storage', () => {
    spyOn(userIdService, 'clearUserId').and.stub();
    spyOn(userIdService, 'setUserId').and.stub();

    service['onRead']({
      userId: 'userId',
      access_token: 'access_token',
      expires_in: 10,
      expiration_time: 'expiration_time',
      scope: ['scope'],
      token_type: 'bearer',
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.ClearUserToken()
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new AuthActions.LoadUserTokenSuccess({
        refresh_token: '',
        access_token: 'access_token',
        expires_in: 10,
        expiration_time: 'expiration_time',
        scope: ['scope'],
        token_type: 'bearer',
      })
    );
    expect(userIdService.clearUserId).toHaveBeenCalled();
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
    service['getAuthState']()
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toEqual({
          userId: 'userId',
          // TODO: There should also be token state, but it is empty at the moment
        } as any);
      });
  });
});
