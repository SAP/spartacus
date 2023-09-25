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
    const normalPriorityInterceptor: ErrorInterceptor = {
      intercept: () => {},
    };
    const anotherNormalPriorityInterceptor: ErrorInterceptor = {
      priority: ErrorInterceptorPriority.NORMAL,
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
        normalPriorityInterceptor,
        anotherNormalPriorityInterceptor,
      ];
      expect(sortErrorInterceptors(errorInterceptors)).toEqual(
        errorInterceptors
      );
    });

    it('should sort error interceptors based on priority', () => {
      const errorInterceptors: ErrorInterceptor[] = [
        normalPriorityInterceptor,
        lowPriorityInterceptor,
        highPriorityInterceptor,
      ];
      expect(sortErrorInterceptors(errorInterceptors)).toEqual([
        highPriorityInterceptor,
        normalPriorityInterceptor,
        lowPriorityInterceptor,
      ]);
    });

    it('should sort error interceptors based on priority and take into account the order of delivery within the priority group', () => {
      const errorInterceptors: ErrorInterceptor[] = [
        highPriorityInterceptor,
        normalPriorityInterceptor,
        lowPriorityInterceptor,
        anotherHighPriorityInterceptor,
        anotherLowPriorityInterceptor,
        anotherNormalPriorityInterceptor,
      ];
      expect(sortErrorInterceptors(errorInterceptors)).toEqual([
        highPriorityInterceptor,
        anotherHighPriorityInterceptor,
        normalPriorityInterceptor,
        anotherNormalPriorityInterceptor,
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
