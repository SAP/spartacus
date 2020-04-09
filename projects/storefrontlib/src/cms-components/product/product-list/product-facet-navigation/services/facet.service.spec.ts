import { TestBed } from '@angular/core/testing';
import { Facet } from '@spartacus/core';
import { of } from 'rxjs';
import { DialogMode, FacetCollapseState } from '../facet.model';
import { FacetService } from './facet.service';
import { ProductFacetService } from './product-facet.service';

class MockProductFacetService {
  getFacetList() {}
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
      imports: [],
      providers: [
        FacetService,
        {
          provide: ProductFacetService,
          useClass: MockProductFacetService,
        },
      ],
    });

    service = TestBed.inject(FacetService);
    productFacetService = TestBed.inject(ProductFacetService);
  });

  const facet1 = { name: 'f1', values: mockFacetValues, topValueCount: 5 };
  const facet2 = { name: 'f2', values: mockFacetValues, topValueCount: 3 };
  const facet3 = { name: 'f3' };
  const facet4 = { name: 'f4' };
  const facet5 = { name: 'f5' };

  beforeEach(() => {
    spyOn(productFacetService, 'getFacetList').and.returnValue(
      of({ facets: [facet1, facet2, facet3, facet4, facet5] })
    );
  });

  describe('initial UI state', () => {
    it('should return initial UI state with 5 visible facet values', () => {
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

    it('should return initial UI state with 3 visible facet values', () => {
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
  });

  describe('configure expandByDefault', () => {
    it('should collapse all facets by default for dialogMode (mobile)', () => {
      service.getFacetList(DialogMode.POP).subscribe().unsubscribe();

      let facetState1: FacetCollapseState;
      service.getState(facet1).subscribe((state) => (facetState1 = state));
      expect(facetState1.expandByDefault).toBeFalsy();
    });

    it('should collapse all facets by default when dialogMode change to mobile', () => {
      service.getFacetList(DialogMode.INLINE).subscribe().unsubscribe();
      service.getFacetList(DialogMode.POP).subscribe().unsubscribe();

      let facetState1: FacetCollapseState;
      service.getState(facet1).subscribe((state) => (facetState1 = state));
      expect(facetState1.expandByDefault).toBeFalsy();
    });

    it('should expand first 3 facets by default in inline mode (desktop)', () => {
      service.getFacetList(DialogMode.INLINE).subscribe().unsubscribe();

      let facetState3: FacetCollapseState;
      let facetState4: FacetCollapseState;
      service.getState(facet3).subscribe((s) => (facetState3 = s));
      service.getState(facet4).subscribe((s) => (facetState4 = s));
      expect(facetState3.expandByDefault).toBeTruthy();
      expect(facetState4.expandByDefault).toBeFalsy();
    });

    it('should expand first 3 facets when dialogMode changes to desktop', () => {
      service.getFacetList(DialogMode.POP).subscribe().unsubscribe();
      service.getFacetList(DialogMode.INLINE).subscribe().unsubscribe();

      let facetState3: FacetCollapseState;
      let facetState4: FacetCollapseState;
      service.getState(facet3).subscribe((s) => (facetState3 = s));
      service.getState(facet4).subscribe((s) => (facetState4 = s));
      expect(facetState3.expandByDefault).toBeTruthy();
      expect(facetState4.expandByDefault).toBeFalsy();
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

  describe('toggle expand state', () => {
    it('should expand the facet visibility', () => {
      let result: FacetCollapseState;
      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();
      expect(result.expanded).toBeFalsy();

      service.toggleExpand(facet1);

      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();
      expect(result.expanded).toBeTruthy();
    });

    it('should collapse the facet visibility', () => {
      let result: FacetCollapseState;
      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();
      expect(result.expanded).toBeFalsy();

      service.toggleExpand(facet1);
      service.toggleExpand(facet1);

      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();
      expect(result.expanded).toBeFalsy();
    });

    it('should force collapse visibility', () => {
      service.toggleExpand(facet1);

      let result: FacetCollapseState;

      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();
      expect(result.expanded).toBeTruthy();

      service
        .getState(facet1)
        .subscribe((f) => (result = f))
        .unsubscribe();
      expect(result.expanded).toBeTruthy();
    });
  });
});
