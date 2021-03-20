import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT, ProcessModule } from '@spartacus/core';
import { User } from '@spartacus/user/account/core';
import { Observable, of } from 'rxjs';
import { UserProfileActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import {
  StateWithUserProfile,
  USER_PROFILE_FEATURE,
} from '../store/user-profile.state';
import { UserPasswordService } from './user-password.service';
import { UserProfileService } from './user-profile.service';

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
}

describe('UserPasswordService', () => {
  let service: UserPasswordService;
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
        UserPasswordService,
        { provide: UserProfileService, useClass: MockUserProfileService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(UserPasswordService);
  });

  it('should inject UserPasswordService', inject(
    [UserPasswordService],
    (userPasswordService: UserPasswordService) => {
      expect(userPasswordService).toBeTruthy();
    }
  ));

  describe('update()', () => {
    const userId = OCC_USER_ID_CURRENT;
    const oldPassword = 'oldPass123';
    const newPassword = 'newPass456';

    it('should dispatch UpdatePassword action on update()', () => {
      service.update(oldPassword, newPassword);

      expect(store.dispatch).toHaveBeenCalledWith(
        new UserProfileActions.UpdatePassword({
          uid: userId,
          oldPassword,
          newPassword,
        })
      );
    });
  });

  describe('reset password', () => {
    it('should be able to reset password', () => {
      service.reset('test token', 'test password');
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserProfileActions.ResetPassword({
          token: 'test token',
          password: 'test password',
        })
      );
    });

    it('should be able to return whether password is successfully reset', () => {
      store.dispatch(new UserProfileActions.ResetPasswordSuccess());

      let isReset: boolean;
      service
        .isPasswordReset()
        .subscribe((data) => {
          isReset = data;
        })
        .unsubscribe();
      expect(isReset).toBeTruthy();
    });
  });

  describe('request password email', () => {
    it('should be able to request a forgot password email', () => {
      service.requestForgotPasswordEmail('test@test.com');
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserProfileActions.ForgotPasswordEmailRequest('test@test.com')
      );
    });
  });
});
