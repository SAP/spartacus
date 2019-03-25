import { TestBed } from '@angular/core/testing';
import { ServerConfig } from '../../config';
import { I18nextTranslationService } from './i18next-translation.service';
import i18next from 'i18next';

const testKey = 'testNamespace:testKey';
const testOptions = 'testOptions';
const nonBreakingSpace = String.fromCharCode(160);

describe('I18nextTranslationService', () => {
  let service: I18nextTranslationService;
  let config: ServerConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ServerConfig, useValue: { production: false } },
        I18nextTranslationService
      ]
    });

    service = TestBed.get(I18nextTranslationService);
    config = TestBed.get(ServerConfig);
  });

  describe('loadNamespaces', () => {
    it('should return result of i18next.loadNamespaces', () => {
      const expectedResult = new Promise(() => {});
      spyOn(i18next, 'loadNamespaces').and.returnValue(expectedResult);
      const namespaces = ['namespace1', 'namespace2'];
      const result = service.loadNamespaces(namespaces);
      expect(i18next.loadNamespaces).toHaveBeenCalledWith(namespaces);
      expect(result).toBe(expectedResult);
    });
  });

  describe('translate', () => {
    describe(', when key exists,', () => {
      beforeEach(() => {
        spyOn(i18next, 'exists').and.returnValue(true);
      });

      it('should emit result of i18next.t', () => {
        spyOn(i18next, 't').and.returnValue('value');
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));

        expect(i18next.t).toHaveBeenCalledWith(testKey, testOptions);
        expect(result).toBe('value');
      });
    });

    describe(', when key does NOT exist,', () => {
      beforeEach(() => {
        spyOn(i18next, 'exists').and.returnValue(false);
        spyOn(i18next, 'loadNamespaces').and.returnValue(new Promise(() => {}));
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

        expect(i18next.loadNamespaces).toHaveBeenCalledWith(
          'testNamespace',
          jasmine.any(Function)
        );
      });
    });

    describe(', when key does NOT exist even after namespace was loaded,', () => {
      beforeEach(() => {
        spyOn(i18next, 'exists').and.returnValues(false, false);
        spyOn(i18next, 'loadNamespaces').and.callFake(
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
        spyOn(i18next, 'exists').and.returnValues(false, true);
        spyOn(i18next, 'loadNamespaces').and.callFake(
          (_namespaces, onNamespaceLoad) => onNamespaceLoad()
        );
        spyOn(console, 'warn');
      });

      it('should NOT report missing key', () => {
        service.translate(testKey, testOptions).subscribe();
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should return result of i18next.t', () => {
        spyOn(i18next, 't').and.returnValue('value');
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));
        expect(i18next.t).toHaveBeenCalledWith(testKey, testOptions);
        expect(result).toBe('value');
      });
    });
  });
});
