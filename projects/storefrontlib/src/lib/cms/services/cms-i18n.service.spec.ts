import { TestBed } from '@angular/core/testing';

import {
  TranslationService,
  TranslationNamespaceService,
} from '@spartacus/core';
import { CmsMappingService } from '@spartacus/storefront';
import createSpy = jasmine.createSpy;
import { CmsI18nService } from './cms-i18n.service';

describe('CmsI18nService', () => {
  let service: CmsI18nService;
  let translation: TranslationService;

  const mockCmsMapping = {
    getI18nKeysForComponents: () => ['key1', 'key2'],
  };
  const mockTranslation = {
    loadNamespaces: createSpy('loadNamespaces'),
  };
  const mockTranslationNamespace = {
    getNamespace: createSpy('getNamespace').and.callFake(
      key => `namespaceFor-${key}`
    ),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsI18nService,
        { provide: CmsMappingService, useValue: mockCmsMapping },
        { provide: TranslationService, useValue: mockTranslation },
        {
          provide: TranslationNamespaceService,
          useValue: mockTranslationNamespace,
        },
      ],
    });
    service = TestBed.get(CmsI18nService);
    translation = TestBed.get(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadNamespacesForComponents', () => {
    it('should load i18n namespaces for given component types', () => {
      service.loadNamespacesForComponents([]);

      expect(translation.loadNamespaces).toHaveBeenCalledWith([
        'namespaceFor-key1',
        'namespaceFor-key2',
      ]);
    });
  });
});
