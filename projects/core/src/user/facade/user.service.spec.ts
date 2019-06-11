import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Title, User, UserSignUp } from '../../model/misc.model';
import { USERID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import * as fromStore from '../store/index';
import { USER_FEATURE } from '../store/user-state';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let store: Store<fromStore.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStore.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [UserService],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(UserService);
  });

  it('should UserService is injected', inject(
    [UserService],
    (userService: UserService) => {
      expect(userService).toBeTruthy();
    }
  ));

  it('get() should be able to get user details when they are present in the store', () => {
    store.dispatch(
      new fromStore.LoadUserDetailsSuccess({ uid: 'testUser' } as User)
    );

    let userDetails: User;
    service
      .get()
      .subscribe(data => {
        userDetails = data;
      })
      .unsubscribe();
    expect(userDetails).toEqual({ uid: 'testUser' });
  });

  it('get() should trigger load user details when they are not present in the store', () => {
    let userDetails: User;
    service
      .get()
      .subscribe(data => {
        userDetails = data;
      })
      .unsubscribe();
    expect(userDetails).toEqual({});
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserDetails(USERID_CURRENT)
    );
  });

  it('should be able to load user details', () => {
    service.load();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserDetails(USERID_CURRENT)
    );
  });

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
      new fromStore.RegisterUser(userRegisterFormData)
    );
  });

  describe('Remove User Account', () => {
    it('should be able to remove user account', () => {
      service.remove();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.RemoveUser(USERID_CURRENT)
      );
    });

    it('should getRemoveUserResultLoading() return loading flag', () => {
      store.dispatch(new fromStore.RemoveUser('testUserId'));

      let result = false;
      service
        .getRemoveUserResultLoading()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getRemoveUserResultError() return the error flag', () => {
      store.dispatch(new fromStore.RemoveUserFail('error'));

      let result = false;
      service
        .getRemoveUserResultError()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getRemoveUserResultSuccess() return the success flag', () => {
      store.dispatch(new fromStore.RemoveUserSuccess());

      let result = false;
      service
        .getRemoveUserResultSuccess()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should resetUpdatePasswordProcessState() dispatch an UpdatePasswordReset action', () => {
      service.resetUpdatePasswordProcessState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.UpdatePasswordReset()
      );
    });
  });

  it('should be able to get titles data', () => {
    store.dispatch(
      new fromStore.LoadTitlesSuccess([
        { code: 't1', name: 't1' },
        { code: 't2', name: 't2' },
      ])
    );
    let titles: Title[];
    service
      .getTitles()
      .subscribe(data => {
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
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadTitles());
  });

  describe('update personal details', () => {
    const username = 'xxx';
    const userDetails: User = {
      uid: username,
    };

    it('should dispatch UpdateUserDetails action', () => {
      service.updatePersonalDetails(userDetails);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.UpdateUserDetails({
          username: USERID_CURRENT,
          userDetails,
        })
      );
    });

    it('should return the loading flag', () => {
      store.dispatch(new fromStore.UpdateUserDetailsSuccess(userDetails));

      let result: boolean;
      service
        .getUpdatePersonalDetailsResultLoading()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should return the error flag', () => {
      store.dispatch(new fromStore.UpdateUserDetailsFail('error'));

      let result: boolean;
      service
        .getUpdatePersonalDetailsResultError()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the success flag', () => {
      store.dispatch(new fromStore.UpdateUserDetailsSuccess(userDetails));

      let result: boolean;
      service
        .getUpdatePersonalDetailsResultSuccess()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should dispatch a reset action', () => {
      service.resetUpdatePersonalDetailsProcessingState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.ResetUpdateUserDetails()
      );
    });
  });

  it('should be able to reset password', () => {
    service.resetPassword('test token', 'test password');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ResetPassword({
        token: 'test token',
        password: 'test password',
      })
    );
  });

  it('should be able to request a forgot password email', () => {
    service.requestForgotPasswordEmail('test@test.com');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ForgotPasswordEmailRequest('test@test.com')
    );
  });

  it('should be able to return whether user password is succesfully reset', () => {
    store.dispatch(new fromStore.ResetPasswordSuccess());

    let isResst: boolean;
    service
      .isPasswordReset()
      .subscribe(data => {
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
        new fromStore.UpdateEmailAction({
          uid: USERID_CURRENT,
          password,
          newUid,
        })
      );
    });

    it('should return the success flag', () => {
      store.dispatch(new fromStore.UpdateEmailSuccessAction(newUid));

      let result: boolean;
      service
        .getUpdateEmailResultSuccess()
        .subscribe(success => (result = success))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the error flag', () => {
      store.dispatch(new fromStore.UpdateEmailErrorAction('error'));

      let result: boolean;
      service
        .getUpdateEmailResultError()
        .subscribe(error => (result = error))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the loading flag', () => {
      store.dispatch(new fromStore.UpdateEmailSuccessAction(newUid));

      let result: boolean;
      service
        .getUpdateEmailResultLoading()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should dispatch a ResetUpdateEmail action', () => {
      service.resetUpdateEmailResultState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.ResetUpdateEmailAction()
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
        new fromStore.UpdatePassword({
          userId: USERID_CURRENT,
          oldPassword,
          newPassword,
        })
      );
    });

    it('should getUpdatePasswordResultLoading() return loading flag', () => {
      store.dispatch(
        new fromStore.UpdatePassword({ userId, oldPassword, newPassword })
      );

      let result = false;
      service
        .getUpdatePasswordResultLoading()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getUpdatePasswordResultError() return the error flag', () => {
      store.dispatch(new fromStore.UpdatePasswordFail('error'));

      let result = false;
      service
        .getUpdatePasswordResultError()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should getUpdatePasswordResultSuccess() return the success flag', () => {
      store.dispatch(new fromStore.UpdatePasswordSuccess());

      let result = false;
      service
        .getUpdatePasswordResultSuccess()
        .subscribe(loading => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should resetUpdatePasswordProcessState() dispatch an UpdatePasswordReset action', () => {
      service.resetUpdatePasswordProcessState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.UpdatePasswordReset()
      );
    });
  });
});
