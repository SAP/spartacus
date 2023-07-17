import { TestBed } from '@angular/core/testing';
import { I18nConfig } from './config/i18n-config';
import { TranslationChunkService } from './translation-chunk.service';

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

    service = TestBed.inject(TranslationChunkService);
  });

  describe('getChunk', () => {
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

  describe('I18n config', () => {
    it('should not fail if no config has been provided', () => {
      const mockService = new TranslationChunkService({});
      expect(mockService).toBeTruthy();
    });

    it('should not fail if no config chunks has been provided', () => {
      const mockService = new TranslationChunkService({
        i18n: {},
      });
      expect(mockService).toBeTruthy();
    });

    it('should warn if there are duplicated keys in the config', () => {
      const warnSpy = spyOn(console, 'warn');
      const mockService = new TranslationChunkService({
        i18n: { chunks: mockChunksConfig },
      });
      expect(mockService).toBeTruthy();
      expect(warnSpy).toHaveBeenCalled();
    });
  });
});
