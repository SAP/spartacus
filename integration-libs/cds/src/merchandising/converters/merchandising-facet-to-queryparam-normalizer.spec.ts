import { TestBed } from '@angular/core/testing';
import { MerchandisingFacet } from '../model/merchandising-facet.model';
import { MerchandisingFacetToQueryparamNormalizer } from './merchandising-facet-to-queryparam-normalizer';

const FACETS: MerchandisingFacet[] = [
  {
    code: 'test-facet-1',
    value: 'test-facet-1-value',
  },
  {
    code: 'test-facet-2',
    value: 'test-facet-2-value',
  },
];

const EXPECTED_QUERYPARAMS = `${FACETS[0].code}:${FACETS[0].value}:${FACETS[1].code}:${FACETS[1].value}`;

describe('MerchandisingFacetToQueryparamNormalizer', () => {
  let facetToQueryparamNormalizer: MerchandisingFacetToQueryparamNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchandisingFacetToQueryparamNormalizer],
    });

    facetToQueryparamNormalizer = TestBed.inject(
      MerchandisingFacetToQueryparamNormalizer
    );
  });

  it('should be created', () => {
    expect(facetToQueryparamNormalizer).toBeTruthy();
  });

  it('should return undefined if given no truthy facets', () => {
    const FALSEY_FACETS = [undefined, null];
    expect(facetToQueryparamNormalizer.convert(FALSEY_FACETS)).toBeUndefined();
  });

  it('should ignore falsey facets', () => {
    const FACETS_WITH_FALSEY_VALUES: MerchandisingFacet[] = [
      null,
      undefined,
      ...FACETS,
    ];

    expect(facetToQueryparamNormalizer.convert(FACETS_WITH_FALSEY_VALUES)).toBe(
      EXPECTED_QUERYPARAMS
    );
  });

  it('should ignore facets with falsey fields', () => {
    const FACETS_WITH_FALSEY_FIELDS = [
      {
        code: 'facet-with-code-only',
        value: undefined,
      },
      {
        code: null,
        value: 'face-with-value-only',
      },
      ...FACETS,
    ];

    expect(facetToQueryparamNormalizer.convert(FACETS_WITH_FALSEY_FIELDS)).toBe(
      EXPECTED_QUERYPARAMS
    );
  });
});
