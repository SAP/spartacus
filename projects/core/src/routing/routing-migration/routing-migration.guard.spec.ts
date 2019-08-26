import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot } from '@angular/router';
import { WindowRef } from '../../window';
import { RoutingMigrationGuard } from './routing-migration.guard';

fdescribe('RoutingMigrationGuard canActivate', () => {
  describe('for no-browser platform', () => {
    let guard: RoutingMigrationGuard;
    let winRef: WindowRef;

    beforeEach(() => {
      const mockWinRef: WindowRef = {
        nativeWindow: {
          location: { href: 'previous URL' },
        },
      } as WindowRef;

      TestBed.configureTestingModule({
        providers: [
          RoutingMigrationGuard,
          { provide: PLATFORM_ID, useValue: 'no-browser' },
          { provide: WindowRef, useValue: mockWinRef },
        ],
      });

      guard = TestBed.get(RoutingMigrationGuard);
      winRef = TestBed.get(WindowRef);
    });

    it('should return promise emitting false', async () => {
      const result = await guard.canActivate(null, null);
      expect(result).toBe(false);
    });

    it('should not assign location.href', async () => {
      await guard.canActivate(null, null);
      expect(winRef.nativeWindow.location.href).toEqual('previous URL');
    });
  });

  describe('for browser platform', () => {
    let guard: RoutingMigrationGuard;
    let winRef: WindowRef;
    let mockRouterState: RouterStateSnapshot;
    let mockSWRegistration: ServiceWorkerRegistration;

    beforeEach(() => {
      mockSWRegistration = {
        unregister: () => Promise.resolve(true),
      } as ServiceWorkerRegistration;

      const mockWinRef: WindowRef = {
        nativeWindow: {
          location: { href: 'previous-url' },
          navigator: {
            serviceWorker: {
              getRegistration: () => Promise.resolve(mockSWRegistration),
            },
          },
        },
      } as WindowRef;

      mockRouterState = { url: 'new-url' } as RouterStateSnapshot;

      TestBed.configureTestingModule({
        providers: [
          RoutingMigrationGuard,
          { provide: WindowRef, useValue: mockWinRef },
        ],
      });

      guard = TestBed.get(RoutingMigrationGuard);
      winRef = TestBed.get(WindowRef);
    });

    it('should return promise emitting false', async () => {
      const result = await guard.canActivate(null, mockRouterState);
      expect(result).toBe(false);
    });

    it('should assign location.href to new url', async () => {
      await guard.canActivate(null, mockRouterState);
      expect(winRef.nativeWindow.location.href).toEqual('new-url');
    });

    it('should unregister service worker', async () => {
      spyOn(mockSWRegistration, 'unregister').and.callThrough();

      await guard.canActivate(null, mockRouterState);
      expect(mockSWRegistration.unregister).toHaveBeenCalled();
    });
  });
});
