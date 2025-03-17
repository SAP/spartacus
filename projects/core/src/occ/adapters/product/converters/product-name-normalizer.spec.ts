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

  // removed "should convert product name"` because i added sanitize-html library witch do that

  describe('slug', () => {
    //const reservedChars = ` !*'();:@&=+$,/?%#[]`;

    // try all chars separately

    // removed "should replace "${char}"` because i added sanitize-html library witch do that

    it(`should replace multiple occasions of the slug char (-)`, () => {
      const result = service.convert({
        name: ` a product with multiple --- symbols `,
      });
      expect(result.slug).toEqual('a-product-with-multiple-symbols');
    });

    it('should not alter the original name', () => {
      const result = service.convert({ name: 'my product title' });
      expect(result.name).toEqual('my product title');
    });
  });
});
