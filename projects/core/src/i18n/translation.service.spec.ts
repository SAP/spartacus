import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import createSpy = jasmine.createSpy;
import { ServerConfig } from '../config';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { I18NextService } from './i18next/i18next.service';

const testKey = 'testNamespace:testKey';
const testOptions = 'testOptions';
const nonBreakingSpace = String.fromCharCode(160);

describe('TranslationService', () => {
  let service: TranslationService;
  let config: ServerConfig;
  let i18NextService_instance;
  let mockI18NextLanguage;

  beforeEach(() => {
    mockI18NextLanguage = new Subject();

    const fakeI18NOn = (event, callback) => {
      if (event === 'languageChanged') {
        mockI18NextLanguage.subscribe(callback);
      }
    };

    const mockI18NextService = {
      t: createSpy('i18Next.t'),
      exists: createSpy('i18Next.exists'),
      loadNamespaces: createSpy('i18Next.loadNamespaces'),
      on: createSpy('i18Next.on').and.callFake(fakeI18NOn)
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: I18NextService,
          useValue: mockI18NextService
        },
        { provide: ServerConfig, useValue: { production: false } },
        TranslationService
      ]
    });

    service = TestBed.get(TranslationService);
    i18NextService_instance = TestBed.get(I18NextService);
    config = TestBed.get(ServerConfig);
  });

  afterEach(() => {
    mockI18NextLanguage.complete();
  });

  describe('exists', () => {
    it('should call i18NextService.exists', () => {
      service.exists(testKey, testOptions);
      expect(i18NextService_instance.exists).toHaveBeenCalledWith(
        testKey,
        testOptions
      );
    });
  });

  describe('translate', () => {
    describe(', when key exists,', () => {
      beforeEach(() => {
        i18NextService_instance.exists.and.returnValue(true);
      });

      it('should return result of i18NextService.t', () => {
        i18NextService_instance.t.and.returnValue('value');
        const result = service.translate(testKey, testOptions);

        expect(i18NextService_instance.t).toHaveBeenCalledWith(
          testKey,
          testOptions
        );
        expect(result).toBe('value');
      });
    });

    describe(', when key does NOT exist,', () => {
      beforeEach(() => {
        i18NextService_instance.exists.and.returnValue(false);
        spyOn(console, 'warn');
      });

      it('should return key in brackets for non-production', () => {
        const result = service.translate(testKey, testOptions);
        expect(result).toBe(`[testNamespace:testKey]`);
      });

      it('should return non-breaking space for production', () => {
        config.production = true;
        const result = service.translate(testKey, testOptions);
        expect(result).toBe(nonBreakingSpace);
      });

      it('should report missing key for non-production', () => {
        service.translate(testKey, testOptions);
        expect(console.warn).toHaveBeenCalled();
      });
    });
  });

  describe('loadNamespaces', () => {
    it('should call i18NextService.loadNamespaces', () => {
      const namespaces = ['namespace1', 'namespace2'];
      const testCallback = () => {};
      service.loadNamespaces(namespaces, testCallback);
      expect(i18NextService_instance.loadNamespaces).toHaveBeenCalledWith(
        namespaces,
        testCallback
      );
    });
  });

  describe('translateLazy', () => {
    describe(', when key exists,', () => {
      beforeEach(() => {
        i18NextService_instance.exists.and.returnValue(true);
      });

      it('should emit result of i18NextService.t', () => {
        i18NextService_instance.t.and.returnValue('value');
        let result;
        service
          .translateLazy(testKey, testOptions)
          .pipe(take(1))
          .subscribe(x => (result = x));

        expect(i18NextService_instance.t).toHaveBeenCalledWith(
          testKey,
          testOptions
        );
        expect(result).toBe('value');
      });
    });

    describe(', when key does NOT exist,', () => {
      beforeEach(() => {
        i18NextService_instance.exists.and.returnValue(false);
        spyOn(console, 'warn');
      });

      it('should not emit any value until namespace is laded', () => {
        let result = 'initial value';
        service
          .translateLazy(testKey, testOptions)
          .pipe(take(1))
          .subscribe(x => (result = x));
        expect(result).toBe(`initial value`);
      });

      it('should NOT report missing key', () => {
        service.translateLazy(testKey, testOptions);
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should load namespace of key', () => {
        service.translateLazy(testKey, testOptions);

        expect(i18NextService_instance.loadNamespaces).toHaveBeenCalledWith(
          'testNamespace',
          jasmine.any(Function)
        );
      });
    });

    describe(', when key does NOT exist even after namespace was loaded,', () => {
      beforeEach(() => {
        i18NextService_instance.exists.and.returnValues(false, false);
        spyOn(console, 'warn');
        i18NextService_instance.loadNamespaces.and.callFake(
          (_namespaces, onNamespaceLoad) => onNamespaceLoad()
        );
      });

      it('should report missing key', () => {
        service.translateLazy(testKey, testOptions);
        expect(console.warn).toHaveBeenCalled();
      });

      it('should emit key in brackets for non-production', () => {
        let result;
        service
          .translateLazy(testKey, testOptions)
          .pipe(take(1))
          .subscribe(x => (result = x));
        expect(result).toBe(`[testNamespace:testKey]`);
      });

      it('should return non-breaking space for production', () => {
        config.production = true;
        let result;
        service
          .translateLazy(testKey, testOptions)
          .pipe(take(1))
          .subscribe(x => (result = x));

        expect(result).toBe(nonBreakingSpace);
      });
    });

    describe(', when key does NOT exist firstly, but it comes with loaded namespace,', () => {
      beforeEach(() => {
        i18NextService_instance.exists.and.returnValues(false, true);
        spyOn(console, 'warn');
        i18NextService_instance.loadNamespaces.and.callFake(
          (_namespaces, onNamespaceLoad) => {
            onNamespaceLoad();
          }
        );
      });

      it('should NOT report missing key', () => {
        service.translateLazy(testKey, testOptions);
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should return result of i18NextService.t', () => {
        let result;
        i18NextService_instance.t.and.returnValue('value');
        service
          .translateLazy(testKey, testOptions)
          .pipe(take(1))
          .subscribe(x => (result = x));

        expect(i18NextService_instance.t).toHaveBeenCalledWith(
          testKey,
          testOptions
        );
        expect(result).toBe('value');
      });
    });
  });

  describe('languageChanged$', () => {
    it('should emit value on every change of language in i18NextService', () => {
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
