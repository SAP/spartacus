import { TestBed } from '@angular/core/testing';
import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { of } from 'rxjs';
import { UserAccountService } from './user-account.service';
import { UserAccountConnector } from '@spartacus/user/account/core';
import createSpy = jasmine.createSpy;

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(OCC_USER_ID_CURRENT));
}

class MockUserAccountConnector implements Partial<UserAccountConnector> {
  get = createSpy().and.callFake((uid: string) =>
    of({
      uid,
    })
  );
}

describe('UserAccountService', () => {
  let service: UserAccountService;
  let connector: UserAccountConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: UserAccountConnector, useClass: MockUserAccountConnector },
        UserAccountService,
      ],
    });

    service = TestBed.inject(UserAccountService);
    connector = TestBed.inject(UserAccountConnector);
  });

  it('should inject UserAccountService', () => {
    expect(service).toBeTruthy();
  });

  describe('get user details', () => {
    it('should get user details from query', () => {
      let userDetails: User;
      service
        .get()
        .subscribe((data) => {
          userDetails = data;
        })
        .unsubscribe();
      expect(userDetails).toEqual({ uid: 'current' });
    });

    it('should call connector when data is not present in the store', () => {
      service.get().subscribe().unsubscribe();
      expect(connector.get).toHaveBeenCalledWith('current');
    });

    it('should load user details', () => {
      service.get().subscribe();
      const userIdService = TestBed.inject(UserIdService);
      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(connector.get).toHaveBeenCalledWith('current');
    });
  });
});
