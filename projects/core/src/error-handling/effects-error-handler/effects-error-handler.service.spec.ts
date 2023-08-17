import { TestBed } from '@angular/core/testing';
import { ErrorHandler } from '@angular/core';
import { EffectsErrorHandlerService } from './effects-error-handler.service';
import { ErrorAction, HttpErrorModel } from '@spartacus/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

describe('EffectsErrorHandlerService', () => {
  let service: EffectsErrorHandlerService;
  let errorHandlerSpy: jasmine.SpyObj<ErrorHandler>;

  beforeEach(() => {
    const errorHandlerSpyObj = jasmine.createSpyObj('ErrorHandler', [
      'handleError',
    ]);

    TestBed.configureTestingModule({
      providers: [
        EffectsErrorHandlerService,
        { provide: ErrorHandler, useValue: errorHandlerSpyObj },
      ],
    });

    service = TestBed.inject(EffectsErrorHandlerService);
    errorHandlerSpy = TestBed.inject(
      ErrorHandler
    ) as jasmine.SpyObj<ErrorHandler>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError', () => {
    it('should call ErrorHandler.handleError if error is not HttpErrorModel or HttpErrorResponse', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error('Test error'),
      };

      service.handleError(mockErrorAction);

      expect(errorHandlerSpy.handleError).toHaveBeenCalledWith(
        mockErrorAction.error
      );
    });

    it('should not call ErrorHandler.handleError if error is HttpErrorModel', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new HttpErrorModel(),
      };

      service.handleError(mockErrorAction);

      expect(errorHandlerSpy.handleError).not.toHaveBeenCalled();
    });

    it('should not call ErrorHandler.handleError if error is HttpErrorResponse', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new HttpErrorResponse({}),
      };

      service.handleError(mockErrorAction);

      expect(errorHandlerSpy.handleError).not.toHaveBeenCalled();
    });
  });

  describe('filterActions', () => {
    it('should return true for action implementing ErrorAction interface', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error(),
      };

      const result = service.filterActions(mockErrorAction);

      expect(result).toBeTrue();
    });

    it('should return false for action not implementing ErrorAction interface', () => {
      const mockNonErrorAction = { type: 'SOME_ACTION' };

      const result = service.filterActions(mockNonErrorAction as Action);

      expect(result).toBeFalse();
    });
  });
});
