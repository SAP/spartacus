import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { CxErrorHandlerEffect } from './cx-error-handler.effect';
import { ErrorAction } from '@spartacus/core';
import { EffectsErrorHandlerService } from './effects-error-handler.service';
import { Action } from '@ngrx/store';

describe('CxErrorHandlerEffect', () => {
  let effect: CxErrorHandlerEffect;
  let actions$: Observable<Action>;
  let effectErrorHandler: jasmine.SpyObj<EffectsErrorHandlerService>;

  beforeEach(() => {
    const errorHandlerSpy = jasmine.createSpyObj('EffectsErrorHandlerService', [
      'handleError',
      'filterActions',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CxErrorHandlerEffect,
        provideMockActions(() => actions$),
        { provide: EffectsErrorHandlerService, useValue: errorHandlerSpy },
      ],
    });

    effect = TestBed.inject(CxErrorHandlerEffect);
    actions$ = TestBed.inject(Actions);
    effectErrorHandler = TestBed.inject(
      EffectsErrorHandlerService
    ) as jasmine.SpyObj<EffectsErrorHandlerService>;
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });

  describe('error$', () => {
    it('should handle error action', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error(),
      };

      effectErrorHandler.filterActions.and.returnValue(true);

      actions$ = of(mockErrorAction);

      effect.error$.subscribe();

      expect(effectErrorHandler.filterActions).toHaveBeenCalledWith(
        mockErrorAction
      );
      expect(effectErrorHandler.handleError).toHaveBeenCalledWith(
        mockErrorAction
      );
    });

    it('should not handle non-error action', () => {
      const mockNonErrorAction = {
        type: 'SOME_ACTION',
      };

      effectErrorHandler.filterActions.and.returnValue(false);

      actions$ = of(mockNonErrorAction);

      effect.error$.subscribe();

      expect(effectErrorHandler.filterActions).toHaveBeenCalledWith(
        mockNonErrorAction
      );
      expect(effectErrorHandler.handleError).not.toHaveBeenCalled();
    });
  });
});
