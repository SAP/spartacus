//generate test for LoginAsGuestGuard

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  FeatureToggles,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { IS_GUEST_USER_CHECKOUT_KEY } from '@spartacus/storefront';
import { MockWinRef } from 'core-libs/storefront/shared/test/mock-window-ref';
import { LoginAsGuestGuard } from './login-as-guest.guard';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { firstValueFrom } from 'rxjs';

const mockSemanticPathService = {
  get: vi.fn().mockReturnValue('loginForm'),
};

describe('LoginAsGuestGuard', () => {
  let guard: LoginAsGuestGuard;
  let windowRef: WindowRef;
  let featureToggles: FeatureToggles;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Router,
        provideMockFeatureToggles({
          authorizationCodeFlowByDefault: true,
        }),
        {
          provide: SemanticPathService,
          useValue: mockSemanticPathService,
        },
        {
          provide: WindowRef,
          useClass: MockWinRef,
        },
      ],
    });
    guard = TestBed.inject(LoginAsGuestGuard);
    windowRef = TestBed.inject(WindowRef);
    featureToggles = TestBed.inject(FeatureToggles);
  });

  beforeEach(() => {
    (windowRef.localStorage?.removeItem as ReturnType<typeof vi.fn>).mockClear();
    (windowRef.localStorage?.getItem as any).mockReturnValue('true');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('when authorizationCodeFlowByDefault feature flag is not enabled', () => {
    it('should return true', async () => {
      featureToggles.authorizationCodeFlowByDefault = false;
      const result = await firstValueFrom(guard.canActivate());
      expect(result).toBe(true);
    });
  });

  describe('when authorizationCodeFlowByDefault feature flag is enabled', () => {
    it('should return url to login with `forced` query param when IS_GUEST_USER_CHECKOUT_KEY is set to true', async () => {
      const activationResult = await firstValueFrom(guard.canActivate());
      expect(activationResult.toString()).toBe('/loginForm?forced=true');
      expect(windowRef.localStorage?.getItem).toHaveBeenCalledWith(
        IS_GUEST_USER_CHECKOUT_KEY
      );
      expect(windowRef.localStorage?.removeItem).toHaveBeenCalledWith(
        IS_GUEST_USER_CHECKOUT_KEY
      );
    });

    it('should return true if IS_GUEST_USER_CHECKOUT_KEY is not set to true', async () => {
      featureToggles.authorizationCodeFlowByDefault = true;
      (windowRef.localStorage?.getItem as any).mockReturnValue('false');
      const result = await firstValueFrom(guard.canActivate());
      expect(result).toBe(true);
      expect(windowRef.localStorage?.getItem).toHaveBeenCalledWith(
        IS_GUEST_USER_CHECKOUT_KEY
      );
      expect(windowRef.localStorage?.removeItem).not.toHaveBeenCalled();
    });

    it('should return true if IS_GUEST_USER_CHECKOUT_KEY is not set', async () => {
      featureToggles.authorizationCodeFlowByDefault = true;
      (windowRef.localStorage?.getItem as any).mockReturnValue(null);
      const result = await firstValueFrom(guard.canActivate());

      expect(result).toBe(true);
      expect(windowRef.localStorage?.getItem).toHaveBeenCalledWith(
        IS_GUEST_USER_CHECKOUT_KEY
      );
      expect(windowRef.localStorage?.removeItem).not.toHaveBeenCalled();
    });
  });
});
