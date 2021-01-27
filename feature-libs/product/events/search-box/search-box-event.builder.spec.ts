import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  createFrom,
  EventService,
  Product,
  ProductActions,
  ProductSearchPage,
  ProductSearchService,
  ProductService,
  SearchboxService,
  Suggestion,
} from '@spartacus/core';
import { PageEvent } from '@spartacus/storefront';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SearchBoxEventBuilder } from './search-box-event.builder';
import {
  SearchBoxProductSelectedEvent,
  SearchBoxSuggestionResultsEvent,
  SearchBoxSuggestionSelectedEvent,
} from './search-box.events';

interface ActionWithPayload extends Action {
  payload: any;
}

const mockSuggestions: Suggestion[] = [
  { value: 'test1' },
  { value: 'test2' },
  { value: 'camera' },
];

const searchPageResults: ProductSearchPage = {
  freeTextSearch: 'camera',
  pagination: { totalResults: 5 },
  facets: [{ category: true }],
};

const productGetBehavior = new BehaviorSubject<Product>(undefined);
class MockProductService implements Partial<ProductService> {
  get = () => productGetBehavior;
}

const productSearchService = new BehaviorSubject<ProductSearchPage>(undefined);
class MockProductSearchService implements Partial<ProductSearchService> {
  getResults = () => productSearchService;
}

const suggestions = new BehaviorSubject<Suggestion[]>(undefined);
const searchResults = new BehaviorSubject<ProductSearchPage>(undefined);
class MockSearchboxService implements Partial<SearchboxService> {
  getSuggestionResults = () => suggestions;
  getResults = () => searchResults;
}

describe('SearchBoxEventBuilder', () => {
  let actions$: Subject<ActionWithPayload>;
  let eventService: EventService;

  beforeEach(() => {
    actions$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductSearchService, useClass: MockProductSearchService },
        { provide: ProductService, useClass: MockProductService },
        { provide: SearchboxService, useClass: MockSearchboxService },
        { provide: ActionsSubject, useValue: actions$ },
      ],
    });

    TestBed.inject(SearchBoxEventBuilder); // register events

    eventService = TestBed.inject(EventService);

    suggestions.next(undefined);
  });

  describe('SearchBoxSuggestionResultsEvent', () => {
    it('should fire event', () => {
      let result: SearchBoxSuggestionResultsEvent;
      eventService
        .get(SearchBoxSuggestionResultsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      const searchBoxSuggestionSelectedEvent = createFrom(
        SearchBoxSuggestionResultsEvent,
        {
          searchQuery: 'camera',
          searchSuggestions: mockSuggestions,
        }
      );

      actions$.next(
        new ProductActions.GetProductSuggestions({
          term: searchPageResults.freeTextSearch,
          searchConfig: {},
        })
      );
      suggestions.next(mockSuggestions);

      expect(result).toEqual(
        jasmine.objectContaining(searchBoxSuggestionSelectedEvent)
      );
    });
  });

  describe('SearchBoxSuggestionSelectedEvent', () => {
    it('should fire event', () => {
      let result: SearchBoxSuggestionSelectedEvent;
      eventService
        .get(SearchBoxSuggestionSelectedEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      const pageEvent = createFrom(PageEvent, {
        context: undefined,
        semanticRoute: 'search',
        url: 'search url',
        params: undefined,
      });

      const searchBoxSuggestionSelectedEvent = createFrom(
        SearchBoxSuggestionSelectedEvent,
        {
          freeText: searchPageResults.freeTextSearch,
          selectedSuggestion: mockSuggestions[2].value,
          searchSuggestions: mockSuggestions,
        }
      );
      actions$.next(
        new ProductActions.GetProductSuggestions({
          term: searchPageResults.freeTextSearch,
          searchConfig: {},
        })
      );
      eventService.dispatch(pageEvent);
      suggestions.next(mockSuggestions);
      productSearchService.next(searchPageResults);

      expect(result).toEqual(
        jasmine.objectContaining(searchBoxSuggestionSelectedEvent)
      );
    });
  });

  describe('SearchBoxProductSelectedEvent', () => {
    // it('should NOT fire event if navigating to product page not from search', () => {
    //   const product: Product = {
    //     code: '1234',
    //     categories: [{ code: 'cat1', name: 'Cat1' }],
    //     name: 'Test Product 1',
    //     price: { value: 100 },
    //   };

    //   let result: SearchBoxProductSelectedEvent;
    //   eventService
    //     .get(SearchBoxProductSelectedEvent)
    //     .pipe(take(1))
    //     .subscribe((value) => (result = value));

    //   const productPageEvent = createFrom(PageEvent, {
    //     context: { id: product.code },
    //     semanticRoute: 'product',
    //     url: 'product url',
    //     params: undefined,
    //   });
    //   // productGetBehavior.next(product);
    //   eventService.dispatch(productPageEvent);

    //   expect(result).toBe(undefined);
    // });

    it('should fire event', () => {
      const product: Product = {
        code: '1234',
        categories: [{ code: 'cat1', name: 'Cat1' }],
        name: 'Test Product 1',
        price: { value: 100 },
      };

      let result: SearchBoxProductSelectedEvent;
      eventService
        .get(SearchBoxProductSelectedEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      const searchBoxProductSelectedEvent = createFrom(
        SearchBoxProductSelectedEvent,
        {
          freeText: 'search',
          selectedCode: product.code,
        }
      );

      const productPageEvent = createFrom(PageEvent, {
        context: { id: product.code },
        semanticRoute: 'product',
        url: 'product url',
        params: undefined,
      });
      productGetBehavior.next(product);
      searchResults.next({
        products: [product, { code: '324234' }, { code: '9999' }],
        freeTextSearch: searchBoxProductSelectedEvent.freeText,
      });
      eventService.dispatch(productPageEvent);

      expect(result).toEqual(
        jasmine.objectContaining(searchBoxProductSelectedEvent)
      );
    });
  });
});
