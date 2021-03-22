import { inject, TestBed } from '@angular/core/testing';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { UserEmailService } from './user-email.service';
import { UserProfileService } from './user-profile.service';
import { UserProfileConnector } from '@spartacus/user/profile/core';
import createSpy = jasmine.createSpy;

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
}

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  updateEmail = createSpy().and.callFake(
    (_userId, _currentPassword, _newUserId) => of(undefined)
  );
}

describe('UserEmailService', () => {
  let userEmailService: UserEmailService;
  let connector: UserProfileConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UserEmailService,
        { provide: UserProfileConnector, useClass: MockUserProfileConnector },
        { provide: UserProfileService, useClass: MockUserProfileService },
      ],
    });

    userEmailService = TestBed.inject(UserEmailService);
    connector = TestBed.inject(UserProfileConnector);
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

    it('should call connector to update email', () => {
      userEmailService.update(password, newUid);
      expect(connector.updateEmail).toHaveBeenCalledWith(
        OCC_USER_ID_CURRENT,
        password,
        newUid
      );
    });
  });
});
