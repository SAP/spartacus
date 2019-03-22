import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import createSpy = jasmine.createSpy;
import { ServerConfig } from '../config';
import { I18nextService } from './i18next/i18next.service';

const testKey = 'testNamespace:testKey';
const testOptions = 'testOptions';
const nonBreakingSpace = String.fromCharCode(160);

describe('TranslationService', () => {
  let service: TranslationService;
  let config: ServerConfig;
  let i18nextService;

  beforeEach(() => {
    const mockI18nextService = {
      t: createSpy('i18nextService.t'),
      exists: createSpy('i18nextService.exists'),
      loadNamespaces: createSpy('i18nextService.loadNamespaces')
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: I18nextService,
          useValue: mockI18nextService
        },
        { provide: ServerConfig, useValue: { production: false } },
        TranslationService
      ]
    });

    service = TestBed.get(TranslationService);
    i18nextService = TestBed.get(I18nextService);
    config = TestBed.get(ServerConfig);
  });

  describe('exists', () => {
    it('should call i18nextService.exists', () => {
      service.exists(testKey, testOptions);
      expect(i18nextService.exists).toHaveBeenCalledWith(testKey, testOptions);
    });
  });

  describe('loadNamespaces', () => {
    it('should return result of i18nextService.loadNamespaces', () => {
      const expectedResult = new Promise(() => {});
      i18nextService.loadNamespaces.and.returnValue(expectedResult);
      const namespaces = ['namespace1', 'namespace2'];
      const result = service.loadNamespaces(namespaces);
      expect(i18nextService.loadNamespaces).toHaveBeenCalledWith(namespaces);
      expect(result).toBe(expectedResult);
    });
  });

  describe('translate', () => {
    describe(', when key exists,', () => {
      beforeEach(() => {
        i18nextService.exists.and.returnValue(true);
      });

      it('should emit result of i18nextService.t', () => {
        i18nextService.t.and.returnValue('value');
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));

        expect(i18nextService.t).toHaveBeenCalledWith(testKey, testOptions);
        expect(result).toBe('value');
      });
    });

    describe(', when key does NOT exist,', () => {
      beforeEach(() => {
        i18nextService.exists.and.returnValue(false);
        i18nextService.loadNamespaces.and.returnValue(new Promise(() => {}));
        spyOn(console, 'warn');
      });

      it('should emit non-breaking space if whitespaceUntilLoaded is true', () => {
        let result;
        service
          .translate(testKey, testOptions, true)
          .subscribe(x => (result = x));
        expect(result).toBe(nonBreakingSpace);
      });

      it('should NOT emit any value if whitespaceUntilLoaded is false', () => {
        let result = 'initial value';
        service
          .translate(testKey, testOptions, false)
          .subscribe(x => (result = x));
        expect(result).toBe('initial value');
      });

      it('should NOT report missing key', () => {
        service.translate(testKey, testOptions).subscribe();
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should load namespace of key', () => {
        service.translate(testKey, testOptions).subscribe();

        expect(i18nextService.loadNamespaces).toHaveBeenCalledWith(
          'testNamespace',
          jasmine.any(Function)
        );
      });
    });

    describe(', when key does NOT exist even after namespace was loaded,', () => {
      beforeEach(() => {
        i18nextService.exists.and.returnValues(false, false);
        i18nextService.loadNamespaces.and.callFake(
          (_namespaces, onNamespaceLoad) => onNamespaceLoad()
        );
        spyOn(console, 'warn');
      });

      it('should report missing key', () => {
        service.translate(testKey, testOptions).subscribe();
        expect(console.warn).toHaveBeenCalled();
      });

      it('should emit key in brackets for non-production', () => {
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));
        expect(result).toBe(`[testNamespace:testKey]`);
      });

      it('should return non-breaking space for production', () => {
        config.production = true;
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));
        expect(result).toBe(nonBreakingSpace);
      });
    });

    describe(', when key does NOT exist firstly, but it comes with loaded namespace,', () => {
      beforeEach(() => {
        i18nextService.exists.and.returnValues(false, true);
        i18nextService.loadNamespaces.and.callFake(
          (_namespaces, onNamespaceLoad) => onNamespaceLoad()
        );
        spyOn(console, 'warn');
      });

      it('should NOT report missing key', () => {
        service.translate(testKey, testOptions).subscribe();
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should return result of i18nextService.t', () => {
        i18nextService.t.and.returnValue('value');
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));
        expect(i18nextService.t).toHaveBeenCalledWith(testKey, testOptions);
        expect(result).toBe('value');
      });
    });
  });
});
