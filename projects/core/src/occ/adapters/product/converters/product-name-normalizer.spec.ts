import { inject, TestBed } from '@angular/core/testing';
import { Product } from '../../../../model/product.model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
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

  const product: Occ.Product = {
    name: '<div>Product1</div>',
    code: 'testCode',
  };

  const convertedProduct: Product = {
    name: 'Product1',
    nameHtml: '<div>Product1</div>',
    code: 'testCode',
    slug: 'product1',
  };

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

  it('should convert product name', () => {
    const result = service.convert(product);
    expect(result).toEqual(convertedProduct);
  });

  describe('slug', () => {
    const reservedChars = ` !*'();:@&=+$,/?%#[]`;

    // try all chars separately
    reservedChars.split('').forEach((char) => {
      it(`should replace "${char}"`, () => {
        const result = service.convert({
          name: `a product with ${char} included`,
        });
        expect(result.slug).toEqual('a-product-with-included');
      });
    });

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
