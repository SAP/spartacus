//generate test for LoginAsGuestGuard

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  FeatureToggles,
  provideMockFeatureToggles,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { IS_GUEST_USER_CHECKOUT_KEY } from '@spartacus/storefront';
import { LoginAsGuestGuard } from './login-as-guest.guard';

const mockFeatureToggles: FeatureToggles = {
  authorizationCodeFlowByDefault: true,
};

const mockWindowRef = {
  localStorage: {
    getItem: jasmine.createSpy().and.returnValue('true'),
    removeItem: jasmine.createSpy(),
  },
};

const mockSemanticPathService = {
  get: jasmine.createSpy().and.returnValue('loginForm'),
};

describe('LoginAsGuestGuard', () => {
  let guard: LoginAsGuestGuard;
  let windowRef: WindowRef;
  let featureToggles: FeatureToggles;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Router,
        provideMockFeatureToggles({ ...mockFeatureToggles }),
        {
          provide: SemanticPathService,
          useValue: mockSemanticPathService,
        },
        {
          provide: WindowRef,
          useValue: mockWindowRef,
        },
      ],
    });
    guard = TestBed.inject(LoginAsGuestGuard);
    windowRef = TestBed.inject(WindowRef);
    featureToggles = TestBed.inject(FeatureToggles);
  });

  beforeEach(() => {
    mockWindowRef.localStorage.removeItem.calls.reset();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('when authorizationCodeFlowByDefault feature flag is not enabled', () => {
    it('should return true', () => {
      featureToggles.authorizationCodeFlowByDefault = false;
      guard.canActivate().subscribe((result) => {
        expect(result).toBe(true);
      });
    });
  });

  describe('when authorizationCodeFlowByDefault feature flag is enabled', () => {
    it('should return url to login with `forced` query param when IS_GUEST_USER_CHECKOUT_KEY is set to true', () => {
      featureToggles.authorizationCodeFlowByDefault = true;
      guard.canActivate().subscribe((result) => {
        expect(result.toString()).toBe('/loginForm?forced=true');
      });
      expect(windowRef.localStorage?.getItem).toHaveBeenCalledWith(
        IS_GUEST_USER_CHECKOUT_KEY
      );
      expect(windowRef.localStorage?.removeItem).toHaveBeenCalledWith(
        IS_GUEST_USER_CHECKOUT_KEY
      );
    });

    it('should return true if IS_GUEST_USER_CHECKOUT_KEY is not set to true', () => {
      featureToggles.authorizationCodeFlowByDefault = true;
      (mockWindowRef.localStorage?.getItem as jasmine.Spy).and.returnValue(
        'false'
      );
      guard.canActivate().subscribe((result) => {
        expect(result).toBe(true);
      });
      expect(windowRef.localStorage?.getItem).toHaveBeenCalledWith(
        IS_GUEST_USER_CHECKOUT_KEY
      );
      expect(windowRef.localStorage?.removeItem).not.toHaveBeenCalled();
    });

    it('should return true if IS_GUEST_USER_CHECKOUT_KEY is not set', () => {
      featureToggles.authorizationCodeFlowByDefault = true;
      (mockWindowRef.localStorage?.getItem as jasmine.Spy).and.returnValue(
        null
      );
      guard.canActivate().subscribe((result) => {
        expect(result).toBe(true);
      });
      expect(windowRef.localStorage?.getItem).toHaveBeenCalledWith(
        IS_GUEST_USER_CHECKOUT_KEY
      );
      expect(windowRef.localStorage?.removeItem).not.toHaveBeenCalled();
    });
  });
});
