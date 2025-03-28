import { inject, TestBed } from '@angular/core/testing';
import { OccConfig } from '../../../config/occ-config';
import { ProductNameNormalizer } from './product-name-normalizer';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    sanitizerSpy.bypassSecurityTrustHtml.and.callFake(() => {
      return {
        toString: () => 'Sanitized Name', // mock output
      } as unknown as SafeHtml;
    });
  });

  it('should inject ProductNameNormalizer', inject(
    [ProductNameNormalizer],
    (productNameNormalizer: ProductNameNormalizer) => {
      expect(productNameNormalizer).toBeTruthy();
    }
  ));

  it('should sanitize the name', () => {
    const result = service.convert({
      name: '<script>alert("XSS")</script>Product',
    });

    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(
      'Product' // after removing <script>
    );
    expect(result.name).toEqual('Sanitized Name');
  });

  it('should handle empty names', () => {
    const result = service.convert({ name: '' });

    expect(result.name).toEqual('');
  });
});
