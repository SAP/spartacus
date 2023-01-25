import { TestBed } from '@angular/core/testing';
import type { i18n, InitOptions } from 'i18next';
import { BehaviorSubject, Observable } from 'rxjs';
import { LanguageService } from '../../site-context/facade/language.service';
import { I18nConfig } from '../config/i18n-config';
import { I18nextBackendService } from './i18next-backend/i18next-backend.service';
import { I18nextInitializer } from './i18next-initializer';
import { I18NEXT_INSTANCE } from './i18next-instance';

export class MockI18nextBackendService
  implements Partial<I18nextBackendService>
{
  initialize(): InitOptions {
    return { backend: {} };
  }
}

describe('I18nextInitializer', () => {
  let initializer: I18nextInitializer;
  let i18nextBackendService: I18nextBackendService;
  let i18next: i18n; // i18next instance
  let config: I18nConfig;
  let mockActiveLanguage$: BehaviorSubject<string>;

  beforeEach(() => {
    mockActiveLanguage$ = new BehaviorSubject('en');

    class MockLanguageService implements Partial<LanguageService> {
      getActive(): Observable<string> {
        return mockActiveLanguage$;
      }
    }

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        { provide: I18nConfig, useValue: { i18n: {} } },
        {
          provide: I18nextBackendService,
          useClass: MockI18nextBackendService,
        },
      ],
    });

    initializer = TestBed.inject(I18nextInitializer);
    i18nextBackendService = TestBed.inject(I18nextBackendService);
    i18next = TestBed.inject(I18NEXT_INSTANCE);
    config = TestBed.inject(I18nConfig);
  });

  describe('initialize', () => {
    it('should initialize i18next instance', () => {
      spyOn(i18next, 'init');
      initializer.initialize();
      expect(i18next.init).toHaveBeenCalled();
    });

    it('should populate config fallbackLang', () => {
      config.i18n = { fallbackLang: 'en' };
      spyOn(i18next, 'init');

      initializer.initialize();

      expect(i18next.init).toHaveBeenCalledWith(
        jasmine.objectContaining({ fallbackLng: 'en' }),
        jasmine.any(Function)
      );
    });

    it('should populate config debug flag', () => {
      config.i18n = { debug: true };
      spyOn(i18next, 'init');

      initializer.initialize();

      expect(i18next.init).toHaveBeenCalledWith(
        jasmine.objectContaining({ debug: true }),
        jasmine.any(Function)
      );
    });

    it('should disable config interpolation options: escapeValue and skipOnVariables', () => {
      spyOn(i18next, 'init');

      initializer.initialize();

      expect(i18next.init).toHaveBeenCalledWith(
        jasmine.objectContaining({
          interpolation: {
            escapeValue: false,
            skipOnVariables: false,
          },
        }),
        jasmine.any(Function)
      );
    });

    it('should set config  `ns` to empty array', () => {
      spyOn(i18next, 'init');

      initializer.initialize();

      expect(i18next.init).toHaveBeenCalledWith(
        jasmine.objectContaining({ ns: [] }),
        jasmine.any(Function)
      );
    });

    it('should NOT set config `resources` immediately during i18next initialization', () => {
      config.i18n = {
        resources: { en: { testChunk: { testKey: 'testValue' } } },
      };
      spyOn(i18next, 'init');

      initializer.initialize();

      expect(
        (i18next.init as jasmine.Spy)['calls'].argsFor(0)[0].resources
      ).toEqual(undefined);
    });

    it('should add `resources` right after i18next initialization', (done) => {
      config.i18n = {
        resources: { en: { testChunk: { testKey: 'testValue' } } },
      };
      spyOn(i18next, 'init').and.callThrough();

      i18next.on('initialized', () => {
        // method `addResourceBundle` doesn't exist on object i18next before calling i18next.init
        spyOn(i18next, 'addResourceBundle').and.callThrough();
      });

      initializer.initialize();

      // wait for callback passed to i18next.init to be executed
      setTimeout(() => {
        expect(i18next.addResourceBundle as jasmine.Spy).toHaveBeenCalledWith(
          'en',
          'testChunk',
          { testKey: 'testValue' },
          true,
          true
        );
        done();
      }, 0);
    });

    describe('when i18n.backend.loadPath is provided', () => {
      it('should initialize i18next for loading translations from backend', () => {
        config.i18n = {
          backend: {
            loadPath: 'some-path',
          },
        };
        spyOn(i18next, 'init');
        spyOn(i18nextBackendService, 'initialize').and.returnValue({
          backend: {
            a: 1,
            b: 2,
          },
        } as InitOptions);

        initializer.initialize();

        expect(i18next.init).toHaveBeenCalledWith(
          jasmine.objectContaining({
            backend: {
              a: 1,
              b: 2,
            },
          }),
          jasmine.any(Function)
        );
      });
    });

    it('should ensure to update i18next language whenever active language is changed', (done) => {
      spyOn(i18next, 'init').and.callThrough();

      initializer.initialize();

      expect(i18next.language).toEqual(undefined);

      mockActiveLanguage$.next('de');

      // i18next language is updated asynchronously, so we need to wait for it
      setTimeout(() => {
        expect(i18next.language).toEqual('de');
        done();
      }, 0);
    });
  });
});
