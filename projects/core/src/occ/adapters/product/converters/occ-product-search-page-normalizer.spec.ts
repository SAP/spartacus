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

const mockPlpWithUselessFacets: Occ.ProductSearchPage = {
  pagination: {
    totalResults: 2,
  },
  facets: [
    {
      name: 'useless-facet',
      values: [{ count: 2 }, { count: 2 }],
    },
    {
      name: 'useful-facet',
      values: [{ count: 1 }, { count: 2 }, { count: 1 }],
    },
  ] as Occ.Facet[],
};

const mockPlpWithoutPagination: Occ.ProductSearchPage = {
  facets: [
    {
      name: 'useless-facet',
      values: [{ count: 2 }, { count: 2 }],
    },
    {
      name: 'useful-facet',
      values: [{ count: 1 }, { count: 2 }, { count: 1 }],
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

  describe('normalize facet value count', () => {
    it('should remove useles facet from facet list', () => {
      const result = normalizer.convert(mockPlpWithUselessFacets);
      expect(result.facets.length).toEqual(1);
      expect(result.facets[0].name).toEqual('useful-facet');
    });

    it('should not remove useles facet facet list if pagination is not used', () => {
      const result = normalizer.convert(mockPlpWithoutPagination);
      expect(result.facets.length).toEqual(2);
    });
  });
});
