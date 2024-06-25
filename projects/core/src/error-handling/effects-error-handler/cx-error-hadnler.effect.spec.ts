import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { ErrorAction, FeatureConfigService, WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CxErrorHandlerEffect } from './cx-error-handler.effect';
import { EffectsErrorHandlerService } from './effects-error-handler.service';

describe('CxErrorHandlerEffect', () => {
  let effect: CxErrorHandlerEffect;
  let actions$: Observable<Action>;
  let effectErrorHandler: jasmine.SpyObj<EffectsErrorHandlerService>;
  let featureConfigService: FeatureConfigService;
  let windowRef: WindowRef;

  beforeEach(() => {
    const errorHandlerSpy = jasmine.createSpyObj('EffectsErrorHandlerService', [
      'handleError',
      'filterActions',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CxErrorHandlerEffect,
        FeatureConfigService,
        provideMockActions(() => actions$),
        { provide: WindowRef, useValue: { isBrowser: () => false } },
        { provide: EffectsErrorHandlerService, useValue: errorHandlerSpy },
      ],
    });

    effect = TestBed.inject(CxErrorHandlerEffect);
    actions$ = TestBed.inject(Actions);
    effectErrorHandler = TestBed.inject(
      EffectsErrorHandlerService
    ) as jasmine.SpyObj<EffectsErrorHandlerService>;
    featureConfigService = TestBed.inject(FeatureConfigService);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });

  describe('error$ ', () => {
    describe('when strictHttpAndNgrxErrorHandling is enabled', () => {
      beforeEach(() => {
        spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      });

      it('should handle error action', () => {
        const mockErrorAction: ErrorAction = {
          type: 'ERROR_ACTION_TYPE',
          error: new Error(),
        };

        effectErrorHandler.filterActions.and.returnValue(true);

        actions$ = of(mockErrorAction);

        effect.error$.subscribe();

        expect(effectErrorHandler.handleError).toHaveBeenCalledWith(
          mockErrorAction
        );
      });

      it('should not handle error action when not in SSR', () => {
        const mockErrorAction: ErrorAction = {
          type: 'ERROR_ACTION_TYPE',
          error: new Error(),
        };

        effectErrorHandler.filterActions.and.returnValue(true);
        spyOn(windowRef, 'isBrowser').and.returnValue(true);

        actions$ = of(mockErrorAction);

        effect.error$.subscribe();

        expect(effectErrorHandler.handleError).not.toHaveBeenCalled();
      });

      it('should not handle non-error action', () => {
        const mockNonErrorAction = {
          type: 'SOME_ACTION',
        };

        effectErrorHandler.filterActions.and.returnValue(false);

        actions$ = of(mockNonErrorAction);

        effect.error$.subscribe();

        expect(effectErrorHandler.handleError).not.toHaveBeenCalled();
      });
    });
  });
  describe('when strictHttpAndNgrxErrorHandling is disabled', () => {
    beforeEach(() => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
    });
    it('should not handle error action', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error(),
      };
      effectErrorHandler.filterActions.and.returnValue(true);
      actions$ = of(mockErrorAction);
      effect.error$.subscribe();
      expect(effectErrorHandler.handleError).not.toHaveBeenCalled();
    });
  });
});
