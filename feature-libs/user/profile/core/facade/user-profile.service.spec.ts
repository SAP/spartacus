import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT, ProcessModule } from '@spartacus/core';
import { User, UserAccountService } from '@spartacus/user/account/core';
import { Observable, of } from 'rxjs';
import { Title } from '../model/user-profile.model';
import { UserProfileActions } from '../store/actions';
import * as fromStoreReducers from '../store/reducers/index';
import {
  StateWithUserProfile,
  USER_PROFILE_FEATURE,
} from '../store/user-profile.state';
import { UserPasswordService } from './user-password.service';
import { UserProfileService } from './user-profile.service';

class MockUserAccountService implements Partial<UserAccountService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
}

describe('UserProfileService', () => {
  let service: UserProfileService;
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
        UserProfileService,
        { provide: UserAccountService, useClass: MockUserAccountService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(UserProfileService);
  });

  it('should inject UserProfileService', inject(
    [UserProfileService],
    (userPasswordService: UserPasswordService) => {
      expect(userPasswordService).toBeTruthy();
    }
  ));

  it('should update user profile', () => {
    const userDetails: User = {
      uid: 'xxx',
    };
    service.update(userDetails);
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserProfileActions.UpdateUserProfile({
        uid: OCC_USER_ID_CURRENT,
        details: userDetails,
      })
    );
  });

  it('should be able to get titles data', () => {
    store.dispatch(
      new UserProfileActions.LoadTitlesSuccess([
        { code: 't1', name: 't1' },
        { code: 't2', name: 't2' },
      ])
    );
    let titles: Title[];
    service
      .getTitles()
      .subscribe((data) => {
        titles = data;
      })
      .unsubscribe();
    expect(titles).toEqual([
      { code: 't1', name: 't1' },
      { code: 't2', name: 't2' },
    ]);
  });
});
