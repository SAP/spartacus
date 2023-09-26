import { TestBed } from '@angular/core/testing';
import {
  ChainedErrorInterceptorFn,
  ERROR_INTERCEPTORS,
  ErrorInterceptor,
  ErrorInterceptorPriority,
} from './error-interceptor';
import { ErrorInterceptorService } from './error-interceptor.service';

let interceptorsOrder: string[];

class MockErrorInterceptor implements ErrorInterceptor {
  protected interceptorValue: string;
  priority?: ErrorInterceptorPriority | undefined;
  constructor(interceptorValue: string) {
    this.interceptorValue = interceptorValue;
  }
  intercept(error: Error, next: ChainedErrorInterceptorFn): void {
    interceptorsOrder.push(this.interceptorValue);
    next(error);
  }
}

class MockErrorInterceptorA extends MockErrorInterceptor {
  constructor() {
    super('A - normal priority');
  }
}

class MockErrorInterceptorB extends MockErrorInterceptor {
  priority = ErrorInterceptorPriority.LOW;
  constructor() {
    super('B - low priority');
  }
}

class MockErrorInterceptorC extends MockErrorInterceptor {
  priority = ErrorInterceptorPriority.HIGH;
  constructor() {
    super('C - high priority');
  }
}

class MockErrorInterceptorNoPass extends MockErrorInterceptor {
  constructor() {
    super('No Pass');
  }
  intercept(_error: Error, _next: ChainedErrorInterceptorFn): void {
    interceptorsOrder.push(this.interceptorValue);
    // do not pass the error to the next interceptor
  }
}

describe('ErrorInterceptorService', () => {
  let errorInterceptorService: ErrorInterceptorService;

  beforeEach(() => {
    interceptorsOrder = [];
  });

  describe('when there are no error interceptors', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ErrorInterceptorService],
      });

      errorInterceptorService = TestBed.inject(ErrorInterceptorService);
    });

    it('should not call interceptors', () => {
      const error = new Error('test error');
      errorInterceptorService.interceptorsChain(error);
      expect(interceptorsOrder).toEqual([]);
    });
  });

  describe('when there are error interceptors', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ErrorInterceptorService,
          {
            provide: ERROR_INTERCEPTORS,
            useClass: MockErrorInterceptorA,
            multi: true,
          },
          {
            provide: ERROR_INTERCEPTORS,
            useClass: MockErrorInterceptorB,
            multi: true,
          },
          {
            provide: ERROR_INTERCEPTORS,
            useClass: MockErrorInterceptorC,
            multi: true,
          },
        ],
      });

      errorInterceptorService = TestBed.inject(ErrorInterceptorService);
    });

    it('should call all error interceptors with the correct order', () => {
      const error = new Error('test error');
      errorInterceptorService.interceptorsChain(error);
      expect(interceptorsOrder).toEqual([
        'C - high priority',
        'A - normal priority',
        'B - low priority',
      ]);
    });
  });

  describe('when interceptor in the middle breaks the chain', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ErrorInterceptorService,
          {
            provide: ERROR_INTERCEPTORS,
            useClass: MockErrorInterceptorA,
            multi: true,
          },
          {
            provide: ERROR_INTERCEPTORS,
            useClass: MockErrorInterceptorB,
            multi: true,
          },
          {
            provide: ERROR_INTERCEPTORS,
            useClass: MockErrorInterceptorC,
            multi: true,
          },
          {
            provide: ERROR_INTERCEPTORS,
            useClass: MockErrorInterceptorNoPass,
            multi: true,
          },
        ],
      });

      errorInterceptorService = TestBed.inject(ErrorInterceptorService);
    });

    it('should break the chain if any interceptor does not pass an error to the next interceptor', () => {
      errorInterceptorService.interceptorsChain(new Error('test error'));
      expect(interceptorsOrder).toEqual([
        'C - high priority',
        'A - normal priority',
        'No Pass',
      ]);
    });
  });
});
