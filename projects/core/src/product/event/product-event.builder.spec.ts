import { TestBed } from '@angular/core/testing';
import {
  EventService,
  ProductSearchPage,
  ProductSearchService,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { ProductEventBuilder } from './product-event.builder';
import { FacetChangedEvent } from './product.events';

const getResultsBehavior = new BehaviorSubject<ProductSearchPage>(undefined);
class MockProductSearchService {
  getResults = () => getResultsBehavior;
}

const searchResult1: ProductSearchPage = {
  breadcrumbs: [
    {
      facetCode: 'testFacet',
      facetName: 'testFacetName',
      facetValueCode: 'testFacetValue',
      facetValueName: 'testFacetValueName',
    },
  ],
  freeTextSearch: 'testQuery',
};

const searchResult2: ProductSearchPage = {
  breadcrumbs: [
    {
      facetCode: 'testFacet',
      facetName: 'testFacetName',
      facetValueCode: 'testFacetValue',
      facetValueName: 'testFacetValueName',
    },
    {
      facetCode: 'otherFacet',
      facetName: 'otherFacetName',
      facetValueCode: 'otherFacetValue',
      facetValueName: 'otherFacetValueName',
    },
  ],
  freeTextSearch: 'testQuery',
};

describe('ProductEventModule', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductSearchService, useClass: MockProductSearchService },
      ],
    });

    TestBed.inject(ProductEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  describe('FacetChangedEvent', () => {
    it('should fire when the user toggle on a facet value', () => {
      const prevSearchResults = searchResult1;
      const currSearchResults = searchResult2;

      let result: FacetChangedEvent;
      eventService
        .get(FacetChangedEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      getResultsBehavior.next(prevSearchResults);
      getResultsBehavior.next(currSearchResults);
      expect(result).toEqual(
        jasmine.objectContaining({
          code: 'otherFacet',
          name: 'otherFacetName',
          valueCode: 'otherFacetValue',
          valueName: 'otherFacetValueName',
          selected: true,
        } as FacetChangedEvent)
      );
    });

    it('should fire when the user toggle off a facet value', () => {
      const prevSearchResults = searchResult2;
      const currSearchResults = searchResult1;

      let result: FacetChangedEvent;
      eventService
        .get(FacetChangedEvent)
        .pipe(skip(1), take(1))
        .subscribe((value) => (result = value));

      getResultsBehavior.next(prevSearchResults);
      getResultsBehavior.next(currSearchResults);
      expect(result).toEqual(
        jasmine.objectContaining({
          code: 'otherFacet',
          name: 'otherFacetName',
          valueCode: 'otherFacetValue',
          valueName: 'otherFacetValueName',
          selected: false,
        } as FacetChangedEvent)
      );
    });
  });
});
