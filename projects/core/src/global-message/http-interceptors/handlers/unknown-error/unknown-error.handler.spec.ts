import { HttpErrorResponse } from '@angular/common/http';
import * as AngularCore from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureConfigService, LoggerService, Priority } from '@spartacus/core';
import { GlobalMessageService } from '../../../facade';
import { UnknownErrorHandler } from './unknown-error.handler';

class MockGlobalMessageService {}
describe('UnknownErrorHandler', () => {
  let service: UnknownErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnknownErrorHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        FeatureConfigService,
        LoggerService,
      ],
    });
    service = TestBed.inject(UnknownErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should match -1 responseStatus ', () => {
    expect(service.hasMatch({} as HttpErrorResponse)).toBeTruthy();
  });

  it('should have fallback priority ', () => {
    expect(service.getPriority()).toBe(Priority.FALLBACK);
  });

  describe('error handling', () => {
    let loggerService: LoggerService;

    beforeEach(() => {
      loggerService = TestBed.inject(LoggerService);
      spyOn(loggerService, 'warn');
    });

    it('should log error in dev mode', () => {
      spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => true);
      service.handleError({} as any, { message: 'error' } as HttpErrorResponse);
      expect(loggerService.warn).toHaveBeenCalledWith(
        'An unknown http error occurred\n',
        'error'
      );
    });

    it('should not log error if it is not a dev mode', () => {
      spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => false);
      service.handleError({} as any, { message: 'error' } as HttpErrorResponse);
      expect(loggerService.warn).not.toHaveBeenCalled();
    });
  });
});
