import { OccProductSearchNormalizer } from './occ-product-search-normalizer';
import { TestBed } from '@angular/core/testing';
import { ProductImageNormalizer, ProductSearchPage } from '@spartacus/core';
import createSpy = jasmine.createSpy;

class MockProductImageNormalizer {
  convert = createSpy('ProductImageNormalizer.convert').and.returnValue({
    images: ['images'],
  });
}

const mockSource: ProductSearchPage = {
  products: [{ images: [] }, { images: [] }],
};

describe('OccProductSearchNormalizer', () => {
  let normalizer: OccProductSearchNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductImageNormalizer,
          useClass: MockProductImageNormalizer,
        },
        OccProductSearchNormalizer,
      ],
    });

    normalizer = TestBed.get(OccProductSearchNormalizer);
  });

  it('should inject ProductImageConverterService', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should apply product image normalizer to products', () => {
    const imageNormalizer = TestBed.get(ProductImageNormalizer);
    const result = normalizer.convert(mockSource);
    const expected = {
      products: [{ images: ['images' as any] }, { images: ['images' as any] }],
    } as any;
    expect(result).toEqual(expected);
    expect(imageNormalizer.convert).toHaveBeenCalled();
  });
});
