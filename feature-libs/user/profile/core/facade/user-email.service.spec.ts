import { inject, TestBed } from '@angular/core/testing';
import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UserEmailService } from './user-email.service';
import { UserProfileConnector } from '@spartacus/user/profile/core';
import createSpy = jasmine.createSpy;

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
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
        { provide: UserIdService, useClass: MockUserIdService },
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
