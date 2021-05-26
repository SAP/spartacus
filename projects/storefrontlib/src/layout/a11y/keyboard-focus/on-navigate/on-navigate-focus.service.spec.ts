import { NgZone } from '@angular/core';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { KeyboardFocusConfig } from '../config/index';
import { OnNavigateFocusService } from './on-navigate-focus.service';

const MockKeyboardFocusConfig: KeyboardFocusConfig = {
  keyboardFocus: {
    enableResetFocusOnNavigate: true,
  },
};

describe('OnNavigateFocusService', () => {
  let service: OnNavigateFocusService;
  let zone: NgZone;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        providers: [
          OnNavigateFocusService,
          {
            provide: KeyboardFocusConfig,
            useValue: MockKeyboardFocusConfig,
          },
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
  });

  describe('setResetFocusOnNavigate()', () => {
    let element: HTMLElement;
    let spyDoc: jasmine.Spy;
    let spyEl: jasmine.Spy;

    beforeEach(() => {
      service = TestBed.inject(OnNavigateFocusService);
      router = TestBed.inject(Router);
      zone = TestBed.inject(NgZone);

      element = document.createElement('cx-storefront');
      spyDoc = spyOn(document, 'getElementsByTagName').and.returnValue([
        element,
      ] as any);
      spyEl = spyOn(element, 'focus');
    });

    it('should focus cx-storefront element on navigation', async () => {
      service.setResetFocusOnNavigate();
      await zone.run(() => router.navigateByUrl('/'));

      expect(spyDoc).toHaveBeenCalledWith('cx-storefront');
      expect(spyEl).toHaveBeenCalledTimes(1);
    });

    it('should NOT focus cx-storefront element on navigation when disabled', async () => {
      service.setResetFocusOnNavigate(false);
      await zone.run(() => router.navigateByUrl('/'));

      expect(spyDoc).not.toHaveBeenCalledWith('cx-storefront');
      expect(spyEl).not.toHaveBeenCalledTimes(1);
    });
  });
});
