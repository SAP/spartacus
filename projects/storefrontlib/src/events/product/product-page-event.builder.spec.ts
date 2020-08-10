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
import { PageEvent } from '../page/page.events';
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

  describe('SearchPageResultsEvent', () => {
    it('should fire when the user performs a search and navigates to the search page', () => {
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

      const pageEvent = createFrom(PageEvent, {
        context: undefined,
        semanticRoute: 'search',
        url: 'search url',
        params: undefined,
      });
      eventService.dispatch(pageEvent);
      getResultsBehavior.next(searchResults);

      expect(result).toEqual(
        jasmine.objectContaining({
          searchTerm: searchResults.freeTextSearch,
          numberOfResults: searchResults.pagination.totalResults,
          ...pageEvent,
        } as SearchPageResultsEvent)
      );
    });

    it('should fire again if the user is on the search page, and the search state changes', () => {
      const searchResults: ProductSearchPage = {
        freeTextSearch: 'camera',
        pagination: { totalResults: 5 },
        facets: [{ category: true }],
      };

      let result: SearchPageResultsEvent;
      const sub = eventService
        .get(SearchPageResultsEvent)
        .subscribe((value) => (result = value));

      const pageEvent = createFrom(PageEvent, {
        context: undefined,
        semanticRoute: 'search',
        url: 'search url',
        params: undefined,
      });

      eventService.dispatch(pageEvent);
      getResultsBehavior.next(searchResults);
      expect(result).toEqual(
        jasmine.objectContaining({
          searchTerm: searchResults.freeTextSearch,
          numberOfResults: searchResults.pagination.totalResults,
          ...pageEvent,
        } as SearchPageResultsEvent)
      );

      getResultsBehavior.next({
        ...searchResults,
        freeTextSearch: 'new',
      });
      expect(result).toEqual(
        jasmine.objectContaining({
          searchTerm: 'new',
          numberOfResults: searchResults.pagination.totalResults,
          ...pageEvent,
        } as SearchPageResultsEvent)
      );
      sub.unsubscribe();
    });

    it('should not fire if the user is not on the search page', () => {
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

      getResultsBehavior.next(searchResults);

      expect(result).toBeFalsy();
    });
  });

  it('CategoryPageResultsEvent', () => {
    const searchResults: ProductSearchPage = {
      breadcrumbs: [{ facetValueName: 'Cat1' }],
      pagination: { totalResults: 5 },
    };

    let result: CategoryPageResultsEvent;
    eventService
      .get(CategoryPageResultsEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const pageEvent = createFrom(PageEvent, {
      context: { id: 'cat1' },
      semanticRoute: 'category',
      url: 'category url',
      params: undefined,
    });
    eventService.dispatch(pageEvent);
    getResultsBehavior.next(searchResults);

    expect(result).toEqual(
      jasmine.objectContaining({
        ...pageEvent,
        categoryCode: pageEvent.context.id,
        categoryName: searchResults.breadcrumbs[0].facetValueName,
        numberOfResults: searchResults.pagination.totalResults,
      } as CategoryPageResultsEvent)
    );
  });

  describe('ProductDetailsPageEvent', () => {
    it('should fire on PDP visit', () => {
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

      const productPageEvent = createFrom(PageEvent, {
        context: { id: product.code },
        semanticRoute: 'product',
        url: 'product url',
        params: undefined,
      });
      eventService.dispatch(productPageEvent);
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

    it('should not fire again if the product state changes', () => {
      const product: Product = {
        code: '1234',
        categories: [{ code: 'cat1', name: 'Cat1' }],
        name: 'Test Product 1',
        price: { value: 100 },
      };

      let result: ProductDetailsPageEvent;
      const sub = eventService
        .get(ProductDetailsPageEvent)
        .subscribe((value) => (result = value));

      const productPageEvent = createFrom(PageEvent, {
        context: { id: product.code },
        semanticRoute: 'product',
        url: 'product url',
        params: undefined,
      });

      eventService.dispatch(productPageEvent);
      productGetBehavior.next(product);
      expect(result).toEqual(
        jasmine.objectContaining({
          code: product.code,
          categories: product.categories,
          name: product.name,
          price: product.price,
        } as ProductDetailsPageEvent)
      );

      productGetBehavior.next({ ...product, code: 'new' });
      expect(result).not.toEqual(jasmine.objectContaining({ code: 'new' }));
      expect(result).toEqual(
        jasmine.objectContaining({
          code: product.code,
          categories: product.categories,
          name: product.name,
          price: product.price,
        } as ProductDetailsPageEvent)
      );
      sub.unsubscribe();
    });
  });
});
