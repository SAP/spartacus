import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { I18NEXT_INSTANCE } from './i18next/i18next-providers';
import createSpy = jasmine.createSpy;
import { ServerConfig } from '../config';
import { Subject } from 'rxjs';

fdescribe('TranslationService', () => {
  let service: TranslationService;
  let config: ServerConfig;
  let i18Next;
  let mockI18NextLanguage;

  beforeEach(() => {
    mockI18NextLanguage = new Subject();

    const fakeI18NOn = (event, callback) => {
      if (event === 'languageChanged') {
        mockI18NextLanguage.subscribe(callback);
      }
    };

    const mockI18Next = {
      t: createSpy('i18Next.t'),
      exists: createSpy('i18Next.exists'),
      loadNamespaces: createSpy('i18Next.loadNamespaces'),
      on: createSpy('i18Next.on').and.callFake(fakeI18NOn)
    };
    const mockConfig = { production: false };

    TestBed.configureTestingModule({
      providers: [
        TranslationService,
        {
          provide: I18NEXT_INSTANCE,
          useValue: mockI18Next
        },
        { provide: ServerConfig, useValue: mockConfig }
      ]
    });

    service = TestBed.get(TranslationService);
    i18Next = TestBed.get(I18NEXT_INSTANCE);
    config = TestBed.get(ServerConfig);
  });

  afterEach(() => {
    mockI18NextLanguage.complete();
  });

  describe('exists', () => {
    it('should call i18next.exists', () => {
      service.exists('testKey');
      expect(i18Next.exists).toHaveBeenCalledWith('testKey');
    });
  });

  describe('translate', () => {
    describe(', when key exists,', () => {
      beforeEach(() => {
        i18Next.exists.and.returnValue(true);
      });

      it('should return result of i18next.t', () => {
        i18Next.t.and.returnValue('value');
        const result = service.translate('testKey', 'testOptions');

        expect(i18Next.t).toHaveBeenCalledWith('testKey', 'testOptions');
        expect(result).toBe('value');
      });
    });

    describe(', when key does NOT exist,', () => {
      beforeEach(() => {
        i18Next.exists.and.returnValue(false);
        spyOn(console, 'warn');
      });

      it('should return key in brackets in non-production', () => {
        const result = service.translate('testKey', 'testOptions');
        expect(result).toBe(`[testKey]`);
      });

      it('should return non-breaking space in production', () => {
        config.production = true;
        const result = service.translate('testKey', 'testOptions');
        expect(result).toBe(` `);
      });

      it('should report missing key in non-production', () => {
        service.translate('testKey', 'testOptions');
        expect(console.warn).toHaveBeenCalled();
      });
    });
  });

  describe('loadNamespaces', () => {
    it('should call i18next.loadNamespaces', () => {
      const namespaces = ['namespace1', 'namespace2'];
      const testCallback = () => {};
      service.loadNamespaces(namespaces, testCallback);
      expect(i18Next.loadNamespaces).toHaveBeenCalledWith(
        namespaces,
        testCallback
      );
    });
  });

  describe('translateLazy', () => {
    describe(', when key exists,', () => {
      beforeEach(() => {
        i18Next.exists.and.returnValue(true);
      });

      it('should return result of i18next.t', () => {
        i18Next.t.and.returnValue('value');
        const result = service.lazyTranslate('testKey', 'testOptions');

        expect(i18Next.t).toHaveBeenCalledWith('testKey', 'testOptions');
        expect(result).toBe('value');
      });
    });

    describe(', when key does NOT exist,', () => {
      beforeEach(() => {
        i18Next.exists.and.returnValues(false);
        spyOn(console, 'warn');
      });

      it('should return key in brackets in non-production', () => {
        const result = service.lazyTranslate('testKey', 'testOptions');
        expect(result).toBe(`[testKey]`);
      });

      it('should return non-breaking space in production', () => {
        config.production = true;
        const result = service.lazyTranslate('testKey', 'testOptions');

        expect(result).toBe(` `);
      });

      it('should NOT report missing key', () => {
        service.lazyTranslate('testKey', 'testOptions');
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should load namespace of key when key', () => {
        service.lazyTranslate('testNamespace:testKey', 'testOptions');

        expect(i18Next.loadNamespaces).toHaveBeenCalledWith(
          'testNamespace',
          jasmine.any(Function)
        );
      });

      it('should invoke callback after loading namespace', () => {
        i18Next.loadNamespaces.and.callFake((_namespaces, onNamespaceLoad) =>
          onNamespaceLoad('testArg')
        );
        const testOnNamespaceLoad = createSpy('testOnNamespaceLoad');
        service.lazyTranslate(
          'testNamespace:testKey',
          'testOptions',
          testOnNamespaceLoad
        );

        expect(testOnNamespaceLoad).toHaveBeenCalledWith('testArg');
      });
    });

    describe(', when key does NOT exist and it also does NOT come with loaded namespace,', () => {
      it('should report missing key', () => {
        i18Next.exists.and.returnValues(false, false);
        spyOn(console, 'warn');
        i18Next.loadNamespaces.and.callFake((_namespaces, onNamespaceLoad) =>
          onNamespaceLoad()
        );
        service.lazyTranslate('testNamespace:testKey', 'testOptions');

        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe(', when key does NOT exist but it comes with loaded namespace,', () => {
      it('should NOT report missing key', () => {
        i18Next.exists.and.returnValues(false, true);
        spyOn(console, 'warn');
        i18Next.loadNamespaces.and.callFake((_namespaces, onNamespaceLoad) => {
          onNamespaceLoad();
        });
        service.lazyTranslate('testNamespace:testKey', 'testOptions');

        expect(console.warn).not.toHaveBeenCalled();
      });
    });
  });

  describe('languageChanged$', () => {
    it('should emit value on every change of i18next language', () => {
      let result;
      const sub = service.languageChanged$.subscribe(lang => (result = lang));
      mockI18NextLanguage.next('lang1');
      expect(result).toBe('lang1');

      mockI18NextLanguage.next('lang2');
      expect(result).toBe('lang2');

      sub.unsubscribe();
    });
  });
});
