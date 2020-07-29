import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  createFrom,
  EventService,
  Product,
  ProductSearchPage,
  ProductSearchService,
  ProductService,
} from '@spartacus/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageVisitedEvent } from '../page/page.events';
import { ProductPageEventBuilder } from './product-page-event.builder';
import {
  CategoryPageResultsEvent,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from './product-page.events';

const productGetBehavior = new BehaviorSubject<Product>(undefined);
class MockProductService {
  get = () => productGetBehavior;
}

const getResultsBehavior = new BehaviorSubject<ProductSearchPage>(undefined);
class MockProductSearchService {
  getResults = () => getResultsBehavior;
}

interface ActionWithPayload extends Action {
  payload: any;
}

describe('ProductPageEventModule', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        { provide: ProductService, useClass: MockProductService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
      ],
    });

    TestBed.inject(ProductPageEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('SearchPageResultsEvent', () => {
    const searchResults: ProductSearchPage = {
      freeTextSearch: 'camera',
      pagination: { totalResults: 5 },
      facets: [{ category: true }],
    };

    let result: SearchPageResultsEvent;
    eventService
      .get(SearchPageResultsEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const pageVisitedEvent = createFrom(PageVisitedEvent, {
      context: undefined,
      semanticRoute: 'search',
      url: 'search url',
      params: undefined,
    });
    eventService.dispatch(pageVisitedEvent);
    getResultsBehavior.next(searchResults);

    expect(result).toEqual(
      jasmine.objectContaining({
        searchTerm: searchResults.freeTextSearch,
        numberOfResults: searchResults.pagination.totalResults,
      } as SearchPageResultsEvent)
    );
  });

  it('CategoryPageResultsEvent', () => {
    const searchResults: ProductSearchPage = {
      breadcrumbs: [{ facetValueName: 'Cat1' }],
    };

    let result: CategoryPageResultsEvent;
    eventService
      .get(CategoryPageResultsEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const pageVisitedEvent = createFrom(PageVisitedEvent, {
      context: { id: 'cat1' },
      semanticRoute: 'category',
      url: 'category url',
      params: undefined,
    });
    eventService.dispatch(pageVisitedEvent);
    getResultsBehavior.next(searchResults);

    expect(result).toEqual(
      jasmine.objectContaining({
        categoryCode: pageVisitedEvent.context.id,
        categoryName: searchResults.breadcrumbs[0].facetValueName,
      } as CategoryPageResultsEvent)
    );
  });

  it('ProductDetailsPageEvent', () => {
    const product: Product = {
      code: '1234',
      categories: [{ code: 'cat1', name: 'Cat1' }],
      name: 'Test Product 1',
      price: { value: 100 },
    };

    let result: ProductDetailsPageEvent;
    eventService
      .get(ProductDetailsPageEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const productPageVisitedEvent = createFrom(PageVisitedEvent, {
      context: { id: product.code },
      semanticRoute: 'product',
      url: 'product url',
      params: undefined,
    });
    eventService.dispatch(productPageVisitedEvent);
    productGetBehavior.next(product);

    expect(result).toEqual(
      jasmine.objectContaining({
        code: product.code,
        categories: product.categories,
        name: product.name,
        price: product.price,
      } as ProductDetailsPageEvent)
    );
  });
});
