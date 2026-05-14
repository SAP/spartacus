import { APP_INITIALIZER } from '@angular/core';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { I18nConfig } from '../config/i18n-config';
import { I18nextInitializer } from './i18next-initializer';
import { i18nextProviders } from './i18next-providers';

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable() {
    return of({ i18n: {} });
  }
}

class MockI18nextInitializer implements Partial<I18nextInitializer> {
  initialize() {
    return Promise.resolve({});
  }
}

describe('i18nextProviders', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
        {
          provide: I18nextInitializer,
          useClass: MockI18nextInitializer,
        },
        i18nextProviders,
      ],
    });
  });
  describe('APP_INITIALIZER', () => {
    it('should initialize `i18next` ONLY after the `i18n` config is stable', fakeAsync(() => {
      const configInitializerService = TestBed.inject(ConfigInitializerService);
      const i18nextInitializer = TestBed.inject(I18nextInitializer);

      const mockStableConfig$ = new Subject<I18nConfig>();
      spyOn(configInitializerService, 'getStable').and.returnValue(
        mockStableConfig$
      );
      spyOn(i18nextInitializer, 'initialize').and.callThrough();

      const appInitializers = TestBed.inject(APP_INITIALIZER);
      appInitializers[0]() as Promise<any>;

      expect(configInitializerService.getStable).toHaveBeenCalledWith('i18n');
      expect(i18nextInitializer.initialize).not.toHaveBeenCalled();

      mockStableConfig$.next({ i18n: {} });
      mockStableConfig$.complete();

      flushMicrotasks();
      expect(i18nextInitializer.initialize).toHaveBeenCalled();
    }));

    it('should resolve its promise only after `i18next` is initialized', fakeAsync(() => {
      const configInitializerService = TestBed.inject(ConfigInitializerService);
      const i18nextInitializer = TestBed.inject(I18nextInitializer);
      const appInitializers = TestBed.inject(APP_INITIALIZER);

      let mockResolveI18nextInitialize: Function | undefined;
      spyOn(i18nextInitializer, 'initialize').and.returnValue(
        new Promise((resolve) => {
          mockResolveI18nextInitialize = resolve;
        })
      );
      spyOn(configInitializerService, 'getStable').and.callThrough();

      let appInitializerResolved = false;
      (appInitializers[0]() as Promise<any>).then(() => {
        appInitializerResolved = true;
      });

      expect(appInitializerResolved).toBe(false);
      mockResolveI18nextInitialize?.();
      flushMicrotasks();
      expect(appInitializerResolved).toBe(true);
    }));
  });
});
