import { TestBed } from '@angular/core/testing';
import { I18nConfig } from './config/i18n-config';
import { TranslationChunkService } from './translation-chunk.service';
import { defaultI18nConfig } from './config/default-i18n-config';

describe('TranslationChunkService', () => {
  let service: TranslationChunkService;

  const mockChunksConfig = {
    chunk1: ['key1', 'key2', 'key2'],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslationChunkService,
        {
          provide: I18nConfig,
          useValue: {
            production: false,
            i18n: { chunks: mockChunksConfig },
          },
        },
      ],
    });

    service = TestBed.get(TranslationChunkService);
  });

  fdescribe('getChunk', () => {
    it('should return chunk name configured for the given key', () => {
      expect(service.getChunkNameForKey('key1')).toBe('chunk1');
    });

    it('should return chunk name configured for the main part of the given key', () => {
      expect(service.getChunkNameForKey('key1.subKey1')).toBe('chunk1');
    });

    it('should return the key if no chunk was configured for it', () => {
      expect(service.getChunkNameForKey('key3')).toBe('key3');
    });

    it('should return the main part of the key if no chunk was configured for it', () => {
      expect(service.getChunkNameForKey('key3.subKey2')).toBe('key3');
    });
  });

  fdescribe('I18n config', () => {
    it('should composed of object of arrays', () => {
      const chunks = defaultI18nConfig.i18n.chunks;
      expect(chunks).toEqual(jasmine.any(Object));
      const chunk = Object.keys(chunks)[0];
      expect(chunks[chunk]).toEqual(jasmine.any(Array));
    });

    it('should warn if there are duplicated keys in the config', () => {
      const constructorSpy = spyOn(
        TranslationChunkService.prototype,
        'warnDuplicates'
      );
      // @ts-ignore: 'mockService' is declared but its value is never read
      const mockService = new TranslationChunkService({
        production: false,
        i18n: { chunks: mockChunksConfig },
      });
      expect(constructorSpy).toHaveBeenCalled();
    });
  });
});
