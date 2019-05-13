import { OccProductSearchPageNormalizer } from './occ-product-search-page-normalizer.service';
import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import createSpy = jasmine.createSpy;
import { Occ } from '../../../occ/occ-models/occ.models';

class MockConverterService {
  convert = createSpy('ConverterService.convert').and.returnValue({
    images: ['images'],
  });
}

const mockSource: Occ.ProductSearchPage = {
  products: [{ images: [] }, { images: [] }],
};

describe('OccProductSearchNormalizer', () => {
  let normalizer: OccProductSearchPageNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
        OccProductSearchPageNormalizer,
      ],
    });

    normalizer = TestBed.get(OccProductSearchPageNormalizer);
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
