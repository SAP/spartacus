import { TestBed } from '@angular/core/testing';

import { TranslationService } from '@spartacus/core';
import { CmsMappingService } from '@spartacus/storefront';
import createSpy = jasmine.createSpy;
import { CmsI18nService } from './cms-i18n.service';

describe('CmsI18nService', () => {
  let service: CmsI18nService;
  let translation: TranslationService;

  const mockCmsMapping = {
    getI18nNamespacesForComponents: () => ['namespace1', 'namespace2']
  };
  const mockTranslation = {
    loadNamespaces: createSpy('loadNamespaces')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsI18nService,
        { provide: CmsMappingService, useValue: mockCmsMapping },
        { provide: TranslationService, useValue: mockTranslation }
      ]
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
        'namespace1',
        'namespace2'
      ]);
    });
  });
});
