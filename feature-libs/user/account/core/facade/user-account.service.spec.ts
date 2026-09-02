import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { firstValueFrom, of } from 'rxjs';
import { UserAccountService } from './user-account.service';
import { UserAccountConnector } from '@spartacus/user/account/core';

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of(OCC_USER_ID_CURRENT));
}

class MockUserAccountConnector implements Partial<UserAccountConnector> {
  get = vi.fn().mockImplementation((uid: string) =>
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
    it('should get user details from query', async () => {
      const userDetails: User | undefined = await firstValueFrom(service.get());
      expect(userDetails).toEqual({ uid: 'current' });
    });

    it('should call connector when data is not present in the store', async () => {
      await firstValueFrom(service.get());
      expect(connector.get).toHaveBeenCalledWith('current');
    });

    it('should load user details', async () => {
      await firstValueFrom(service.get());
      const userIdService = TestBed.inject(UserIdService);
      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(connector.get).toHaveBeenCalledWith('current');
    });
  });
});
