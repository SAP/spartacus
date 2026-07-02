import { vi } from 'vitest';
import { isDevMode } from '@angular/core';

vi.mock('@angular/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@angular/core')>();
  return { ...actual, isDevMode: vi.fn() };
});
import { TestBed } from '@angular/core/testing';
import { i18n } from 'i18next';
import { first, take } from 'rxjs/operators';
import { I18nConfig } from '../config/i18n-config';
import { TranslationChunkService } from '../translation-chunk.service';
import { I18NEXT_INSTANCE } from './i18next-instance';
import { I18nextTranslationService } from './i18next-translation.service';

const testKey = 'testKey';
const testFallbackKey = 'testFallbackKey';
const testSecondFallbackKey = 'testSecondFallbackKey';
const testKeys = [
  testKey,
  [testKey, testFallbackKey],
  [testKey, testFallbackKey, testSecondFallbackKey],
];

const testChunk = 'testChunk';
const testOptions = 'testOptions';
const nonBreakingSpace = String.fromCharCode(160);

const getDescription = (key: string | string[]) => {
  return `${(Array.isArray(key) ? key : [key]).length} translation  key(s) `;
};

const getNamespacedKeys = (key: string | string[]) => {
  return (Array.isArray(key) ? key : [key]).map((k) => `${testChunk}:${k}`);
};

describe('I18nextTranslationService', () => {
  let service: I18nextTranslationService;
  let i18next: i18n;

  beforeEach(() => {
    const mockTranslationChunk = {
      getChunkNameForKey: vi.fn()
        .mockReturnValue(testChunk),
    };

    vi.spyOn(console, 'warn');

    TestBed.configureTestingModule({
      providers: [
        { provide: I18nConfig, useValue: { production: false } },
        {
          provide: TranslationChunkService,
          useValue: mockTranslationChunk,
        },
        I18nextTranslationService,
      ],
    });

    service = TestBed.inject(I18nextTranslationService);
    i18next = TestBed.inject(I18NEXT_INSTANCE);
  });

  describe('loadChunks', () => {
    it('should return result of i18next.loadChunks', () => {
      const expectedResult = new Promise(() => {});
      vi.spyOn(i18next, 'loadNamespaces').mockReturnValue(expectedResult as any);
      const chunks = ['chunk1', 'chunk2'];
      const result = service.loadChunks(chunks);
      expect(i18next.loadNamespaces).toHaveBeenCalledWith(chunks);
      expect(result).toBe(expectedResult);
    });
  });

  describe('translate', () => {
    describe(' when i18next is NOT initialized', () => {
      beforeEach(() => {
        i18next.isInitialized = false;
        vi.spyOn(i18next, 'loadNamespaces');
        vi.spyOn(i18next, 'exists');
        vi.spyOn(i18next, 't');
      });

      it('should return and not call translate method', () => {
        let result;
        service
          .translate(testKey)
          .pipe(first())
          .subscribe((x) => (result = x));
        expect(result).toBe(undefined);
        expect(i18next.loadNamespaces).not.toHaveBeenCalled();
        expect(i18next.exists).not.toHaveBeenCalled();
        expect(i18next.t).not.toHaveBeenCalled();
      });
    });

    testKeys.forEach((key) => {
      describe(getDescription(key), () => {
        const namespacedKeys = getNamespacedKeys(key);
        beforeEach(() => {
          i18next.isInitialized = true;
        });

        describe(', when key exists,', () => {
          beforeEach(() => {
            vi.spyOn(i18next, 'exists').mockReturnValue(true);
          });

          it('should emit result of i18next.t', () => {
            vi.spyOn(i18next, 't').mockReturnValue('value');
            let result;
            service
              .translate(key, testOptions)
              .pipe(first())
              .subscribe((x) => (result = x));

            expect(i18next.t).toHaveBeenCalledWith(namespacedKeys, testOptions);
            expect(result).toBe('value');
          });
        });

        describe(', when key does NOT exist,', () => {
          beforeEach(() => {
            vi.spyOn(i18next, 'exists').mockReturnValue(false);
            vi.spyOn(i18next, 'loadNamespaces').mockReturnValue(
              new Promise(() => {})
            );
          });

          it('should emit non-breaking space if whitespaceUntilLoaded is true', () => {
            let result;
            service
              .translate(key, testOptions, true)
              .pipe(first())
              .subscribe((x) => (result = x));
            expect(result).toBe(nonBreakingSpace);
          });

          it('should NOT emit any value if whitespaceUntilLoaded is false', () => {
            let result = 'initial value';
            service
              .translate(key, testOptions, false)
              .pipe(first())
              .subscribe((x) => (result = x));
            expect(result).toBe('initial value');
          });

          it('should load chunk of key', () => {
            service.translate(key, testOptions).pipe(first()).subscribe();

            expect(i18next.loadNamespaces).toHaveBeenCalledWith(
              Array(namespacedKeys.length).fill(`${testChunk}`),
              expect.any(Function)
            );
          });
        });

        describe(', when key does NOT exist even after chunk was loaded,', () => {
          beforeEach(() => {
            vi.spyOn(i18next, 'exists').mockReturnValue(false);
            vi.spyOn(i18next, 'loadNamespaces').mockImplementation(((
              _namespaces,
              onChunkLoad
            ) => onChunkLoad()) as any);
          });

          it('should emit key in brackets for non-production', () => {
            vi.mocked(isDevMode).mockReturnValue(true);

            let result;
            service
              .translate(key, testOptions)
              .pipe(first())
              .subscribe((x) => (result = x));
            expect(result).toEqual(`[${namespacedKeys.join(', ')}]`);
          });

          it('should return non-breaking space for production', () => {
            vi.mocked(isDevMode).mockReturnValue(false);
            let result;
            service
              .translate(key, testOptions)
              .pipe(first())
              .subscribe((x) => (result = x));
            expect(result).toBe(nonBreakingSpace);
          });

          it('should log a warning with information which keys are missing', () => {
            const keys = Array.isArray(key) ? key : [key];
            const expected = `Translation keys missing [${keys.join(
              ', '
            )}]. Attempted to load ${keys
              .map((key) => `'${key}' from chunk 'testChunk'`)
              .join(', ')}.`;
            service.translate(key, testOptions).pipe(first()).subscribe();
            // eslint-disable-next-line no-console
            expect(console.warn).toHaveBeenCalledWith(expected);
          });
        });

        describe(', when language changed,', () => {
          it('should emit result of i18next.t in new language', () => {
            let languageChangedCallback;
            vi.spyOn(i18next, 'off');
            vi.spyOn(i18next, 'on').mockImplementation(
              (_event, callback) => (languageChangedCallback = callback)
            );
            vi.spyOn(i18next, 'exists').mockReturnValue(true);
            vi.spyOn(i18next, 't').mockReturnValueOnce('value1').mockReturnValueOnce('value2');

            let result;
            service
              .translate(key, testOptions)
              .pipe(take(2))
              .subscribe((x) => (result = x));
            expect(result).toBe('value1');

            languageChangedCallback();
            expect(result).toBe('value2');

            expect(i18next.off).toHaveBeenCalledWith(
              'languageChanged',
              languageChangedCallback
            );
          });
        });
      });
    });
  });
});
