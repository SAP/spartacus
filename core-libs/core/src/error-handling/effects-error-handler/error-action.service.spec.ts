import { vi } from 'vitest';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { ErrorAction, HttpErrorModel, WindowRef } from '@spartacus/core';
import { ErrorActionService } from './error-action.service';

describe('ErrorActionService', () => {
  let errorActionService: ErrorActionService;
  let windowRef: WindowRef;
  let errorHandlerSpy: ErrorHandler;

  beforeEach(() => {
    const errorHandlerSpyObj = {
      handleError: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ErrorActionService,
        { provide: WindowRef, useValue: { isBrowser: () => false } },
        { provide: ErrorHandler, useValue: errorHandlerSpyObj },
      ],
    });

    errorActionService = TestBed.inject(ErrorActionService);
    windowRef = TestBed.inject(WindowRef);
    errorHandlerSpy = TestBed.inject(ErrorHandler) as ErrorHandler;
  });

  it('should be created', () => {
    expect(errorActionService).toBeTruthy();
  });

  describe('handleError', () => {
    it('should call ErrorHandler.handleError if error is not HttpErrorModel or HttpErrorResponse', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error('Test error'),
      };

      errorActionService.handle(mockErrorAction);

      expect(errorHandlerSpy.handleError).toHaveBeenCalledWith(
        mockErrorAction.error
      );
    });

    it('should not call ErrorHandler.handleError if error is HttpErrorModel', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new HttpErrorModel(),
      };

      errorActionService.handle(mockErrorAction);

      expect(errorHandlerSpy.handleError).not.toHaveBeenCalled();
    });

    it('should not call ErrorHandler.handleError if error is HttpErrorResponse', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new HttpErrorResponse({}),
      };

      errorActionService.handle(mockErrorAction);

      expect(errorHandlerSpy.handleError).not.toHaveBeenCalled();
    });

    it('should not call ErrorHandler.handleError in browser runtime environment', () => {
      vi.spyOn(windowRef, 'isBrowser').mockReturnValue(true);

      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error('Test error'),
      };

      errorActionService.handle(mockErrorAction);

      expect(errorHandlerSpy.handleError).not.toHaveBeenCalled();
    });
  });

  describe('filterActions', () => {
    it('should return true for action implementing ErrorAction interface', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error(),
      };

      const result = errorActionService.isErrorAction(mockErrorAction);

      expect(result).toBeTruthy();
    });

    it('should return false for action not implementing ErrorAction interface', () => {
      const mockNonErrorAction = { type: 'SOME_ACTION' };

      const result = errorActionService.isErrorAction(
        mockNonErrorAction as Action
      );

      expect(result).toBeFalsy();
    });
  });
});
