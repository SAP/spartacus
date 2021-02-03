import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  EventService,
  ProductSearchPage,
  ProductSearchService,
} from '@spartacus/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProductEventBuilder } from './product-event.builder';
import { FacetChangedEvent } from './product.events';

const getResultsBehavior = new BehaviorSubject<ProductSearchPage>(undefined);
class MockProductSearchService {
  getResults = () => getResultsBehavior;
}

interface ActionWithPayload extends Action {
  payload: any;
}

describe('ProductEventModule', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        { provide: ProductSearchService, useClass: MockProductSearchService },
      ],
    });

    TestBed.inject(ProductEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  describe('FacetChangedEvent', () => {
    it('should fire when the user toggle a facet value', () => {
      const prevSearchResults: ProductSearchPage = {
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

      const currSearchResults: ProductSearchPage = {
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
        facets: [
          { name: 'otherFacetName', values: [{ name: 'otherFacetValueName' }] },
        ],
      };

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
  });
});
