import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import { Occ } from '../../../occ-models/occ.models';
import { OccProductSearchPageNormalizer } from './occ-product-search-page-normalizer';
import createSpy = jasmine.createSpy;

class MockConverterService {
  convert = createSpy('ConverterService.convert').and.returnValue({
    images: ['images'],
  });
}

const mockSource: Occ.ProductSearchPage = {
  products: [{ images: [] }, { images: [] }],
  facets: [
    {
      name: 'facet-1',
      values: [{ count: 1 }, { count: 2 }, { count: 3 }],
      topValues: [{}, {}],
    } as Occ.Facet,
  ],
};

const mockPlpWithFacets: Occ.ProductSearchPage = {
  products: [{ images: [] }, { images: [] }],
  facets: [
    {
      name: 'facet-1',
      values: [{ count: 1 }, { count: 2 }, { count: 3 }],
      topValues: [{}, {}],
    },
    {
      name: 'facet-2',
      values: [{ count: 1 }, { count: 2 }, { count: 3 }],
    },
  ] as Occ.Facet[],
};

describe('OccProductSearchPageNormalizer', () => {
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

    normalizer = TestBed.get(OccProductSearchPageNormalizer as Type<
      OccProductSearchPageNormalizer
    >);
  });

  it('should inject ProductImageConverterService', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should apply product image normalizer to products', () => {
    const converter = TestBed.get(ConverterService as Type<ConverterService>);

    const result = normalizer.convert(mockSource);
    const expected = [
      { images: ['images' as any] },
      { images: ['images' as any] },
    ] as any;
    expect(result.products).toEqual(expected);
    expect(converter.convert).toHaveBeenCalled();
  });

  it('should normalize top values', () => {
    const converter = TestBed.get(ConverterService as Type<ConverterService>);
    const result = normalizer.convert(mockPlpWithFacets);

    expect(result.facets[0].topValueCount).toEqual(2);
    expect(converter.convert).toHaveBeenCalled();
  });

  it('should fallback to default top values', () => {
    const converter = TestBed.get(ConverterService as Type<ConverterService>);
    const result = normalizer.convert(mockPlpWithFacets);

    expect(result.facets[1].topValueCount).toEqual(6);
    expect(converter.convert).toHaveBeenCalled();
  });
});
