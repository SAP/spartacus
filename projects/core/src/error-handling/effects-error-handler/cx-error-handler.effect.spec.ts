import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { ErrorAction, FeatureConfigService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CxErrorHandlerEffect } from './cx-error-handler.effect';
import { ErrorActionService } from './error-action.service';

describe('CxErrorHandlerEffect', () => {
  let effect: CxErrorHandlerEffect;
  let actions$: Observable<Action>;
  let effectsErrorHandlerService: jasmine.SpyObj<ErrorActionService>;
  let featureConfigService: FeatureConfigService;

  beforeEach(() => {
    const effectsErrorHandlerServiceSpy = jasmine.createSpyObj(
      'EffectsErrorHandlerService',
      ['handleError', 'filterActions']
    );
    TestBed.configureTestingModule({
      providers: [
        CxErrorHandlerEffect,
        FeatureConfigService,
        provideMockActions(() => actions$),
        {
          provide: ErrorActionService,
          useValue: effectsErrorHandlerServiceSpy,
        },
      ],
    });

    effect = TestBed.inject(CxErrorHandlerEffect);
    actions$ = TestBed.inject(Actions);
    effectsErrorHandlerService = TestBed.inject(
      ErrorActionService
    ) as jasmine.SpyObj<ErrorActionService>;
    featureConfigService = TestBed.inject(FeatureConfigService);
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });

  describe('error$ ', () => {
    describe('when ssrStrictErrorHandlingForHttpAndNgrx is enabled', () => {
      beforeEach(() => {
        spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      });

      it('should handle error action', () => {
        const mockErrorAction: ErrorAction = {
          type: 'ERROR_ACTION_TYPE',
          error: new Error(),
        };

        effectsErrorHandlerService.isErrorAction.and.returnValue(true);

        actions$ = of(mockErrorAction);

        effect.error$.subscribe();

        expect(effectsErrorHandlerService.handle).toHaveBeenCalledWith(
          mockErrorAction
        );
      });

      it('should not handle non-error action', () => {
        const mockNonErrorAction = {
          type: 'SOME_ACTION',
        };

        effectsErrorHandlerService.isErrorAction.and.returnValue(false);

        actions$ = of(mockNonErrorAction);

        effect.error$.subscribe();

        expect(effectsErrorHandlerService.handle).not.toHaveBeenCalled();
      });
    });
  });
  describe('when ssrStrictErrorHandlingForHttpAndNgrx is disabled', () => {
    beforeEach(() => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
    });
    it('should not handle error action', () => {
      const mockErrorAction: ErrorAction = {
        type: 'ERROR_ACTION_TYPE',
        error: new Error(),
      };
      effectsErrorHandlerService.isErrorAction.and.returnValue(true);
      actions$ = of(mockErrorAction);
      effect.error$.subscribe();
      expect(effectsErrorHandlerService.handle).not.toHaveBeenCalled();
    });
  });
});
