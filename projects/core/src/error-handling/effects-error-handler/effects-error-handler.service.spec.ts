import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { ErrorAction, HttpErrorModel, WindowRef } from '@spartacus/core';
import { ErrorActionService } from './error-action.service';

describe('EffectsErrorHandlerService', () => {
  let effectsErrorHandlerService: ErrorActionService;
  let windowRef: WindowRef;
  let errorHandlerSpy: jasmine.SpyObj<ErrorHandler>;

  beforeEach(() => {
    const errorHandlerSpyObj = jasmine.createSpyObj('ErrorHandler', [
      'handleError',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ErrorActionService,
        { provide: WindowRef, useValue: { isBrowser: () => false } },
        { provide: ErrorHandler, useValue: errorHandlerSpyObj },
      ],
    });

    effectsErrorHandlerService = TestBed.inject(ErrorActionService);
    windowRef = TestBed.inject(WindowRef);
    errorHandlerSpy = TestBed.inject(
      ErrorHandler
    ) as jasmine.SpyObj<ErrorHandler>;
  });

  it('should be created', () => {
    expect(effectsErrorHandlerService).toBeTruthy();
  });

  describe('handleError', () => {
    it('should call ErrorHandler.handleError if error is not HttpErrorModel or HttpErrorResponse', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error('Test error'),
      };

      effectsErrorHandlerService.handle(mockErrorAction);

      expect(errorHandlerSpy.handleError).toHaveBeenCalledWith(
        mockErrorAction.error
      );
    });

    it('should not call ErrorHandler.handleError if error is HttpErrorModel', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new HttpErrorModel(),
      };

      effectsErrorHandlerService.handle(mockErrorAction);

      expect(errorHandlerSpy.handleError).not.toHaveBeenCalled();
    });

    it('should not call ErrorHandler.handleError if error is HttpErrorResponse', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new HttpErrorResponse({}),
      };

      effectsErrorHandlerService.handle(mockErrorAction);

      expect(errorHandlerSpy.handleError).not.toHaveBeenCalled();
    });

    it('should not call ErrorHandler.handleError in browser runtime environment', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(true);

      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error('Test error'),
      };

      effectsErrorHandlerService.handle(mockErrorAction);

      expect(errorHandlerSpy.handleError).not.toHaveBeenCalled();
    });
  });

  describe('filterActions', () => {
    it('should return true for action implementing ErrorAction interface', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error(),
      };

      const result = effectsErrorHandlerService.isErrorAction(mockErrorAction);

      expect(result).toBeTruthy();
    });

    it('should return false for action not implementing ErrorAction interface', () => {
      const mockNonErrorAction = { type: 'SOME_ACTION' };

      const result = effectsErrorHandlerService.isErrorAction(
        mockNonErrorAction as Action
      );

      expect(result).toBeFalsy();
    });
  });
});
