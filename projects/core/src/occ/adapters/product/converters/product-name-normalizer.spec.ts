import { inject, TestBed } from '@angular/core/testing';
import { OccConfig } from '../../../config/occ-config';
import { ProductNameNormalizer } from './product-name-normalizer';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
    media: {
      baseUrl: '',
    },
  },
};

describe('ProductNameNormalizer', () => {
  let service: ProductNameNormalizer;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    sanitizerSpy = jasmine.createSpyObj<DomSanitizer>('DomSanitizer', [
      'sanitize',
    ]);
    sanitizerSpy.sanitize.and.callFake(
      (_context: SecurityContext, value: string) => value
    );
    TestBed.configureTestingModule({
      providers: [
        ProductNameNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ],
    });

    service = TestBed.inject(ProductNameNormalizer);
  });

  it('should inject ProductNameNormalizer', inject(
    [ProductNameNormalizer],
    (productNameNormalizer: ProductNameNormalizer) => {
      expect(productNameNormalizer).toBeTruthy();
    }
  ));

  it('should sanitize the name by removing HTML tags and scripts', () => {
    const result = service.convert({
      name: '<script>alert("XSS")</script>Product',
    });

    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      'alert("XSS")Product'
    );
    expect(result.name).toEqual('alert("XSS")Product');
  });

  it('should sanitize the name with HTML content correctly', () => {
    const result = service.convert({ name: '<b>Unsafe Name</b>' });

    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      'Unsafe Name'
    );
    expect(result.name).toEqual('Unsafe Name');
  });

  it('should handle empty names', () => {
    const result = service.convert({ name: '' });

    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      ''
    );
    expect(result.name).toEqual('');
  });
});
