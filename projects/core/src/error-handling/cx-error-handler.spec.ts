import { TestBed } from '@angular/core/testing';
import { FeatureConfigService } from '../features-config';
import { LoggerService } from '../logger';
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

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isLevel = jasmine.createSpy();
}

class MockLoggerService implements Partial<LoggerService> {
  error = jasmine.createSpy();
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

  describe('error interceptors feature flag', () => {
    let cxErrorHandler: CxErrorHandler;
    let featureConfigService: FeatureConfigService;
    let loggerService: LoggerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CxErrorHandler,
          {
            provide: ERROR_INTERCEPTORS,
            useClass: MockErrorInterceptorA,
            multi: true,
          },
          { provide: FeatureConfigService, useClass: MockFeatureConfigService },
          { provide: LoggerService, useClass: MockLoggerService },
        ],
      });

      cxErrorHandler = TestBed.inject(CxErrorHandler);
      featureConfigService = TestBed.inject(FeatureConfigService);
      loggerService = TestBed.inject(LoggerService);
    });

    it('should be created', () => {
      expect(cxErrorHandler).toBeTruthy();
    });

    it('should call logger.error if feature level is not 6.6', () => {
      (featureConfigService.isLevel as jasmine.Spy).and.returnValue(false);
      const error = new Error('test error');
      cxErrorHandler.handleError(error);

      expect(loggerService.error).toHaveBeenCalledWith(error);
      expect(handleInterceptorsSpy).toHaveBeenCalledTimes(0);
      expect(tailChainSpy).toHaveBeenCalledTimes(0);
    });

    it('should call all error interceptors if feature level is 6.6', () => {
      (featureConfigService.isLevel as jasmine.Spy).and.returnValue(true);
      const error = new Error('test error');
      cxErrorHandler.handleError(error);

      expect(loggerService.error).toHaveBeenCalledTimes(0);
      expect(handleInterceptorsSpy).toHaveBeenCalledTimes(1);
      expect(tailChainSpy).toHaveBeenCalledTimes(1);
    });
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
