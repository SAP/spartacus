import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { UserIdService } from './user-id.service';
const createSpy = jasmine.createSpy;

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

    it('should return value that was set with setUserId', (done) => {
      service.setUserId('testId');
      service
        .getUserId()
        .pipe(take(1))
        .subscribe((userId) => {
          expect(userId).toBe('testId');
          done();
        });
    });
  });

  describe('clearUserId', () => {
    it('should set the value for the default', (done) => {
      const ids = [];
      service.setUserId('testId');

      service
        .getUserId()
        .pipe(take(2))
        .subscribe((userId) => {
          ids.push(userId);
          if (ids.length > 1) {
            expect(ids).toEqual(['testId', 'anonymous']);
            done();
          }
        });
      service.clearUserId();
    });
  });

  describe('invokeWithUserId', () => {
    it('should invoke callback with last user id', () => {
      service.setUserId('testId');

      const cb = createSpy();

      service.invokeWithUserId(cb);

      expect(cb).toHaveBeenCalledWith('testId');
    });
  });

  describe('isEmulated', () => {
    it('should return false for anonymous userId', (done) => {
      service.clearUserId();
      service
        .isEmulated()
        .pipe(take(1))
        .subscribe((userId) => {
          expect(userId).toBe(false);
          done();
        });
    });

    it('should return false for current userId', (done) => {
      service.setUserId('current');
      service
        .isEmulated()
        .pipe(take(1))
        .subscribe((userId) => {
          expect(userId).toBe(false);
          done();
        });
    });

    it('should return true for any other userId', (done) => {
      service.setUserId('someId');
      service
        .isEmulated()
        .pipe(take(1))
        .subscribe((userId) => {
          expect(userId).toBe(true);
          done();
        });
    });
  });
});
