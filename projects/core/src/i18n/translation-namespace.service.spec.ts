import { TestBed } from '@angular/core/testing';
import { I18nConfig } from './config/i18n-config';
import { TranslationNamespaceService } from './translation-namespace.service';

describe('TranslationNamespaceService', () => {
  let service: TranslationNamespaceService;

  beforeEach(() => {
    const mockNamespaceMapping = {
      key1: 'namespace1',
    };

    TestBed.configureTestingModule({
      providers: [
        TranslationNamespaceService,
        {
          provide: I18nConfig,
          useValue: {
            production: false,
            i18n: { namespaceMapping: mockNamespaceMapping },
          },
        },
      ],
    });

    service = TestBed.get(TranslationNamespaceService);
  });

  describe('getNamespace', () => {
    it('should return namespace configured for the given key', () => {
      expect(service.getNamespace('key1')).toBe('namespace1');
    });

    it('should return namespace configured for the main part of the given key', () => {
      expect(service.getNamespace('key1.subKey1')).toBe('namespace1');
    });

    it('should return the key if no namespace was configured for it', () => {
      expect(service.getNamespace('key2')).toBe('key2');
    });

    it('should return the main part of the key if no namespace was configured for it', () => {
      expect(service.getNamespace('key2.subKey2')).toBe('key2');
    });
  });
});
