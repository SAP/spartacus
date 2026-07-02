import { vi } from 'vitest';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoggerService, Priority } from '@spartacus/core';
import { GlobalMessageService } from '../../../facade';
import { UnknownErrorHandler } from './unknown-error.handler';
import { isDevMode } from '@angular/core';

class MockGlobalMessageService {}

vi.mock('@angular/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@angular/core')>();
  return {
    ...actual,
    isDevMode: vi.fn(),
  };
});
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
      vi.spyOn(loggerService, 'warn');
    });

    it('should log error in dev mode', () => {
      vi.mocked(isDevMode).mockReturnValue(true);
      service.handleError({} as any, { message: 'error' } as HttpErrorResponse);
      expect(loggerService.warn).toHaveBeenCalledWith(
        'An unknown http error occurred\n',
        'error'
      );
    });

    it('should not log error if it is not a dev mode', () => {
      vi.mocked(isDevMode).mockReturnValue(false);
      service.handleError({} as any, { message: 'error' } as HttpErrorResponse);
      expect(loggerService.warn).not.toHaveBeenCalled();
    });
  });
});
