import { inject, TestBed } from '@angular/core/testing';
import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UserPasswordService } from './user-password.service';
import { UserProfileConnector } from '@spartacus/user/profile/core';
import createSpy = jasmine.createSpy;

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  updatePassword = createSpy().and.returnValue(of(undefined));
  requestForgotPasswordEmail = createSpy().and.returnValue(of(undefined));
  resetPassword = createSpy().and.returnValue(of(undefined));
}

describe('UserPasswordService', () => {
  let service: UserPasswordService;
  let connector: UserProfileConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserPasswordService,
        {
          provide: UserProfileConnector,
          useClass: MockUserProfileConnector,
        },
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    service = TestBed.inject(UserPasswordService);
    connector = TestBed.inject(UserProfileConnector);
  });

  it('should inject UserPasswordService', inject(
    [UserPasswordService],
    (userPasswordService: UserPasswordService) => {
      expect(userPasswordService).toBeTruthy();
    }
  ));

  describe('update()', () => {
    const oldPassword = 'oldPass123';
    const newPassword = 'newPass456';

    it('should call connector update()', () => {
      service.update(oldPassword, newPassword);
      expect(connector.updatePassword).toHaveBeenCalledWith(
        OCC_USER_ID_CURRENT,
        oldPassword,
        newPassword
      );
    });
  });

  describe('reset password', () => {
    it('should be able to reset password', () => {
      service.reset('test token', 'test password');
      expect(connector.resetPassword).toHaveBeenCalledWith(
        'test token',
        'test password'
      );
    });
  });

  describe('request password email', () => {
    it('should be able to request a forgot password email', () => {
      service.requestForgotPasswordEmail('test@test.com');
      expect(connector.requestForgotPasswordEmail).toHaveBeenCalledWith(
        'test@test.com'
      );
    });
  });
});
