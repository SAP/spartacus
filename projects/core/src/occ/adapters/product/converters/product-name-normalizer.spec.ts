import { inject, TestBed } from '@angular/core/testing';
import { OccConfig } from '../../../config/occ-config';
import { ProductNameNormalizer } from './product-name-normalizer';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductNameNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
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
    const result = service.convert({
      name: '<script>alert("XSS")</script>Product',
    });

    expect(result.name).toEqual('alert("XSS")Product');
  });

  it('should handle empty names', () => {
    const result = service.convert({ name: '' });

    expect(result.name).toEqual('');
  });
});
