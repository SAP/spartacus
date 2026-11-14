import { TestBed } from '@angular/core/testing';
import { Breadcrumb, Facet } from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import {
  FacetCollapseState,
  FacetGroupCollapsedState,
  FacetList,
} from '../facet.model';
import { FacetService } from './facet.service';
import { ProductFacetService } from './product-facet.service';

class MockProductFacetService {
  facetList$ = EMPTY;
}
const mockFacetValues: Facet[] = [
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
  { name: 'd' },
  { name: 'e' },
  { name: 'f' },
  { name: 'g' },
];

describe('FacetService', () => {
  let service: FacetService;
  let productFacetService: ProductFacetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FacetService,
        {
          provide: ProductFacetService,
          useClass: MockProductFacetService,
        },
      ],
    });

    productFacetService = TestBed.inject(ProductFacetService);
  });

  const facet1 = { name: 'f1', values: mockFacetValues, topValueCount: 5 };
  const facet2 = { name: 'f2', values: mockFacetValues, topValueCount: 3 };
  const facet3 = { name: 'f3' };
  const facet4 = { name: 'f4', values: [] };
  const facet5 = { name: 'f5' };
  const facet6 = { name: 'f6', values: mockFacetValues, topValueCount: 0 };

  const breadcrumb1 = {
    name: 'b1',
    values: mockFacetValues,
    topValueCount: 5,
  } as Breadcrumb;
  const breadcrumb2 = {
    name: 'b2',
    values: mockFacetValues,
    topValueCount: 5,
  } as Breadcrumb;

  beforeEach(() => {
    (productFacetService.facetList$ as any) = of({
      facets: [facet1, facet2, facet3, facet4, facet5],
      activeFacets: [breadcrumb1, breadcrumb2],
    } as FacetList);
    service = TestBed.inject(FacetService);
  });

  describe('facetList$', () => {
    it('should return facets', () => {
      let result: FacetList;
      service.facetList$.subscribe((f) => (result = f)).unsubscribe();
      expect(result.facets.length).toEqual(5);
    });

    it('should return active facets', () => {
      let result: FacetList;
      service.facetList$.subscribe((f) => (result = f)).unsubscribe();
      expect(result.activeFacets.length).toEqual(2);
    });
  });

  describe('getState()', () => {
    it('should create initial UI state with 5 visible facet values', () => {
      let result: FacetCollapseState;
      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();

      expect(result).toEqual({
        topVisible: 5,
        maxVisible: 5,
      });
    });

    it('should create initial UI state with 3 visible facet values', () => {
      let result: FacetCollapseState;
      service
        .getState(facet2)
        .subscribe((f) => (result = f))
        .unsubscribe();

      expect(result).toEqual({
        topVisible: 3,
        maxVisible: 3,
      });
    });

    it('should create default state with no facet values', () => {
      let result: FacetCollapseState;
      service
        .getState(facet3)
        .subscribe((f) => (result = f))
        .unsubscribe();

      expect(result).toEqual({
        topVisible: 0,
        maxVisible: 0,
      });
    });

    it('should create default state with empty facet values', () => {
      let result: FacetCollapseState;
      service
        .getState(facet4)
        .subscribe((f) => (result = f))
        .unsubscribe();

      expect(result.topVisible).toEqual(0);
      expect(result.maxVisible).toEqual(0);
    });

    it('should create initial UI state with max facet values if maxVisible is 0', () => {
      let result: FacetCollapseState;
      service
        .getState(facet6)
        .subscribe((f) => (result = f))
        .unsubscribe();

      expect(result.topVisible).toEqual(mockFacetValues.length);
      expect(result.maxVisible).toEqual(mockFacetValues.length);
    });

    it('should not update maxVisible state if it is already initialized', () => {
      let result: FacetCollapseState;
      service.getState(facet1);
      service.increaseVisibleValues(facet1);
      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();

      expect(result.maxVisible).not.toEqual(5);
    });
  });

  describe('toggle state', () => {
    it('should not have default values', () => {
      let result: FacetCollapseState;
      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();
      expect(result.toggled).toBeUndefined();
    });

    it('should expand', () => {
      let result: FacetCollapseState;

      service.toggle(facet1, false);
      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();

      expect(result.toggled).toEqual(FacetGroupCollapsedState.EXPANDED);
    });

    it('should collapse', () => {
      let result: FacetCollapseState;
      service.toggle(facet1, true);
      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();

      expect(result.toggled).toEqual(FacetGroupCollapsedState.COLLAPSED);
    });
  });

  describe('visible values', () => {
    it('should increase visible', () => {
      service.increaseVisibleValues(facet1);

      let result: FacetCollapseState;
      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();
      expect(result.maxVisible).toEqual(7);
    });

    it('should decrease visible', () => {
      service.decreaseVisibleValues(facet1);

      let result: FacetCollapseState;
      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();
      expect(result.maxVisible).toEqual(5);
    });
  });

  describe('getLinkParams', () => {
    it('should decode the provided value', () => {
      const result = service.getLinkParams(
        'test%20test ~ ! @ # $ & * ( ) = : / , ; ? _ . %'
      );
      expect(result).toEqual({
        query: 'test test ~ ! @ # $ & * ( ) = : / , ; ? _ . %',
      });
    });

    it('should decode the special values ', () => {
      const result = service.getLinkParams('1280+%C3%97+720');
      expect(result).toEqual({
        query: '1280 × 720',
      });
    });

    it(`should replace '+' with and empty space ' '`, () => {
      const result = service.getLinkParams('test+test');
      expect(result).toEqual({ query: 'test test' });
    });
  });

  describe('getResetQuery', () => {
    it('should return an empty query when there are no active facets', () => {
      expect(service.getResetQuery([])).toEqual('');
    });

    it('should return an empty query when active facets have no removeQuery', () => {
      expect(service.getResetQuery([{ facetName: 'a' }])).toEqual('');
    });

    it('should keep the category context for a single active facet', () => {
      const activeFacets = [
        {
          facetCode: 'brand',
          facetValueCode: 'Sony',
          removeQuery: { query: { value: ':relevance:allCategories:575' } },
        },
      ] as Breadcrumb[];
      expect(service.getResetQuery(activeFacets)).toEqual(
        ':relevance:allCategories:575'
      );
    });

    it('should strip every active facet while keeping the free text search', () => {
      const activeFacets = [
        {
          facetCode: 'brand',
          facetValueCode: 'Sony',
          removeQuery: { query: { value: 'camera:relevance:megapixel:20' } },
        },
        {
          facetCode: 'megapixel',
          facetValueCode: '20',
          removeQuery: { query: { value: 'camera:relevance:brand:Sony' } },
        },
      ] as Breadcrumb[];
      expect(service.getResetQuery(activeFacets)).toEqual('camera:relevance');
    });

    it('should preserve the category context while removing user facets', () => {
      const activeFacets = [
        {
          facetCode: 'color',
          facetValueCode: 'red',
          removeQuery: {
            query: { value: ':relevance:allCategories:575:brand:Sony' },
          },
        },
        {
          facetCode: 'brand',
          facetValueCode: 'Sony',
          removeQuery: {
            query: { value: ':relevance:allCategories:575:color:red' },
          },
        },
      ] as Breadcrumb[];
      expect(service.getResetQuery(activeFacets)).toEqual(
        ':relevance:allCategories:575'
      );
    });

    it('should strip a backend-retained facet with three or more active facets', () => {
      // `availableInStores` is kept by the backend inside the other facets'
      // removeQuery values, so it must be removed by its code/value pair even
      // when several facets are active.
      const activeFacets = [
        {
          facetCode: 'availableInStores',
          facetValueCode: 'Chiba',
          removeQuery: {
            query: { value: 'camera:relevance:brand:Sony:color:red' },
          },
        },
        {
          facetCode: 'brand',
          facetValueCode: 'Sony',
          removeQuery: {
            query: {
              value: 'camera:relevance:availableInStores:Chiba:color:red',
            },
          },
        },
        {
          facetCode: 'color',
          facetValueCode: 'red',
          removeQuery: {
            query: {
              value: 'camera:relevance:availableInStores:Chiba:brand:Sony',
            },
          },
        },
      ] as Breadcrumb[];
      expect(service.getResetQuery(activeFacets)).toEqual('camera:relevance');
    });

    it('should match facet values regardless of encoding', () => {
      const activeFacets = [
        {
          facetCode: 'color',
          facetValueCode: 'red',
          removeQuery: {
            query: { value: 'camera:relevance:brand:Sony+Corporation' },
          },
        },
        {
          facetCode: 'brand',
          facetValueCode: 'Sony Corporation',
          removeQuery: { query: { value: 'camera:relevance:color:red' } },
        },
      ] as Breadcrumb[];
      expect(service.getResetQuery(activeFacets)).toEqual('camera:relevance');
    });
  });
});
