import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  ProcessModule,
  StateUtils,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/core';
import { Observable, of } from 'rxjs';
import { UserProfileActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import {
  StateWithUserProfile,
  USER_PROFILE_FEATURE,
} from '../store/user-profile.state';
import { UserEmailService } from './user-email.service';
import { UserProfileService } from './user-profile.service';

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
}

describe('UserEmailService', () => {
  let userEmailService: UserEmailService;
  let store: Store<StateWithUserProfile>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        ProcessModule,
        StoreModule.forFeature(
          USER_PROFILE_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [
        UserEmailService,
        { provide: UserProfileService, useClass: MockUserProfileService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    userEmailService = TestBed.inject(UserEmailService);
  });

  it('should inject UserEmailService', inject(
    [UserEmailService],
    (service: UserEmailService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('update()', () => {
    const password = 'Qwe123!';
    const newUid = 'tester@sap.com';

    it('should dispatch UpdateEmail action', () => {
      userEmailService.update(password, newUid);
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserProfileActions.UpdateEmailAction({
          uid: OCC_USER_ID_CURRENT,
          password,
          newUid,
        })
      );
    });

    it('should return loading process state', () => {
      let result: StateUtils.LoaderState<User>;
      userEmailService
        .update(password, newUid)
        .subscribe((state) => {
          result = state;
        })
        .unsubscribe();
      expect(result.loading).toBeTruthy();
    });
  });
});
