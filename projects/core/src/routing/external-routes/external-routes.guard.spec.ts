import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot } from '@angular/router';
import { WindowRef } from '../../window';
import { ExternalRoutesGuard } from './external-routes.guard';

describe('ExternalRoutesGuard canActivate', () => {
  let guard: ExternalRoutesGuard;
  let winRef: WindowRef;
  let mockRouterState: RouterStateSnapshot;

  function beforeEachForPlatform(platformId: string) {
    const mockWinRef: WindowRef = {
      nativeWindow: {
        location: { href: 'previous-url' },
      },
    } as WindowRef;

    mockRouterState = { url: 'new-url' } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        ExternalRoutesGuard,
        { provide: PLATFORM_ID, useValue: platformId },
        { provide: WindowRef, useValue: mockWinRef },
      ],
    });

    guard = TestBed.inject(ExternalRoutesGuard);
    winRef = TestBed.inject(WindowRef);
  }

  describe('for no-browser platform', () => {
    beforeEach(() => {
      beforeEachForPlatform('no-browser');
    });

    it('should return promise emitting false', () => {
      const result = guard.canActivate(null, mockRouterState);
      expect(result).toBe(false);
    });

    it('should not assign location.href', () => {
      guard.canActivate(null, mockRouterState);
      expect(winRef.nativeWindow.location.href).toEqual('previous-url');
    });
  });

  describe('for browser platform', () => {
    beforeEach(() => {
      beforeEachForPlatform('browser');
    });

    it('should return promise emitting false', () => {
      const result = guard.canActivate(null, mockRouterState);
      expect(result).toBe(false);
    });

    it('should assign location.href to new url', () => {
      guard.canActivate(null, mockRouterState);
      expect(winRef.nativeWindow.location.href).toEqual('new-url');
    });
  });
});
