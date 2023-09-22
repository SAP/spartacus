import {
  ErrorInterceptor,
  ErrorInterceptorPriority,
} from '../error-interceptors/error-interceptor';
import {
  handleInterceptors,
  sortErrorInterceptors,
} from './error-interceptor-utils';

describe('error interceptor utils', () => {
  describe('sortErrorInterceptors', () => {
    const noPriorityInterceptor: ErrorInterceptor = {
      intercept: () => {},
    };
    const anotherNoPriorityInterceptor: ErrorInterceptor = {
      intercept: () => {},
    };
    const highPriorityInterceptor: ErrorInterceptor = {
      priority: ErrorInterceptorPriority.HIGH,
      intercept: () => {},
    };
    const anotherHighPriorityInterceptor: ErrorInterceptor = {
      priority: ErrorInterceptorPriority.HIGH,
      intercept: () => {},
    };

    const lowPriorityInterceptor: ErrorInterceptor = {
      priority: ErrorInterceptorPriority.LOW,
      intercept: () => {},
    };

    const anotherLowPriorityInterceptor: ErrorInterceptor = {
      priority: ErrorInterceptorPriority.LOW,
      intercept: () => {},
    };

    it('should should return the input order if priority does not set', () => {
      const errorInterceptors: ErrorInterceptor[] = [
        noPriorityInterceptor,
        anotherNoPriorityInterceptor,
      ];
      expect(sortErrorInterceptors(errorInterceptors)).toEqual(
        errorInterceptors
      );
    });

    it('should sort error interceptors based on priority', () => {
      const errorInterceptors: ErrorInterceptor[] = [
        noPriorityInterceptor,
        lowPriorityInterceptor,
        highPriorityInterceptor,
      ];
      expect(sortErrorInterceptors(errorInterceptors)).toEqual([
        highPriorityInterceptor,
        noPriorityInterceptor,
        lowPriorityInterceptor,
      ]);
    });

    it('should sort error interceptors based on priority and keep the latest added with the high priority first', () => {
      const errorInterceptors: ErrorInterceptor[] = [
        highPriorityInterceptor,
        noPriorityInterceptor,
        lowPriorityInterceptor,
        anotherHighPriorityInterceptor,
      ];
      expect(sortErrorInterceptors(errorInterceptors)).toEqual([
        anotherHighPriorityInterceptor,
        highPriorityInterceptor,
        noPriorityInterceptor,
        lowPriorityInterceptor,
      ]);
    });

    it('should sort error interceptors based on priority and keep the latest added with the low priority last', () => {
      const errorInterceptors: ErrorInterceptor[] = [
        anotherHighPriorityInterceptor,
        noPriorityInterceptor,
        lowPriorityInterceptor,
        anotherLowPriorityInterceptor,
        highPriorityInterceptor,
      ];
      expect(sortErrorInterceptors(errorInterceptors)).toEqual([
        highPriorityInterceptor,
        anotherHighPriorityInterceptor,
        noPriorityInterceptor,
        lowPriorityInterceptor,
        anotherLowPriorityInterceptor,
      ]);
    });
  });
  describe('handleInterceptors', () => {
    it('should call next interceptor', () => {
      const next = jasmine.createSpy();
      const interceptor: ErrorInterceptor = {
        intercept: jasmine.createSpy(),
      };
      const error = new Error('test');
      handleInterceptors(next, interceptor)(error);
      expect(interceptor.intercept).toHaveBeenCalledWith(error, next);
    });
  });
});
