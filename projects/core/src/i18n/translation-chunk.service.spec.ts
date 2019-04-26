import { TestBed } from '@angular/core/testing';
import { I18nConfig } from './config/i18n-config';
import { TranslationChunkService } from './translation-chunk.service';

describe('TranslationChunkService', () => {
  let service: TranslationChunkService;

  beforeEach(() => {
    const mockChunksConfig = {
      chunk1: ['key1'],
    };

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

  describe('getChunk', () => {
    it('should return chunk name configured for the given key', () => {
      expect(service.getChunkNameForKey('key1')).toBe('chunk1');
    });

    it('should return chunk name configured for the main part of the given key', () => {
      expect(service.getChunkNameForKey('key1.subKey1')).toBe('chunk1');
    });

    it('should return the key if no chunk was configured for it', () => {
      expect(service.getChunkNameForKey('key2')).toBe('key2');
    });

    it('should return the main part of the key if no chunk was configured for it', () => {
      expect(service.getChunkNameForKey('key2.subKey2')).toBe('key2');
    });
  });
});
