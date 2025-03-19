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
       'bypassSecurityTrustHtml',
     ]);
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

  it('should sanitize the name', () => {
    sanitizerSpy.sanitize.and.returnValue('Sanitized Name');

    const result = service.convert({
      name: '<script>alert("XSS")</script>Product',
    });

    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      '<script>alert("XSS")</script>Product'
    );
    expect(result.name).toEqual('Sanitized Name');
  });

  it('should sanitize the name', () => {
    sanitizerSpy.sanitize.and.returnValue('Sanitized Name');

    const result = service.convert({ name: '<b>Unsafe Name</b>' });

    expect(sanitizerSpy.sanitize).toHaveBeenCalledWith(
      SecurityContext.HTML,
      '<b>Unsafe Name</b>'
    );
    expect(result.name).toEqual('Sanitized Name'); // Ensure sanitized name is returned
  });


  it('should handle empty names', () => {
    sanitizerSpy.sanitize.and.returnValue('');

    const result = service.convert({ name: '' });

    expect(result.name).toEqual('');
  });
});
