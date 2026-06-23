import { TestBed } from '@angular/core/testing';
import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { UserIdService } from './user-id.service';

describe('UserIdService', () => {
  let service: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIdService],
    });
    service = TestBed.inject(UserIdService);
  });

  describe('getUserId', () => {
    it('should not emit anything until it will be initialized from outside', () => {
      let result;
      service
        .getUserId()
        .subscribe((userId) => {
          result = userId;
        })
        .unsubscribe();
      expect(result).toBeUndefined();
    });

    it('should return value that was set with setUserId', async () => {
      service.setUserId('testId');
      const userId = await firstValueFrom(service.getUserId());
      expect(userId).toBe('testId');
    });
  });

  describe('clearUserId', () => {
    it('should set the value for the default', async () => {
      service.setUserId('testId');
      const ids$ = service.getUserId().pipe(take(2), toArray());
      const idsPromise = firstValueFrom(ids$);
      service.clearUserId();
      const ids = await idsPromise;
      expect(ids).toEqual(['testId', 'anonymous']);
    });
  });

  describe('isEmulated', () => {
    it('should return false for anonymous userId', async () => {
      service.clearUserId();
      const result = await firstValueFrom(service.isEmulated());
      expect(result).toBe(false);
    });

    it('should return false for current userId', async () => {
      service.setUserId('current');
      const result = await firstValueFrom(service.isEmulated());
      expect(result).toBe(false);
    });

    it('should return true for any other userId', async () => {
      service.setUserId('someId');
      const result = await firstValueFrom(service.isEmulated());
      expect(result).toBe(true);
    });
  });

  describe('takeUserId', () => {
    it('should emit last value and completes', async () => {
      service.clearUserId();
      const id = await firstValueFrom(service.takeUserId());
      expect(id).toEqual(OCC_USER_ID_ANONYMOUS);
    });

    it('should throw error when anonymous value in loggedIn mode', async () => {
      service.clearUserId();
      await expect(firstValueFrom(service.takeUserId(true))).rejects.toThrow(
        'Requested user id for logged user while user is not logged in.'
      );
    });

    it('should emit logged in value and completes', async () => {
      service.setUserId('someId');
      const id = await firstValueFrom(service.takeUserId(true));
      expect(id).toEqual('someId');
    });
  });
});
