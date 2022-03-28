import { NgZone } from '@angular/core';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WindowRef } from 'projects/core/src/window';
import { Observable, of } from 'rxjs';
import { BreakpointService } from '../../../breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../config';
import { KeyboardFocusConfig } from '../config/index';
import { OnNavigateFocusService } from './on-navigate-focus.service';

const MockKeyboardFocusConfig: KeyboardFocusConfig = {
  keyboardFocus: {
    enableResetFocusOnNavigate: true,
    enableResetViewOnNavigate: true,
  },
};

class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return of(BREAKPOINT.md);
  }
}

describe('OnNavigateFocusService', () => {
  let service: OnNavigateFocusService;
  let zone: NgZone;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
          OnNavigateFocusService,
          {
            provide: KeyboardFocusConfig,
            useValue: MockKeyboardFocusConfig,
          },
          {
            provide: BreakpointService,
            useClass: MockBreakpointService,
          },
          WindowRef,
        ],
      }).compileComponents();
    })
  );

  describe('initializeWithConfig()', () => {
    it('should call setResetFocusOnNavigate() when config has flag set', () => {
      service = TestBed.inject(OnNavigateFocusService);
      const spy = spyOn(service, 'setResetFocusOnNavigate');
      expect(spy).not.toHaveBeenCalled();
      service.initializeWithConfig();
      expect(spy).toHaveBeenCalled();
    });

    it('should NOT call setResetFocusOnNavigate() when config has flag NOT set', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: KeyboardFocusConfig,
            useValue: {},
          },
        ],
      });
      service = TestBed.inject(OnNavigateFocusService);

      const spy = spyOn(service, 'setResetFocusOnNavigate');
      expect(spy).not.toHaveBeenCalled();
      service.initializeWithConfig();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should call setResetViewOnNavigate() when config has flag set', () => {
      service = TestBed.inject(OnNavigateFocusService);
      const spy = spyOn(service, 'setResetViewOnNavigate');
      expect(spy).not.toHaveBeenCalled();
      service.initializeWithConfig();
      expect(spy).toHaveBeenCalled();
    });

    it('should NOT call setResetViewOnNavigate() when config has flag NOT set', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: KeyboardFocusConfig,
            useValue: {},
          },
        ],
      });
      service = TestBed.inject(OnNavigateFocusService);

      const spy = spyOn(service, 'setResetViewOnNavigate');
      expect(spy).not.toHaveBeenCalled();
      service.initializeWithConfig();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('setResetFocusOnNavigate()', () => {
    let element: HTMLElement;
    let spyEl: jasmine.Spy;

    beforeEach(() => {
      service = TestBed.inject(OnNavigateFocusService);
      router = TestBed.inject(Router);
      zone = TestBed.inject(NgZone);

      element = document.body;
      spyEl = spyOn(element, 'focus');
    });

    it('should focus cx-storefront element on navigation', async () => {
      service.setResetFocusOnNavigate(true);
      await zone.run(() => router.navigateByUrl('/'));
      expect(spyEl).toHaveBeenCalledTimes(1);
    });

    it('should NOT focus cx-storefront element on navigation when disabled', async () => {
      service.setResetFocusOnNavigate(false);
      await zone.run(() => router.navigateByUrl('/'));
      expect(spyEl).not.toHaveBeenCalledTimes(1);
    });

    it('should focus cx-storefront element on navigation', async () => {
      service.setResetFocusOnNavigate(true);
      await zone.run(() => router.navigateByUrl('/'));
      expect(spyEl).toHaveBeenCalledTimes(1);
    });

    it('should focus cx-storefront element given breakpoint value', async () => {
      service.setResetFocusOnNavigate([BREAKPOINT.md, BREAKPOINT.lg]);
      await zone.run(() => router.navigateByUrl('/'));
      expect(spyEl).toHaveBeenCalledTimes(1);
    });

    it('should NOT focus cx-storefront element given breakpoint value is not met', async () => {
      service.setResetFocusOnNavigate([BREAKPOINT.sm, BREAKPOINT.lg]);
      await zone.run(() => router.navigateByUrl('/'));
      expect(spyEl).not.toHaveBeenCalledTimes(1);
    });
  });

  describe('setResetViewOnNavigate()', () => {
    let element: HTMLElement;
    let spyEl: jasmine.Spy;

    beforeEach(() => {
      service = TestBed.inject(OnNavigateFocusService);
      router = TestBed.inject(Router);
      zone = TestBed.inject(NgZone);

      element = document.body;
      spyEl = spyOn(element, 'scrollIntoView');
    });

    it('should scrollIntoView cx-storefront element on navigation', async () => {
      service.setResetViewOnNavigate(true);
      await zone.run(() => router.navigateByUrl('/'));
      expect(spyEl).toHaveBeenCalledTimes(1);
    });

    it('should NOT scrollIntoView cx-storefront element on navigation when disabled', async () => {
      service.setResetViewOnNavigate(false);
      await zone.run(() => router.navigateByUrl('/'));
      expect(spyEl).not.toHaveBeenCalledTimes(1);
    });

    it('should scrollIntoView cx-storefront element given breakpoint value', async () => {
      service.setResetViewOnNavigate([BREAKPOINT.md, BREAKPOINT.lg]);
      await zone.run(() => router.navigateByUrl('/'));
      expect(spyEl).toHaveBeenCalledTimes(1);
    });

    it('should NOT scrollIntoView cx-storefront element given breakpoint value is not met', async () => {
      service.setResetViewOnNavigate([BREAKPOINT.sm, BREAKPOINT.lg]);
      await zone.run(() => router.navigateByUrl('/'));
      expect(spyEl).not.toHaveBeenCalledTimes(1);
    });
  });
});
