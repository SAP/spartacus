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
import { ProductEventBuilder } from './product-event.builder';
import {
  BrandPageVisited,
  CategoryPageVisited,
  ProductDetailsPageVisited,
  SearchResultsRetrieved,
} from './product.events';
import { PageVisited } from './routing.events';

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

describe('Product-Event Builder', () => {
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

    TestBed.inject(ProductEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('SearchResultsRetrieved', () => {
    const searchResults: ProductSearchPage = {
      freeTextSearch: 'camera',
      pagination: { totalResults: 5 },
      facets: [{ category: true }],
    };

    let result: SearchResultsRetrieved;
    eventService
      .get(SearchResultsRetrieved)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const pageVisitedEvent = createFrom(PageVisited, {
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
      } as SearchResultsRetrieved)
    );
  });

  it('CategoryPageVisited', () => {
    const searchResults: ProductSearchPage = {
      breadcrumbs: [{ facetValueName: 'Cat1' }],
    };

    let result: CategoryPageVisited;
    eventService
      .get(CategoryPageVisited)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const pageVisitedEvent = createFrom(PageVisited, {
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
      } as CategoryPageVisited)
    );
  });

  it('BrandPageVisited', () => {
    const searchResults: ProductSearchPage = {
      breadcrumbs: [{ facetValueName: 'Brand1' }],
    };

    let result: BrandPageVisited;
    eventService
      .get(BrandPageVisited)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const pageVisitedEvent = createFrom(PageVisited, {
      context: { id: 'brand1' },
      semanticRoute: 'brand',
      url: 'brand url',
      params: undefined,
    });
    eventService.dispatch(pageVisitedEvent);
    getResultsBehavior.next(searchResults);

    expect(result).toEqual(
      jasmine.objectContaining({
        brandCode: pageVisitedEvent.context.id,
        brandName: searchResults.breadcrumbs[0].facetValueName,
      } as BrandPageVisited)
    );
  });

  it('ProductDetailsPageVisited', () => {
    const product: Product = {
      code: '1234',
      categories: [{ code: 'cat1', name: 'Cat1' }],
      name: 'Test Product 1',
      price: { value: 100 },
    };

    let result: ProductDetailsPageVisited;
    eventService
      .get(ProductDetailsPageVisited)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const productPageVisitedEvent = createFrom(PageVisited, {
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
      } as ProductDetailsPageVisited)
    );
  });
});
