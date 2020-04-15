import { TestBed } from '@angular/core/testing';
import { Breadcrumb } from '@spartacus/core';
import { MerchandisingFacet } from '../model/merchandising-facet.model';
import { MerchandisingFacetNormalizer } from './merchandising-facet-normalizer';

const BREADCRUMBS: Breadcrumb[] = [
  {
    facetCode: 'test-facet-code-1',
    facetValueCode: 'test-facet-code-value-1',
  },
  {
    facetCode: 'test-facet-code-2',
    facetValueCode: 'test-facet-code-value2',
  },
];

const FACETS: MerchandisingFacet[] = [
  {
    code: BREADCRUMBS[0].facetCode,
    value: BREADCRUMBS[0].facetValueCode,
  },
  {
    code: BREADCRUMBS[1].facetCode,
    value: BREADCRUMBS[1].facetValueCode,
  },
];

describe('MerchandisingFacetNormalizer', () => {
  let facetNormalizer: MerchandisingFacetNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchandisingFacetNormalizer],
    });

    facetNormalizer = TestBed.inject(MerchandisingFacetNormalizer);
  });

  it('should be created', () => {
    expect(facetNormalizer).toBeTruthy();
  });

  it('should convert a null list of BreadCrumbs to an empty list of MerchandisingFacets', () => {
    expect(facetNormalizer.convert(null)).toEqual([]);
  });

  it('should convert an undefined list of BreadCrumbs to an empty list of MerchandisingFacets', () => {
    expect(facetNormalizer.convert(undefined)).toEqual([]);
  });

  it('should convert a list of BreadCrumbs to a list of MerchandisingFacets', () => {
    expect(facetNormalizer.convert(BREADCRUMBS)).toEqual(FACETS);
  });

  it('should add converted BreadCrumbs to the given list of MerchandisingFacets', () => {
    const ADDITIONAL_FACET: MerchandisingFacet = {
      code: 'additional-test-facet',
      value: 'additional-test-facet-value',
    };

    const EXPECTED_FACETS = [ADDITIONAL_FACET, ...FACETS];
    expect(facetNormalizer.convert(BREADCRUMBS, [ADDITIONAL_FACET])).toEqual(
      EXPECTED_FACETS
    );
  });
});
