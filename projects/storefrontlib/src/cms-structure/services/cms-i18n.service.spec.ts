import { TestBed } from '@angular/core/testing';
import { TranslationChunkService, TranslationService } from '@spartacus/core';
import { CmsI18nService } from './cms-i18n.service';
import { CmsComponentsService } from './cms-components.service';
import createSpy = jasmine.createSpy;

describe('CmsI18nService', () => {
  let service: CmsI18nService;
  let translation: TranslationService;

  const mockCmsComponentsService = {
    getI18nKeys: () => ['key1', 'key2'],
  };
  const mockTranslation = {
    loadChunks: createSpy('loadChunks'),
  };
  const mockTranslationChunk = {
    getChunkNameForKey: createSpy('getChunkNameForKey').and.callFake(
      (key) => `chunkFor-${key}`
    ),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsI18nService,
        { provide: CmsComponentsService, useValue: mockCmsComponentsService },
        { provide: TranslationService, useValue: mockTranslation },
        {
          provide: TranslationChunkService,
          useValue: mockTranslationChunk,
        },
      ],
    });
    service = TestBed.inject(CmsI18nService);
    translation = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadForComponents', () => {
    it('should load i18n chunks for given component types', () => {
      service.loadForComponents([]);

      expect(translation.loadChunks).toHaveBeenCalledWith([
        'chunkFor-key1',
        'chunkFor-key2',
      ]);
    });
  });
});
