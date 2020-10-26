import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Title, User, UserSignUp } from '../../model/misc.model';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserService } from './user.service';

class MockUserIdService implements Partial<UserIdService> {
  invokeWithUserId(cb) {
    cb(OCC_USER_ID_CURRENT);
    return new Subscription();
  }
}

describe('UserService', () => {
  let service: UserService;
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        UserService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(UserService);
  });

  it('should UserService is injected', inject(
    [UserService],
    (userService: UserService) => {
      expect(userService).toBeTruthy();
    }
  ));

  describe('get user details', () => {
    it('should get user details from store', () => {
      store.dispatch(
        new UserActions.LoadUserDetailsSuccess({ uid: 'testUser' } as User)
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
        new UserActions.LoadUserDetails(OCC_USER_ID_CURRENT)
      );
    });

    it('should load user details', () => {
      service.load();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.LoadUserDetails(OCC_USER_ID_CURRENT)
      );
    });

    it('should not load anonymous user details', () => {
      const userIdService = TestBed.inject(UserIdService);
      spyOn(userIdService, 'invokeWithUserId').and.callFake((cb) =>
        cb(OCC_USER_ID_ANONYMOUS)
      );
      service.load();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('register user', () => {
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
        new UserActions.RegisterUser(userRegisterFormData)
      );
    });

    it('should be able to register guest', () => {
      service.registerGuest('guid', 'password');
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.RegisterGuest({ guid: 'guid', password: 'password' })
      );
    });
  });

  describe('Remove User Account', () => {
    it('should be able to remove user account', () => {
      service.remove();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.RemoveUser(OCC_USER_ID_CURRENT)
      );
    });

    it('should getRemoveUserResultLoading() return loading flag', () => {
      store.dispatch(new UserActions.RemoveUser('testUserId'));

      let result = false;
      service
        .getRemoveUserResultLoading()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getRemoveUserResultError() return the error flag', () => {
      store.dispatch(new UserActions.RemoveUserFail('error'));

      let result = false;
      service
        .getRemoveUserResultError()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getRemoveUserResultSuccess() return the success flag', () => {
      store.dispatch(new UserActions.RemoveUserSuccess());

      let result = false;
      service
        .getRemoveUserResultSuccess()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should resetUpdatePasswordProcessState() dispatch an UpdatePasswordReset action', () => {
      service.resetUpdatePasswordProcessState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.UpdatePasswordReset()
      );
    });
  });

  it('should be able to get titles data', () => {
    store.dispatch(
      new UserActions.LoadTitlesSuccess([
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

  it('should be able to load titles', () => {
    service.loadTitles();
    expect(store.dispatch).toHaveBeenCalledWith(new UserActions.LoadTitles());
  });

  describe('update personal details', () => {
    const username = 'xxx';
    const userDetails: User = {
      uid: username,
    };

    it('should dispatch UpdateUserDetails action', () => {
      service.updatePersonalDetails(userDetails);
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.UpdateUserDetails({
          username: OCC_USER_ID_CURRENT,
          userDetails,
        })
      );
    });

    it('should return the loading flag', () => {
      store.dispatch(new UserActions.UpdateUserDetailsSuccess(userDetails));

      let result: boolean;
      service
        .getUpdatePersonalDetailsResultLoading()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should return the error flag', () => {
      store.dispatch(new UserActions.UpdateUserDetailsFail('error'));

      let result: boolean;
      service
        .getUpdatePersonalDetailsResultError()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the success flag', () => {
      store.dispatch(new UserActions.UpdateUserDetailsSuccess(userDetails));

      let result: boolean;
      service
        .getUpdatePersonalDetailsResultSuccess()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should dispatch a reset action', () => {
      service.resetUpdatePersonalDetailsProcessingState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.ResetUpdateUserDetails()
      );
    });
  });

  it('should be able to reset password', () => {
    service.resetPassword('test token', 'test password');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ResetPassword({
        token: 'test token',
        password: 'test password',
      })
    );
  });

  it('should be able to request a forgot password email', () => {
    service.requestForgotPasswordEmail('test@test.com');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ForgotPasswordEmailRequest('test@test.com')
    );
  });

  it('should be able to return whether user password is succesfully reset', () => {
    store.dispatch(new UserActions.ResetPasswordSuccess());

    let isResst: boolean;
    service
      .isPasswordReset()
      .subscribe((data) => {
        isResst = data;
      })
      .unsubscribe();
    expect(isResst).toBeTruthy();
  });

  describe('Update Email ', () => {
    const password = 'Qwe123!';
    const newUid = 'tester@sap.com';

    it('should dispatch UpdateEmail action', () => {
      service.updateEmail(password, newUid);
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.UpdateEmailAction({
          uid: OCC_USER_ID_CURRENT,
          password,
          newUid,
        })
      );
    });

    it('should return the success flag', () => {
      store.dispatch(new UserActions.UpdateEmailSuccessAction(newUid));

      let result: boolean;
      service
        .getUpdateEmailResultSuccess()
        .subscribe((success) => (result = success))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the error flag', () => {
      store.dispatch(new UserActions.UpdateEmailErrorAction('error'));

      let result: boolean;
      service
        .getUpdateEmailResultError()
        .subscribe((error) => (result = error))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the loading flag', () => {
      store.dispatch(new UserActions.UpdateEmailSuccessAction(newUid));

      let result: boolean;
      service
        .getUpdateEmailResultLoading()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should dispatch a ResetUpdateEmail action', () => {
      service.resetUpdateEmailResultState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.ResetUpdateEmailAction()
      );
    });
  });

  describe('update password', () => {
    const userId = 'email@test.com';
    const oldPassword = 'oldPass123';
    const newPassword = 'newPass456';

    it('should updatePassword() dispatch UpdatePassword action', () => {
      service.updatePassword(oldPassword, newPassword);

      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.UpdatePassword({
          userId: OCC_USER_ID_CURRENT,
          oldPassword,
          newPassword,
        })
      );
    });

    it('should getUpdatePasswordResultLoading() return loading flag', () => {
      store.dispatch(
        new UserActions.UpdatePassword({ userId, oldPassword, newPassword })
      );

      let result = false;
      service
        .getUpdatePasswordResultLoading()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getUpdatePasswordResultError() return the error flag', () => {
      store.dispatch(new UserActions.UpdatePasswordFail('error'));

      let result = false;
      service
        .getUpdatePasswordResultError()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getUpdatePasswordResultSuccess() return the success flag', () => {
      store.dispatch(new UserActions.UpdatePasswordSuccess());

      let result = false;
      service
        .getUpdatePasswordResultSuccess()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should resetUpdatePasswordProcessState() dispatch an UpdatePasswordReset action', () => {
      service.resetUpdatePasswordProcessState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.UpdatePasswordReset()
      );
    });
  });
});
