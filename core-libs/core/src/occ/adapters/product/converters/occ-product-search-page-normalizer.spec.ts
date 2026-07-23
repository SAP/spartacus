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
    {
      name: 'facet-3',
      values: [{ count: 1 }, { count: 2 }, { count: 3 }],
      topValues: [],
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

    normalizer = TestBed.inject(OccProductSearchPageNormalizer);
  });

  it('should inject ProductImageConverterService', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should apply product image normalizer to products', () => {
    const converter = TestBed.inject(ConverterService);

    const result = normalizer.convert(mockSource);
    const expected = [
      { images: ['images' as any] },
      { images: ['images' as any] },
    ] as any;
    expect(result.products).toEqual(expected);
    expect(converter.convert).toHaveBeenCalled();
  });

  describe('normalize top values', () => {
    it('should normalize top values', () => {
      const converter = TestBed.inject(ConverterService);
      const result = normalizer.convert(mockPlpWithFacets);

      expect(result.facets[0].topValueCount).toEqual(2);
      expect(converter.convert).toHaveBeenCalled();
    });

    it('should fallback to default top values when topValues is undefined', () => {
      const converter = TestBed.inject(ConverterService);
      const result = normalizer.convert(mockPlpWithFacets);

      expect(result.facets[1].topValueCount).toEqual(6);
      expect(converter.convert).toHaveBeenCalled();
    });

    it('should fallback to default top value when topValues is an empty list', () => {
      const converter = TestBed.inject(ConverterService);
      const result = normalizer.convert(mockPlpWithFacets);

      expect(result.facets[2].topValueCount).toEqual(6);
      expect(converter.convert).toHaveBeenCalled();
    });
  });

  describe('normalize facet value count', () => {
    it('should remove useless facet from facet list', () => {
      const result = normalizer.convert(mockPlpWithUselessFacets);
      expect(result.facets.length).toEqual(1);
      expect(result.facets[0].name).toEqual('useful-facet');
    });

    it('should handle empty facets', () => {
      mockPlpWithUselessFacets.facets = null;
      const result = normalizer.convert(mockPlpWithUselessFacets);
      expect(result).toEqual(mockPlpWithUselessFacets as any);
    });

    it('should not remove useless facet facet list if pagination is not used', () => {
      const result = normalizer.convert(mockPlpWithoutPagination);
      expect(result.facets.length).toEqual(2);
    });
  });
});
