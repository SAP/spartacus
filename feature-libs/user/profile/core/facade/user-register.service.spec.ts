import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT, ProcessModule } from '@spartacus/core';
import { User } from '@spartacus/user/account/core';
import { Observable, of } from 'rxjs';
import { Title, UserSignUp } from '../model/user-profile.model';
import { UserProfileActions } from '../store/actions';
import * as fromStoreReducers from '../store/reducers/index';
import {
  StateWithUserProfile,
  USER_PROFILE_FEATURE,
} from '../store/user-profile.state';
import { UserPasswordService } from './user-password.service';
import { UserProfileService } from './user-profile.service';
import { UserRegisterService } from './user-register.service';

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
  getTitles(): Observable<Title[]> {
    return of([]);
  }
}

describe('UserRegisterService', () => {
  let service: UserRegisterService;
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
        UserRegisterService,
        { provide: UserProfileService, useClass: MockUserProfileService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(UserRegisterService);
  });

  it('should inject UserRegisterService', inject(
    [UserRegisterService],
    (userPasswordService: UserPasswordService) => {
      expect(userPasswordService).toBeTruthy();
    }
  ));

  it('should be able to register user', () => {
    const userRegisterFormData: UserSignUp = {
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password',
    };
    service.register(userRegisterFormData);
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserProfileActions.RegisterUser(userRegisterFormData)
    );
  });

  it('should be able to register guest', () => {
    service.registerGuest('guid', 'password');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserProfileActions.RegisterGuest({
        guid: 'guid',
        password: 'password',
      })
    );
  });

  it('should get titles from profileService', () => {
    const userProfileService = TestBed.inject(UserProfileService);
    spyOn(userProfileService, 'getTitles').and.callThrough();
    service.getTitles().subscribe().unsubscribe();
    expect(userProfileService.getTitles).toHaveBeenCalled();
  });
});
