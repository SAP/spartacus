import { TestBed } from '@angular/core/testing';
import {
  EventService,
  ProductSearchPage,
  ProductSearchService,
} from '@spartacus/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ProductEventBuilder } from './product-event.builder';
import { FacetChangedEvent } from './product.events';

const getResultsBehavior = new BehaviorSubject<ProductSearchPage | undefined>(
  undefined
);
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
    getResultsBehavior.next(undefined);
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductSearchService, useClass: MockProductSearchService },
      ],
    });

    TestBed.inject(ProductEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  describe('FacetChangedEvent', () => {
    it('should fire when the user toggle on a facet value', async () => {
      const prevSearchResults = searchResult1;
      const currSearchResults = searchResult2;

      const result = firstValueFrom(eventService.get(FacetChangedEvent));

      getResultsBehavior.next(prevSearchResults);
      getResultsBehavior.next(currSearchResults);
      expect(await result).toEqual(
        expect.objectContaining({
          code: 'otherFacet',
          name: 'otherFacetName',
          valueCode: 'otherFacetValue',
          valueName: 'otherFacetValueName',
          selected: true,
        } as FacetChangedEvent)
      );
    });

    it('should fire when the user toggle off a facet value', async () => {
      const prevSearchResults = searchResult2;
      const currSearchResults = searchResult1;

      const result = firstValueFrom(eventService.get(FacetChangedEvent));

      getResultsBehavior.next(prevSearchResults);
      getResultsBehavior.next(currSearchResults);
      expect(await result).toEqual(
        expect.objectContaining({
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
