import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  ProcessModule,
  UserIdService,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/core';
import { Observable, of } from 'rxjs';
import { UserAccountActions } from '../store';
import * as fromStoreReducers from '../store/reducers/index';
import {
  StateWithUserAccount,
  USER_ACCOUNT_FEATURE,
} from '../store/user-account.state';
import { UserAccountService } from './user-account.service';

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('UserAccountService', () => {
  let service: UserAccountService;
  let store: Store<StateWithUserAccount>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        ProcessModule,
        StoreModule.forFeature(
          USER_ACCOUNT_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [
        UserAccountService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(UserAccountService);
  });

  it('should inject UserAccountService', () => {
    expect(service).toBeTruthy();
  });

  describe('get user details', () => {
    it('should get user details from store', () => {
      store.dispatch(
        new UserAccountActions.LoadUserAccountSuccess({
          uid: 'testUser',
        } as User)
      );

      let userDetails: User;
      service
        .get()
        .subscribe((data) => {
          userDetails = data;
        })
        .unsubscribe();
      expect(userDetails).toEqual({ uid: 'testUser' });
    });

    it('should dispatch LoadUserDetails when they are not present in the store', () => {
      let userDetails: User;
      service
        .get()
        .subscribe((data) => {
          userDetails = data;
        })
        .unsubscribe();
      expect(userDetails).toEqual({});
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserAccountActions.LoadUserAccount(OCC_USER_ID_CURRENT)
      );
    });

    it('should load user details', () => {
      const userIdService = TestBed.inject(UserIdService);
      spyOn(userIdService, 'takeUserId').and.callThrough();
      service.get().subscribe().unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserAccountActions.LoadUserAccount(OCC_USER_ID_CURRENT)
      );
    });
  });
});
