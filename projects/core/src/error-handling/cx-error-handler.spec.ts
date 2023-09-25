import { TestBed } from '@angular/core/testing';
import { FeatureConfigService } from '../features-config';
import { CxErrorHandler } from './cx-error-handler';
import {
  ChainedErrorInterceptorFn,
  ERROR_INTERCEPTORS,
  ErrorInterceptor,
  ErrorInterceptorPriority,
} from './error-interceptors/error-interceptor';
import * as errorInterceptorUtils from './utils/error-interceptor-utils';

let interceptorsOrder: string[];

class MockErrorInterceptor implements ErrorInterceptor {
  #interceptorValue: string;
  priority?: ErrorInterceptorPriority | undefined;
  constructor(interceptorValue: string) {
    this.#interceptorValue = interceptorValue;
  }
  intercept(error: Error, next: ChainedErrorInterceptorFn): void {
    interceptorsOrder.push(this.#interceptorValue);
    next(error);
  }
}

class MockErrorInterceptorA extends MockErrorInterceptor {
  constructor() {
    super('A');
  }
}

class MockErrorInterceptorB extends MockErrorInterceptor {
  priority = ErrorInterceptorPriority.LOW;
  constructor() {
    super('B');
  }
}

class MockErrorInterceptorC extends MockErrorInterceptor {
  priority = ErrorInterceptorPriority.HIGH;
  constructor() {
    super('C');
  }
}

describe('CxErrorHandler', () => {
  let handleInterceptorsSpy: jasmine.Spy;
  let tailChainSpy: jasmine.Spy;

  beforeEach(() => {
    interceptorsOrder = [];

    handleInterceptorsSpy = spyOnProperty(
      errorInterceptorUtils,
      'handleInterceptors'
    ).and.callThrough();

    tailChainSpy = spyOnProperty(
      errorInterceptorUtils,
      'tailChain'
    ).and.callThrough();
  });

  describe('when there are no error interceptors', () => {
    let cxErrorHandler: CxErrorHandler;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CxErrorHandler,
          {
            provide: FeatureConfigService,
            useValue: {
              isLevel: () => true,
            },
          },
        ],
      });

      cxErrorHandler = TestBed.inject(CxErrorHandler);
    });

    it('should not call interceptors', () => {
      const error = new Error('test error');
      cxErrorHandler.handleError(error);
      expect(interceptorsOrder).toEqual([]);
      expect(handleInterceptorsSpy).toHaveBeenCalledTimes(0);
      expect(tailChainSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when there are error interceptors', () => {
    let cxErrorHandler: CxErrorHandler;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CxErrorHandler,
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
            provide: FeatureConfigService,
            useValue: {
              isLevel: () => true,
            },
          },
        ],
      });

      cxErrorHandler = TestBed.inject(CxErrorHandler);
    });

    it('should call all error interceptors', () => {
      const error = new Error('test error');
      cxErrorHandler.handleError(error);
      expect(interceptorsOrder).toEqual(['C', 'A', 'B']);
      expect(handleInterceptorsSpy).toHaveBeenCalledTimes(3);
      expect(tailChainSpy).toHaveBeenCalledTimes(1);
    });
  });
});
