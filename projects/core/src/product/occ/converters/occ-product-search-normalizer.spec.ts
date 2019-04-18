import { OccProductSearchNormalizer } from './occ-product-search-normalizer';
import { TestBed } from '@angular/core/testing';
import { ConverterService, ProductSearchPage } from '@spartacus/core';
import createSpy = jasmine.createSpy;

class MockConverterService {
  convert = createSpy('ConverterService.convert').and.returnValue({
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
          provide: ConverterService,
          useClass: MockConverterService,
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
    const converter = TestBed.get(ConverterService);
    const result = normalizer.convert(mockSource);
    const expected = {
      products: [{ images: ['images' as any] }, { images: ['images' as any] }],
    } as any;
    expect(result).toEqual(expected);
    expect(converter.convert).toHaveBeenCalled();
  });
});
