import { TestBed } from '@angular/core/testing';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import { ConverterService } from '../../../../util/converter.service';
import { OccUserInterestsNormalizer } from './occ-user-interests-normalizer';
import { Product } from '../../../../model/product.model';

class MockConverterService {
  convert() {}
}
const product = {
  code: '553637',
  name: 'NV10',
  price: {
    formattedValue: '$264.69',
  },
  stock: {
    stockLevel: 0,
    stockLevelStatus: 'outOfStock',
  },
};
const mockedInterests = {
  sorts: [{ code: 'name', asc: true }],
  pagination: {
    count: 5,
    page: 0,
    totalCount: 2,
    totalPages: 1,
  },
  results: [
    {
      product: product,
      productInterestEntry: [{}],
    },
  ],
};

describe('OccUserInterestsNormalizer', () => {
  let occUserInterestsNormalizer: OccUserInterestsNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccUserInterestsNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occUserInterestsNormalizer = TestBed.inject(OccUserInterestsNormalizer);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'convert').and.callFake(((p: Product) => ({
      ...p,
      code: p.code + 'converted',
    })) as any);
  });

  it('should be created', () => {
    expect(occUserInterestsNormalizer).toBeTruthy();
  });

  it('should convert product', () => {
    const result = occUserInterestsNormalizer.convert(mockedInterests);
    expect(result.results[0].product.code).toBe('553637converted');
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });
});
